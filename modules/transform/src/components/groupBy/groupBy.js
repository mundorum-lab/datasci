import { Oid } from '/lib/oidlib-dev.js'
import { ValidateGroupBy } from './validateGroupBy.js'
import { TransformWeb } from '../transform.js'

export class GroupByWeb extends TransformWeb {

    constructor(){
        super()
        this.validFunctions = {}
    }

    groupBy(){ 
        this.df = this.df.groupby([this.group_by_target_column]).sum()
    }

    handleGroupBy (topic, message) {  //handle with notice

        //topic: groupBy
        //message: table
        console.log("aaaaaaaaaaa",this.dfd.sum)

        this.toDataFrame(message)
        this.file_id = message.file_id
        let validator = new ValidateGroupBy()
        result = validator.validate(this.columns, this.group_by_target_column, this.operation_target_column, this.operation)
        if(result.isValid){
            this.groupBy()
            this.status = true
        } else {
            this.status = false
            this._notify('groupByError', result.result)
        }

    }
}


Oid.component(
{
  id: 'ts:transGroupBy',
  element: 'groupBy-data',
  properties: {
    operation: {default: null},
    group_by_target_column: {default: null},
    operation_target_column: {default: null},
  },
  receive: {groupBy: 'handleGroupBy'},
  implementation: GroupByWeb
})