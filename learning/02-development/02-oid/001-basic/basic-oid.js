import { Oid } from '/lib/oidlib-dev.js'

Oid.component(
{
  id: 'ex:basic',
  element: 'basic-oid',
  properties: {
    name: {}
  },
  template: `<h1>Hello, {{this.name}}</h1>`
})