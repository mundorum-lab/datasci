import { Oid, OidUI } from "/lib/oidlib-dev.js"

export class ConstrutorOid extends OidUI {
  function generateHTML(json2html) {
    let html = '';
    for (const key in json2html) {
      const value = json2html[key];
      html += `<div>${key}`;
      if (typeof value === 'object') {
        html += generateHTML(value);
      } else {
        html += `${value}</div>`;
      }
    }
    return html;
  }

  const htmlCode = generateHTML(json2htmlTag);
  const fs = require('fs');
  fs.writeFileSync('index.html', htmlCode);
}

Oid.component({
  id: "presentation:construtor",
  element: "construtor-oid",
  receive: ["getJsonHTML"],
  implementation: ConstrutorOid
})