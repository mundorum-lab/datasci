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
      console.log(rawData);
      
      data['datasets'][0]['data'] = rawData['data'].map(row => { return {
        x: row[fields['x']],
        y: row[fields['y1']],
      }});

      data['datasets'][1]['data'] = rawData['data'].map(row => { return {
        x: row[fields['x']],
        y: row[fields['y2']],
      }});

      
      return data;
}