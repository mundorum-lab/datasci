import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class FileInputOid extends OidUI {
  load_file (topic, message) {
    this.file_content = message["file_content"]
    this._notify('output', {value: JSON.stringify({columns: columns, data: data})}) // Processed file goes here
  }
}

Oid.component(
{
  id: 'ex:fileinput',
  element: 'file-input',
  properties: {
    id: {default: '1'}
  },
  receive: {'load_file'},
  implementation: FileInputOid
})