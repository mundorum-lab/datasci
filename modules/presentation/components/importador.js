import { Oid, OidUI } from "/lib/oidlib-dev.js"

export class ImportadorOid extends OidUI {
  function getJSON(json_parameters) {
    let data = JSON.parse(json_parameters);
    
    //Pega alguns parametros do JSON
    let titulo = data.title;
    let description = data.description;
  
  }
}

Oid.component({
  id: "presentation:importador",
  element: "importador-oid",
  receive: ["getJsonHTML"],
  implementation: ImportadorOid
})