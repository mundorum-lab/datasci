import { getAvailableNodes } from "/modules/manifest.js";
import { WorldSpaceNode } from "/modules/workflow/src/js/components/world-space-node.js";
import { worldSpaceNodeConnector as Connector} from "/modules/workflow/src/js/components/world-space-node-connector.js";


// Define a biblioteca com informações dos componentes
const nodeInfoLib = getAvailableNodes();
console.log("========== Conjunto de Nós disponíveis ==========");
console.log(nodeInfoLib);

// Cria alguns nós
console.log("========== Criando Nós ==========");

const infoA = nodeInfoLib.exampleCategory[0];
const infoB = nodeInfoLib.exampleCategory[1];
const infoC = nodeInfoLib.exampleCategory[2];

const nodeA = new WorldSpaceNode(infoA.type, "A", infoA);
const nodeB = new WorldSpaceNode(infoB.type, "B", infoB);
const nodeC = new WorldSpaceNode(infoC.type, "C", infoC);

console.log("Node A: ");
console.log(nodeA);

console.log("Node B: ");
console.log(nodeB);

console.log("Node C: ");
console.log(nodeC);

// Tenta criar conexões válidas entre os nós
console.log("========== Criando Conexões Válidas ==========");

const nodeValid1 = new WorldSpaceNode(infoB.type, "Valid1", infoB);
const nodeValid2 = new WorldSpaceNode(infoB.type, "Valid2", infoB);

console.log("Criando nó destino 1:");
console.log(nodeValid1);

console.log("Criando nó destino 2:");
console.log(nodeValid1);

console.log("Conectando A e Destino 1:");
Connector.makeConnection(nodeB.output[0], nodeValid1.input[0]);

console.log("Conectando A e Destino 2:");
Connector.makeConnection(nodeB.output[0], nodeValid2.input[0]);

console.log(`O Nó A (${nodeA.individualId}) está ligado aos nós de IDs ${nodeB.getTargetVertices()}`);

// Tenta criar conexões inválidas entre os nós
console.log("========== Criando Conexões Inválidas ==========");

console.log("Conectando A e C:");
Connector.makeConnection(nodeA.output[0], nodeC.input[0]);
