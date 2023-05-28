import { Oid } from '/lib/oidlib-dev.js'
import { ValidateFilter } from './validateFilter.js'
import { TransformWeb } from '../transform.js'

class FilterWeb extends TransformWeb {

    constructor(){
        super()
    }
    
    handleFilter (topic, message) {  //handle with notice

        //topic: filter
        if(Number(this.compared_value)){
            this.compared_value = Number(this.compared_value)
        }
        this.table = message
        console.log("Tabela Recebida por barramento:")
        console.log(this.table)
        this.toDataFrame()   
        console.log("Tabela no formato de df:")
        this.df.print()
        this.file_id = message.file_id
        let validator = new ValidateFilter()
        let result = validator.validate(this.columns, this.target_column, this.compared_value, this.operation)
        if(result.isValid){
            this.filter()
        } else {
            //return error message
            this.status = false
            console.log("Exemplo de Erro:")
            console.log(result.result)
            this._notify('filterError', result.result)
        }
    }

    chooseOpAndFilter(){
        if(this.operation=="<"){
            this.df = this.df.query(this.df[this.target_column].lt(this.compared_value))
        }
        if(this.operation=="<="){
            this.df = this.df.query(this.df[this.target_column].lte(this.compared_value))
        }
        if(this.operation==">"){
            this.df = this.df.query(this.df[this.target_column].gt(this.compared_value))
        }
        if(this.operation==">="){
            this.df = this.df.query(this.df[this.target_column].gte(this.compared_value))
        }
        if(this.operation=="=="){
            this.df = this.df.query(this.df[this.target_column].eq(this.compared_value))
        }
    }

    filter(){
        this.chooseOpAndFilter()
        this.toJson(this.df, this.file_id, this.columns)
        console.log("Resultado do Filtro:")
        this.df.print()
        this.status = true
        console.log("Tabela retornada no barramento:")
        console.log(this.table)
        this._notify('filtered', this.table)
    }
}

Oid.component(
{
  id: 'ts:transFilter',
  element: 'filter-data',
  properties: {
    target_column: {default: null},
    operation: {default: null},
    compared_value: {default: null},
  },
  receive: {filter: 'handleFilter'},
  implementation: FilterWeb
})