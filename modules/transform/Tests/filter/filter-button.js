import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class FilterButton extends OidUI {
  _onClick () {
    filterInput = {
        file_id: "my_file.csv",
        columns: [
            {name: "first", type: "string"},
            {name: "second", type: "int"},
        ],
        data: [
            ["value1", 1],
            ["value2",2]
        ]
    }
    this._notify('filter', )
  }
}

Oid.component(
{
  id: 'teste:filter-button',
  element: 'filter-button',
  properties: {
    name: {default: 'filtrar'}
  },
  template: html`<h1 @click>Cliqe para {{this.name}}</h1>`,
  implementation: FilterButtonOid
})