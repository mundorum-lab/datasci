import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ExportButtonOid extends OidUI {
    _onClick() {
        const selected_type = this.shadowRoot.getElementById('select').value;
        this._notify('export', {type: selected_type})
    }
}
Oid.component(
    {
      id: 'ex:export-button-oid',
      element: 'export-button-oid',
      properties: {
      },
      template: html`
      <div>
        <select id='select'>
            <option value='png'> png</option>
            <option value='jpeg'> jpeg</option>
        </select>
        <button @click>Export</button>
      </div>`,
      implementation: ExportButtonOid
    })