import { html, Oid, OidWeb } from '/lib/oidlib-dev.js'

export class ChatOid extends OidWeb {
  
}

Oid.component(
{
  id: 'chat',
  element: 'chat-oid',
  properties: {
    id: {},
  },
  template: html``,
  implementation: ChatOid
})