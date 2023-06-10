import { Oid } from '/lib/oidlib-dev.js'
import { ValidateZscoreNorm } from './validateZScoreNorm.js'
import { TransformWeb } from '../transform.js'


export class NormalizeWeb extends TransformWeb {

    zscore(){
        let mi =this.df.column(this.column).mean()
        let sigma = this.df.column(this.column).std()

        let newCol = this.df[this.column].sub(mi);
        newCol = newCol.div(sigma)
        this.df[this.column] = newCol
        console.log(this.df)
    

    }

    normalize(){
        
        this.zscore()
        this.toJson()
        this.status = true
        this._notify('normalizeResult', this.result)
    }

    handleNormalize (topic, message) {  //handle with notice
        
        
        this.table = message     
        this.file_id = this.table.file_id
        this.columns = this.table.columns
        this.toDataFrame()  
        
        let validator = new ValidateZscoreNorm()
        let validation = validator.validate(this.columns, this.column)
        console.log(result)
        if(validation.isValid){
            this.normalize()
        } else {
            //return error message
            this.status = false
            this._notify('normalizeError', validation.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transNormalize',
  element: 'normalize-data',
  properties: {
    column: {default: null},
  },
  receive: {normalize: 'handleNormalize'},
  /*template: html``,*/
  implementation: NormalizeWeb
})