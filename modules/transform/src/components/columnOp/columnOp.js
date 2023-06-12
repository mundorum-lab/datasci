import { Oid } from '/lib/oidlib-dev.js'
import { ValidateColumnOp } from './validateColumnOp.js'
import { TransformWeb } from '../transform.js'

export class ColumnOpWeb extends TransformWeb {

    operation(){
        if(this.op=="+"){
            let newCol = this.df[this.first].add(this.df[this.second]);
            this.df.addColumn(this.result, newCol, { inplace: true });
            this.columns[this.result] = "number"
        }
        if(this.op=="-"){
            let newCol = this.df[this.first].sub(this.df[this.second]);
            this.df.addColumn(this.result, newCol, { inplace: true });
            this.columns[this.result] = "number"
        }
        if(this.op=="*"){
            let newCol = this.df[this.first].mul(this.df[this.second]);
            this.df.addColumn(this.result, newCol, { inplace: true });
            this.columns[this.result] = "number"
        }
        if(this.op=="/"){
            let newCol = this.df[this.first].div(this.df[this.second]);
            this.df.addColumn(this.result, newCol, { inplace: true });
            this.columns[this.result] = "number"
        }
        if(this.op=="^"){
            let newCol = this.df[this.first].pow(this.df[this.second]);
            this.df.addColumn(this.result, newCol, { inplace: true });
            this.columns[this.result] = "number"
        }

    }

    columnOp(){
        this.operation()
        console.log(this.df)
        this.toJson()
        this.status = true
        this._notify('columnOpResult', this.result)
    }

    handleColumnOp(topic, message) {  //handle with notice
        
        if(message.hasOwnProperty("value")){
            this.table = JSON.parse(message.value)
        } else {
            this.table = message
        }

        this.file_id = this.table.file_id
        this.columns = this.table.columns
        console.log(this.columns[this.first])
        this.toDataFrame()  
        
        let validator = new ValidateColumnOp()

        let validation = validator.validate(this.op, this.columns, this.first, this.second)
        console.log("resultado da validação:",validation)
        if(validation.isValid){
            this.columnOp()
        } else {
            //return error message
            this.status = false
            this._notify('columnOpError', validation.result)
        }

    }

}

Oid.component(
{
  id: 'ts:columnOp',
  element: 'column-op-oid',
  properties: {
    first: {default: null},
    second: {default: null},
    op: {default: null},
    result: {default: "Nova Coluna"},
  },
  receive: {columnOp: 'handleColumnOp'},
  /*template: html``,*/
  implementation: ColumnOpWeb
})