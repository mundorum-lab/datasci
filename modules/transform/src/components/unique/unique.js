import { Oid } from '/lib/oidlib-dev.js'
import { ValidateUnique } from './validateUnique.js'
import { TransformWeb } from '../transform.js'

export class UniqueWeb extends TransformWeb {

    constructor() {
        super()
    }

    unique(){
        this.value = this.df.column(this.column).nUnique()
        this.toSingleValue(this.value, "Valores Únicos", this.column)
        this.status = true
        console.log(this.value, this.status)
        this._notify('uniqueResult', this.result)
    }
    
    handleUnique (topic, message) {  //handle with notice
        
        //topic: unique
        //message: uniqueInput
        if(message.hasOwnProperty("value")){
            this.table = JSON.parse(message.value)
        } else {
            this.table = message
        }
        this.toDataFrame()

        let validator = new ValidateUnique()
        let validation = validator.validate(this.columns, this.column)
        if(validation.isValid){
            this.unique()
        } else {
            //return error message
            this.status = false
            this._notify('uniqueError', validation.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transUnique',
  element: 'unique-data',
  properties: {
    column: {default: null},
    json_result: {default: null},
  },
  receive: {unique: 'handleUnique'},
  implementation: UniqueWeb
})