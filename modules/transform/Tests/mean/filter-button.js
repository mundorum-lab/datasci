import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class FilterButton extends OidUI {
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
    let meanInput = {
      table: table,
      column: "second",
    }
    console.log("clicou 12312313")
    this._notify('click', meanInput )
  }
}

Oid.component(
{
  id: 'teste:filter-button',
  element: 'filter-button',
  properties: {
    name: {default: 'filtrar'}
  },
  template: html`<h1 @click>Clique para {{this.name}}</h1>`,
  implementation: FilterButton
})