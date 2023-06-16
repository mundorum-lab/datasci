import { html, Oid, OidWeb } from '/lib/oidlib-dev.js'

export class HelloOid extends OidWeb {
  connectedCallback () {
    super.connectedCallback()
    console.log(`table property: ${this.table}`)
  }
}

Oid.component(
{
  id: 'component-mock',
  element: 'component-mock-oid',
  properties: {
    table:{default:"my table"},
    result:{default:"my result"}
  },
  implementation: HelloOid
})