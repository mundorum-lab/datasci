import { Oid } from "/lib/oidlib-dev.js";

export class BuilderOid extends Oid {
  handleGetJsonHTML(topic, message) {
    const json = JSON.parse(message.value);

    // generates the JsonHTMLDescription structure
    let jsonHTMLDescription = [];
    for (let node of json.nodes) {
      // TODO: fix component ordering, it's not working on Graph 2 scenario
      const jsonHTMLDescriptionNode = {
        component_path: node.nodePath,
        tag: node.nodeType,
        region: node.nodeRegion,
        params: [],
      };

      for (let param in node.attributes) {
        jsonHTMLDescriptionNode.params.push({
          name: param,
          value: node.attributes[param],
        });
      }
      jsonHTMLDescription.push(jsonHTMLDescriptionNode);
    }

    // sends the JsonHTMLDescription structure
    this._notify("returnJsonHTMLDescription", {
      value: JSON.stringify(jsonHTMLDescription),
    });
  }
}

Oid.component({
  id: "presentation:construtor",
  element: "construtor-oid",
  receive: ["getJsonHTML"],
  implementation: BuilderOid,
});
