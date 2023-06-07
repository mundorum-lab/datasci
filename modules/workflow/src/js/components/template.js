import { WorldSpaceNodeTypes } from "../world-space-node-types.js"
import { WorldSpaceNode } from "../components/world-space-node.js"
import { worldSpaceNodeConnector } from "./world-space-node-connector.js"


console.log("Testing....")



WorldSpaceNodeTypes.NodeInfoLib["TestNode"] =
{
    output: [{ id: ["Teste/Teste01/Teste02"], range: [1, 10] },
    ],
    icon: "NoIcon.jpg",
    fields: [{ name: "FieldName", view: "ViewType", parameters: [1, 2, 3] }],
    input: [{ id: ["Teste/Teste01/Teste02"], range: [1, 10] },
    { id: ["Teste/Teste01/Teste02"], range: [1, 10] }]

}

let a = WorldSpaceNodeTypes.NodeInfoLib["TestNode"]
console.log(a)


let nodeA = new WorldSpaceNode("TestNode", "Nó de teste A");
let nodeB = new WorldSpaceNode("TestNode", "Nó de teste B");
let nodeC = new WorldSpaceNode("TestNode", "Nó de teste C");
let nodeD = new WorldSpaceNode("TestNode", "Nó de teste D");
let inputA = nodeA.input[0]
let outputA = nodeA.output[0]
let inputB = nodeB.input[0]
let inputB1 = nodeB.input[1]
let outputB = nodeB.output[0]
let inputC = nodeC.input[0]
let outputC = nodeC.output[0]
let inputD = nodeD.input[0]
let outputD = nodeD.output[0]

console.log(nodeB)
worldSpaceNodeConnector.makeConnection(outputA, inputB)
worldSpaceNodeConnector.makeConnection(outputA, inputC)
worldSpaceNodeConnector.makeConnection(outputA, inputB1) //Should connect (to be fixed)

console.log(inputA.getParentNode().getTargetVertices())
//inputB.removeConnection(outputA)




