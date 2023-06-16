import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class PresenterOid extends OidUI {
  currentDescription;
  template;

  clear() {
    if (this.template) {
      this.shadowRoot.removeChild(this.template);
      this.template = undefined;
    }
  }

  handleGetJSONHTMLDescription(_, message) {
    this.clear();
    this.currentDescription = message.value;

    const template = document.createElement(
      this.currentDescription.template.type
    );
    template.id = "template";
    template.setAttribute("publish", "ready~presentation/template");
    template.classList.add("flex-grow", "flex", "flex-col");

    this.template = template;

    this.shadowRoot.appendChild(template);
  }

  handleTemplateReady() {
    Object.entries(this.currentDescription.elements).forEach(
      ([region, elementDef]) => {
        const element = document.createElement(elementDef.type);
        element.id = `node-${elementDef.id}`;

        Object.entries(elementDef.attributes).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });

        this.template.shadowRoot.getElementById(region).appendChild(element);
      }
    );
  }

  handleTabChanged(_, message) {
    if (message.value == "workflow") {
      this.clear();
    }
  }
}

Oid.component({
  id: "presentation:presenter",
  element: "presenter-oid",
  receive: ["getJSONHTMLDescription", "templateReady", "tabChanged"],
  template: "",
  implementation: PresenterOid,
});
