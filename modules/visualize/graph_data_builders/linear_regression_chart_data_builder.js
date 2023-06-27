import { GraphFieldsVerifier } from "../utils/type_verifier";

export function buildLinearRegressionChartData(rawData, fields) {
  let fieldVerifier = new GraphFieldsVerifier('Linear Regression');
  let data = {
    labels: [],
    datasets: []
  };

  fields.forEach((fieldset) => {
    const point_dataset = {
      label: fieldset['title'] + ' points',
      data: [],
      fill: false,
      tension: 0.1,
      order: 2
    }

    const line_dataset = {
      label: fieldset['title'] + ' line',
      data: [],
      fill: false,
      tension: 0.1,
      type: 'line',
      order: 1
    }

    rawData['data'].forEach(row => {
      let xItem = row[fieldset['x']];
      let yItem = row[fieldset['y']];
      let zItem = row[fieldset['z']];
      if (fieldVerifier.isNumericOrCategorical(xItem, 'x') &&
        fieldVerifier.isNumeric(yItem, 'y') &&
        fieldVerifier.isNumeric(zItem, 'z')) {
        point_dataset.data.push({ x: xItem, y: yItem });
        line_dataset.data.push({ x: xItem, y: zItem });
      }

    });

    data['datasets'].push(point_dataset);
    data['datasets'].push(line_dataset);
  })

  return data;
}