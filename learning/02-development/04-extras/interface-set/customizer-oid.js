import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class CustomizerOid extends OidUI {
  _onClick () {
    this._invoke('itf:oid', 'set',
      {property: 'char', value: '*'})
    this._invoke('itf:oid', 'set',
      {property: 'size', value: '10'})
  }
}

Oid.component(
{
  id: 'ex:customizer',
  element: 'customizer-oid',
  template: html`<h1 @click>Click to customize char * and size 10</h1>`,
  implementation: CustomizerOid
})