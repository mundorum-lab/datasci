import { Oid } from '/lib/oidlib-dev.js'
import { ValidateMean } from './validateMean.js'
import { TransformWeb } from '../transform.js'

export class MeanWeb extends TransformWeb {

    constructor(){
        super()
    }

    mean(){
        this.value = this.df.column(this.column).mean()
        this.toSingleValue(this.value,"Média",this.column)
        this.status = true
        this._notify('meanResult', this.result)
    }

    handleMean (topic, message) { 
        
        if(message.hasOwnProperty("value")){
            this.table = JSON.parse(message.value)
        } else {
            this.table = message
        }
        this.toDataFrame()       
        this.file_id = message.file_id

        let validator = new ValidateMean()

        let validation = validator.validate(this.columns, this.column)
        if(validation.isValid){
            this.mean()
        } else {
            this.status = false
            this._notify('meanError', validation.result)
        }

    }

}

Oid.component(
{
  id: 'ts:mean',
  element: 'mean-oid',
  properties: {
    column: {default: null},
  },
  receive: {mean: 'handleMean'},
  implementation: MeanWeb
})

