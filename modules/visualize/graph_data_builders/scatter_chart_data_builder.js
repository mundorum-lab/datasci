export function buildScatterChartData(rawData, fields){
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
    dataset.data = rawData['data'].map(row => {
      return {
        x: row[fieldset['x']],
        y: row[fieldset['y']],
      };
    });
    data['datasets'].push(dataset);
  })
  
  return data;
}