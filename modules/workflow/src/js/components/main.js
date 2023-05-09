import { Vector2 } from "./auxiliary-types.js";
import { WorldSpace } from "./world-space.js";
import { WorldSpaceNode } from "./world-space-node.js";
import { NodeInputField } from "./node-input-field.js";

/*
Demonstração
*/

//Cria os conectores nos quais o nó irá receber informaçoes dos demais
var compatibleInputNodes = [

    {typesId: ["TABELA", "GRAFICO","LISTA"] , range: [0,1]},
    {typesId: ["SQL", "GPT"] , range: [0,1]}

];

//Cria os campos nos quais o usuário irá escrever
var userFields = [
    
    {fieldName: "Gender", inputTypeIdentifier: "Radiobutton" , inputTypeAttributes: ["Male,Female,Other"]},
    {fieldName: "Name", inputTypeIdentifier: "Textbox" , inputTypeAttributes: [20,"LETTERSONLY"]},

];

//Registra as informações dos nós para serem usadas
WorldSpaceNode.AddNodeInfoToLib("TABELA","/IMAGEM/TAB.JPG",compatibleInputNodes,userFields,10);



var _testNode= new WorldSpaceNode("TABELA","Nome bem bonitinho");


console.log(_testNode);


console.log(WorldSpaceNode.NodeInfoLib["TABELA"] );
