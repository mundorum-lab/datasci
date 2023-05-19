import { Oid, OidUI } from "/lib/oidlib-dev.js"

export class ImportadorOid extends OidUI {
  handleGetJsonHTMLDescription(topic, message) {
    const json = JSON.parse(message.value)
    
    // gets all the components paths removing duplicates
    const components = new Set()
    for (let node of json) {
      components.add(node.component_path)
    }

    // imports the components to the page
    const pageHead = document.querySelector("head");
    for (let path of components) {
      const script = document.createElement("script")
      script.type = "module"
      script.setAttribute("src", path)
      pageHead.appendChild(script)
    }
  }
}

Oid.component({
  id: "presentation:importador",
  element: "importador-oid",
  receive: ["getJsonHTMLDescription"],
  implementation: ImportadorOid
})