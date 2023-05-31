import { Oid } from '/lib/oidlib-dev.js'
import { ValidateColumnOpConstant } from './validateColumnOpConstant.js'
import { TransformWeb } from '../transform.js'


export class ColumnOpConstantWeb extends TransformWeb {

    logSolve(x){
        return Math.log(x)
    }

    operation(){
        if(this.op=="+"){
            let newCol = this.df[this.column].add(this.constant);
            this.df.addColumn(this.result, newCol, { inplace: true });
            this.columns[this.result] = "number"
        }
        if(this.op=="-"){
            let newCol = this.df[this.column].sub(this.constant);
            this.df.addColumn(this.result, newCol, { inplace: true });
            this.columns[this.result] = "number"
        }
        if(this.op=="*"){
            let newCol = this.df[this.column].mul(this.constant);
            this.df.addColumn(this.result, newCol, { inplace: true });
            this.columns[this.result] = "number"
        }
        if(this.op=="/"){
            let newCol = this.df[this.column].div(this.constant);
            this.df.addColumn(this.result, newCol, { inplace: true });
            this.columns[this.result] = "number"
        }
        if(this.op=="^"){
            let newCol = this.df[this.column].pow(this.constant);
            this.df.addColumn(this.result, newCol, { inplace: true });
            this.columns[this.result] = "number"
        }
        if(this.op=="log"){
            let copy = this.df[this.column]
            copy = copy.apply(this.logSolve)
            copy = copy.div(Math.log(this.constant));
            this.df.addColumn(this.result, copy, { inplace: true }); //copy the column source in the result
            this.columns[this.result] = "number"
            console.log(this.df)
        }
    

    }

    columnOpConstant(){
        
        this.operation()
        let json = this.toJson(this.df, this.file_id)
        this.status = true
        this._notify('columnOpConstantResult', json)
    }

    handleColumnOpConstant (topic, message) {  //handle with notice
        
        
        this.table = message     
        this.file_id = this.table.file_id
        this.columns = this.table.columns
        this.constant = parseInt(this.constant)
        this.toDataFrame()  
        
        

        let validator = new ValidateColumnOpConstant()
        let result = validator.validate(this.op, this.columns, this.column)
        console.log(result)
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
    column: {default: null},
    constant: {default: 0},
    op: {default: null},
    result: {default: "Nova Coluna"},
  },
  receive: {columnOpConstant: 'handleColumnOpConstant'},
  /*template: html``,*/
  implementation: ColumnOpConstantWeb
})