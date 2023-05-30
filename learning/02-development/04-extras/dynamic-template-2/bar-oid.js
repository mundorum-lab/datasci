import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class BarOid extends OidUI {
  template () {
    return html`${this.char.repeat(this.size)}`
  }
}

Oid.component(
{
  id: 'ex:bar',
  element: 'bar-oid',
  properties: {
    char: {default: '-'},
    size: {default: '10'}
  },
  implementation: BarOid
})