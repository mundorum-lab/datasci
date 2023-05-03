import { worldSpaceNodeConnectorIn, worldSpaceNodeConnectorOut } from "./world-space-node-connector.js";
import { WorldSpaceBehaviour } from "./world-space-subcomponent-behaviour.js"


export class WorldSpaceNode extends WorldSpaceBehaviour {
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


    */


    constructor(type, name,iconPath,userInputFields,compatibleInputNodes,outputNodesAmmount) {

        // compatibleInputNodes : [[{typeIds:String} ,[int,int]], ..., ...]
        // ->List of tuples, each tuple stores a dict of connectable types and the connections range
        //Tuples are represented as lists
        super();
        this.type = type;
        this.name = name;
        this.iconPath = iconPath;
        this.userInputFields = userInputFields;
        this.compatibleInputNodes = compatibleInputNodes;
        

        this.inputConnection = []
        this.outputConnection =[]


        //Initialize the intput and output connections, the output connections don't have limitations ATM
        for (let i = 0; i < compatibleInputNodes.length; i++) {
            newInputNode = worldSpaceNodeConnectorIn(this,compatibleInputNodes[i][0],compatibleInputNodes[i][1]) 
            this.inputConnection.push(newInputNode)
        }
        for (let i = 0; i < outputNodesAmmount.length; i++) {
            newOutputNode = worldSpaceNodeConnectorOut(this) 
            this.outputConnection.push(newOutputNode)
        }


    }

    

}
