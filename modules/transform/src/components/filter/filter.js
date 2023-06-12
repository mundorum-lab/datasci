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
        if(message.hasOwnProperty("value")){
            this.table = JSON.parse(message.value)
        } else {
            this.table = message
        }
        try{
            this.toDataFrame()   
            this.file_id = message.file_id
            let validator = new ValidateFilter()
            let validation = validator.validate(this.columns, this.target_column, this.compared_value, this.operation)
            if(validation.isValid){
                this.filter()
            } else {
                //return error message
                this.status = false
                this._notify('filterError', validation.result)
            }
        }catch(error){
            let filterError = {
                transformationType: "filter",
                errorType: "Conversion to DataFrame with Danfo",
                message: error.message
            }
            this._notify('filterError', filterError)
        }
    }

    chooseOpAndFilter(){
        this.df = this.df.query(this.df[this.target_column][this.operation](this.compared_value))
        this.toJson()
        this._notify('filtered', this.result)
        this.status = true 
    }

    filter(){
        this.chooseOpAndFilter()
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