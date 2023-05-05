import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class FileInputOid extends OidUI {
  loadFile (topic, message) {
    this.file_content = message["file_content"]
    this._notify('output', {}) // Processed file goes here
  }
}

Oid.component(
{
  id: 'ex:fileinput',
  element: 'file-input',
  properties: {
    id: {default: '1'}
  },
  receive: {load: 'loadFile'},
  
  implementation: FileInputOid
})