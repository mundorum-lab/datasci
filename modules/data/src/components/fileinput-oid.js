import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class FileInputOid extends OidUI {
  handleLoad_file (topic, message) {
    const lines = message.value.split(/\r?\n/);//Only windows separates with both
    const columns = lines[0].split(this.sep);
    const list_data = [];
    console.log("sep:", this.sep);
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(this.sep);
      list_data.push(row);
    }

    console.log(columns)
    console.log(list_data)
    
    this._notify('output', {value:JSON.stringify({"columns": columns, "data": list_data})}) // Processed file goes here
    // const jsonData = JSON.parse(message.value)
    // const file_format = jsonData["file_format"]
    // const file_content = jsonData["file_content"]
    // console.log(file_format)
    // if (file_format == "csv") {
    //   console.log(file_content)
    // }
    // this._notify('output', {value: JSON.stringify({columns: columns, data: data})}) // Processed file goes here
  }
}

Oid.component(
{
  id: 'ex:fileinput',
  element: 'file-input',
  properties: {
    id: {default: '1'},
    sep: {default: ';'}
  },
  receive: ['load_file'],
  implementation: FileInputOid
})