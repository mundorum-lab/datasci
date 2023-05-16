import { Oid, OidUI } from "/lib/oidlib-dev.js"

export class ConstrutorOid extends OidUI {
  function node2json2html(WorkflowState) {
    const { nodeId, nodeType, attributes } = node;
    const json2htmlTag = {};

    for (const key in attributes) {
      const attr = attributes[key];
      const div = `<div class="Oid${key}">`;
      json2htmlTag[div] = attr;
    }

    let json2html = {};
    for (const [div, attr] of json2htmlTag) {
      const nestedNode = { [div]: attr };
      json2html = { ...json2html, ...nestedNode };
    }

    return { [`<div class="Oid${nodeType}">`]: json2html };
  }
}

Oid.component({
  id: "presentation:construtor",
  element: "construtor-oid",
  receive: ["getJsonHTML"],
  implementation: ConstrutorOid
})