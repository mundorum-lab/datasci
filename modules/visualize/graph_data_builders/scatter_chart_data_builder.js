export function buildScatterChartData(rawData, fields){
  let data = {
    labels: [],
    datasets: [{
      label: 'TODO',
      data: []
    }]
  };
  
  data['datasets'][0]['data'] = rawData['data'].map(row => { return {
    x: row[fields['x']],
    y: row[fields['y']],
  }});  
  
  return data;
}