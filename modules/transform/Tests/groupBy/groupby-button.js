import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class GroupbyButton extends OidUI {
  _onClick () {
  
    let table = {
        file_id: "my_file.csv",
        columns: [
            {name: "first", type: "string"},
            {name: "second", type: "number"},
        ],
        data: [
            [3, 1],
            [3,2],
            [3,1]
        ]
    }
    console.log("click")
    this._notify('click', table )
  }
}

Oid.component(
{
  id: 'teste:groupby-button',
  element: 'groupby-button',
  properties: {
    name: {default: 'agrupar'}
  },
  template: html`<h1 @click>Clique para {{this.name}}</h1>`,
  implementation: GroupbyButton
})