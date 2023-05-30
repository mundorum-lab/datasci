import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ClusterOid extends OidUI {
  _onClick () {
    this._notify('click', {data: this.data, num_cluster: this.num_cluster})
  }
}

Oid.component(
    {
      id: 'ml:cluster',
      element: 'ml-cluster-oid',
      properties: {
        data: {default:[[4, 21], [5, 19], [10, 24], [4, 17], [3, 16], [11, 25], [14, 24], [6, 22], [10, 21], [12, 21]]},
        num_cluster: {default: 2}
      },
      template: html`<h1 @click>Apply Cluster with {{this.num_cluster}} clusters</h1>`,
      implementation: ClusterOid
    })
