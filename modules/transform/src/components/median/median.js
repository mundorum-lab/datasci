import { Oid } from '/lib/oidlib-dev.js'
import { validate } from './validateMaximum.js'
import { TransformWeb } from '../transform.js'

export class MedianWeb extends TransformWeb {

    median(){
        this.value = this.dataFrame.median()[this.column]
        let json = this.toSingleValue(this.value)
        this.status = true
        this._notify('medianResult', json)
    }

    handleMedian (topic, message) {  //handle with notice
        
        //topic: median
        //message: medianInput
 
        this.toDataFrame(message)        //TODO add this as non-oid attributes
        this.file_id = message.file_id
        this.column = message.column

        result = validate(this.columns, this.column)
        if(result.isValid){
            this.median()
        } else {
            //return error message
            this.status = false
            this._notify('medianError', result.result)
        }
    }
}

Oid.component(
{
  id: 'ts:transMedian',
  element: 'median',
  properties: {
    status: {default: false},
    name: {default: "Mediana"},
    type: {default: "Transformação"},
  },
  receive: {maximum: 'handleMedian'},
  /*template: html``,*/
  implementation: MedianWeb
})