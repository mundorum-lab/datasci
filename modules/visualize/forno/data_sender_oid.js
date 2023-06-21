import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import { mockedData, scatter_mockData, cluster_mockData} from './data_mock.js';

export class DataSenderOid extends OidUI {
    _onClick() {
      const mock = this.shadowRoot.getElementById('mock').value;
      let data = mockedData;
      if (mock == "scatter") {
        data = scatter_mockData
      } else if (mock == "cluster") {
        data = cluster_mockData
      }
      this._notify('click', data)
    }
}
Oid.component(
    {
      id: 'ex:data-sender',
      element: 'data-sender-oid',
      properties: {
      },
      template: html`
      <div>
        <label for='mock'>Mock: </label>
        <select id='mock' name='mock'>
          <option value='general' selected>General</option>
          <option value='scatter'>Scatter</option>
          <option value='cluster'>Cluster</option>
        </select><br /><br />
        <button @click>Render graph</button>
      </div>`,
      implementation: DataSenderOid
    })