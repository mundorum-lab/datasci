export class WorldSpaceNodeTypes{

    /*static NodeInfoLib = 
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


    constructor(){
        throw "Error, this class cannot be instantiated";
    }
    
    
    static AddNodeInfoToLib(type = "",iconPath = "",compatibleInputNodes=[],userInputFieldsDefinition=[],outputNodesAmmount=0 ){
        /*
        
        Adds a node to the available nodes lib, making it useable
        */


        // compatibleInputNodes : [{typesId : [String] , range [int,int]}]
        // ->List of tuples, each tuple stores a dict of connectable types and the connections range
        //Tuples are represented as lists
        
        WorldSpaceNodeTypes.NodeInfoLib[type] = {};
        var NodeInfo = WorldSpaceNodeTypes.NodeInfoLib[type];

        NodeInfo["iconPath"] = iconPath;
        NodeInfo["userInputFieldsDefinition"] = userInputFieldsDefinition;
        NodeInfo["compatibleInputNodes"] = compatibleInputNodes;
        NodeInfo["outputNodesAmmount"] = outputNodesAmmount;

    }
    
}