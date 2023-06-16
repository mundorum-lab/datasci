import { GraphFieldsVerifier } from "../utils/type_verifier";

export function buildBubbleChartData(rawData, fields){
  let fieldsVerifier = new GraphFieldsVerifier("Bubble")
  let data = {
    datasets: [
      {
        label: 'TODO',
        data: []
      }
    ]
  };
  fields.forEach((fieldset) => {
    const dataset = {
      label: 'TODO',
      data: [],
    }
    dataset.data = rawData['data'].map(row => {
      let xItem = row[fieldset['x']]
      let yItem = row[fieldset['y']]
      let rItem = row[fieldset['r']]

      fieldsVerifier.isNumeric(xItem, 'x')
      fieldsVerifier.isNumeric(yItem, 'y')
      fieldsVerifier.isNumeric(rItem, 'r')

      return {
        x: row[fieldset['x']],
        y: row[fieldset['y']],
        r: row[fieldset['r']],
    }})
    data['datasets'].push(dataset);
  });
  return data;
}