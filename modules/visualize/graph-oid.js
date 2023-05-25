import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import { createConfiguration } from './graph_data_builders/create_data_configuration.js'
import './libs/chart.js'

export class GraphOid extends OidUI {
  handleRender(topic, message) {
    //createOptions(this.type, message, this.options)
    this.wroteMessage = ""
    this.canvas = this.shadowRoot.getElementById('canvas')
    this.canvas.style.display = 'initial';
    this.placeholder = this.shadowRoot.getElementById('placeholder')
    this.placeholder.style.display = 'none';
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.canvas, createConfiguration(this.type, message.value, this.fields, this.options))
  }

  handleExport(topic, message){
    if(this.canvas == null){
      return 
    }
    let url = this.canvas.toDataURL(`image/${message['type']}`);
    const download = document.createElement('a');
    download.href = url;
    download.download = this.uid;
    download.click();
    download.remove();
  }
}

Oid.component({
  id: 'graph:graph',
  element: 'graph-oid',
  template: html`<div><canvas id="canvas" style="max-height:400px;max-width:400px;display:none"></canvas><p id="placeholder">{{this.wroteMessage}}</p></div>`,
  properties: {
    uid: {}, // Unique ID
    data: { default: null }, // Internal
    type: { default: null },
    options: { default: null },
    fields: {default: null},
    wroteMessage: {default: 'Waiting for data'}
  },
  receive: ['render', 'export'],
  implementation: GraphOid,
})
