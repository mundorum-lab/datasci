import { getRandomColors } from "../random_colors.js";

export function buildPieChartData(rawData, fields){
    let data = {
        labels: [],
        datasets: [{
            backgroundColor: [],
            data: []
        }]
    };

    rawData['data'].forEach(row => {
        data['labels'].push(row[fields['x']]);
        data['datasets'][0]['data'].push(row[fields['y']]);
    });

    
    data['datasets'][0]['backgroundColor'] = getRandomColors(rawData['data'].length);
    return data;
}