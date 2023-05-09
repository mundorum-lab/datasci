import { Vector2 } from "./auxiliary-types.js";
import { WorldSpace } from "./world-space.js";
import { WorldSpaceNode } from "./world-space-node.js";

new WorldSpaceNode("a","a");
new WorldSpaceNode("b","b");
new WorldSpaceNode("c","c");
new WorldSpaceNode("d","d");
console.log(WorldSpace.createdWSSubcomponentsAmmount);
console.log(WorldSpace.onWorldSpaceComponents);

WorldSpaceNode.AddNodeInfoToLib("TABELA","/IMAGEM/TAB.JPG",[],[],10);
WorldSpaceNode.AddNodeInfoToLib("GRAFICO","/IMAGEM/TAB.JPG",[],[],10);


console.log(WorldSpaceNode.NodeInfoLib);