import { Oid } from '/lib/oidlib-dev.js'
import { validate } from './validateMaximum.js'
import { TransformWeb } from '../transform.js'

export class ModeWeb extends TransformWeb {

    mode(){
        this.value = this.dataFrame.mode()[this.column]
        let json = this.toSingleValue(this.value)
        this.status = true
        this._notify('modeResult', json)
    }

    handleMode (topic, message) {  //handle with notice
        
        //topic: mode
        //message: modeInput
 
        this.toDataFrame(message)        //TODO add this as non-oid attributes
        this.file_id = message.file_id
        this.column = message.column

        result = validate(this.columns, this.column)
        if(result.isValid){
            this.mode()
        } else {
            //return error message
            this.status = false
            this._notify('modeError', result.result)
        }
    }
    
}

Oid.component(
{
  id: 'ts:transMode',
  element: 'mode',
  properties: {
    status: {default: false},
    name: {default: "Moda"},
    type: {default: "Transformação"},
  },
  receive: {maximum: 'handleMode'},
  /*template: html``,*/
  implementation: ModeWeb
})