import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import { mockedOptions } from './options_mock.js';

export class OptionsSenderOid extends OidUI {
    _onClick() {
        this._notify('click', {value: mockedOptions})
    }
}
Oid.component(
    {
      id: 'ex:options-sender',
      element: 'options-sender-oid',
      properties: {
        data: {default: {}}
      },
      template: html`<button @click>Send Options</div>`,
      implementation: OptionsSenderOid
    })