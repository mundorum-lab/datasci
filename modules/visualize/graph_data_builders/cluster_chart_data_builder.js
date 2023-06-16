import { interpolateColors } from "../utils/color_generator.js";

export function buildClusterChartData(rawData, fields){
    let data = {
      labels: [],
      datasets: [{
        label: 'TODO',
        data: [],
        ponitBackgroundColor: []
      }]
    };
    
    data['datasets'][0]['data'] = rawData['data'].map(row => { return {
      x: row[fields['x']],
      y: row[fields['y']],
    }});
    let clusters = []
    for(let i=0; i<rawData['data'].length; i++){
        const cluster = rawData['data'][i][fields['z']]
        if(!(cluster in clusters)){
            clusters.push(cluster);
        }
    }

    const colors = interpolateColors(clusters.length);
    
    data['datasets'][0]['pointBackgroundColor'] = rawData['data'].map(row => { 
        const c_index = clusters.indexOf(row[fields['z']]); 
        return colors[c_index]
     });

    
    return data;
}