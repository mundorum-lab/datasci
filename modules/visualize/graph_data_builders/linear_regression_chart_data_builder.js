export function buildLinearRegressionChartData(rawData, fields){
    let data = {
        labels: [],
        datasets: []
      };
      
      fields.forEach((fieldset) => {
        const point_dataset = {
            label: 'TODO',
            data: [],
            fill: false,
            tension: 0.1,
            order: 2
        }
       
        const line_dataset = {
          label: 'TODO',
          data: [],
          fill: false,
          tension: 0.1,
          type: 'line',
          order: 1
      }

        rawData['data'].forEach(row => {
            //data['labels'].push(row[fieldset['x']]);
            point_dataset.data.push({x:row[fieldset['x']] , y:row[fieldset['y']]});
            line_dataset.data.push({x:row[fieldset['x']] , y:row[fieldset['z']]});
        });

        data['datasets'].push(point_dataset);
        data['datasets'].push(line_dataset);
    })
      
      return data;
}