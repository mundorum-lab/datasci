import { Oid } from '/lib/oidlib-dev.js'
import { ValidateMean } from './validateMean.js'
import { TransformWeb } from '../transform.js'

export class MeanWeb extends TransformWeb {

    constructor(){
        super()
    }

    mean(){
        this.value = this.df.mean()[this.column]
        let json = this.toSingleValue(this.value)
        this.status = true
        this._notify('meanResult', json)
    }

    handleMean (topic, message) {  //handle with notice
        
        //topic: mean
        //message: meanInput
 
        console.log("chegou mensagem")
        this.table = message.table
        this.toDataFrame(message)        //TODO add this as non-oid attributes
        this.file_id = message.file_id
        this.column = message.column

        let validator = new ValidateMean()

        let result = validator.validate(this.columns, this.column)
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
  },
  receive: {mean: 'handleMean'},
  implementation: MeanWeb
})

