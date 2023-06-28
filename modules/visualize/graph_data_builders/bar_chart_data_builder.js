import {interpolateColors} from "../utils/color_generator.js";
import { GraphFieldsVerifier } from "../utils/type_verifier.js";

export function buildBarChartData(rawData, fields){
    let fieldsVerifier = new GraphFieldsVerifier("Bar")
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
            let xItem = row[fieldset['x']];
            let yItem = row[fieldset['y']];
            if (!data['labels'].includes(row[fieldset['x']]) && fieldsVerifier.isNumeric(xItem, 'x')) {
                data['labels'].push(xItem);
            }
            if (fieldsVerifier.isNumericOrCategorical(yItem, 'y')){
                dataset.data.push(yItem);
            }
            
            
        });
        const dataLength = rawData['data'].length;
        dataset.backgroundColor = interpolateColors(dataLength); 
        data['datasets'].push(dataset);
    })

    return data;
}