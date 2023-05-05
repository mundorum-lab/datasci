import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ApiInputOid extends OidUI {
  someoneArrives (topic, message) {
    this.url_content = message.value
  }
}

Oid.component(
{
  id: 'ex:apiinput',
  element: 'api-input',
  properties: {
    url_content: {default: ''},
    template: {default: ''}
  },
  receive: {someone: 'someoneArrives'},
  publish: {workflow: data/receiveData},
  
  implementation: ApiInputOid
})