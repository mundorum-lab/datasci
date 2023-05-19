import { Oid } from '/lib/oidlib-dev.js'
import { validate } from './validateFilter.js'
import { TransformWeb } from '../transform.js'
import { log, pow } from 'mathjs'

export class ColumnOpConstantWeb extends TransformWeb {

    makeOperation(){
        if(this.operation=="+"){
            let newCol = this.dataFrame[this.column1] + this.constant;
            this.dataFrame = this.dataFrame.set(this.resultColumn, newCol);
        }
        if(this.operation=="-"){
            let newCol = this.dataFrame[this.column1] - this.constant;
            this.dataFrame = this.dataFrame.set(this.resultColumn, newCol);
        }
        if(this.operation=="*"){
            let newCol = this.dataFrame[this.column1] * this.constant;
            this.dataFrame = this.dataFrame.set(this.resultColumn, newCol);
        }
        if(this.operation=="/"){
            let newCol = this.dataFrame[this.column1] / this.constant;
            this.dataFrame = this.dataFrame.set(this.resultColumn, newCol);
        }
        if(this.operation=="^"){
                let newCol = pow(this.dataFrame[this.column1], this.constant);
                this.dataFrame = this.dataFrame.set(this.resultColumn, newCol);
            }
        if(this.operation == "log"){
            let newCol = {}
            if(constant){
                newCol = log(this.dataFrame[this.column1])/log(this.constant);

            }
            else{
                newCol = log(this.dataFrame[this.column1]);
            }
            this.dataFrame = this.dataFrame.set(this.resultColumn, newCol);
        }
        return this.dataFrame
    }

    columnOpConstant(){
        this.newDataFrame = operation()
        let json = this.toJson(this.newDataFrame, this.file_id)
        this.status = true
        this._notify('columnOpConstantResult', json)
    }

    handleFilter (topic, message) {  //handle with notice
        
        //topic: columnOp
        //message: columnOpInput
 
        this.dataFrame = this.toDataFrame(message.table.data)        //TODO add this as non-oid attributes
        this.file_id = message.table.file_id
        this.columns = message.table.columns
        this.operation = message.operation
        this.column = message.column
        this.constant = message.constant
        this.resultColumn = message.resultColumn


        result = validate(this.operation, this.columns, this.column, this.constant)
        if(result.isValid){
            this.columnOpConstant()
        } else {
            //return error message
            this.status = false
            this._notify('columnOpConstantError', result.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transColumnOpConstant',
  element: 'column-op-constant',
  properties: {
    status: {default: false},
    name: {default: "ColumnOpConstant"},
    type: {default: "Transformação"},
  },
  receive: {columnOpConstant: 'handleColumnOpConstant'},
  /*template: html``,*/
  implementation: ColumnOpConstantWeb
})