import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class TemplatesList extends OidUI {

  // URL do arquivo JSON que contém a lista de templates
  static templatesListUrl = "./templates.json"

  // Retorna a lista de templates atráves de um GET request
  static async getTemplates() {
    const request = await fetch(this.templatesListUrl)
    const json = await request.json();
    return json
  }

  // Lida com o evento request. Envia uma mensagem de response com a lista de templates
  handleRequestTemplatesList() {
    const templates = TemplatesList.getTemplates();
    templates.then(json => {
      this._notify("responseTemplatesList", { value: JSON.stringify(json) })
    });  
  }

}

Oid.component({
  id: "templates_list",
  element: "templates-list",
  receive: ["requestTemplatesList"],
  implementation: TemplatesList,
});
