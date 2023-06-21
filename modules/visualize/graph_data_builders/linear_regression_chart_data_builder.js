export function buildLinearRegressionChartData(rawData, fields){
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
            data['labels'].push(row[fieldset['x']]);
            dataset.data.push(row[fieldset['y']]);
        });
        data['datasets'].push(dataset);
    })
      
      return data;
}