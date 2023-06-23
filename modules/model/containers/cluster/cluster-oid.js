import {Oid, OidBase} from '/lib/oidlib-dev.js'
import kmeans from './kmeans.js'

export class ApplyCluster extends OidBase {
  applyCluster (topic, message) {
    let columns = [...message.columns]
    if (columns){
      columns.forEach(el => {
        if(el.type === 'boolean' || el.type === 'string') this.reportError('All data must be numbers!'); 
      });
    }
    let data = JSON.parse(JSON.stringify(message.data));
    let res = kmeans(data, this.num_clusters, this.max_iterations)
    let centroids = res.centroids
    let clusters = res.clusters

    for (let j = 1; j <= clusters.length; j++) {
      for (let i = 0; i < clusters[j-1].points.length; i++) {
        clusters[j-1].points[i].push(j);
      }
    }
    
    columns.push({"name": "category", "type": "number"})
    for (let i = 0; i < centroids.length; i++) {
      let arr = centroids[i].map((val) => parseFloat(val).toFixed(3))
      arr.push(0)
      data.push(arr)
    }
    let final = {
      "columns" : columns,
      "data" : data
    }

    this._notify('transformed', {data: final.data, columns: final.columns});
  }

  reportError (message){
    console.log(message);
    this._notify("error", {
      error: message
    });
  }
}

Oid.component(
{
  id: 'ml:cluster-oid',
  element: 'ml-cluster-oid',
  properties: {
    num_clusters: {default: 2},
    max_iterations: {default: 50}
  },
  receive: {transform: 'applyCluster'},
  implementation: ApplyCluster
})
