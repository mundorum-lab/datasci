import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class SomeoneOid extends OidUI {
  _onClick () {
    this._invoke('itf:transfer', 'send', {value: this.name})
  }
}

Oid.component(
{
  id: 'ex:someone',
  element: 'someone-oid',
  properties: {
    name: {default: 'nobody'}
  },
  template: html`<h1 @click>I am {{this.name}}</h1>`,
  implementation: SomeoneOid
})