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
    let clusters = res.clusters

    for (let j = 1; j <= clusters.length; j++) {
      for (let i = 0; i < clusters[j-1].points.length; i++) {
        // Adds category and is_centroid columns
        clusters[j-1].points[i].push(j, false);
      }
      // Adds centroid to the respective cluster, rounded to two decimal places
      clusters[j-1].points.push([...clusters[j-1].centroid.map(val => val.toFixed(2)), j, true])
    }
    
    columns.push({"name": "category", "type": "number"}, {"name": "is_centroid", "type": "boolean"})
    // Concatenates the cluster arrays
    let points = clusters.map(elem => elem.points).reduce(function(pre, cur) {
        return pre.concat(cur);
    }, [])
    let final = {
      "columns" : columns,
      "data" : points
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
