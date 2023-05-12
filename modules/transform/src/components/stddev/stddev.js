import { Oid } from '/lib/oidlib-dev.js'
import { validate } from './validateMaximum.js'
import { TransformWeb } from '../transform.js'

export class StddevWeb extends TransformWeb {

    stddev(){
        this.value = this.dataFrame.std()[this.column]
        let json = this.toSingleValue(this.value)
        this.status = true
        this._notify('stddevResult', json)
    }

    handleStddev (topic, message) {  //handle with notice
        
        //topic: stddev
        //message: stddevInput
 
        this.toDataFrame(message)        //TODO add this as non-oid attributes
        this.file_id = message.file_id
        this.operation = message.operation
        this.column = message.column

        result = validate(this.columns, this.column)
        if(result.isValid){
            this.stddev()
        } else {
            //return error message
            this.status = false
            this._notify('stddevError', result.result)
        }
    }
}

Oid.component(
{
  id: 'ts:transStddev',
  element: 'stddev',
  properties: {
    status: {default: false},
    name: {default: "Desvio Padrão"},
    type: {default: "Transformação"},
  },
  receive: {maximum: 'handleStddev'},
  /*template: html``,*/
  implementation: StddevWeb
})