import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class IncreaseOid extends OidUI {
  _increaseNow () {
    this._notify('clicked', {rate: this.rate})
  }
}

Oid.component(
{
  id: 'at3:increase',
  element: 'increase-oid',
  properties: {
    rate: {default: '0'}
  },
  template: html`<h1 @click={{this._increaseNow}}>Increase {{this.rate}}</h1>`,
  implementation: IncreaseOid
})