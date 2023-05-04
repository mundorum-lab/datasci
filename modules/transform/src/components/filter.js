import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import {Series, DataFrame} from 'pandas-js'

export class FilterOid extends OidUI {
    getColumns(jsonColums){

    }
    getDF(){
        
    }
    filter(message){

    }
    handleFilter (topic, message) {  //handle with notice
        //topic: filter
        //message> filterInput
        
        //set properties: columns, df

        result = validateFilter(message)
        if(result.isValid){
            this.filter(message)
        } else {
            //return error message -> result
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
  /*template: html`<h1>Hello, {{this.name}}</h1>`,*/
  implementation: FilterOid
})




export class SomeoneOid extends OidUI {
  _tellName () {
    this._notify('click', {value: this.name})
  }
}

Oid.component(
{
  id: 'ex:someone',
  element: 'someone-oid',
  properties: {
    name: {default: 'nobody'}
  },
  template: html`<h1 @click={{this._tellName}}>I am {{this.name}}</h1>`,
  implementation: SomeoneOid
})