export function buildBubbleChartData(rawData, fields){
  let data = {
    datasets: [
      {
        label: 'TODO',
        data: []
      }
    ]
  };
  fields.forEach((fieldset) => {
    const dataset = {
      label: 'TODO',
      data: [],
    }
    dataset.data = rawData['data'].map(row => {
      return {
        x: row[fieldset['x']],
        y: row[fieldset['y']],
        r: row[fieldset['r']],
    }})
    data['datasets'].push(dataset);
  });
  return data;
}