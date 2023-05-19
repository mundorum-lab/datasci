import { Oid } from '/lib/oidlib-dev.js'
import { ValidateColumnDelete } from './validateDeleteColumn.js'
import { TransformWeb } from '../transform.js'

export class ColumnDeleteWeb extends TransformWeb {

    constructor(){
        super()
        this.column = null
    }

    deleteCol(){
        this.df = this.df.drop({columns: [this.column]}, axis=1, inplace=true);
        delete this.columns[this.column];
        let json = this.toJson(this.df, this.file_id)
        this.status = true
        this._notify('deleteColumnResult', json)
        
    }

    handleDeleteColumn (topic, message) {  //handle with notice
        
        //topic: deleteColumn
        //message: deleteColumnInput

        let ans = this.toDataFrame(message.table)   
        this.columns = ans.columns
        this.df = ans.df
        this.file_id = message.file_id
        this.targetColumn = message.column
        this.compared = message.comparedValue
        let validator = new ValidateColumnDelete()

        let result = validator.validate(this.columns, this.column)
        console.log("resultado da validação:",result)
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