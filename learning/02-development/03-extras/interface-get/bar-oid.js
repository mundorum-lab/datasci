import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class BarOid extends OidUI {
  async handleSend (topic, message) {
    this.char = await this._invoke('itf:oid', 'get', {property: 'char'})
    this.size = await this._invoke('itf:oid', 'get', {property: 'size'})
  }

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
    size: {default: '1'}
  },
  provide: ['itf:transfer'],
  implementation: BarOid
})