import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ApiInputOid extends OidUI {
  handleInput_api (topic, message) {
    console.log(topic);
    console.log(message);
  }
}

Oid.component(
{
  id: 'ex:apiinput',
  element: 'api-input',
  properties: {
    id: {default: '1'}
  },
  receive: ['input_api'],
  implementation: ApiInputOid
})
