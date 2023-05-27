import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ApiInputOid extends OidUI {
  handleInput_api (topic, message) {
    console.log("Entered function")

    const jsonData = JSON.parse(message.value)
    const Http = new XMLHttpRequest();
    const url=jsonData.url_content;
    Http.open(jsonData.api_type, url);
    Http.send();
    Http.onreadystatechange = (e) => {
      console.log("State change")

      let rawData = JSON.parse(Http.responseText)

      console.log(rawData)

      let columns = Object.keys(rawData[0])
      let data = []

      for (let i in rawData) {
        data.push([])

        for (let key of Object.keys(rawData[i])) {
          data[i].push(rawData[i][key]) 
        } 
      }

      console.log(columns)
      console.log(data)

      this._notify('output', {value: JSON.stringify({columns: columns, data: data})}) // Processed file goes here
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
