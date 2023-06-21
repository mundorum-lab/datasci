import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import { colesterol_options } from '../../mocked_data/colesterol.js';

export class OptionsSenderOid extends OidUI {
    _onClick() {
        console.log(colesterol_options)
      this._notify('click', colesterol_options)
    }
}
Oid.component(
    {
      id: 'ex:options-sender',
      element: 'options-sender-oid',
      properties: {
        data: {default: {}}
      },
      template: html`<button @click>Send Options</button>`,
      implementation: OptionsSenderOid
    })