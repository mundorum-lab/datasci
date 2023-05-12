import { html, Oid, OidUI  } from '/lib/oidlib-dev.js'
import {getPCA} from 'PCA.js'
export class PCA extends OidUI {
  applyPCA (topic, message) {
    //this.table = message.value
    //import pca 
    this.result = getPCA()
    // When operation is done, publish the data
    this._notify('transform', {value: this.result})
  }
}

Oid.component(
{
  id: 'transform:pca',
  element: 'transformation-pca',
  properties: {
    name: {default: 'PCA'},
    result: {default: ''},
  },
  receive: {'transform': 'applyPCA'},
  template: html`<h1>data returned:  {{this.result}}</h1>`,
  implementation: PCA,
})