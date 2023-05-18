import { html, Oid, OidUI  } from '/lib/oidlib-dev.js'
import {getPCA} from './PCA.js'


export class PCA extends OidUI {
  applyPCA (topic, message) {
    //this.table = message.value
    //this.result = message.value
    this.result =  getPCA()
    // When operation is done, publish the data
    //this._notify('transform', {value: this.result})
  }
}

Oid.component(
{
  id: 'model:pca',
  element: 'model-pca',
  properties: {
    name: {default: 'PCA'},
    result: {default: 'resultadis'},
  },
  receive: {transform: 'applyPCA'},
  template: html`<h1>data returned:  {{this.result}}</h1>`,
  implementation: PCA,
});