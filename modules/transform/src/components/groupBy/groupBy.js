import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import { validate } from './validateGroupBy.js'
/*import {Series, DataFrame} from 'pandas-js' can we use this library?*/

export class GroupByOid extends OidUI {

    groupBy(message){   //perform GroupBy 
        this._notify('filterResult',message)
    }
    handleGroupBy (topic, message) {  //handle with notice
        //topic: groupBy
        //message> groupByInput
        result = validate(message)
        if(result.isValid){
            this.filter(message)
        } else {
            //return error message
            this._notify('groupByError', result.result)
        }
    }
}

Oid.component(
{
  id: 'ts:transGroupBy',
  element: 'groupBy',
  properties: {
    dataFrame: {default: {}},
    columns: {default: []},
    status: {default: false},
    name: {default: "Agrupar por"},
    type: {default: "Transformação"},
  },
  receive: {groupBy: 'handleGroupBy'},
  /*template: html``,*/
  implementation: GroupByOid
})