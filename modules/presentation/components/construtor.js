import { Oid, OidUI } from "/lib/oidlib-dev.js"

export class ConstrutorOid extends OidUI {
  // TODO
}

Oid.component({
  id: "presentation:construtor",
  element: "construtor-oid",
  receive: ["getJsonHTML"],
  implementation: ConstrutorOid
})