import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class HelloOid extends OidUI {
  handleSomeone (topic, message) {
    this.name = message.value
  }
}

Oid.component(
{
  id: 'ex:hello',
  element: 'hello-oid',
  properties: {
    name: {default: 'nobody'}
  },
  receive: ['someone'],
  template: html`<h1>Hello, {{this.name}}</h1>`,
  implementation: HelloOid
})