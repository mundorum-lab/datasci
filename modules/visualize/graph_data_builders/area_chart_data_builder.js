export function buildAreaChartData(rawData, fields){
    let data = {
        labels: [],
        datasets: []
    };
    fields.forEach((fieldset) => {
        const dataset = {
            label: 'TODO',
            data: [],
            fill: true,
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