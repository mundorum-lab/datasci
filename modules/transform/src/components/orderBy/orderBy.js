import { Oid } from '/lib/oidlib-dev.js'
import { validate } from './validateFilter.js'
import { TransformWeb } from '../transform.js'
import * as dfd from "danfojs-node"

export class OrderByWeb extends TransformWeb {

    orderBy(){
        let newDF = dfd.DataFrame(this.dataFrame);
        newDF = newDF.sortValues(this.columns, { ascending: this.order });
        let json = this.toJson(newDF, this.file_id)
        this.status = true
        this._notify('orderByResult', json)
    }

    handleOrderBy (topic, message) {  //handle with notice
        
        //topic: orderBy
        //message: orderByInput
 
        this.dataFrame = this.toDataFrame(message.table.data)        //TODO add this as non-oid attributes
        this.file_id = message.table.file_id
        this.columns = message.table.columns
        this.column = message.column
        this.order = message.order

        result = validate(this.columns, this.column)
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
  id: 'ts:orderBy',
  element: 'order-by',
  properties: {
    status: {default: false},
    name: {default: "OrderBy"},
    type: {default: "Transformação"},
  },
  receive: {deleteColumn: 'handleOrderBy'},
  /*template: html``,*/
  implementation: OrderByWeb
})