import { testFunction, my_data } from './temp_lr.js';
import { generateTargetDataArrays, executeLinearRegression } from './linear-regression.js';
import { Oid, OidBase } from '/lib/oidlib-dev.js'

export class LinearModel extends OidBase {
  handleTransform (topic, message) {
    //const test = testFunction();
    this.data = my_data;
    const {no_target_array, target_array} = generateTargetDataArrays(this.data, 1)
    const thetas = executeLinearRegression(no_target_array, target_array);
    console.log(thetas);
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