import { GraphFieldsVerifier } from "../utils/type_verifier";

export function buildBubbleChartData(rawData, fields){
  let fieldsVerifier = new GraphFieldsVerifier("Bubble")
  let data = {
    datasets: [
    ]
  };
  fields.forEach((fieldset) => {
    const dataset = {
      label: fieldset['title'],
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
        x: xItem,
        y: yItem,
        r: rItem,
    }})
    data['datasets'].push(dataset);
  });
  console.log(data)
  return data;
}