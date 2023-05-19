import { Oid } from '/lib/oidlib-dev.js'
import { validate } from './validateMaximum.js'
import { TransformWeb } from '../transform.js'

export class MeanWeb extends TransformWeb {

    mean(){
        this.value = this.dataFrame.mean()[this.column]
        let json = this.toSingleValue(this.value)
        this.status = true
        this._notify('meanResult', json)
    }

    handleMean (topic, message) {  //handle with notice
        
        //topic: mean
        //message: meanInput
 
        this.toDataFrame(message)        //TODO add this as non-oid attributes
        this.file_id = message.file_id
        this.column = message.column

        result = validate(this.columns, this.column)
        if(result.isValid){
            this.mean()
        } else {
            //return error message
            this.status = false
            this._notify('meanError', result.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transMean',
  element: 'mean',
  properties: {
    status: {default: false},
    name: {default: "Média"},
    type: {default: "Transformação"},
  },
  receive: {maximum: 'handleMean'},
  /*template: html``,*/
  implementation: MeanWeb
})