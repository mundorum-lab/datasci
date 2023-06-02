/**
 * @typedef {Object.<string, any>} attributes
 */
export class GraphOutMessage{


    constructor(nodeGraph){
        
        this.nodeGraph = nodeGraph

    }

    outputToBus(graphRepresentation){

    }

    /*private*/getAttributesRepresentation(fields){
        /*
        Get the fields from the node and returns the output representation of it containing the fieldname and its value
        E.G:

        */
       


        let attributes = {}
            for(let j = 0; j < fields.length;j++){
                curField = fields[i]
                attributes[curField.getName()] = curField.handleGetInputValue();
            }
        return attributes
    }
    getGraphRepresentation(){
        /*
        "nodes": [{
            "id": int,
            "type": string,
            "attributes": {...}
          }]

        The id is not the same as the NodeId, it's easier to work with the new values E.G:
          Workflow Nodes Ids:                   Output ids:
          [33,22,43,543,657,123,123]            [0,1,2,3,4,5,6]
        */

        /**
         * Stores attributes.
         * @type {[
         *      {     
         * id:Number,
         * type:String,   
         * attributes : attributes
         * }
         * ]}
         */

        let nodes = []


        /**
         * Stores edges.
         * @type {Array.<Array.<number,number>>}
        */
        let edges = []
        
        /**
        * Stores edges.
        * @type {Object.<Number, Number>}
        */
        let newIds = {}

        for(let i = 0 ; i < this.nodeGraph.length; i++){
            
            //Register the newIds and add the nodes

            let currentNode = this.nodeGraph[i]

            currentId = currentNode.getId()
            newIds[currentId] = i

            const getNewId = (_old)=>{return newIds[_old]};

            let fields = currentNode.handleGetUserFields()
            let attributes = currentNode.handleGetUserFields(fields)
            nodes.append(
                {
                    id:getNewId(currentId), 
                    type: currentNode.getNodeType(),
                    attributes: attributes

                }
            )
        }

        for(let i = 0 ; i < this.nodeGraph.length; i++){
            //Use the registered ids and add the edges
            let targetNodes = currentNode.getTargetVertices()
            targetNodes.forEach(target => {
                edges.append([i,getNewId(target)])
            });
            

        }


        return {
            nodes:nodes,
            edges:edges
        }

    }
}