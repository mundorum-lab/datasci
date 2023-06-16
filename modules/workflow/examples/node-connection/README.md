# Node Connections

Para exemplificar a lógica de conexão entre os nós são intanciados os nós A, B e C utilizando os componentes cadastrados em `nodeExample.json` como visto a seguir

```js
const infoA = nodeInfoLib.exampleCategory[0];
const infoB = nodeInfoLib.exampleCategory[1];
const infoC = nodeInfoLib.exampleCategory[2];

const nodeA = new WorldSpaceNode(infoA.type, "A", infoA);
const nodeB = new WorldSpaceNode(infoB.type, "B", infoB);
const nodeC = new WorldSpaceNode(infoC.type, "C", infoC);
```

Em seguida para demonstrar conexões permitidas são criados nós de destino com o quais o nó B pode se conectar e as conexões são instanciadas como visto a seguir

```js
console.log("Conectando A e Destino 1:");
Connector.makeConnection(nodeB.output[0], nodeValid1.input[0]);

console.log("Conectando A e Destino 2:");
Connector.makeConnection(nodeB.output[0], nodeValid2.input[0]);
```

Por fim, para demonstrar conexões que não são permitidas tentamos conectar os nós A e C, como visto a seguir

```js
console.log("Conectando A e C:");
Connector.makeConnection(nodeA.output[0], nodeC.input[0]);
```