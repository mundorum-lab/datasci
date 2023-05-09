import { Vector2 } from "./auxiliary-types.js";
import { WorldSpace } from "./world-space.js";
import { WorldSpaceNode } from "./world-space-node.js";
import { NodeInputField } from "./node-input-field.js";


var compatibleInputNodes = [
                            {types: ["TABELA", "GRAFICO","LISTA"] , range: [0,1]},
                            {types: ["SQL", "GPT"] , range: [0,1]}
];
var userFields = new NodeInputField("Gender", "Radiobutton" , ["Male,Female,Other"]);


WorldSpaceNode.AddNodeInfoToLib("TABELA","/IMAGEM/TAB.JPG",compatibleInputNodes,userFields,10);
WorldSpaceNode.AddNodeInfoToLib("GRAFICO","/IMAGEM/TAB.JPG",[],[],10);


var tn = new WorldSpaceNode("TABELA","a");


console.log(tn);
console.log(WorldSpaceNode.NodeInfoLib);
