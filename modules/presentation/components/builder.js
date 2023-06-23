import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class BuilderOid extends OidUI {
  handleGetJSONHTML(_, message) {
    const template = message.value.nodes.find(
      (node) => node.region === "template"
    );

    const elementEdges = {};

    message.value.edges.forEach(([source, target], idx) => {
      const sourceNode = message.value.nodes.find((node) => node.id === source);
      const targetNode = message.value.nodes.find((node) => node.id === target);

      const sourceNodePublishers = sourceNode.output
        .map((output) => `${output.topic}~presentation/connection${idx}`)
        .join(";");

      const targetNodeSubscribers = targetNode.input
        .map((input) => `presentation/connection${idx}~${input.topic}`)
        .join(";");

      if (!elementEdges[sourceNode.id]) {
        elementEdges[sourceNode.id] = {};
      }

      if (!elementEdges[targetNode.id]) {
        elementEdges[targetNode.id] = {};
      }

      if (!elementEdges[sourceNode.id].publish) {
        elementEdges[sourceNode.id].publish = [];
      }

      if (!elementEdges[targetNode.id].subscribe) {
        elementEdges[targetNode.id].subscribe = [];
      }

      elementEdges[sourceNode.id].publish.push(sourceNodePublishers);
      elementEdges[targetNode.id].subscribe.push(targetNodeSubscribers);
    });

    const flattenedElementEdges = Object.fromEntries(
      Object.entries(elementEdges).map(([key, value]) => {
        const flattened = {};

        if (value.publish) {
          flattened.publish = value.publish.join(";");
        }

        if (value.subscribe) {
          flattened.subscribe = value.subscribe.join(";");
        }

        return [key, flattened];
      })
    );

    const elements = Object.fromEntries(
      message.value.nodes
        .filter((node) => node.region !== "template")
        .map((node) => {
          return [
            node.region ?? `unpresentable${node.id}`,
            {
              type: node.type,
              attributes: {
                ...node.attributes,
                ...flattenedElementEdges[node.id],
              },
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
