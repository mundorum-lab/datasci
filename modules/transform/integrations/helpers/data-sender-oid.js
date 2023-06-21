import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import { colesterol_data } from '../../mocked_data/colesterol.js';

export class DataSenderOid extends OidUI {
    _onClick() {
        console.log(colesterol_data)
      this._notify('click', colesterol_data)
    }
}
Oid.component(
    {
      id: 'ex:data-sender',
      element: 'data-sender-oid',
      properties: {
      },
      template: html`<button @click>Send data</button>`,
      implementation: DataSenderOid
    })