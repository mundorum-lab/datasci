import { html, Oid, OidUI  } from '/lib/oidlib-dev.js'

export class Clusterize extends OidUI {
  applyCluster (topic, message) {
    this.table = message.value
    
    // When operation is done, publish the data
    this._notify('transform', {value: this.table})
  }
}

Oid.component(
{
  id: 'transform:cluster',
  element: 'transformation-cluster',
  properties: {
    name: {default: 'transform'}
  },
  receive: {'transform': 'applyCluster'},
  template: html`<h1>Hello, {{this.name}}</h1>`,
  implementation: Clusterize
})