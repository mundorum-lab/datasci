import { Oid, OidUI } from "/lib/oidlib-dev.js"

export class ApresentadorOid extends OidUI {
  // TODO
}

Oid.component({
  id: "presentation:apresentador",
  element: "apresentador-oid",
  receive: ["getJsonHTML"],
  implementation: ApresentadorOid
})