import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class JoinOtherButton extends OidUI {
  _onClick () {
  
    let table = {
        file_id: "my_file.csv",
        columns: [
            {name: "other_first", type: "string"},
            {name: "second", type: "number"},
            {name: "other_third", type: "number"},
        ],
        data: [
            ["value1_new", 4, 6],
            ["value2_new", 7, 8]
        ]
    }
    this._notify('click', table )
  }
}

Oid.component(
{
  id: 'teste:join-other-button',
  element: 'join-other-button',
  properties: {
    name: {default: 'mesclar'}
  },
  template: html`<h1 @click>Clique para {{this.name}}</h1>`,
  implementation: JoinOtherButton
})