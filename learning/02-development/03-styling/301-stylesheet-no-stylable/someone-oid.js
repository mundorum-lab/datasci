import { html, css, Oid, OidUI } from '/lib/oidlib-dev.js'

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
  // there is a global inherited stylesheet ['default.css']
  // this stylesheet defines classes btn and btn-primary
  stylable: false, // precedence for the local style
  styles: css`.btn-primary {
    color: lightsalmon;
  }`,
  template: html`<button class="btn btn-primary" @click>I am {{this.name}}</button>`,
  implementation: SomeoneOid
})