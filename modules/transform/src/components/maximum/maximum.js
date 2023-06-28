import { Oid } from '/lib/oidlib-dev.js'
import { ValidateMaximum } from './validateMaximum.js'
import { TransformWeb } from '../transform.js'

export class MaximumWeb extends TransformWeb {

    maximum(){
        this.value = this.df.column(this.column).max()
        this.toSingleValue(this.value, "Máximo", this.column)
        this.status = true
        this._notify('maximumResult', this.result)
    }
    
    handleMaximum (topic, message) {  
    
        if(message.hasOwnProperty("value")){
            this.table = JSON.parse(message.value)
        } else {
            this.table = message
        }
        this.toDataFrame()

        let validator = new ValidateMaximum()
        let validation = validator.validate(this.columns, this.column)
        if(validation.isValid){
            this.maximum()
        } else {
            this.status = false
            this._notify('maximumError', validation.result)
        }

    }

}

Oid.component(
{
  id: 'ts:maximum',
  element: 'maximum-oid',
  properties: {
    column: {default: null},
  },
  receive: {maximum: 'handleMaximum'},
  implementation: MaximumWeb
})