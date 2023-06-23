export function buildBubbleChartData(rawData, fields){
  let data = {
    datasets: [
    ]
  };
  fields.forEach((fieldset) => {
    const dataset = {
      label: fieldset['title'],
      data: [],
    }
    dataset.data = rawData['data'].map(row => {
      return {
        x: row[fieldset['x']],
        y: row[fieldset['y']],
        r: row[fieldset['z']],
    }})
    data['datasets'].push(dataset);
  });
  console.log(data)
  return data;
}