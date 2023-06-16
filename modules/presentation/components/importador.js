import { Oid, OidUI } from "/lib/oidlib-dev.js"

export class ImportadorOid extends OidUI {
  // TODO
}

Oid.component({
  id: "presentation:importador",
  element: "importador-oid",
  receive: ["getJsonHTML"],
  implementation: ImportadorOid
})