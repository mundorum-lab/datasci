import {html, Oid, OidUI} from '/lib/oidlib-dev.js'
import kmeans from './kmeans.js'

export class ApplyCluster extends OidUI {

  connectedCallback () {
    super.connectedCallback()
    this.result = "[Cluster Result]"
  }
  applyCluster (topic, message) {
    let res = kmeans(message.data, message.num_cluster).centroids
    this.result = res
  }
}

Oid.component(
{
  id: 'ml:apply-cluster',
  element: 'ml-apply-cluster',
  properties: {
    data: {},
    num_cluster: {default: 2},
    result: {}
  },
  receive: {transform: 'applyCluster'},
  template: html`<h1>{{this.result}}</h1>`,
  implementation: ApplyCluster
})
