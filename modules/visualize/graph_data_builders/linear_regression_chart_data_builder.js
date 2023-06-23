import { GraphFieldsVerifier } from "../utils/type_verifier";

export function buildLinearRegressionChartData(rawData, fields){
    let fieldVerifier = new GraphFieldsVerifier('Linear Regression');
    let data = {
        labels: [],
        datasets: [{
          label: 'TODO',
          data: [],
          order: 2
        },{
            label: 'TODO2',
            data: [],
            type: 'line',
            order: 1
        }]
      };
      
      fields.forEach((fieldset) => {
        const dataset = {
            label: 'TODO',
            data: [],
            fill: false,
            tension: 0.1,
        }
        rawData['data'].forEach(row => {
            let xItem = row[fieldset['x']]
            let yItem = row[fieldset['y']]

            if(fieldVerifier.isNumericOrCategorical(xItem, 'x')){
              data['labels'].push(xItem);
            }
            if(fieldVerifier.isNumeric(yItem, 'y')){
              dataset.data.push(yItem);
            }
            
        });
        data['datasets'].push(dataset);
    })
      
      return data;
}