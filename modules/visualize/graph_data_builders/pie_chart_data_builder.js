import {interpolateColors} from "../utils/color_generator.js";
import { GraphFieldsVerifier } from "../utils/type_verifier.js";

export function buildPieChartData(rawData, fields){
    let fieldVerifier = new GraphFieldsVerifier('Pie');
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
            let xItem = row[fieldset['x']]
            let yItem = row[fieldset['y']]

            if(!data['labels'].includes(row[fieldset['x']]) && 
            fieldVerifier.isNumericOrCategorical(xItem, 'x')){
                data['labels'].push(xItem);
            }
            if(fieldVerifier.isNumeric(yItem, 'y')){
                dataset.data.push(yItem);
            }
            
            
        });
        data['datasets'].push(dataset);
    })

    const dataLength = rawData['data'].length;
    data.datasets[0].backgroundColor = interpolateColors(dataLength);  

    return data;
}