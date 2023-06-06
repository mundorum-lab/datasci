import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import {mockedData,scatter_mockData} from './data_mock.js';

export class DataSenderOid extends OidUI {
    _onClick() {
        this._notify('click', {value: scatter_mockData})
    }
}
Oid.component(
    {
      id: 'ex:data-sender',
      element: 'data-sender-oid',
      properties: {
        data: {default: {}}
      },
      template: html`<button @click>Render graph</div>`,
      implementation: DataSenderOid
    })