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
        this.toDataFrame()   
        this.file_id = message.file_id
        let validator = new ValidateFilter()
        let result = validator.validate(this.columns, this.target_column, this.compared_value, this.operation)
        if(result.isValid){
            this.filter()
        } else {
            //return error message
            this.status = false
            this._notify('filterError', result.result)
        }
    }

    chooseOpAndFilter(){
        this.df = this.df.query(this.df[this.target_column][this.operation](this.compared_value))
    }

    filter(){
        this.chooseOpAndFilter()
        this.toJson(this.df, this.file_id, this.columns)
        this.status = true
        this._notify('filtered', this.table)
    }
}

Oid.component(
{
  id: 'ts:filter',
  element: 'filter-oid',
  properties: {
    target_column: {default: null},
    operation: {default: null},
    compared_value: {default: null},
  },
  receive: {filter: 'handleFilter'},
  implementation: FilterWeb
})