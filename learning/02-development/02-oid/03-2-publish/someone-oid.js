import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

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