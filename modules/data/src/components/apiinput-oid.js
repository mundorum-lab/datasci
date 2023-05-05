import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ApiInputOid extends OidUI {
  loadApi (topic, message) {
    this.url_content = message["url_content"]

    this._notify('output', {}) // Processed file goes here
  }
}

Oid.component(
{
  id: 'ex:apiinput',
  element: 'api-input',
  properties: {
    id: {}
  },
  receive: {load: 'loadApi'},
  
  implementation: ApiInputOid
})