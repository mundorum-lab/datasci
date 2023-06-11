export class WorldSpaceNodeTypes {
  /*static NodeInfoLib = 
    {
        type: 
        {
            output :[{id : [string], range [int, int]}, ...],
            icon : string,
            fields: [ {name: string, view: string , parameters: [number or string]}], 
            input :[{id : [string], range [int, int]}, ...],
        } , ...
    }
    */


  /**
   * The library of node information.
   * @type {Object.<string, {
   *  output: Array.<{id:Array.<string>,range: [number,number]}>,
   *  icon: string,
   *  fields: Array.<{name: string,view:string,parameters:Array<any}>,
   *  input: Array.<{id:Array.<string>,range: [number,number]}>
   * }>}
   */


  static NodeInfoLib = {};





  static fetchNodes() {
    // fetch a JSON from the root of the project and parse it into the variable NodeInfoLib
    // this is a static method, so it can be called without creating an instance of the class

    let a = WorldSpaceNodeTypes.NodeInfoLib[0];

    fetch("/availableCategories.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        for (let node in data) {
          fetch(data[node].url).then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
            .then((categoryData) => {
              this.NodeInfoLib[data[node].name] = categoryData;
            }).catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  constructor() {
    throw "Error, this class cannot be instantiated";
  }
}
