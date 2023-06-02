import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class FilterButton extends OidUI {
  _onClick () {
  
    let table = {
        file_id: "my_file.csv",
        columns: [
            {name: "first", type: "number"},
            {name: "second", type: "number"},
            {name: "third", type: "string"},
        ],
        data: [
            [3, 1, "hey"],
            [3,2, "au"],
            [3,1, "qs"]
        ]
    }
    console.log("click")
    this._notify('click', table )
  }
}

Oid.component(
{
  id: 'teste:groupby-button',
  element: 'filter-button',
  properties: {
    name: {default: 'filtrar'}
  },
  template: html`<h1 @click>Clique para {{this.name}}</h1>`,
  implementation: FilterButton
})