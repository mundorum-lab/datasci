import { Oid } from '/lib/oidlib-dev.js'
import { ValidateFilter } from './validateFilter.js'
import { TransformWeb } from '../transform.js'

class FilterWeb extends TransformWeb {

    handleFilter (topic, message) {  //handle with notice
        
        //topic: filter
        //message: filterInput
        console.log("mensagem no tópico filter:",message)
        let ans = this.toDataFrame(message.table)   
        this.columns = ans.columns
        this.df = ans.df
        this.file_id = message.file_id
        this.operation = message.operation
        this.targetColumn = message.column
        this.compared = message.comparedValue
        let validator = new ValidateFilter()
        let result = validator.validate(this.columns, this.targetColumn, this.compared, this.operation)
        console.log("resultado da validação:",result)
        if(result.isValid){
            this.filter()
        } else {
            //return error message
            this.status = false
            this._notify('filterError', result.result)
        }
    }

    chooseOpAndFilter(){
        if(this.operation=="<"){
            this.df = this.df.query(this.df[this.targetColumn].lt(this.compared))
        }
        if(this.operation=="<="){
            this.df = this.df.query(this.df[this.targetColumn].lte(this.compared))
        }
        if(this.operation==">"){
            this.df = this.df.query(this.df[this.targetColumn].gt(this.compared))
        }
        if(this.operation==">="){
            this.df = this.df.query(this.df[this.targetColumn].gte(this.compared))
        }
        if(this.operation=="=="){
            this.df = this.df.query(this.df[this.targetColumn].eq(this.compared))
        }
    }

    filter(){
        this.chooseOpAndFilter()
        let json = this.toJson(this.df, this.file_id, this.columns)
        this.status = true
        this._notify('filterResult', json)
    }

}

Oid.component(
{
  id: 'ts:transFilter',
  element: 'filter-data',
  properties: {
    status: {default: false},
    name: {default: "Filtro"},
    type: {default: "Transformação"},
    columns: {default: {}},
    df: {default: null},
    file_id: {default: ""},
    operation: {default: ""},
    targetColumn:{default: ""},
    compared: {default: ""},
  },
  receive: {filter: 'handleFilter'},
  implementation: FilterWeb
})