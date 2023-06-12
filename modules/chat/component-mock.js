import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

Oid.component(
{
  id: 'component-mock',
  element: 'component-mock-oid',
  properties: {
    table:{default:{value:"my table"}},
    result:{default:{value:"my result"}}
  }
})