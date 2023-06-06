import { html, Oid, OidUI } from "/lib/oidlib-dev.js";

export class getTablesOid extends OidUI {
  handleget_tables(topic, message) {
    self._notify("output", {
      value: JSON.stringify("oi"),
    });
  }
}

Oid.component({
  id: "ex:gettables",
  element: "gettables-oid",
  properties: {
    id: { default: "1" },
  },
  receive: ["get_tables"],
  implementation: getTablesOid,
});