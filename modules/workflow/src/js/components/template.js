import { WorldSpaceNodeTypes } from "../world-space-node-types.js"
import { WorldSpaceNode } from "../components/world-space-node.js"


console.log("Testing....")



WorldSpaceNodeTypes.NodeInfoLib["TestNode"] =
{
    output: [{ id: ["Teste/Teste01/Teste02"], range: [1, 10] }],
    icon: "NoIcon.jpg",
    fields: [{ name: "FieldName", view: "ViewType", parameters: [1, 2, 3] }],
    input: [{ id: ["Teste/Teste01/Teste02"], range: [1, 10] }]

}

let a = WorldSpaceNodeTypes.NodeInfoLib["TestNode"]
console.log(a)


let node = new WorldSpaceNode("TestNode", "Nó de teste");


