import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class BarOid extends OidUI {
  connectedCallback() {
    super.connectedCallback()
    this.joinBar()
  }

  joinBar(){
    for (let i = 0; i < this.size; i++){
        this.bar += this.char
    }
  }

  handleIncrease(topic, message){
    for (let i = 0; i < message.rate; i++){
        this.bar += this.char
    }
  }
  
}

Oid.component(
{
  id: 'ex:bar',
  element: 'bar-oid',
  properties: {
    char: {default: '#'},
    size: {default: 0},
    bar: {default: ''}
  },
  receive: ['increase'],
  template: html`<h1>{{this.bar}}</h1>`,
  implementation: BarOid
})