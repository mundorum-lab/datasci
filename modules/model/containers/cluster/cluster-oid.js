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
        data: {default:[[1, 1, 1],
                        [1, 2, 1],
                        [-1,-1,-1],
                        [-1,-1,-1.5],
                        [-1,-1,-1.5]]},
        num_cluster: {default: 2}
      },
      template: html`<h1 @click>Apply Cluster with {{this.num_cluster}} clusters</h1>`,
      implementation: ClusterOid
    })
