export function buildLineChartData(rawData, fields){
    let data = {
        labels: [],
        datasets: [{
            label: 'TODO',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        }]
    };
    rawData['data'].forEach(row => {
        data['labels'].push(row[fields['x']]);
        data['datasets'][0]['data'].push(row[fields['y']]);
    });
    return data;
}