import { Oid } from '/lib/oidlib-dev.js'
import { ValidateMedian } from './validateMedian.js'
import { TransformWeb } from '../transform.js'

export class MedianWeb extends TransformWeb {

    constructor(){
        super()
    }

    median(){
        this.value = this.df.column(this.column).median()
        let json = this.toSingleValue(this.value)
        this.status = true
        console.log(this.status, this.value)
        this._notify('medianResult', json)
    }

    handleMedian (topic, message) {  //handle with notice
        
        //topic: median
        //message: medianInput
 
        this.table = message
        this.toDataFrame()        //TODO add this as non-oid attributes
        this.file_id = message.file_id
        console.log("chegou")
        
        let validator = new ValidateMedian()

        let result = validator.validate(this.columns, this.column)

        if(result.isValid){
            this.median()
        } else {
            //return error message
            this.status = false
            this._notify('medianError', result.result)
        }
    }
}

Oid.component(
{
  id: 'ts:transMedian',
  element: 'median-data',
  properties: {
    column: {default: null},
  },
  receive: {median: 'handleMedian'},
  implementation: MedianWeb
})