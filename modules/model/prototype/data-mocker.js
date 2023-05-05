import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class SendData extends OidUI {
  _tellName () {
    this._notify('click', {value: {"data": this.data["data"], "columns": this.data["columns"]}})
  }
}

Oid.component(
{
  id: 'transform:mockData',
  element: 'data-mocker',
  properties: {
    data: {default: {"data": [], "columns": []}}
  },
  template: html`<h1 @click={{this._tellName}}>Send mock data</h1>`,
  implementation: SendData
})