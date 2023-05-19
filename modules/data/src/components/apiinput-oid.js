import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ApiInputOid extends OidUI {
  handleInput_api (topic, message) {
    console.log(topic);
    console.log(message)
    const Http = new XMLHttpRequest();
    const url='https://jsonplaceholder.typicode.com/posts';
    Http.open("GET", url);
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
