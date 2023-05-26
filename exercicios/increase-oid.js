import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class IncreaseOid extends OidUI {
  _onClick () {
    this._notify('click', {rate: this.rate})
  }
}

Oid.component(
{
  id: 'ex:increase',
  element: 'increase-oid',
  properties: {
    rate: {default: 5}
  },
  template: html`<h1 @click>Increase {{this.rate}}</h1>`,
  implementation: IncreaseOid
})