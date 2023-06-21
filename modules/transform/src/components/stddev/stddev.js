import { Oid } from '/lib/oidlib-dev.js'
import { ValidateStddev } from './validateStddev.js'
import { TransformWeb } from '../transform.js'

export class StddevWeb extends TransformWeb {

    constructor(){
        super()
    }

    stddev(){
        this.value = this.df.column(this.column).std()
        this.toSingleValue(this.value,"Desvio Padrão",this.column)
        this.status = true
        this._notify('stddevResult', this.result)
    }

    handleStddev (topic, message) {  //handle with notice
        
        //topic: stddev
        //message: stddevInput
        
        if(message.hasOwnProperty("value")){
            this.table = JSON.parse(message.value)
        } else {
            this.table = message
        }
        this.toDataFrame()        //TODO add this as non-oid attributes
        this.file_id = message.file_id

        
        let validator = new ValidateStddev()

        let validation = validator.validate(this.columns, this.column)
        if(validation.isValid){
            this.stddev()
        } else {
            //return error message
            this.status = false
            this._notify('stddevError', validation.result)
        }
    }
}

Oid.component(
{
  id: 'ts:stddev',
  element: 'stddev-oid',
  properties: {
    column: {default: null},
    json_result: {default: null},
  },
  receive: {stddev: 'handleStddev'},
  implementation: StddevWeb
})