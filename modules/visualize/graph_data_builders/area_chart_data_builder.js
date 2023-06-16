import {GraphFieldsVerifier} from '../utils/type_verifier'

export function buildAreaChartData(rawData, fields){
    let fieldsVerifier = new GraphFieldsVerifier("Area")
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
            let xItem = row[fieldset['x']];
            let yItem = row[fieldset['y']];

            if(fieldsVerifier.isNumericOrCategorical(xItem, 'x')){
                data['labels'].push(xItem);
            }
            if(fieldsVerifier.isNumeric(yItem, 'y')){
                dataset.data.push(yItem);
            }
            
        });
        data['datasets'].push(dataset);
    })
    return data;
}