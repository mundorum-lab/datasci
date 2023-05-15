import { linearRegression } from './linear-regression'
import { html, Oid, OidBase } from '/lib/oidlib-dev.js'

export class LinearModel extends OidBase {
  handleTransform (topic, message) {
    linearRegression(message.data, 1);
  }
}

Oid.component(
{
  id: 'ml:linear-regression',
  element: 'ml-lr',
  properties: {},
  receive: [transform],
  implementation: LinearModel
})