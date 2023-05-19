import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class LoopOid extends OidUI {
  async connectionReady(cInterface, id, component) {
    super.connectionReady(cInterface, id, component)
    this.loop = await this._invoke('itf:iterate', 'first') + '<br>'
    this.render()
  }

  async _onClick () {
    this.loop += await this._invoke('itf:iterate', 'next') + '<br>'
    this.render()
  }
}

Oid.component(
{
  id: 'ex:loop',
  element: 'loop-oid',
  properties: {
    title: {default: 'Loop'},
  },
  template: html`
  <h1 @click>{{this.title}}</h1>
  <div>{{this.loop}}</div>`,
  implementation: LoopOid
})