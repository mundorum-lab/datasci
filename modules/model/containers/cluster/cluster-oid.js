import {Oid, OidBase} from '/lib/oidlib-dev.js'
import kmeans from './kmeans.js'

export class ApplyCluster extends OidBase {
  applyCluster (topic, message) {
    let columns = [...message.columns]
    let data = JSON.parse(JSON.stringify(message.data));
    let res = kmeans(data, this.num_clusters, this.max_iterations)
    let centroids = res.centroids
    let clusters = res.clusters

    for (let j = 1; j <= clusters.length; j++) {
      for (let i = 0; i < clusters[j-1].points.length; i++) {
        clusters[j-1].points[i].push(j);
      }
    }
    
    columns.push({"name": "category", "type": "num"})
    for (let i = 0; i < centroids.length; i++) {
      data.push([centroids[i][0], centroids[i][1], 0])
    }
    let final = {
      "columns" : columns,
      "data" : data
    }

    this._notify('transformed', {data: final.data, columns: final.columns});
  }
}

Oid.component(
{
  id: 'ml:cluster-oid',
  element: 'ml-cluster-oid',
  properties: {
    num_clusters: {default: 2},
    max_iterations: {default: 50},
    result: {}
  },
  receive: {transform: 'applyCluster'},
  implementation: ApplyCluster
})
