import { testFunction } from './temp_lr.js';
import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class LinearModel extends OidUI {
  handleTransform (topic, message) {
    const test = testFunction();
    this.a = test[0];
    this.b = test[1];
    this.c = test[2];
  }
}

Oid.component(
{
  id: 'ml:linear-regression',
  element: 'ml-lr-oid',
  properties: {
    a: {default: "."},
    b: {default: "."},
    c: {default: "."}    
  },
  receive: {transform: 'handleTransform'},
  template: html`<h1>y = {{this.a}}*1 + {{this.b}}*x + {{this.c}}*z</h1>`,
  implementation: LinearModel
})