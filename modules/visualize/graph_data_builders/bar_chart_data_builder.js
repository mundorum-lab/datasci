import {interpolateColors} from "../utils/color_generator.js";

export function buildBarChartData(rawData, fields){
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

    const dataLength = rawData['data'].length;
    data.datasets[0].backgroundColor = interpolateColors(dataLength);    

    return data;
}