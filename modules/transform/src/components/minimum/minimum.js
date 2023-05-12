import { Oid } from '/lib/oidlib-dev.js'
import { validate } from './validateMinimum.js'
import { TransformWeb } from '../transform.js'

export class MinimumWeb extends TransformWeb {

    minimum(){
        this.value = this.dataFrame.min(this.column)
        let json = this.toSingleValue(this.value)
        this.status = true
        this._notify('minimumResult', json)
    }

    handleMinimum (topic, message) {  //handle with notice
        
        //topic: minimum
        //message: minimumInput
 
        this.toDataFrame(message)        //TODO add this as non-oid attributes
        this.file_id = message.file_id
        this.operation = message.operation
        this.column = message.column

        result = validate(this.columns, this.column)
        if(result.isValid){
            this.minimum()
        } else {
            //return error message
            this.status = false
            this._notify('minimumError', result.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transMinimum',
  element: 'minimum',
  properties: {
    status: {default: false},
    name: {default: "Mínimo"},
    type: {default: "Transformação"},
  },
  receive: {minimum: 'handleMinimum'},
  /*template: html``,*/
  implementation: MinimumWeb
})