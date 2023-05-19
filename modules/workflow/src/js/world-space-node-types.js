export class WorldSpaceNodeTypes {
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

  static fetchNodes() {
    // fetch a JSON from the root of the project and parse it into the variable NodeInfoLib

    fetch("/availableNodes.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.NodeInfoLib = data;
        console.log(this.NodeInfoLib);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  constructor() {
    throw "Error, this class cannot be instantiated";
  }
}
