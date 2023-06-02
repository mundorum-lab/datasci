import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ValueToRawOid extends OidUI {
  handleTransform (topic, message) {
    this._notify('output-raw', message.value);
  }

  handleDetransform (topic, message) {
    this._notify('output-value', {value: JSON.stringify(message)});
  }
}

Oid.component(
{
  id: 'ex:valuetoraw',
  element: 'value-to-raw',
  properties: {
    id: {default: '1'}
  },
  receive: ['transform', 'detransform'],
  implementation: ValueToRawOid
})
