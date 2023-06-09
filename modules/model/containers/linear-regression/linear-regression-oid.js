import { generateTargetDataArrays, executeLinearRegression, calculateResultColumn } from './linear-regression.js';
import { Oid, OidBase } from '/lib/oidlib-dev.js'

export class LinearModel extends OidBase {
  handleTransform (topic, message) {
    const value = JSON.parse(message.value);
    if (value.columns){
      value.columns.forEach(el => {
        if(el.type === 'boolean' || el.type === 'string') this.reportError('All data must be numbers!'); 
      });
    }
    this.data = value.data;
    if (!this.data) return this.reportError('No data was found');
    const {no_target_array, target_array} = generateTargetDataArrays(this.data, this.target_index)
    const thetas = executeLinearRegression(no_target_array, target_array);
    const result = calculateResultColumn(thetas, no_target_array);
    this.data.forEach((el, index) => {
      el[this.target_index] = result[index]
    });
  }

  // This function is made with the objective to put an error message on the bus
  reportError (message){
    console.log(message);
    this._notify("error", {
      error: message
    });
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