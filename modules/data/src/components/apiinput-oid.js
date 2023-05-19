import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ApiInputOid extends OidUI {
  handleInput_api (topic, message) {
    const jsonData = JSON.parse(message.value)
    const Http = new XMLHttpRequest();
    const url=jsonData.url_content;
    Http.open(jsonData.api_type, url);
    Http.send();
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }
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
