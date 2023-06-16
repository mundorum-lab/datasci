import { html, Oid, OidUI  } from '/lib/oidlib-dev.js'
import {getPCA, getData} from './PCA.js'


export class PcaOid extends OidUI {
  async applyPCA (topic, message) {
    let table = JSON.parse(JSON.stringify(message));
    this.data = await getData(table)
    this.result = await getPCA(this.data)
    console.log('this.result que sera publicado: ', this.result)
    this._notify("transformed", this.result);
  }
  
}

Oid.component(
{
  id: 'ml:apply-pca',
  element: 'ml-apply-pca',
  properties: {
    name: {default: 'PCA'},
    data: {default:  [[40,50,60],[50,70,60],[80,70,90],[50,60,80]]},
    result: {default: 'resultadis'},
  },
  receive: {transform: 'applyPCA'},
  template: html`<h1>data returned: {{this.result}} </h1>`,
  implementation: PcaOid,
});