import { Vector2, userInputFieldsInfoTemplate } from "./auxiliary-types.js";
import { WorldSpace } from "./world-space.js";
import { WorldSpaceNode } from "./world-space-node.js";
import { NodeInputField } from "./node-input-field.js";
import { WorldSpaceNodeTypes } from "../world-space-node-types.js";

/*
Demonstração
*/

//Cria os conectores nos quais o nó irá receber informaçoes dos demais
var compatibleInputNodes = [

    {typesId: ["TABELA", "GRAFICO","LISTA"] , range: [0,1]},
    {typesId: ["SQL", "GPT"] , range: [0,1]}

];

//Cria os campos nos quais o usuário irá escrever
//Obs: Os identificadores e atributos utilizados são apenas exemplos
var userFields = [
    //Definição literal
    {fieldName: "Gender", inputTypeIdentifier: "Radiobutton" , inputTypeAttributes: ["Male,Female,Other"]},
    {fieldName: "Name", inputTypeIdentifier: "Textbox" , inputTypeAttributes: [20,"LETTERSONLY"]},
    //Alternativa mais limpa e sem margem para erros de escrita ou "tipagem"
    new userInputFieldsInfoTemplate("Age","Range",[12,100]) 
    //Equivalente a {fieldName: "Age", inputTypeIdentifier: "Range" , inputTypeAttributes: [12,100]}
];

//Tenta criar um nó, mas vai gerar um erro, o tipo "TABELA" ainda não existe no contexto
//var _testNode= new WorldSpaceNode("TABELA","Nome bem bonitinho");

//Registra as informações dos nós para serem usadas
WorldSpaceNodeTypes.AddNodeInfoToLib("TABELA","/IMAGEM/TAB.JPG",compatibleInputNodes,userFields,10);


//Cria um nó
var _testNode= new WorldSpaceNode("TABELA","Nome bem bonitinho");

//Está funcionando !
console.log(WorldSpaceNode.NodeInfoLib);
console.log(WorldSpace.onWorldSpaceComponents);
console.log(_testNode);

var tipoNode = _testNode.type;
console.log(WorldSpaceNodeTypes.NodeInfoLib[tipoNode].userInputFieldsDefinition);


console.log(_testNode.getUserFields());