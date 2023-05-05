import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class TypeInputOid extends OidUI {
  receiveData (topic, message) {
    this.treatedData = message

    this._notify('ask_types', {data: message, return_id: this.id})
  }

  receiveTypes (topic, message) {
    this.types = message["types"]

    this._notify('output', {}) // Typed data goes here
  }
}

Oid.component(
{
  id: 'ex:typeinput',
  element: 'type-input',
  properties: {
    id: {}
  },
  receive: {receive_data: 'receiveData', receive_types: 'receiveTypes'},
  
  implementation: TypeInputOid
})