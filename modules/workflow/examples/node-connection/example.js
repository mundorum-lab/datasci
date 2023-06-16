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

// Testa se faz conexoes ciclicas
console.log("========== Criando Conexões Cíclicas ==========");
const nodeD = new WorldSpaceNode(infoB.type, "D", infoB);
const nodeValid3 = new WorldSpaceNode(infoB.type, "Valid3", infoB);
console.log("Tentando conectar D e Valid3");
Connector.makeConnection(nodeD.output[0], nodeValid3.input[0]);
console.log("Tentando conectar Valid3 e D");
Connector.makeConnection(nodeValid3.output[0], nodeD.input[0]);

// Testa se faz conexoes nao ciclicas com bifurcacao
console.log("========== Criando Conexões Não Cíclicas ==========");
const nodeB2 = new WorldSpaceNode(infoB.type, "B2", infoB);
const nodeValid4 = new WorldSpaceNode(infoB.type, "Valid4", infoB);
const nodeValid5 = new WorldSpaceNode(infoB.type, "Valid5", infoB);
const nodeC2 = new WorldSpaceNode(infoB.type, "C2", infoB);
console.log("Tentando conectar B2 e Valid4");
Connector.makeConnection(nodeB2.output[0], nodeValid4.input[0]);
console.log("Tentando conectar B2 e Valid5");
Connector.makeConnection(nodeB2.output[0], nodeValid5.input[0]);
console.log("Tentando conectar Valid4 e C2");
Connector.makeConnection(nodeValid4.output[0], nodeC2.input[0]);
console.log("Tentando conectar Valid5 e C2");
Connector.makeConnection(nodeValid5.output[0], nodeC2.input[0]);
// Continuando o teste mas agora tentando criar um ciclo
console.log("Continuando o teste anterior criando um ciclo");
console.log("Tentando conectar C2 com B2");
Connector.makeConnection(nodeC2.output[0], nodeB2.input[0]);

console.log("========== Criando Autoconexão ==========");
const nodeE = new WorldSpaceNode(infoB.type, "E", infoB);
console.log("Tentando conectar E e E");
Connector.makeConnection(nodeE.output[0], nodeE.input[0]);
const nodeValid6 = new WorldSpaceNode(infoB.type, "Valid6", infoB);
console.log("Tentando conectar Valid6 e Valid6");
Connector.makeConnection(nodeValid6.output[0], nodeValid6.input[0]);
