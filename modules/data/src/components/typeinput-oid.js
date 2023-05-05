import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class TypeInputOid extends OidUI {
  someoneArrives (topic, message) {
    this.column_types = message.value
  }
}

Oid.component(
{
  id: 'ex:typeinput',
  element: 'type-input',
  properties: {
    column_types: {default: ''},
    template: {default: ''}
  },
  receive: {someone: 'someoneArrives'},
  subscribe: {workflow: 'type_input'},
  
  implementation: TypeInputOid
})