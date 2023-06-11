import { Oid } from '/lib/oidlib-dev.js'
import { ValidateMinimum } from './validateMinimum.js'
import { TransformWeb } from '../transform.js'

export class MinimumWeb extends TransformWeb {

    constructor() {
        super()
    }

    minimum(){
        this.value = this.df.column(this.column).min()
        this.toSingleValue(this.value,"Mínimo",this.column)
        this.status = true
        console.log(this.value, this.status)
        this._notify('minimumResult', this.result)
    }
    
    handleMinimum (topic, message) {  //handle with notice
        
        //topic: minimum
        //message: minimumInput
        if(message.hasOwnProperty("value")){
            this.table = JSON.parse(message.value)
        } else {
            this.table = message
        }
        this.toDataFrame()

        let validator = new ValidateMinimum()
        let validation = validator.validate(this.columns, this.column)
        if(validation.isValid){
            this.minimum()
        } else {
            //return error message
            this.status = false
            this._notify('minimumError', validation.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transMinimum',
  element: 'minimum-oid',
  properties: {
    column: {default: null},
    json_result: {default: null},
  },
  receive: {minimum: 'handleMinimum'},
  implementation: MinimumWeb
})