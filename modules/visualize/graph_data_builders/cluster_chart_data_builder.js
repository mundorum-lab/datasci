import { interpolateColors } from "../utils/color_generator.js";

export function buildClusterChartData(rawData, fields){
  let data = {
    labels: [],
    datasets: []
  };
  console.log(fields)
  fields.forEach((fieldset) => {
    const dataset = {
      label: fieldset['title'],
      data: [],
      pointBackgroundColor: []
    }
    dataset.data = rawData['data'].map(row => { return {
      x: row[fieldset['x']],
      y: row[fieldset['y']],
    }});
    
    let clusters = []
    for(let i = 0; i < rawData['data'].length; i++) {
      const cluster = rawData['data'][i][fieldset['z']]
      if(!(clusters.includes(cluster))){
        clusters.push(cluster);
      }
    }
    const colors = interpolateColors(clusters.length);

    dataset.pointBackgroundColor = rawData['data'].map(row => { 
      const c_index = clusters.indexOf(row[fieldset['z']]); 
      return colors[c_index]
    });
    data.datasets.push(dataset)
  })
  console.log(data)
  
  return data;
}