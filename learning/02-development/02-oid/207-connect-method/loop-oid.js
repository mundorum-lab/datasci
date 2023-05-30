import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class LoopOid extends OidUI {
  async connectionReady(cInterface, id, component) {
    super.connectionReady(cInterface, id, component)
    this.loop = await this._invoke('itf:iterate', 'first') + '<br>'
  }

  async _onClick () {
    this.loop += await this._invoke('itf:iterate', 'next') + '<br>'
  }
}

Oid.component(
{
  id: 'ex:loop',
  element: 'loop-oid',
  properties: {
    title: {default: 'Loop'},
    loop: {default: 0}
  },
  template: html`
  <h1 @click>{{this.title}}</h1>
  <div>{{this.loop}}</div>`,
  implementation: LoopOid
})