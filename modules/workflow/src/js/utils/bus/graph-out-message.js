class GraphOutMessageParser {
    static parseAtributes(fields) {
        let attributes = {}

        for(let i = 0; i < fields.length; i++) {
            let curField = fields[i];
            attributes[curField.getName()] = curField.handleGetInputValue();
        }

        return attributes;
    }

    static parseGraph(graph) {
        /*
        The id is not the same as the NodeId, it's easier to work with the new values E.G:
          Workflow Nodes Ids:                   Output ids:
          [33,22,43,543,657,123,123]            [0,1,2,3,4,5,6]
        */
        const getNewId = (old) => { return newIds[old]; };

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
        let nodes = [];

        /**
         * Stores edges.
         * @type {Array.<Array.<number,number>>}
        */
        let edges = [];

        /**
        * Stores edges.
        * @type {Object.<Number, Number>}
        */
        let newIds = {};
        
        let graphList = Object.keys(graph);
        for (let i = 0; i < graphList.length; i++) {
            let currentNode, currentId;
            let fields, attributes;

            //Register the newIds and add the nodes
            currentNode = graph[graphList[i]];
            currentId = currentNode.getId();
            newIds[currentId] = i;

            fields = currentNode.handleGetUserFields();
            attributes = this.parseAtributes(fields);

            nodes.push(
                {
                    id: getNewId(currentId),
                    type: currentNode.getNodeType(),
                    attributes: attributes
                }
            );
        }

        for (let i = 0; i < graphList.length; i++){
            //Use the registered ids and add the edges
            let currentNode = graph[graphList[i]];
            let targetNodes = currentNode.getTargetVertices()
            targetNodes.forEach(target => {
                edges.push([i, getNewId(target)])
            });
        }

        return {nodes: nodes, edges: edges};
    }
}

export { GraphOutMessageParser };
