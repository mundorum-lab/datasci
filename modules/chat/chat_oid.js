import { html, Oid, OidWeb } from '/lib/oidlib-dev.js'

export class ChatOid extends OidWeb {
  connectedCallback(){
    super.connectedCallback()
    this.generatePrompt()
  }
  generatePrompt(){
    this.prompt = `Explain a ${this.input_type} with the following data: ${this.input_data}`
  }
}

Oid.component(
{
  id: 'chat',
  element: 'chat-oid',
  properties: {
    chat_id: {default: ''},
    input_data:{default: ''},
    input_type:{default: ''},
    prompt: {default: ''},
  },
  // recieve: {generate: 'generatePrompt'},
  template: html`<h1>{{this.prompt}}</h1>`,
  implementation: ChatOid
})