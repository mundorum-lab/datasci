import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ColumnOpButton extends OidUI {
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
  id: 'teste:column-op-button',
  element: 'column-op-button',
  properties: {
    name: {default: 'fazer operação'}
  },
  template: html`<h1 @click>Clique para {{this.name}}</h1>`,
  implementation: ColumnOpButton
})