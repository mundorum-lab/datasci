import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class PresenterOid extends OidUI {
  handleGetJsonHTMLDescription(topic, message) {
    const json = JSON.parse(message.value);

    let template_tag = null;
    let regions = {};

    // hide the button-oid elements
    document
      .querySelectorAll("button-oid")
      .forEach((button) => (button.style.display = "none"));

    for (let node of json) {
      // if the node is a template, we need to save the tag to create the template later
      if (node.region == "template") {
        template_tag = node.tag;
        continue;
      }

      // if the region doesn't exist, we need to create it
      if (regions[node.region] == undefined) {
        regions[node.region] = [];
      }

      // create the HTML node and add it to the region array of nodes
      let nodeHTMLparams = node.params
        .map((param) => `${param.name}="${param.value}"`)
        .join(" ")
        .replace(/"/g, "'");
      let nodeHTML = `<${node.tag} ${nodeHTMLparams} class="component"></${node.tag}>`;
      regions[node.region].push(nodeHTML);
    }

    // create the template and add it to the body
    const template = document.createElement(template_tag);
    for (let region in regions) {
      template.setAttribute(region, regions[region].join(""));
    }
    document.querySelector("body").appendChild(template);
  }
}

Oid.component({
  id: "presentation:apresentador",
  element: "apresentador-oid",
  receive: ["getJsonHTMLDescription"],
  implementation: PresenterOid,
});
