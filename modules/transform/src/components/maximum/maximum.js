import { Oid } from '/lib/oidlib-dev.js'
import { validate } from './validateMaximum.js'
import { TransformWeb } from '../transform.js'

export class MaximumWeb extends TransformWeb {

    maximum(){
        this.value = this.dataFrame.min(this.column)
        let json = this.toSingleValue(this.value)
        this.status = true
        this._notify('maximumResult', json)
    }

    handleMaximum (topic, message) {  //handle with notice
        
        //topic: maximum
        //message: maximumInput
 
        this.toDataFrame(message)        //TODO add this as non-oid attributes
        this.file_id = message.file_id
        this.column = message.column

        let result = validate(this.columns, this.column)
        if(result.isValid){
            this.maximum()
        } else {
            //return error message
            this.status = false
            this._notify('maximumError', result.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transMaximum',
  element: 'maximum',
  properties: {
    status: {default: false},
    name: {default: "Máximo"},
    type: {default: "Transformação"},
  },
  receive: {maximum: 'handleMaximum'},
  /*template: html``,*/
  implementation: MaximumWeb
})