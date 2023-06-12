import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class BuilderOid extends OidUI {
  handleGetJSONHTML(_, message) {
    const template = message.value.nodes.find(
      (node) => node.region === "template"
    );

    const elements = Object.fromEntries(
      message.value.nodes
        .filter((node) => node.region !== "template")
        .map((node) => {
          return [
            node.region,
            {
              type: node.type,
              attributes: node.attributes,
              id: node.id,
            },
          ];
        })
    );

    this._notify("returnJSONHTMLDescription", {
      value: { template, elements },
    });
  }
}

Oid.component({
  id: "presentation:builder",
  element: "builder-oid",
  receive: ["getJSONHTML"],
  implementation: BuilderOid,
});
