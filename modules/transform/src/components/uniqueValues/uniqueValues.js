import { Oid } from '/lib/oidlib-dev.js'
import { validate } from './validateUniqueValues.js'
import { TransformWeb } from '../transform.js'

export class UniqueValuesWeb extends TransformWeb {

    uniqueValues(){
        this.value = this.dataFrame.get(this.column).unique().length
        let json = this.toSingleValue(this.value)
        this.status = true
        this._notify('uniqueValuesResult', json)
    }

    handleUniqueValues (topic, message) {  //handle with notice
        
        //topic: uniqueValues
        //message: uniqueValuesInput
 
        this.toDataFrame(message)        //TODO add this as non-oid attributes
        this.file_id = message.file_id
        this.operation = message.operation
        this.column = message.column
        this.uniqueValuesValue = message.uniqueValuesValue

        let result = validate(this.columns, this.column)
        if(result.isValid){
            this.uniqueValues()
        } else {
            //return error message
            this.status = false
            this._notify('uniqueValuesError', result.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transUniqueValues',
  element: 'uniqueValues',
  properties: {
    status: {default: false},
    name: {default: "Valores únicos"},
    type: {default: "Transformação"},
  },
  receive: {uniqueValues: 'handleUniqueValues'},
  /*template: html``,*/
  implementation: UniqueValuesWeb
})