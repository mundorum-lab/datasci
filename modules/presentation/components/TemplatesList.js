import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class TemplatesList extends OidUI {
  handleRequest() {
    fetch("./templates.json")
      .then((res) => res.json())
      .then((data) => {
        this._notify("response", { value: JSON.stringify(data) });
      });
  }
}

Oid.component({
  id: "templates_list",
  element: "templates-list",
  receive: ["request"],
  implementation: TemplatesList,
});
