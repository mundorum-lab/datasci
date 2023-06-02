import { Oid } from '/lib/oidlib-dev.js'
import { ValidateMinimum } from './validateMinimum.js'
import { TransformWeb } from '../transform.js'

export class MinimumWeb extends TransformWeb {

    constructor() {
        super()
    }

    minimum(){
        this.value = this.df.column(this.column).min()
        this.json_result = this.toSingleValue(this.value)
        this.status = true
        console.log(this.value, this.status)
        this._notify('minimumResult', this.json_result)
    }
    
    handleMinimum (topic, message) {  //handle with notice
        
        //topic: minimum
        //message: minimumInput
        this.table = message
        this.toDataFrame()

        let validator = new ValidateMinimum()
        let result = validator.validate(this.columns, this.column)
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
  element: 'minimum-data',
  properties: {
    column: {default: null},
    json_result: {default: null},
  },
  receive: {minimum: 'handleMinimum'},
  implementation: MinimumWeb
})