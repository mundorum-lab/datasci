import { Oid, OidWeb } from '/lib/oidlib-dev.js'
import { ValidateFilter } from './validateFilter.js'
import { TransformWeb } from '../transform.js'

class FilterWeb extends TransformWeb {

    handleFilter (topic, message) {  //handle with notice
        
        //topic: filter
        //message: filterInput
        console.log("mensagem no tópico filter:",message)
        let ans = this.toDataFrame(message.table)        //TODO add this as non-oid attributes
        console.log(ans)
        /*this.data = message.table.data
        this.file_id = message.file_id
        this.operation = message.operation
        this.targetColumn = message.column
        this.compared = message.comparedValue
        let validator = new ValidateFilter()
        let result = validator.validate(this.columns, this.targetColumn, this.compared, this.operation)
        console.log("resultado da validação:",result)
        if(result.isValid){
            this.filter()
        } else {
            //return error message
            this.status = false
            this._notify('filterError', result.result)
        }*/
    }

    chooseOpAndFilter(){
        let nrows = this.data.length
        let ncols = this.data[0].length
        if(this.operation=="<"){
            for(let i = 0; i<nrows; i++){
                for(let j = 0; j<ncols; j++){
                    if(this.data[i][j]==this.compared){
                        this.new_data.push(this.data[i])
                    }
                }
            }
        }
        if(this.operation=="<="){
            for(let i = 0; i<nrows; i++){
                for(let j = 0; j<ncols; j++){
                    if(this.data[i][j]==this.compared){
                        this.new_data.push(this.data[i])
                    }
                }
            }
        }
        if(this.operation==">"){
            for(let i = 0; i<nrows; i++){
                for(let j = 0; j<ncols; j++){
                    if(this.data[i][j]==this.compared){
                        this.new_data.push(this.data[i])
                    }
                }
            }
        }
        if(this.operation==">="){
            for(let i = 0; i<nrows; i++){
                for(let j = 0; j<ncols; j++){
                    if(this.data[i][j]==this.compared){
                        this.new_data.push(this.data[i])
                    }
                }
            }
        }
        if(this.operation=="=="){
            for(let i = 0; i<nrows; i++){
                for(let j = 0; j<ncols; j++){
                    if(this.data[i][j]==this.compared){
                        this.new_data.push(this.data[i])
                    }
                }
            }
        }
    }

    filter(){
        this.chooseOpAndFilter()
        console.log("resultado do filtro:",this.new_data)
        /*let json = this.toJson(this.newDataFrame, this.file_id)
        this.status = true
        this._notify('filterResult', json)*/
    }

}

Oid.component(
{
  id: 'ts:transFilter',
  element: 'filter-data',
  properties: {
    status: {default: false},
    name: {default: "Filtro"},
    type: {default: "Transformação"},
    columns: {default: {}},
    data: {default: []},
    file_id: {default: ""},
    operation: {default: ""},
    targetColumn:{default: ""},
    compared: {default: ""},
    new_data: {default: []}
  },
  receive: {filter: 'handleFilter'},
  /*template: html``,*/
  implementation: FilterWeb
})