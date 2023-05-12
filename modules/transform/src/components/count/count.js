import { Oid } from '/lib/oidlib-dev.js'
import { validate } from './validateCount.js'
import { TransformWeb } from '../transform.js'

export class CountWeb extends TransformWeb {

    count(){
        this.value = this.dataFrame.get(this.column).valueCounts().get(this.countValue)
        let json = this.toSingleValue(this.value)
        this.status = true
        this._notify('countResult', json)
    }

    handleCount (topic, message) {  //handle with notice
        
        //topic: count
        //message: countInput
 
        this.toDataFrame(message)        //TODO add this as non-oid attributes
        this.file_id = message.file_id
        this.operation = message.operation
        this.column = message.column
        this.countValue = message.countValue

        let result = validate(this.columns, this.column)
        if(result.isValid){
            this.count()
        } else {
            //return error message
            this.status = false
            this._notify('countError', result.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transCount',
  element: 'count',
  properties: {
    status: {default: false},
    name: {default: "Contar"},
    type: {default: "Transformação"},
  },
  receive: {count: 'handleCount'},
  /*template: html``,*/
  implementation: CountWeb
})