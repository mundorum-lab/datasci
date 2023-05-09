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
            userInputFields: List<NodeInputField> , 
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
        
                
        this.outputConnection = [];
        this.inputConnection = [];

        for(var i = 0 ; i < NodeInfo["outputNodesAmmount"] ; i ++){
            var newOutput = new worldSpaceNodeConnectorOut(this);
            this.outputConnection.push(newOutput);

        }
        for(var i = 0 ; i <NodeInfo["compatibleInputNodes"].length ; i ++){
            var compatible = NodeInfo["compatibleInputNodes"];
            var newInput = new worldSpaceNodeConnectorIn(this,compatible["typesId"],compatible["range"]);
            this.inputConnection.push(newInput);

        }

        /*
        //Initialize the intput and output connections, the output connections don't have limitations ATM
        for (let i = 0; i < compatibleInputNodes.length; i++) {
            newInputNode = worldSpaceNodeConnectorIn(NodeInfo,compatibleInputNodes[i][0],compatibleInputNodes[i][1]) 
            NodeInfo.inputConnection.push(newInputNode)
        }
        for (let i = 0; i < outputNodesAmmount.length; i++) {
            newOutputNode = worldSpaceNodeConnectorOut(NodeInfo) 
            NodeInfo.outputConnection.push(newOutputNode)
        }

*/

    }

    static AddNodeInfoToLib(type = "",iconPath = "",compatibleInputNodes=[],userInputFields=[],outputNodesAmmount=0 ){
        
        // compatibleInputNodes : [{typesId : [String] , range [int,int]}]
        // ->List of tuples, each tuple stores a dict of connectable types and the connections range
        //Tuples are represented as lists
        
        WorldSpaceNode.NodeInfoLib[type] = {};
        var NodeInfo = WorldSpaceNode.NodeInfoLib[type];

        NodeInfo["iconPath"] = iconPath;
        NodeInfo["userInputFields"] = userInputFields;
        NodeInfo["compatibleInputNodes"] = compatibleInputNodes;
        NodeInfo["outputNodesAmmount"] = outputNodesAmmount;

    }

    Destroy(){
        /*Deletes itself and removes reference from the nodes targeting it and receiving from it, safety measurement */
        //TODO ->Remove reference from the nodes receiving and giving connections to this
        super.Destroy()

    }


    

}
