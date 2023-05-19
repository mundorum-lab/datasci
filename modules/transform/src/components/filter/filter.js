import { Oid } from '/lib/oidlib-dev.js'
import { ValidateFilter } from './validateFilter.js'
import { TransformWeb } from '../transform.js'

class FilterWeb extends TransformWeb {

    constructor(){
        super()
        this.operation = null
        this.targetColumn = null
        this.compared = null
    }

    handleFilter (topic, message) {  //handle with notice
       
        //topic: filter
        //message: filterInput
        console.log(this.table)
        this.table = message.table
        this.toDataFrame()   
        this.file_id = message.file_id
        this.operation = message.operation
        this.targetColumn = message.column
        this.compared = message.comparedValue
        let validator = new ValidateFilter()
        let result = validator.validate(this.columns, this.targetColumn, this.compared, this.operation)
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
        this.toJson(this.df, this.file_id, this.columns)
        this.status = true
        console.log(this.table)
        this._notify('filterResult', this.table)
    }
}

Oid.component(
{
  id: 'ts:transFilter',
  element: 'filter-data',
  properties: {
  },
  receive: {filter: 'handleFilter'},
  implementation: FilterWeb
})