import { WorldSpaceBehaviour } from "./world-space-subcomponent-behaviour.js"


export class WorldSpaceNode extends WorldSpaceBehaviour {
    /*
    Representa os nodes que estarão localizados no espaço do workflow
    
    */

    /*
    type : String
    name : String
    iconPath : String
    compatibleInputNodes : Dict{InputNumber : {typeIds:String , listRange:(int,int)}}]
    inputFields : Dict{NodeInputField}
    userInputFieldValues : TODO
    */


    constructor(type, name, compatibleInputNodes,inputFields,iconPath) {

        super();
        this.type = type;
        this.name = name;
        this.iconPath = iconPath;
        this.inputFields = inputFields;
        this.compatibleInputNodes = compatibleInputNodes;

    }

}
