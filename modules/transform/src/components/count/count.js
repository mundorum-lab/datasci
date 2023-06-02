import { Oid } from '/lib/oidlib-dev.js'
import { ValidateCount } from './validateCount.js'
import { TransformWeb } from '../transform.js'

export class CountWeb extends TransformWeb {

    constructor() {
        super()
        this.column = null
        this.count_value = null
    }

    count(){
        if(Number(this.count_value)){
            this.count_value = Number(this.count_value)
        }
        this.value = 0;
        for (const item of this.df.column(this.column).values) {
            if (item === this.count_value) this.value ++
        }
        let json = this.toSingleValue(this.value)
        this.status = true
        console.log(this.value, this.status)
        this._notify('countResult', json)
    }
    
    handleCount (topic, message) {  //handle with notice
        
        //topic: count
        //message: countInput
        
        this.table = message
        this.toDataFrame()

        let validator = new ValidateCount()
        let result = validator.validate(this.columns, this.column)
        if(result.isValid){
            this.count()
        } else {
            //return error message
            this.status = false
            this._notify('countError', result.result)
        }

    }

}

Oid.component(
{
  id: 'ts:count',
  element: 'count-oid',
  properties: {
    column: {default: null},
    count_value: {default: null},
  },
  receive: {count: 'handleCount'},
  implementation: CountWeb
})