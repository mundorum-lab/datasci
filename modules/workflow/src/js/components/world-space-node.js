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
   
    userInputFields : Dict{NodeInputField}

    inputConnection : List<WorldSpaceNodeIn>  -> Stores the connectors state in the input
    outputConnection: List<WorldSpaceNodeOut>  -> Stores the connectors state in the output


    SUGGESTION:
    static NodeInfoLib = {type: {iconPath : String ,
         userInputFields: Dict{NodeInputField} , 
         compatibleInputNodes : [[{typeIds:String} ,[int,int]], ..., ...]},
        outputNodesAmmount : int}
    */
    static NodeInfoLib = {};

    constructor(type,name) {

        super();
        this.type = type;
        this.name = name;
        


    }

    static AddNodeInfoToLib(type = "",iconPath = "",userInputFields=[],compatibleInputNodes=[],outputNodesAmmount=0 ){
        
        // compatibleInputNodes : [[{typeIds:String} ,[int,int]], ..., ...]
        // ->List of tuples, each tuple stores a dict of connectable types and the connections range
        //Tuples are represented as lists
        
        WorldSpaceNode.NodeInfoLib[type] = {};
        var NodeInfo = WorldSpaceNode.NodeInfoLib[type];

        NodeInfo["iconPath"] = iconPath;
        NodeInfo["userInputFields"] = userInputFields;
        NodeInfo["compatibleInputNodes"] = compatibleInputNodes;
        
        
        NodeInfo.inputConnection = [];
        NodeInfo.outputConnection =[];

    
        //Initialize the intput and output connections, the output connections don't have limitations ATM
        for (let i = 0; i < compatibleInputNodes.length; i++) {
            newInputNode = worldSpaceNodeConnectorIn(NodeInfo,compatibleInputNodes[i][0],compatibleInputNodes[i][1]) 
            NodeInfo.inputConnection.push(newInputNode)
        }
        for (let i = 0; i < outputNodesAmmount.length; i++) {
            newOutputNode = worldSpaceNodeConnectorOut(NodeInfo) 
            NodeInfo.outputConnection.push(newOutputNode)
        }



    }

    Destroy(){
        /*Deletes itself and removes reference from the nodes targeting it and receiving from it, safety measurement */
        //TODO ->Remove reference from the nodes receiving and giving connections to this
        super.Destroy()

    }


    

}
