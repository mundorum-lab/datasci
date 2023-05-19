import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class MaximumButton extends OidUI {
  _onClick () {
  
    let table = {
        file_id: "my_file.csv",
        columns: [
            {name: "first", type: "string"},
            {name: "second", type: "number"},
        ],
        data: [
            ["value1", 1],
            ["value2",2]
        ]
    }
    let maximumInput = {
      table: table,
      column: "second",
    }
    this._notify('click', maximumInput )
  }
}

Oid.component(
{
  id: 'teste:maximum-button',
  element: 'maximum-button',
  properties: {
    name: {default: 'máximo'}
  },
  template: html`<h1 @click>Clique para {{this.name}}</h1>`,
  implementation: MaximumButton
})