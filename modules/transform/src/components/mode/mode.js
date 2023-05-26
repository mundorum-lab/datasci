import { Oid } from '/lib/oidlib-dev.js'
import { ValidateMode } from './validateMode.js'
import { TransformWeb } from '../transform.js'

export class ModeWeb extends TransformWeb {

    constructor(){
        super()
    }
    
    // Função para calcular a moda
    calcular_moda(arr) {
        let frequencia = {}
        let moda = []
        let maxFrequencia = 0
        
        for (let i = 0; i < arr.length; i++) {
            const valor = arr[i]
            frequencia[valor] = (frequencia[valor] || 0) + 1
    
            if (frequencia[valor] > maxFrequencia) {
                maxFrequencia = frequencia[valor];
            }
        }
    
        for (const valor in frequencia) {
            if (frequencia[valor] === maxFrequencia) {
                moda.push(Number(valor))
            }
        }
    
        return moda
    }


    mode(){
        this.value = this.calcular_moda(this.df.column(this.column).values)
        let json = this.toSingleValue(this.value)
        this.status = true
        this._notify('modeResult', json)
    }

    handleMode (topic, message) {  //handle with notice
        
        //topic: mode
        //message: modeInput
 
        this.table = message.table
        this.toDataFrame()        //TODO add this as non-oid attributes
        this.file_id = message.file_id
        this.column = message.column

        let validator = new ValidateMode()
        
        let result = validator.validate(this.columns, this.column)
        if(result.isValid){
            this.mode()
        } else {
            //return error message
            this.status = false
            this._notify('modeError', result.result)
        }
    }
    
}

Oid.component(
{
  id: 'ts:transMode',
  element: 'mode-data',
  properties: {
  },
  receive: {mode: 'handleMode'},
  implementation: ModeWeb
})