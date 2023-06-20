import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class JSONParserOid extends OidUI {
  handleInput_raw (topic, message) {
    let rawData = message
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

    this._notify('output_processed', {columns: columns, data: data}) // Processed file goes here
  }
}

Oid.component(
{
  id: 'ex:jsonparser',
  element: 'json-parser',
  properties: {
    id: {default: '1'}
  },
  receive: ['input_raw'],
  implementation: JSONParserOid
})
