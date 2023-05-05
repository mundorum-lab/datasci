import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class FileInputOid extends OidUI {
  someoneArrives (topic, message) {
    this.file_format = message.value[0]
    this.file_content = message.value[1]
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
  receive: {someone: 'someoneArrives'},
  subscribe: {workflow: 'data_input'},
  publish: {workflow: data/receiveData},
  
  implementation: FileInputOid
})