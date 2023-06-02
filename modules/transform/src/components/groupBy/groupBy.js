import { Oid } from '/lib/oidlib-dev.js'
import { ValidateGroupBy } from './validateGroupBy.js'
import { TransformWeb } from '../transform.js'

export class GroupByWeb extends TransformWeb {

    constructor(){
        super()
        this.validFunctions = {}
    }

    groupBy(){ 
        let result = this.df.loc({columns: [this.operation_target_column, this.group_by_target_column]})
        result = result.groupby([this.group_by_target_column])[this.operation]()
        let generated_name = `${this.operation_target_column}_${this.operation}`
        result.rename({[generated_name]: this.result_column }, { inplace: true })
        this.df = result 
        let new_columns = {}
        new_columns[this.group_by_target_column] = this.columns[this.group_by_target_column]
        new_columns[this.result_column] = this.columns[this.operation_target_column]
        this.columns = new_columns
    }

    handleGroupBy (topic, message) {  //handle with notice

        //topic: groupBy
        //message: table
        this.table = message
        this.toDataFrame()
        this.df.print()
        this.file_id = message.file_id
        let validator = new ValidateGroupBy()
        let result = validator.validate(this.columns, this.group_by_target_column, this.operation_target_column, this.operation)
        if(result.isValid){
            this.groupBy()
            this.toJson()
            this._notify('groupby_result', this.table)
            this.status = true
            this.df.print()
        } else {
            this.status = false
            this._notify('groupByError', result.result)
        }

    }
}


Oid.component(
{
  id: 'ts:transGroupBy',
  element: 'groupby-oid',
  properties: {
    operation: {default: null},
    group_by_target_column: {default: null},
    operation_target_column: {default: null},
    result_column: {default: null},
  },
  receive: {groupby: 'handleGroupBy'},
  implementation: GroupByWeb
})