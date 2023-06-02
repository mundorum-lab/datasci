import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ValueToRawOid extends OidUI {
  async handleTransform (topic, message) {
    this._notify('output', message.value);
  }
}

Oid.component(
{
  id: 'ex:valuetoraw',
  element: 'value-to-raw',
  properties: {
    id: {default: '1'}
  },
  receive: ['transform'],
  implementation: ValueToRawOid
})
