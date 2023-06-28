import { Oid } from '/lib/oidlib-dev.js'
import { ValidateJoin } from './validateJoin.js'
import { TransformWeb } from '../transform.js'


export class JoinWeb extends TransformWeb {

    mergeTables(){
        let merge_df = dfd.merge({ "left": this.df, "right": this.df_2, "on": [this.on], how: this.how})
        this.df = merge_df

    }

    join(){
        
        this.mergeTables()
        let json = this.toJson(this.df, this.file_id)
        this.status = true
        this._notify('joinResult', json)
    }

    second_df(){
        let number_of_columns = this.second_table.columns.length
        let columns = {}
        let columns_arr = []
        for(let i = 0; i<number_of_columns; i++){
            columns[this.second_table.columns[i].name] = this.second_table.columns[i].type
            columns_arr.push(this.second_table.columns[i].name)
        }
        this.df_2 = new this.dfd.DataFrame(this.second_table.data, {columns: columns_arr})
        this.columns_2 = columns
    }

    handleJoin (topic, message) {  //handle with notice
        
        
        if(!this.table.hasOwnProperty("data") || !this.table.hasOwnProperty("columns")){ //if no table has called join
            this.table = message 
            this.file_id = this.table.file_id
            this.columns = this.table.columns
            this.toDataFrame() 
        }
        else{  //if 1 table has already called join
            this.second_table = message    
            this.file_id_2 = this.second_table.file_id
            this.columns_2 = this.second_table.columns
            this.second_df()  
        }
        console.log(this.on)
        
        let validator = new ValidateJoin()
        let result = validator.validate(this.columns, this.columns_2, this.on, this.table,this.second_table)
        console.log(result)
        if(result.isValid){
            console.log("chega aaqui")
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
  receive: {join: 'handleJoin'},
  implementation: JoinWeb
})