import {interpolateColors} from "../utils/color_generator.js";

export function buildPolarChartData(rawData, fields){
  let data = {
    labels: [],
    datasets: [{
      label: 'TODO',
      data: []
    }]
  };
  
  rawData['data'].forEach(row => {
    data['labels'].push(row[fields['x']]);
    data['datasets'][0]['data'].push(row[fields['y']]);
  });

  const dataLength = rawData['data'].length;
  data.datasets[0].backgroundColor = interpolateColors(dataLength);  
  
  return data;
}