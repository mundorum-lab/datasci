import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import { Chart } from './libs/chart.js'

export class GraphOid extends OidUI {
  constructor() {
    super()
    this.canvas = null
    this.placeholder = null
  }

  connectedCallback() {
    super.connectedCallback()

    this.canvas = document.getElementById('chart')
    this.placeholder = document.getElementById('canvas')
    this.canvas.style.display = 'none';
  }

  handleRender(topic, message) {
    createOptions(this.type, message, this.options)
    new Chart(this.canvas, this.createConfiguration(message))
    this.canvas.style.display = 'initial';
    this.placeholder.style.display = 'none';
  }

  createConfiguration(data) {
    config = {
      type: this.type,
    }
    switch (this.type) {
      case 'area':
        break;
      case 'bar':
        break;
      case 'bubble':
        break;
      case 'doughnut':
        break;
      case 'pie':
        break;
      case 'line':
        break;
      case 'polar':
        break;
      case 'radar':
        break;
      case 'scatter':
        break;
      default:
        break;
    }
    return config
  }
}

Oid.component({
  id: 'graph:graph',
  element: 'graph-oid',
  template: html`<div><p id="placeholder">Waiting for data.</p><canvas id="chart"></canvas></div>`,
  properties: {
    uid: {}, // Unique ID
    data: { default: null }, // Internal
    type: { default: null },
    options: { default: null },
  },
  receive: ['render'],
  implementation: GraphOid,
})
