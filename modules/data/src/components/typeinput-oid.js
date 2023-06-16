import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class TypeInputOid extends OidUI {
  isNullable = ['', null, 'null', ' '];

  handleType_input(topic, message) {
    const jsonData = JSON.parse(message.value);
    let columnType = Array(jsonData.columns.length).fill(null)

    let column = [jsonData.columns];
    for (let line in jsonData.data) {
      for (let index in jsonData.data[line]) {
        if (jsonData.data[line][index]) {
          if (this.isNullable.includes(jsonData.data[line][index])) {
            jsonData.data[line][index] = '?';
          }
          if ((columnType[index] === null || columnType[index] === 'int') &&
              !isNaN(parseFloat(jsonData.data[line][index])) && jsonData.data[line][index] !== '?') {
            columnType[index] = 'number';
          } else if ((columnType[index] === null || columnType[index] === 'boolean') && (
                  jsonData.data[line][index] === 'true' ? true :
                      jsonData.data[line][index] === 'false' ? true : false) &&
              jsonData.data[line][index] !== '?') {
            columnType[index] = 'boolean';
          } else {
            columnType[index] = 'string';
          }
        }
      }
    }
    for (let index in column) {
      column[index] ={name:column[index], type:columnType[index]}
    }
    this._notify('output', {value: JSON.stringify({columns: columns, data: data})})
    console.log(columnType)
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
