import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class TypeInputOid extends OidUI {
    isNullable = ['', null, 'null', ' '];

    handleType_input(topic, message) {
        const jsonData = message;
        let columnType = Array(jsonData.columns.length).fill(null)

        let columns = [jsonData.columns];
        for (let line in jsonData.data) {
            for (let index in jsonData.data[line]) {
                if (jsonData.data[line][index]) {
                    if (this.isNullable.includes(jsonData.data[line][index])) {
                        jsonData.data[line][index] = '?';
                    }
                    if ((columnType[index] === null || columnType[index] === 'number') &&
                        !isNaN(parseFloat(jsonData.data[line][index])) && jsonData.data[line][index] !== '?') {
                        columnType[index] = 'number';
                    } else if ((columnType[index] === null || columnType[index] === 'boolean') && (
                            jsonData.data[line][index] === 'true' ? true :
                                jsonData.data[line][index] === 'false' ? true : false) &&
                        jsonData.data[line][index] !== '?') {
                        columnType[index] = 'boolean';
                    } else if (jsonData.data[line][index] !== '?') {
                        columnType[index] = 'string';
                    }
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
