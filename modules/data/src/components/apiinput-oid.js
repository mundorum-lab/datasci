import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

async function makeHttpRequest(method, body, headers, url) {
  try {
    const headersObj = headers ? JSON.parse(headers) : {};
    const requestOptions = {
      method: method,
      headers: headersObj
    };

    if (body) {
      const bodyObj = JSON.parse(body);
      requestOptions.body = JSON.stringify(bodyObj);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResult = await response.json();
    return jsonResult;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


export class ApiInputOid extends OidUI {
  async handleInput_api (topic, message) {
    const jsonData = JSON.parse(message.value)

    let rawData = await makeHttpRequest(jsonData.method, jsonData.body, jsonData.headers, jsonData.api_url)

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

    this._notify('output', {value: JSON.stringify({"id": jsonData.identifier, columns: columns, data: data})}) // Processed file goes here
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
