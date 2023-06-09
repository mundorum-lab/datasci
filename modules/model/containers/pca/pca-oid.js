import { html, Oid, OidUI  } from '/lib/oidlib-dev.js'
import {getPCA} from './PCA.js'


export class PcaOid extends OidUI {
  async applyPCA (topic, message) {
    let table = message.value
    this.data = await getData(table)
    this.result = await getPCA(this.data)
    self._notify("output", {
      value: JSON.stringify(this.result),
    });

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
  template: html`<br>input: {columns: [{coluna1 : number}, {coluna2 : number}, {coluna3 : number}], data : [[40,50,60],[50,70,60],[80,70,90],[50,60,80]]} </br> <h1>data returned: {{this.result}} </h1>`,
  implementation: PcaOid,
});