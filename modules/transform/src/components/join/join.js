import { Oid } from '/lib/oidlib-dev.js'
import { ValidateJoin } from './validateJoin'
import { TransformWeb } from '../transform.js'


export class JoinWeb extends TransformWeb {

    mergeTables(){
        let merge_df = dfd.merge({ "left": this.df, "right": this.second_table, "on": [this.on], how: this.how})
        this.df = merge_df
    }

    join(){
        
        this.mergeTables()
        let json = this.toJson(this.df, this.file_id)
        this.status = true
        this._notify('joinResult', json)
    }

    handleJoin (topic, message) {  //handle with notice
        
        
        this.table = message 
        //this.second_table = ???    
        this.file_id = this.table.file_id
        this.columns = this.table.columns
        this.toDataFrame()  
        
        

        let validator = new ValidateJoin()
        let result = validator.validate(this.columns, this.columns, this.table,this.second_table)
        console.log(result)
        if(result.isValid){
            this.join()
        } else {
            //return error message
            this.status = false
            this._notify('joinError', result.result)
        }

    }

}

Oid.component(
{
  id: 'ts:join',
  element: 'join-oid',
  properties: {
    on: {default: null},
    how: {default: 'inner'},
  },
  receive: {alias: 'handleJoin'},
  /*template: html``,*/
  implementation: JoinWeb
})