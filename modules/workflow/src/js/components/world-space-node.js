import { NodeInputField } from "./node-input-field.js";
import { worldSpaceNodeConnectorIn, worldSpaceNodeConnectorOut } from "./world-space-node-connector.js";
import { WorldSpaceSubcomponentBehaviour } from "./world-space-subcomponent-behaviour.js"


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


    SUGGESTION:
    static NodeInfoLib = 
    {
        type: 
        {
            iconPath : String ,
            userInputFieldsDefinition: [ {fieldName: String, inputTypeIdentifier: String , inputTypeAttributes: Array}] , 
            compatibleInputNodes :[{typesId : [String] , range [int,int]}, ...],
            outputNodesAmmount : int
        } , ...
    }
    */
    static NodeInfoLib = {};

    constructor(type,name) {
        super();
        
        if(!(type in WorldSpaceNode.NodeInfoLib)){
            console.warn(`Error: ${type} is not a known node type`);
            return;
        }
        var NodeInfo =  WorldSpaceNode.NodeInfoLib[type]; 
        this.type = type;
        this.name = name;
        this.iconPath = NodeInfo["iconPath"];
                
        this.outputConnection = [];
        this.inputConnection = [];
        this.userInputFields = [];

        for(var i = 0 ; i < NodeInfo["outputNodesAmmount"] ; i ++){
            var newOutput = new worldSpaceNodeConnectorOut(this);
            this.outputConnection.push(newOutput);

        }
        for(var i = 0 ; i <NodeInfo["compatibleInputNodes"].length ; i ++){
            var compatible = NodeInfo["compatibleInputNodes"][i];
            console.log(compatible);
            var newInput = new worldSpaceNodeConnectorIn(this,compatible["typesId"],compatible["range"]);
            this.inputConnection.push(newInput);

        }
        for(var i = 0; i < NodeInfo["userInputFieldsDefinition"].length ; i ++){
            var fieldInfo = NodeInfo["userInputFieldsDefinition"][i];
            var newField = new NodeInputField(fieldInfo["fieldName"] ,fieldInfo["inputTypeIdentifier"] , fieldInfo["inputTypeParameter"] );
            this.userInputFields.push(newField);

        }

    }

    static AddNodeInfoToLib(type = "",iconPath = "",compatibleInputNodes=[],userInputFieldsDefinition=[],outputNodesAmmount=0 ){
        
        // compatibleInputNodes : [{typesId : [String] , range [int,int]}]
        // ->List of tuples, each tuple stores a dict of connectable types and the connections range
        //Tuples are represented as lists
        
        WorldSpaceNode.NodeInfoLib[type] = {};
        var NodeInfo = WorldSpaceNode.NodeInfoLib[type];

        NodeInfo["iconPath"] = iconPath;
        NodeInfo["userInputFieldsDefinition"] = userInputFieldsDefinition;
        NodeInfo["compatibleInputNodes"] = compatibleInputNodes;
        NodeInfo["outputNodesAmmount"] = outputNodesAmmount;

    }

    Destroy(){
        /*Deletes itself and removes reference from the nodes targeting it and receiving from it, safety measurement */
        //TODO ->Remove reference from the nodes receiving and giving connections to this
        super.Destroy()

    }


    

}
