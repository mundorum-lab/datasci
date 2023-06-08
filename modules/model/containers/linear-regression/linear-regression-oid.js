import { generateTargetDataArrays, executeLinearRegression, calculateResultColumn } from './linear-regression.js';
import { Oid, OidBase } from '/lib/oidlib-dev.js'

export class LinearModel extends OidBase {
  handleTransform (topic, message) {
    const value = JSON.parse(message.value);
    this.data = value.data;
    const {no_target_array, target_array} = generateTargetDataArrays(this.data, 1)
    const thetas = executeLinearRegression(no_target_array, target_array);
    console.log(thetas)
    const result = calculateResultColumn(thetas, no_target_array);
    //[1.884, 0.643, 1.231]
  }
}

Oid.component(
{
  id: 'ml:linear-regression',
  element: 'ml-lr-oid',
  properties: {
    target_index: {default: 1},
    data: {default: []}
  },
  receive: {transform: 'handleTransform'},
  implementation: LinearModel
})