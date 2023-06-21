import { Oid, OidUI } from "/lib/oidlib-dev.js";
import templatesList from "../templates.json";

export class TemplatesLister extends OidUI {
  // Lida com o evento request. Envia uma mensagem de response com a lista de templates
  handleRequestTemplatesList() {
    this._notify("responseTemplatesList", { value: templatesList });
  }
}

Oid.component({
  id: "presentation:template-lister",
  element: "template-lister-oid",
  receive: ["requestTemplatesList"],
  implementation: TemplatesLister,
});
