import { html, Oid, OidUI  } from '/lib/oidlib-dev.js'
import {getPCA} from './PCA.js'


export class PcaOid extends OidUI {
  async applyPCA (topic, message) {
    //this.data = message.data
    this.result = await getPCA(this.data)
  }
  _onClick(){
    this._notify('click', {data: this.data})
  }
}

Oid.component(
{
  id: 'model:pca',
  element: 'model-pca',
  properties: {
    name: {default: 'PCA'},
    data: {default:  [[40,50,60],[50,70,60],[80,70,90],[50,60,80]]},
    result: {default: 'resultadis'},
  },
  receive: {transform: 'applyPCA'},
  template: html`<h1>data returned:  {{this.result}}</h1>`,
  implementation: PcaOid,
});