import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import { createConfiguration } from './graph_data_builders/create_data_configuration.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import zoomPlugin from 'chartjs-plugin-zoom';
import Chart from 'chart.js/auto';
import { generateErrorHtml, generateWaitingHtml } from './graph_states/graph_state_template.js';

const graphsWithoutDataLabel = ['pie', 'doughnut', 'scatter', 'cluster', 'linear_regression']

export class GraphOid extends OidUI {
  setStatus(rawData){
    this.status = `I am a ${this.type} chart  with columns `
    let prefix = ""
    this.fields.forEach(field => {
      let columns = [
        rawData.columns[field['x']],
        rawData.columns[field['y']]
      ]
      if(field['z']){console.log('yay')}
      this.status += prefix+`${JSON.stringify(columns)}`
      prefix = " and "
    });
    this.status += `and data ${JSON.stringify(this.data)}`
  }

  handleRender(topic, message) {
    try {
      this.feedbackMessage = ``
      const config = createConfiguration(this.type, message, this.fields,
        {
          ...this.options,
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },

                pinch: {
                  enabled: true
                },
                mode: 'xy',
              }

            }
          }
        });
        this.data = config.data
      this.setStatus(message);
      
      this.canvas = this.shadowRoot.getElementById('canvas')
      this.canvas.style.display = 'initial';
      if (this.chart) this.chart.destroy();

      if (!graphsWithoutDataLabel.includes(this.type)) {
        Chart.register(ChartDataLabels);
      } else {
        Chart.unregister(ChartDataLabels);
      }

      Chart.register(zoomPlugin);
      this.chart = new Chart(this.canvas, config);
      
    }
    catch (e) {
      if (e.code == 'DATA_TYPE_MISSMATCH_ERROR_CODE') {
        this.feedbackMessage = generateErrorHtml(e.message)
      } else {
        console.log(e)
        this.feedbackMessage = generateErrorHtml("Something went wrong! Try to generate the graph again");
      }

    }

  }

  handleExport(topic, message) {
    if (this.canvas == null) {
      return
    }
    let url = this.canvas.toDataURL(`image/${message['type']}`);
    const download = document.createElement('a');
    download.href = url;
    download.download = this.uid;
    download.click();
    download.remove();
  }

  handleOptions(topic, message) {
    const { fields, title, type, ...options } = message;
    this.type = type;
    this.fields = fields;
    this.title = title;
    this.options = options
  }

}

Oid.component({
  id: 'graph:graph',
  element: 'graph-oid',
  template: html`<div>{{this.feedbackMessage}}<canvas id="canvas" style="max-height:400px;max-width:400px;display:none"></canvas></div>`,
  properties: {
    uid: {}, // Unique ID
    data: { default: null }, // Internal
    type: { default: null },
    options: { default: null },
    title: { default: null },
    fields: { default: null },
    feedbackMessage: { default: generateWaitingHtml('Waiting for data...') },
    status: {default: ""}
  },
  receive: ['render', 'export', 'options'],
  implementation: GraphOid,
})