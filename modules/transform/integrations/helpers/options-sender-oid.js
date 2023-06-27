import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class OptionsSenderOid extends OidUI {
    _onClick() {
      const fields = [];
      const numberArray = this.pairs.split(",").map(Number);
      for (let i = 0; i < numberArray.length - 1; i += 2) {
        const obj = { x: numberArray[i], y: numberArray[i + 1] };
        fields.push(obj);
      }
      console.log(fields);
      const options = {fields, title: this.title, type: this.type}
      console.log(options)
      this._notify('click', options)
    }
}
Oid.component(
    {
      id: 'ex:options-sender',
      element: 'options-sender-oid',
      properties: {
        pairs: {},
        title: {},
        type: {}
      },
      template: html`<button @click>Send Options</button>`,
      implementation: OptionsSenderOid
    })