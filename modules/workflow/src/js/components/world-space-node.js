import { NodeInputField } from "./node-input-field.js";
import { worldSpaceNodeConnectorIn, worldSpaceNodeConnectorOut } from "./world-space-node-connector.js";
import { WorldSpaceSubcomponentBehaviour } from "./world-space-subcomponent-behaviour.js"
import { WorldSpaceNodeTypes } from "../world-space-node-types.js"


export class WorldSpaceNode extends WorldSpaceSubcomponentBehaviour {
    /*
    Representa os nodes que estarão localizados no espaço do workflow
    
    */

    /*
    type : String
    name : String
    iconPath : String
   
    userInputFields : List<NodeInputField>

    inputConnection : List<WorldSpaceNodeIn>  -> Stores the connectors state in the input
    outputConnection: List<WorldSpaceNodeOut>  -> Stores the connectors state in the output

    NodeUserInputParameters = {string : string}
    Ex:
    NodeUserInputParemeters = {
        Nome:"Renan",
        CPF: "123.456.789-10"
    }


    */

    nodeValues = {};

    handleGetValues(key) {
        return nodeValues[key];
    }

    handleSetValues(key, value) {
        nodeValues[key] = value;
    }


    constructor(type, name) {
        super();
        var NodeInfoLib = WorldSpaceNodeTypes.NodeInfoLib;
        if (!(type in NodeInfoLib)) {
            throw `Error: ${type} is not a known node type`;
        }
        var NodeInfo = NodeInfoLib[type];


        this.type = type;
        this.name = name;
        this.iconPath = NodeInfo["iconPath"];

        this.outputConnection = [];
        this.inputConnection = [];
        this.userInputFields = [];

        this.nodeUserInputParameters = {};

        for (var i = 0; i < NodeInfo["outputNodesAmmount"]; i++) {
            var newOutput = new worldSpaceNodeConnectorOut(this);
            this.outputConnection.push(newOutput);

        }
        for (var i = 0; i < NodeInfo["compatibleInputNodes"].length; i++) {
            var compatible = NodeInfo["compatibleInputNodes"][i];
            var newInput = new worldSpaceNodeConnectorIn(this, compatible["typesId"], compatible["range"]);
            this.inputConnection.push(newInput);

        }
        for (var i = 0; i < NodeInfo["userInputFieldsDefinition"].length; i++) {
            var fieldInfo = NodeInfo["userInputFieldsDefinition"][i];
            var newField = new NodeInputField(fieldInfo["fieldName"], fieldInfo["inputTypeIdentifier"], fieldInfo["inputTypeParameter"]);
            this.userInputFields.push(newField);

        }

    }
    //userInputFieldsDefinition: [ {fieldName: String, inputTypeIdentifier: String , inputTypeAttributes: Array}] , 
    /*List<userInputFieldsDefinition>*/ handleGetUserFields() {
        return WorldSpaceNodeTypes.NodeInfoLib[this.type].userInputFieldsDefinition
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
