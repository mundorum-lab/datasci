import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class TemplatesList extends OidUI {
  // Esse método lida com o evento request.
  handleRequest() {
    // Carregamos a lista de templates atráves de uma GET request.
    fetch("./templates.json")
      .then((res) => res.json())
      .then((data) => {
        // Enviamos um evento-resposta contendo os valores carregados.
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
