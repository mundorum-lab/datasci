import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class OrderButton extends OidUI {
  _onClick () {
  
    let table = {
        file_id: "my_file.csv",
        columns: [
            {name: "first", type: "string"},
            {name: "second", type: "number"},
            {name: "third", type: "number"},
        ],
        data: [
            ["value1", 1, 3],
            ["value2", 2, 4]
        ]
    }
    this._notify('click', table )
  }
}

Oid.component(
{
  id: 'teste:order-by-button',
  element: 'order-by-button',
  properties: {
    name: {default: 'ordenar'}
  },
  template: html`<h1 @click>Clique para {{this.name}}</h1>`,
  implementation: OrderButton
})