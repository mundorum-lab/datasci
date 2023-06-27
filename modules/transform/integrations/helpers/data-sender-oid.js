import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import { freq_cardiaca_data, imc_data, pressao_sanguinea_data, colesterol_data } from '../../mocked_data/json_data.js';

export class DataSenderOid extends OidUI {
    _onClick() {
        console.log(this.data_name, eval(this.data_name))
      this._notify('click', eval(this.data_name))
    }
}
Oid.component(
    {
      id: 'ex:data-sender',
      element: 'data-sender-oid',
      properties: {
        data_name: {}
      },
      template: html`<button @click>Send data</button>`,
      implementation: DataSenderOid
    })