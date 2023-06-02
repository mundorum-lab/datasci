import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class TypeInputOid extends OidUI {
  handleType_input (topic, message) {
    const jsonData = JSON.parse(message.value);

    let columnType = Array(jsonData.columns.length).fill(null)
    console.log(jsonData)
    for(let line in jsonData.data){
      for(let index in jsonData.data[line]){
        console.log(parseInt(jsonData.data[line][index]))
        console.log(Array(jsonData.columns.length).fill(null))
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

    console.log(JSON.stringify(jsonData))
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
