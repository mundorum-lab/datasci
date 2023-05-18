export function buildAreaChartData(rawData, fields){
    let data = {
        labels: [],
        datasets: [{
            label: 'TODO',
            data: [],
            fill:true
        }]
    };
    rawData['data'].forEach(row => {
        data['labels'].push(row[fields['x']]);
        data['datasets'][0]['data'].push(row[fields['y']]);
    });
    return data;
}