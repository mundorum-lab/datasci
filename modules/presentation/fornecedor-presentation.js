import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class FornecedorOid extends OidUI {
  someoneArrives (topic, message) {
    this.name = message.value
  }
}

Oid.component(
{
  id: 'ex:fornecedor',
  element: 'Fornecedor_De_Template',
  publish: {workflow: 'visualize'},
  subscribe: {workflow: 'visualization_ready'},
  implementation: FornecedorOid
})