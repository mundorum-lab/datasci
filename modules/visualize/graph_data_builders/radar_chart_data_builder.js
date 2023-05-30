import { interpolateColors } from "../utils/color_generator.js";

export function buildRadarChartData(rawData, fields){
  let data = {
    labels: [],
    datasets: [{
      label: 'TODO',
      data: []
    }]
  };
  
  // TODO: Figure out how to deal with multiple datasets
  rawData['data'].forEach(row => {
    data['labels'].push(row[fields['x']]);
    data['datasets'][0]['data'].push(row[fields['y']]);
  });

  const dataLength = rawData['data'].length;
  // TODO: Add transparency
  data.datasets[0].backgroundColor = interpolateColors(dataLength);  
  
  return data;
}