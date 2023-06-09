import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ClusterOid extends OidUI {
  _onClick () {
    this._notify('click', {data: this.data, num_clusters: this.num_clusters, columns: this.columns})
  }
}

Oid.component(
    {
      id: 'ml:cluster',
      element: 'ml-cluster-oid',
      properties: {
        columns: {default: [{"name":"x", "type": "num"},
                            {"name":"y", "type": "num"}]},
        data: {default:[[4, 21], [5, 19], [10, 24], [4, 17], [3, 16], [11, 25], [14, 24], [6, 22], [10, 21], [12, 21]]},
        num_clusters: {default: 2}
      },
      template: html`Input:<br></br> { "columns": [ { "x" : "number" }, { "y" : "number"} ], "data" : [ [ 4, 21 ], [ 5, 19 ], [ 10, 24 ], [ 4, 17 ], [ 3, 16 ], [ 11, 25 ], [ 14, 24 ], [ 6, 22 ], [ 10, 21 ], [ 12, 21 ] ], "num_clusters" : {{this.num_clusters}} } <br></br><h1 @click>Apply Cluster with {{this.num_clusters}} clusters<br></br></h1>`,
      implementation: ClusterOid
    })
