import { Oid } from '/lib/oidlib-dev.js'
import { ValidateOrderBy } from './validateOrderBy.js'
import { TransformWeb } from '../transform.js'

export class OrderByWeb extends TransformWeb {

    constructor(){
        super()
    }

    orderBy(){
        this.ascending = this.ascending == true
        console.log(typeof(this.ascending))
        this.df = this.df.sortValues(this.column, { ascending: this.ascending });
        let json = this.toJson(this.df, this.file_id)
        this.status = true
        console.log(this.df)
        this._notify('orderByResult', json)
    }

    handleOrderBy (topic, message) {  //handle with notice


        this.table = message
        console.log(this.table)

        this.columns = this.table.columns
        this.file_id = this.table.file_id
        this.toDataFrame()  
        let validator = new ValidateOrderBy()

        let result = validator.validate(this.columns, this.column)
        console.log("resultado da validação:",result)
        if(result.isValid){
            this.orderBy()
        } else {
            //return error message
            this.status = false
            this._notify('orderByError', result.result)
        }

    }
        

}

Oid.component(
{
  id: 'ts:orderby',
  element: 'orderby-oid',
  properties: {
    column: {default: null},
    ascending: {default: true},
  },
  receive: {OrderBy: 'handleOrderBy'},
  /*template: html``,*/
  implementation: OrderByWeb
})