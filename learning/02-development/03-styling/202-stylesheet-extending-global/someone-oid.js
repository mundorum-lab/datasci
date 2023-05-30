import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class SomeoneOid extends OidUI {
  _onClick () {
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
  // there is a local inherited stylesheet ['local.css']
  // this stylesheet defines class mybutton
  template: html`<button class="btn btn-primary" @click>I am {{this.name}}</button>`,
  implementation: SomeoneOid
})