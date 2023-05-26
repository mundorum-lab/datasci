import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class DeleteButton extends OidUI {
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
    let deleteColumnInput = {
      table: table,
    }
    this._notify('click', deleteColumnInput )
  }
}

Oid.component(
{
  id: 'teste:delete-button',
  element: 'delete-button',
  properties: {
    name: {default: 'deletar'}
  },
  template: html`<h1 @click>Clique para {{this.name}}</h1>`,
  implementation: DeleteButton
})