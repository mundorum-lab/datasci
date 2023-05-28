import { Oid } from '/lib/oidlib-dev.js'
import { validate } from './validateFilter.js'
import { TransformWeb } from '../transform.js'
import { log, pow } from 'mathjs'

export class ColumnOpWeb extends TransformWeb {

    operation(){
        if(operation=="+"){
            let newCol = this.dataFrame[this.column1] + this.dataFrame[this.column2];
            this.dataFrame = this.dataFrame.set(this.resultColumn, newCol);
        }
        if(operation=="-"){
            let newCol = this.dataFrame[this.column1] - this.dataFrame[this.column2];
            this.dataFrame = this.dataFrame.set(this.resultColumn, newCol);
        }
        if(operation=="*"){
            let newCol = this.dataFrame[this.column1] * this.dataFrame[this.column2];
            this.dataFrame = this.dataFrame.set(this.resultColumn, newCol);
        }
        if(operation=="/"){
            let newCol = this.dataFrame[this.column1] / this.dataFrame[this.column2];
            this.dataFrame = this.dataFrame.set(this.resultColumn, newCol);
        }
        if(operation=="^"){
            if(column2){
                let newCol = pow(this.dataFrame[this.column1], this.dataFrame[this.column2]);
                this.dataFrame = this.dataFrame.set(this.resultColumn, newCol);
            }
            else{
                let newCol = pow(this.dataFrame[this.column1], this.constant);
                this.dataFrame = this.dataFrame.set(this.resultColumn, newCol);

            }
        }

        if(operation == "log"){
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

    columnOp(){
        this.newDataFrame = operation(this.operation, this.column1, this.column2, this.resultColumn)
        let json = this.toJson(this.newDataFrame, this.file_id)
        this.status = true
        this._notify('columnOpResult', json)
    }

    handleFilter (topic, message) {  //handle with notice
        
        //topic: columnOp
        //message: columnOpInput
 
        this.dataFrame = this.toDataFrame(message.table.data)        //TODO add this as non-oid attributes
        this.file_id = message.table.file_id
        this.columns = message.table.columns
        this.operation = message.operation
        this.column1 = message.column1
        this.column2 = message.column2
        this.constant = message.constant
        this.resultColumn = message.resultColumn


        result = validate(this.operation, this.columns, this.column1, this.column2, this.constant)
        if(result.isValid){
            this.columnOp()
        } else {
            //return error message
            this.status = false
            this._notify('columnOpError', result.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transColumnOp',
  element: 'columnOp',
  properties: {
    status: {default: false},
    name: {default: "ColumnOp"},
    type: {default: "Transformação"},
  },
  receive: {columnOp: 'handleColumnOp'},
  /*template: html``,*/
  implementation: columnOpWeb
})