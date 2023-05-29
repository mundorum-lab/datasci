import { NodeInputField } from "./node-input-field.js";
import { worldSpaceNodeConnectorIn, worldSpaceNodeConnectorOut } from "./world-space-node-connector.js";
import { WorldSpaceSubcomponentBehaviour } from "./world-space-subcomponent-behaviour.js"
import { WorldSpaceNodeTypes } from "../world-space-node-types.js"


export class WorldSpaceNode extends WorldSpaceSubcomponentBehaviour {
    /*
    Representa os nodes que estarão localizados no espaço do workflow
    Possui:
        output: Lista de portas de saída e suas informações
        id: Identificador geral da função do nó
        name: Nome do nó, utilizado somente para a sua visualização
        presentable: Se o nó possui visualização gráfica ao final do workflow
        icon: Caminho para o ícone que representa visualmente o nó
        input: Lista de portas de entrada e suas informações
        fields: Lista de campos onde o usuário coloca informações para modificar o posicionamento
    
    output : [{"type": [string], "name": string, "range": [int, int]}]
    id : string
    name : string
    presentable : boolean
    icon : string
    input : [{type: [string], name: string, range: [int, int]}]
    fields : [name : string, view : string, parameters : {par1 : value01 , par2 : value02, ...}]

    Example:
        output : [{type: ["graph/scatter"], name: Saída do Gráfico, range: [1, 1]}],
        id : "visualize:scatter-plot",
        name : "Scatter Plot",
        presentable : true,
        icon : "/assets/scatter.jpg",
        input : [{type: ["input"], name: Dados, range: [1, 1]}],
        fields : {
            name : "Título", 
            view : "TextBox", 
            parameters : {
                password : false,
                maxLength : 10,
                minLength : 1,
                forbidden : ["abcde"],
                placeholder : "Insira o título aqui"
            }
        }
    */

    nodeValues = {};

    handleGetValues(key) {
        return nodeValues[key];
    }

    handleSetValues(key, value) {
        nodeValues[key] = value;
    }

    constructor(id, name) {
        super();
        var NodeInfoLib = WorldSpaceNodeTypes.NodeInfoLib;
        if (!(id in NodeInfoLib)) {
            throw `Error: ${id} is not a known node`;
        }
        var NodeInfo = NodeInfoLib[id];

        this.id = id;
        this.name = name;
        this.presentable = NodeInfo["presentable"];
        this.icon = NodeInfo["icon"];
        this.fields = [];

        for (var i = 0; i < NodeInfo["output"].length; i++) {
            var newOutput = new worldSpaceNodeConnectorOut(this);
            this.outputConnection.push(newOutput);
        }
        for (var i = 0; i < NodeInfo["input"].length; i++) {
            var compatible = NodeInfo["input"][i];
            var newInput = new worldSpaceNodeConnectorIn(this, compatible["type"], compatible["range"]);
            this.inputConnection.push(newInput);
        }
        for (var i = 0; i < NodeInfo["fields"].length; i++) {
            var fieldInfo = NodeInfo["fields"][i];
            var newField = new NodeInputField(fieldInfo["name"], fieldInfo["view"], fieldInfo["parameters"]);
            this.fields.push(newField);
        }

    }
    //fields: [ {name: string, view: string , parameters: [number or string]}]
    /*List<fields>*/ handleGetUserFields() {
        return WorldSpaceNodeTypes.NodeInfoLib[this.type]["fields"]
    }

    Destroy() {
        /*Deletes itself and removes reference from the nodes targeting it and receiving from it, safety measurement */
        //TODO ->Remove reference from the nodes receiving and giving connections to this
        super.Destroy();
    }

    //GRAPH RELATED METHODS -> WILL BE ADDED TO ITS OWN LIB ON REFACTOR

    //NODE -> VERTICE
    //EDGE -> CONNECTION

    getTargetVertices() {
        //RETURNS THE VERTICES THIS ONE IS MAKING CONNECTION **TO**
        vertices = [];

        this.outputConnection.forEach((targetInConnector) => {

            vertices.push(targetInConnector.getParentNodeId);

        });

        return vertices;

    }

    isGraphCyclic() {
        const stack = [this];
        const visited = new Set();

        while (stack.length > 0) {
            const currentNode = stack.pop();

            if (visited.has(currentNode)) {
                // Se o nó já foi visitado, indica que há um ciclo
                return true;
            }

            visited.add(currentNode);

            const targetVertices = currentNode.getTargetVertices();

            for (const targetId of targetVertices) {
                const targetNode = getById(targetId);

                if (!visited.has(targetNode)) {
                    stack.push(targetNode);
                }
            }
        }

        return false;
    }

}
