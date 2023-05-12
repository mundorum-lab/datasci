import { Oid } from '/lib/oidlib-dev.js'
import { validate } from './validateGroupBy.js'
import { TransformWeb } from '../transform.js'
import {Series, DataFrame} from 'pandas-js'

export class GroupByWeb extends TransformWeb {

    groupBy(){   //TODO perform GroupBy 
        new_message = {}
        this._notify('groupByResult', new_message)
    }

    handleGroupBy (topic, message) {  //handle with notice

        //topic: groupBy
        //message: groupByInput

        this.toDataFrame(message)
        this.file_id = message.file_id
        this.operation = message.operation
        this.groupByTargetColumn = message.groupByTargetColumn
        this.operationTargetColumn = message.operationTargetColumn

        result = validate(this.columns, this.groupByTargetColumn, this.operationTargetColumn, this.operation)
        if(result.isValid){
            this.groupBy(message)
        } else {
            this.status = false
            this._notify('groupByError', result.result)
        }

    }
}


Oid.component(
{
  id: 'ts:transGroupBy',
  element: 'groupBy',
  properties: {
    status: {default: false},
    name: {default: "Agrupar linhas"},
    type: {default: "Transformação"},
  },
  receive: {groupBy: 'handleGroupBy'},
  /*template: html``,*/
  implementation: GroupByWeb
})