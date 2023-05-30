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
  // there is a local inherited stylesheet ['local.css']
  // this stylesheet defines a style for <p>
  template: html`<p>Hello, {{this.name}}</p>`,
  implementation: HelloOid
})