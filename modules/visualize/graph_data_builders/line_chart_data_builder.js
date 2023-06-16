export function buildLineChartData(rawData, fields){
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
    rawData['data'].forEach(row => {
      if (!data['labels'].includes(row[fieldset['x']]))
        data['labels'].push(row[fieldset['x']]);
      dataset.data.push(row[fieldset['y']]);
    });
    data['datasets'].push(dataset);
  })
  return data;
}