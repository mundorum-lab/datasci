import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class FileInputOid extends OidUI {
  loadFile (topic, message) {
    this.file_content = message["file_content"]
    this.file_format = message["file_format"]

    this._notify('output', {}) // Processed file goes here
  }
}

Oid.component(
{
  id: 'ex:fileinput',
  element: 'file-input',
  properties: {
    file_content: {default: ''},
    file_format: {default: ''},
    template: {default: ''}
  },
  receive: {load: 'loadFile'},
  
  implementation: FileInputOid
})