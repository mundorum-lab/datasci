import { GraphFieldsVerifier } from "../utils/type_verifier";

export function buildScatterChartData(rawData, fields){
  let fieldsVerifier = new GraphFieldsVerifier('Scatter')
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
    dataset.data = rawData['data'].map(row => {
      let xItem = row[fieldset['x']]
      let yItem = row[fieldset['y']]
      if(fieldsVerifier.isNumeric(xItem, 'x') && fieldsVerifier.isNumeric(yItem, 'y')){
        return {
        
          x: row[fieldset['x']],
          y: row[fieldset['y']],
        };
      }
      
    });
    data['datasets'].push(dataset);
  })
  
  return data;
}