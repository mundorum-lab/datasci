import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class BarOid extends OidUI {
  connectedCallback(){
    super.connectedCallback()
    this.joinChar()
  }

  joinChar(){
    for(let i = 0; i<this.size; i++){
      this.bar+=this.char
    }
  }
}

Oid.component(
{
  id: 'ex1:bar',
  element: 'bar-oid',
  properties: {
    char: {default: '#'},
    size: {default: '0'},
    bar: {default: ''},
  },
  template: html`<h1>{{this.bar}}</h1>`,
  implementation: BarOid
})