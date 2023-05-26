import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class MinimumButton extends OidUI {
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
    this._notify('click', table )
  }
}

Oid.component(
{
  id: 'teste:minimum-button',
  element: 'minimum-button',
  properties: {
    name: {default: 'mínimo'}
  },
  template: html`<h1 @click>Clique para {{this.name}}</h1>`,
  implementation: MinimumButton
})