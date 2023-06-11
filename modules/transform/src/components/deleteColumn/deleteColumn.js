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
        this.toJson()
        this.status = true
        console.log(this.df)
        this._notify('deleteColumnResult', this.result)
        
    }

    handleDeleteColumn (topic, message) {  //handle with notice
        
        //topic: deleteColumn
        //message: deleteColumnInput
        if(message.hasOwnProperty("value")){
            this.table = JSON.parse(message.value)
        } else {
            this.table = message
        }
        console.log(this.table)

        this.columns = this.table.columns
        this.file_id = this.table.file_id
        this.toDataFrame()  
        let validator = new ValidateColumnDelete()

        let validation = validator.validate(this.columns, this.column)
        console.log("resultado da validação:",validation)
        if(validation.isValid){
            this.deleteCol()
        } else {
            //return error message
            this.status = false
            this._notify('deleteColumnError', validation.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transDeleteColumn',
  element: 'delete-column-oid',
  properties: {
    column: {default: null},
  },
  receive: {deleteColumn: 'handleDeleteColumn'},
  /*template: html``,*/
  implementation: ColumnDeleteWeb
})