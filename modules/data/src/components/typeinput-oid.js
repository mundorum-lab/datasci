import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class TypeInputOid extends OidUI {
  handleType_input (topic, message) {
    console.log(message)
    const jsonData = message
    let columnType = Array(jsonData.columns.length).fill(null)
    for(let line in jsonData.data){
      for(let index in jsonData.data[line]){
        if((columnType[index] === null || columnType[index] === 'int') && !isNaN(parseInt(jsonData.data[line][index]))){
          jsonData.columns[index] = 
          columnType[index] = 'int';
        }else if((columnType[index] === null || columnType[index] === 'boolean') &&(
            jsonData.data[line][index] === 'true' ? true :
            jsonData.data[line][index] === 'false' ? true : false )){
          columnType[index] = 'boolean';
        }else {
          columnType[index] = 'string';
        }
      }
    }

    for (let i in jsonData.columns) {
      jsonData.columns[i] = {name: jsonData.columns[i], type: columnType[i]}
    }
    this._notify('output_type', {"id": jsonData.identifier, columns: jsonData.columns, data: jsonData.data})
  }

}

Oid.component(
{
  id: 'ex:typeinput',
  element: 'type-input',
  properties: {
    id: {}
  },
  receive:['type_input'],
  implementation: TypeInputOid
})
