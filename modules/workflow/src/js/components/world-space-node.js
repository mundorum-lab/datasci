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

    connectedOnInput : List<WorldSpaceNodeIn>  -> Stores the connectors state in the input
    connectedOnOutput: List<WorldSpaceNodeOut>  -> Stores the connectors state in the output


    */


    constructor(type, name, compatibleInputNodes,userInputFields,iconPath) {

        // compatibleInputNodes : [({typeIds:String} , listRange:(int,int))]
        // ->List of tuples, each tuple stores a dict of connectable types and the connections range
        
        super();
        this.type = type;
        this.name = name;
        this.iconPath = iconPath;
        this.userInputFields = userInputFields;
        this.compatibleInputNodes = compatibleInputNodes;
        

        this.connectedOnInput = []
        this.connectedOnOutput =[]

    }

}
