import {html, Oid, OidUI} from '/lib/oidlib-dev.js'
import kmeans from './kmeans.js'

export class ApplyCluster extends OidUI {

  connectedCallback () {
    super.connectedCallback()
    this.result = "[Cluster Result]"
  }
  applyCluster (topic, message) {
    let columns = [...message.columns]
    let data = JSON.parse(JSON.stringify(message.data));
    let res = kmeans(data, message.num_clusters?message.num_clusters:this.num_clusters)
    let centroids = res.centroids
    let clusters = res.clusters

    for (let j = 1; j <= clusters.length; j++) {
      //this.result += "<br></br>Cluster " + j + ":     "
      for (let i = 0; i < clusters[j-1].points.length; i++) {
        clusters[j-1].points[i].push(j);
      }
      //this.result += clusters[j-1].points
    }
    
    columns.push({"name": "category", "type": "num"})
    for (let i = 0; i < centroids.length; i++) {
      data.push([centroids[i][0], centroids[i][1], 0])
    }
    let final = {
      "columns" : columns,
      "data" : data
    }

    this.result = "Output: <br></br> " + JSON.stringify(final, false, "\t");
    this._notify('transformed', {data: final.data, columns: final.columns});
  }
}

Oid.component(
{
  id: 'ml:apply-cluster',
  element: 'ml-apply-cluster',
  properties: {
    data: {},
    num_clusters: {default: 2},
    columns: {},
    result: {}
  },
  receive: {transform: 'applyCluster'},
  template: html`<h1>{{this.result}}</h1>`,
  implementation: ApplyCluster
})
