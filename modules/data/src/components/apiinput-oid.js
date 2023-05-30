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

  restRequest(method, url) {
    request = new XMLHttpRequest()
    request.open(method, url)
    request.send()

    request.onreadystatechange = (e) => {
      if (request.readyState == XMLHttpRequest.DONE) {
        response = {}

        if (request.status == 200) {
          // Successful operation
          console.log("Success - " + JSON.parse(request.responseText))
        } else {
          // Error in operation
          console.log("Error - " + JSON.parse(request.responseText))
        }

        this._notify('output', request) // Processed file goes here
      }
    }
  }

  /*
  restRequest(method, parameters) {
    let result = null

    // If _setup.environment is defined, clones it into parameters
    if (this._setup.environment)
      for (let e in this._setup.environment)
        parameters[e] = this._setup.environment[e]

    // If the class attribute parameters is defined, puts each pair defined into it as a String as a key:value pair in parameters
    if (this.hasAttribute('parameters')) {
      const par = this.parameters.split(';')
      for (const p of par) {
        const atr = p.split(':')
        parameters[atr[0]] = atr[1]
      }
    }

    if (this._setup != null && this._setup.oas != null &&
        this._setup.oas.paths != null) {
      
      // Gets url as the first key of _setup.oas.paths and substitutes all {p}s in it by parameters[p]
      const paths = Object.keys(this._setup.oas.paths)
      if (paths.length > 0) {
        let url = paths[0]
        for (let p in parameters)
          url = url.replace('{' + p + '}', parameters[p])

        // Creates request
        const request = {
          method: method.toUpperCase(),
          url: url,
          withCredentials: true
        }

        // Gets body from pathDetails = _setup.oas.paths[url]
        let pathDetails = this._setup.oas.paths[paths[0]]
        let opid = ''
        if (pathDetails[method] != null) {
          if (pathDetails[method].operationId) opid = pathDetails[method].operationId
          if (pathDetails[method].parameters != null) {
            let body = {}
            for (let p of pathDetails[method].parameters)
              if (p.in != null && p.in == 'query')
                body[p.name] = parameters[p.name]
            if (request.method == 'GET')
              request.params = body
            else
              request.data = body
          }
        }

        // Node.js method to perform an HTTP request
        await axios(request)
          .then(function (endpointResponse) {
            result = endpointResponse.data  // If sucessful, gets result
          })
          .catch(function (error) {
            result = {  // If unsucessful, creates error response
              error: (error.response != null)
                       ? ((error.response.data != null &&
                          error.response.data.error != null)
                          ? error.response.data.error
                          : {code: (error.response.status)
                                    ? error.response.status : 500,
                             message: error.message})
                      : {code: 500, message: error.message}
            }
          })
      }
    }
    return result
  }
  */
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
