import { interpolateColors } from "../utils/color_generator.js";

export function buildRadarChartData(rawData, fields){
  let data = {
    labels: [],
    datasets: []
  };
  
  fields.forEach((fieldset) => {
    const dataset = {
        label: fieldset['title'],
        data: [],
        fill: false,
        tension: 0.1,
    }
    rawData['data'].forEach(row => {
        data['labels'].push(row[fieldset['x']]);
        dataset.data.push(row[fieldset['y']]);
    });
    data['datasets'].push(dataset);
})

  const dataLength = rawData['data'].length;
  // TODO: Add transparency
  data.datasets[0].backgroundColor = interpolateColors(dataLength);  
  
  return data;
}