import { getRandomColors } from "../random_colors.js";

export function buildColumnChartData(rawData, fields){
    let data = {
        labels: [],
        datasets: [{
            label: 'TODO',
            data: [],
            backgroundColor: [],
        }]
    };

    rawData['data'].forEach(row => {
        data['labels'].push(row[fields['x']]);
        data['datasets'][0]['data'].push(row[fields['y']]);
    });

    data.datasets[0].backgroundColor = getRandomColors(rawData['data'].length)

    return data;
}