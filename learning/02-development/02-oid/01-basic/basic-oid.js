import { html,Oid } from '/lib/oidlib-dev.js'

Oid.component(
{
  id: 'ex:basic',
  element: 'basic-oid',
  properties: {
    name: {}
  },
  template: html`<h1>Hello, {{this.name}}</h1>`
})