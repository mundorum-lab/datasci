import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class TypeInputOid extends OidUI {
  receiveTypes (topic, message) {
    this.column_types = message["column_types"]
  }
}

Oid.component(
{
  id: 'ex:typeinput',
  element: 'type-input',
  properties: {
    column_types: {default: ''},
  },
  receive: {data: 'receiveTypes'},
  
  implementation: TypeInputOid
})