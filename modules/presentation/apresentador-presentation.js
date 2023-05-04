import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ApresentadorOid extends OidUI {
  someoneArrives (topic, message) {
    this.name = message.value
  }
}

Oid.component(
{
  id: 'ex:apresentador',
  element: 'Apresentador',
  properties: {
    workflow_graph: {default: 'nobody'}
    template: {default: 'nobody'}
  },
  subscribe: {workflow: 'visualize'},
  publish: {workflow: visualization_ready}
  
  implementation: ApresentadorOid
})