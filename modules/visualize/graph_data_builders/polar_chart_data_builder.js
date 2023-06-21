import {interpolateColors} from "../utils/color_generator.js";

export function buildPolarChartData(rawData, fields){
  let data = {
    labels: [],
    datasets: []
  };
  
  fields.forEach((fieldset) => {
    const dataset = {
        label: 'TODO',
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
  data.datasets[0].backgroundColor = interpolateColors(dataLength);  
  
  return data;
}