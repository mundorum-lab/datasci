import { Oid } from '/lib/oidlib-dev.js'
import { ValidateUnique } from './validateUnique.js'
import { TransformWeb } from '../transform.js'

export class UniqueWeb extends TransformWeb {

    constructor() {
        super()
        this.column = null
    }

    unique(){
        this.value = this.df.column(this.column).nUnique()
        let json = this.toSingleValue(this.value)
        this.status = true
        console.log(this.value, this.status)
        this._notify('uniqueResult', json)
    }
    
    handleUnique (topic, message) {  //handle with notice
        
        //topic: unique
        //message: uniqueInput
        this.table = message
        this.toDataFrame()

        let validator = new ValidateUnique()
        let result = validator.validate(this.columns, this.column)
        if(result.isValid){
            this.unique()
        } else {
            //return error message
            this.status = false
            this._notify('uniqueError', result.result)
        }

    }

}

Oid.component(
{
  id: 'ts:unique',
  element: 'unique-oid',
  properties: {
    column: {default: null},
  },
  receive: {unique: 'handleUnique'},
  implementation: UniqueWeb
})