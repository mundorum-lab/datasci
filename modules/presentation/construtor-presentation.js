import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ConstrutorOid extends OidUI {
  someoneArrives (topic, message) {
    this.name = message.value
  }
}

Oid.component(
{
  id: 'ex:construtor',
  element: 'Construtor',
  properties: {
    workflow_graph: {default: 'nobody'}
    template: {default: 'nobody'}
  },
  subscribe: {workflow: 'visualize'},
  publish: {workflow: visualization_ready}
  
  implementation: ConstrutorOid
})