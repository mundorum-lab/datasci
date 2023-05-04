import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class PresentTransformationOid extends OidUI {
    handlePresentation(topic, message){
        this.size = message.size
        this.valueToPresent = message.value  //check if is number or table and set html
        let template = {
            size: message.size,
            position: message.position,
        }
        this._notify('presentTransformation', template)
    }
}

Oid.component(
{
  id: 'ts:transPresent',
  element: 'presentTransformation',
  properties: {
    name: {default: "Mostrar na Apresentação"},
    type: {default: "Transformação"},
    size: {default: "Small"}, //use size to construct html
    valueToPresent: {default: {}},
  },
  receive: {presentTransformation: 'handlePresentation'}, //need to discuss with other group
  /*template: html``,*/
  implementation: PresentTransformationOid
})