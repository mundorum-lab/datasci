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
        attributes = {}
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
        nodes = []


        for(let i = 0 ; i < this.nodeGraph.length; i++){
            currentNode = this.nodeGraph[i]
            fields = currentNode.handleGetUserFields()
            attributes = currentNode.handleGetUserFields(fields)
            nodes.append(
                {
                    id:i, 
                    type: currentNode.getNodeType(),
                    attributes: attributes

                }
            )

        }




    }





}