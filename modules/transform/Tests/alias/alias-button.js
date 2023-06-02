import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class AliasButton extends OidUI {
  _onClick () {
  
    let table = {
        file_id: "my_file.csv",
        columns: [
            {name: "first", type: "string"},
            {name: "second", type: "number"},
            {name: "third", type: "number"},
        ],
        data: [
            ["value1", 4, 3],
            ["value2", 8, 4]
        ]
    }
    this._notify('click', table )
  }
}

Oid.component(
{
  id: 'teste:alias-button',
  element: 'alias-button',
  properties: {
    name: {default: 'renomear'}
  },
  template: html`<h1 @click>Clique para {{this.name}}</h1>`,
  implementation: AliasButton
})