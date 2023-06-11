/* Presents a Table
  *****************/

import { html, css, Oid, OidUI } from '/lib/oidlib-dev.js';

export class TableViewOid extends OidUI {
  handleSend (topic, message) {
    console.log("lalaa")
    // <TODO> replace by const table = message.value
    const table = message
    if (this._presentation && message) {
      let htmlTable = '<table>'
      if (table.columns) {
        htmlTable += '<tr>'
        for (const c of table.columns)
          htmlTable += '<th>' + c["name"] + '</th>'
        htmlTable += '</tr>'
      }
      for (const l of table.data) {
        htmlTable += '<tr>'
        for (const c of l)
          htmlTable += '<td>' + c + '</td>'
        htmlTable += '</tr>'
      }
      htmlTable += '</table>'
      this._presentation.innerHTML = htmlTable
    }      
  }
}

Oid.component({
  id: 'oid:tableview',
  element: 'table-view-oid',
  receive: {'display': 'handleSend'},
  provide: ['itf:transfer'],
  implementation: TableViewOid,
  styles: css`
  #presentation-dcc {
    overflow: scroll;
    width: 97%;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
  }
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #dddddd;
  }`,
  template: html`
  <div id="oid-prs"></div>`
})
