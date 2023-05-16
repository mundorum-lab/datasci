import { Oid } from '/lib/oidlib-dev.js'
import { validate } from './validateFilter.js'
import { TransformWeb } from '../transform.js'
import * as dfd from "danfojs-node"

export class ColumnDeleteWeb extends TransformWeb {

    deleteCol(){
        let newDF = dfd.DataFrame(this.dataFrame)
        this.dataFrame = newDF.drop({columns: [column]}, axis=1, inplace=true);
        let json = this.toJson(this.newDataFrame, this.file_id)
        this.status = true
        this._notify('deleteColumnResult', json)
    }

    handleDeleteColumn (topic, message) {  //handle with notice
        
        //topic: deleteColumn
        //message: deleteColumnInput
 
        this.dataFrame = this.toDataFrame(message.table.data)        //TODO add this as non-oid attributes
        this.file_id = message.table.file_id
        this.columns = message.table.columns
        this.column = message.column

        result = validate(this.columns, this.column)
        if(result.isValid){
            this.deleteCol()
        } else {
            //return error message
            this.status = false
            this._notify('deleteColumnError', result.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transDeleteColumn',
  element: 'delete-column',
  properties: {
    status: {default: false},
    name: {default: "DeleteColumn"},
    type: {default: "Transformação"},
  },
  receive: {deleteColumn: 'handleDeleteColumn'},
  /*template: html``,*/
  implementation: ColumnDeleteWeb
})