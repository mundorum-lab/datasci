import { Oid } from '/lib/oidlib-dev.js'
import { ValidateMedian } from './validateMedian.js'
import { TransformWeb } from '../transform.js'

export class MedianWeb extends TransformWeb {

    constructor(){
        super()
    }

    median(){
        this.value = this.df.column(this.column).median()
        this.toSingleValue(this.value,"Mediana",this.column)
        this.status = true
        this._notify('medianResult', this.result)
    }

    handleMedian (topic, message) {  //handle with notice
        
        //topic: median
        //message: medianInput
 
        if(message.hasOwnProperty("value")){
            this.table = JSON.parse(message.value)
        } else {
            this.table = message
        }
        this.toDataFrame()        //TODO add this as non-oid attributes
        this.file_id = message.file_id
        
        let validator = new ValidateMedian()

        let validation = validator.validate(this.columns, this.column)

        if(validation.isValid){
            this.median()
        } else {
            //return error message
            this.status = false
            this._notify('medianError', validation.result)
        }
    }
}

Oid.component(
{
  id: 'ts:median',
  element: 'median-oid',
  properties: {
    column: {default: null},
    json_result: {default: null},
  },
  receive: {median: 'handleMedian'},
  implementation: MedianWeb
})