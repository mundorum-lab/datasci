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
        this.toJson()
        this.status = true
        console.log(this.df)
        this._notify('orderByResult', this.result)
    }

    handleOrderBy (topic, message) {  //handle with notice


        if(message.hasOwnProperty("value")){
            this.table = JSON.parse(message.value)
        } else {
            this.table = message
        }
        console.log(this.table)

        this.columns = this.table.columns
        this.file_id = this.table.file_id
        this.toDataFrame()  
        let validator = new ValidateOrderBy()

        let validation = validator.validate(this.columns, this.column)
        console.log("resultado da validação:",validation)
        if(validation.isValid){
            this.orderBy()
        } else {
            //return error message
            this.status = false
            this._notify('orderByError', validation.result)
        }

    }
        

}

Oid.component(
{
  id: 'ts:orderBy',
  element: 'order-by-oid',
  properties: {
    column: {default: null},
    ascending: {default: true},
  },
  receive: {OrderBy: 'handleOrderBy'},
  /*template: html``,*/
  implementation: OrderByWeb
})