import { html, Oid, OidUI } from '/lib/oidlib-dev.js'
import { createConfiguration } from './graph_data_builders/create_data_configuration.js'
import './libs/chart.js'

export class GraphOid extends OidUI {
  constructor() {
    super()
    this.canvas = null
    this.placeholder = null
  }

  connectedCallback() {
    super.connectedCallback()
    
    const shadow = this.attachShadow({ mode: "closed" })

    const canvas = document.createElement('canvas')
    canvas.style.display = 'none';
    canvas.id = 'myChart'
    canvas.style.maxWidth = '400px'
    canvas.style.maxHeight = '400px'
    shadow.appendChild(canvas)
    this.canvas = canvas
    
    const placeholder = document.createElement('p')
    shadow.appendChild(placeholder)
    this.placeholder = placeholder
    this.placeholder.innerHTML = this.wroteMessage;
  }

  handleRender(topic, message) {
    //createOptions(this.type, message, this.options)
    this.wroteMessage = ""
    new Chart(this.canvas, createConfiguration(this.type, message.value, this.fields, this.options))
    this.canvas.style.display = 'initial';
    this.placeholder.style.display = 'none';
  }

}

Oid.component({
  id: 'graph:graph',
  element: 'graph-oid',
  // template: html`<div><p id="placeholder">{{this.wroteMessage}}</p></div>`,
  properties: {
    uid: {}, // Unique ID
    data: { default: null }, // Internal
    type: { default: null },
    options: { default: null },
    fields: {default: null},
    wroteMessage: {default: 'Waiting for data'}
  },
  receive: ['render'],
  implementation: GraphOid,
})
