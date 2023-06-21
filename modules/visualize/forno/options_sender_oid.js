import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import { mockedOptions } from './options_mock.js';

export class OptionsSenderOid extends OidUI {
    _onClick() {
      const type = this.shadowRoot.getElementById('type').value;
      const fields = JSON.parse(this.shadowRoot.getElementById('fields').value);
      this._notify('click', { ...mockedOptions, fields, type })
    }
}
Oid.component(
    {
      id: 'ex:options-sender',
      element: 'options-sender-oid',
      properties: {
        data: {default: {}}
      },
      template: html`
      <div>
        <label for='type'>Type: </label>
        <select id='type' name='type'>
          <option value='area'>Area</option>
          <option value='bar'>Bar</option>
          <option value='bubble'>Bubble</option>
          <option value='cluster'>Cluster</option>
          <option value='column'>Column</option>
          <option value='doughnut'>Doughnut</option>
          <option value='line' selected>Line</option>
          <option value='linear_regression'>Linear Regression</option>
          <option value='pie'>Pie</option>
          <option value='polar'>Polar</option>
          <option value='radar'>Radar</option>
          <option value='scatter'>Scatter</option>
        </select><br /><br />
        <label for='fields'>Fields: </label><br />
        <textarea id='fields' cols='20' rows='8'>
[
  { "x": 2, "y": 1 },
  { "x": 2, "y": 3 }
]
        </textarea><br /><br />
        <button @click>Send Options</button>
      </div>`,
      implementation: OptionsSenderOid
    })