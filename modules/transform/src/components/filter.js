import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import { validate } from './validateFilter.js'
/*import {Series, DataFrame} from 'pandas-js' can we use this library?*/

export class FilterOid extends OidUI {
    compare(value, compared,operation){
        if(operation=="<" && value<compared){
            return true
        }
        if(operation=="<=" && value<=compared){
            return true
        }
        if(operation==">" && value<compared){
            return true
        }
        if(operation==">=" && value<compared){
            return true
        }
        if(operation=="=" && value==compared){
            return true
        }
        return false
    }
    filter(message){
        /*change to update params
        let data = {}
        //convert table to DF
        for(let i = 0; i<message.columns.length; i++){
            columns = []
            for(let j = 0; j<message.data.length; j++){
                columns.append(message.data[j][i])
            }
            data[message.columns[i]] =  columns
        }*/
        let idx = 0
        for(let i = 0; i<message.columns.length; i++){
           if(message.columns[i].name==message.column){
                idx = i
                break
           }
        }
        let new_data = []
        for(let i = 0; i<message.data.length; i++){ //rows
            if(compare(message.data[i][idx],message.comparedValue,message.operation)){
                new_data.append(message.data[i])
            }
        }
        message.data = new_data
        this._notify('filterResult',message)
    }
    handleFilter (topic, message) {  //handle with notice
        //topic: filter
        //message> filterInput
        result = validate(message)
        if(result.isValid){
            this.filter(message)
        } else {
            //return error message
            this._notify('filterError', result.result)
        }
    }
}

Oid.component(
{
  id: 'ts:transFilter',
  element: 'filter',
  properties: {
    dataFrame: {default: {}},
    columns: {default: []},
    status: {default: false},
    name: {default: "Filtro"},
    type: {default: "Transformação"},
  },
  receive: {filter: 'handleFilter'},
  /*template: html``,*/
  implementation: FilterOid
})