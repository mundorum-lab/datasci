import { Oid } from '/lib/oidlib-dev.js'
import { ValidateMaximum } from './validateMaximum.js'
import { TransformWeb } from '../transform.js'

export class MaximumWeb extends TransformWeb {

    constructor() {
        super()
        this.column = null
    }

    maximum(){
        this.value = this.df.column(this.column).max()
        let json = this.toSingleValue(this.value)
        this.status = true
        console.log(this.value, this.status)
        this._notify('maximumResult', json)
    }
    
    handleMaximum (topic, message) {  //handle with notice
        
        //topic: maximum
        //message: maximumInput
        this.table = message
        this.toDataFrame()

        let validator = new ValidateMaximum()
        let result = validator.validate(this.columns, this.column)
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
  id: 'ts:maximum',
  element: 'maximum-oid',
  properties: {
    column: {default: null},
  },
  receive: {maximum: 'handleMaximum'},
  implementation: MaximumWeb
})