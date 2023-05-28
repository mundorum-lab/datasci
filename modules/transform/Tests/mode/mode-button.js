import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class MeanButton extends OidUI {
  _onClick () {
  
    let table = {
        file_id: "my_file.csv",
        columns: [
            {name: "first", type: "string"},
            {name: "second", type: "number"},
        ],
        data: [
            ["value1", 1],
            ["value2",2],
            ["value3", 2],
            ["value4", 1],
          ]
    }
    this._notify('click', table)
  }
}

Oid.component(
{
  id: 'teste:mode-button',
  element: 'mode-button',
  properties: {
    name: {default: 'moda'}
  },
  template: html`<h1 @click>Clique para {{this.name}}</h1>`,
  implementation: MeanButton
})