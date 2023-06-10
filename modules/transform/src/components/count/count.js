import { Oid } from '/lib/oidlib-dev.js'
import { ValidateCount } from './validateCount.js'
import { TransformWeb } from '../transform.js'

export class CountWeb extends TransformWeb {

    count(){
        if(Number(this.count_value)){
            this.count_value = Number(this.count_value)
        }
        this.value = 0;
        for (const item of this.df.column(this.column).values) {
            if (item === this.count_value) this.value ++
        }
        this.toSingleValue(this.value, "Contar", this.column)
        this.status = true
        console.log(this.value, this.status)
        this._notify('countResult', this.result)
    }
    
    handleCount (topic, message) {  //handle with notice
        
        //topic: count
        //message: countInput
        
        if(message.hasOwnProperty("value")){
            this.table = JSON.parse(message.value)
        } else {
            this.table = message
        }
        this.toDataFrame()

        let validator = new ValidateCount()
        let validation = validator.validate(this.columns, this.column)
        if(validation.isValid){
            this.count()
        } else {
            //return error message
            this.status = false
            this._notify('countError', validation.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transCount',
  element: 'count-data',
  properties: {
    column: {default: null},
    count_value: {default: null},
  },
  receive: {count: 'handleCount'},
  implementation: CountWeb
})