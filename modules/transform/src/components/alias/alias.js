import { Oid } from '/lib/oidlib-dev.js'
import { ValidateAlias } from './validateAlias.js'
import { TransformWeb } from '../transform.js'


export class AliasWeb extends TransformWeb {

    rename(){
        let old = this.old
        this.df.rename({ [old]: this.new }, { inplace: true })
        
        console.log(this.df)
    }

    alias(){
        
        this.rename()
        let json = this.toJson(this.df, this.file_id)
        this.status = true
        this._notify('aliasResult', json)
    }

    handleAlias (topic, message) {  //handle with notice
        
        
        this.table = message     
        this.file_id = this.table.file_id
        this.columns = this.table.columns
        this.toDataFrame()  
        
        

        let validator = new ValidateAlias()
        let result = validator.validate(this.columns, this.old)
        console.log(result)
        if(result.isValid){
            this.alias()
        } else {
            //return error message
            this.status = false
            this._notify('aliasError', result.result)
        }

    }

}

Oid.component(
{
  id: 'ts:alias',
  element: 'alias-oid',
  properties: {
    old: {default: null},
    new: {default: null},
  },
  receive: {alias: 'handleAlias'},
  /*template: html``,*/
  implementation: AliasWeb
})