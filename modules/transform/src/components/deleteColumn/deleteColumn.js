import { Oid } from '/lib/oidlib-dev.js'
import { ValidateColumnDelete } from './validateDeleteColumn.js'
import { TransformWeb } from '../transform.js'

export class ColumnDeleteWeb extends TransformWeb {

    constructor(){
        super()
    }

    deleteCol(){
        this.df = this.df.drop({columns: [this.column]});
        delete this.columns[this.column];
        let json = this.toJson(this.df, this.file_id)
        this.status = true
        console.log(this.df)
        this._notify('deleteColumnResult', json)
        
    }

    handleDeleteColumn (topic, message) {  //handle with notice
        
        //topic: deleteColumn
        //message: deleteColumnInput
        this.table = message
        console.log(this.table)

        this.columns = this.table.columns
        this.file_id = this.table.file_id
        this.toDataFrame()  
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
  id: 'ts:deleteColumn',
  element: 'deleteColumn-oid',
  properties: {
    column: {default: null},
  },
  receive: {deleteColumn: 'handleDeleteColumn'},
  /*template: html``,*/
  implementation: ColumnDeleteWeb
})