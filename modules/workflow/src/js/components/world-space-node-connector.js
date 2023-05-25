export class worldSpaceNodeConnector {

    /*
    Representa os pontos do WorldSpaceNode nos quais as conexões serão feitas
    
    
    parentWorldSpaceNode = worldSpaceNode


    connectedWorldSpaceConnectors = List<worldSpaceNodeConnector>

    */

    constructor(parentWorldSpaceNode) {

        this.connectedWorldSpaceConnectors = []
        this.parentWorldSpaceNode = parentWorldSpaceNode;

    }



    static canConnectionHappen(/*worldSpaceNodeConnectorOut*/ sourceConnector, /*worldSpaceNodeConnectorIn*/ targetConnector) {
        //Verifies if the parentNode type can be connected to the targetInput

        //VERIFY IF THE CONNECTION DOESN'T ALREADY EXISTS

        if (sourceConnector.isConnectedTo(targetConnector)) {
            console.log("Connection already exists");
            return false;
        }
        //VERIFY IF INPUT AND OUTPUT ARE COMPATIBLE
        let inputRestrictions = targetConnector.getAcceptedInputTypes();
        let outputType = sourceConnector.getProvidedOutputTypes();

        for (let i = 0; i < inputRestrictions.length; i++) {
            const restriction = inputRestrictions[i];
            const resultado = worldSpaceNodeConnector.isRestrictionRespected(outputType, restriction);
            if (resultado) return true;
        }

        //VERIFY IN GRAPH IF CONNECTION IS POSSIBLE (RESULT IS NOT CYCLIC)
        worldSpaceNodeConnector.makeConnection(sourceConnector, targetConnector);
        if (sourceConnector.getParentNode().isGraphCyclic()) {
            this.removeConnection(sourceConnector, targetConnector);
            return false;
        }

        return true;

    }

    static makeConnection(/*worldSpaceNodeConnectorOut*/ sourceConnector, /*worldSpaceNodeConnectorIn*/ targetConnector) {
        //Uses the sourceConnector and targetConnector methods to verify it the connection can be made and if so, do it accordingly


        if (worldSpaceNodeConnector.canConnectionHappen(sourceConnector, targetConnector)) {
            sourceConnector.addConnectionTo(targetConnector);
            targetConnector.receiveConnectionFrom(sourceConnector);
            return true;
        }
        else {
            console.log("CANNOT CONNECT");
            return false;

        }

    }

    removeConnection(/*worldSpaceNodeConnector*/ connector) {

        var indexSelf = connected.connectedWorldSpaceConnectors.indexOf(this);
        var indexOther = this.connectedWorldSpaceConnectors.indexOf(sourceConnector);

        if (this.isConnectedTo(connector)) {
            this.connectedWorldSpaceConnectors.splice(indexOther, 1);
            connector.connectedWorldSpaceConnectors.splice(indexSelf, 1);
            return true;
        }

        console.log("Problem removing connection")
        return false;

    }
    isConnectedTo(/*worldSpaceNodeConnector*/ connected) {

        var indexSelf = connected.connectedWorldSpaceConnectors.indexOf(this);
        var indexOther = this.connectedWorldSpaceConnectors.indexOf(connected);

        return indexSelf >= 0 && indexOther >= 0;
    }

    getParentNode() {
        return this.parentWorldSpaceNode;
    }

    getParentNodeId() {
        return this.parentWorldSpaceNode.individualId;
    }


    Destroy() {
        //Destroy the connectorcleaning all the connections

        this.connectedWorldSpaceConnectors.forEach(function (connector) {
            this.removeConnection(connector);
        });

    }
    static isRestrictionRespected(outType, inRestriction) {

        const segmentosA = outType.split("/");
        const segmentosB = inRestriction.split("/");

        if (segmentosA.length < segmentosB.length) {
            return false;
        }

        for (let i = 0; i < segmentosB.length; i++) {
            if (segmentosA[i] !== segmentosB[i]) {
                return false;
            }
        }
        return true;
    }


}
export class worldSpaceNodeConnectorIn extends worldSpaceNodeConnector {
    /*
    
        Input Connectors have type and ammount limitations
    
        compatipleNodes = Dict{typeIds:String}   
        connectionsRange:[int,int]
    */
    constructor(parentWorldSpaceNode, compatibleNodes, connectionsRange) {
        super(parentWorldSpaceNode);
        this.compatibleNodes = compatibleNodes;
        this.connectionsRange = connectionsRange;
    }

    receiveConnectionFrom(/*worldSpaceNodeConnectorOut*/ sourceConnector) {
        //add the connector to this input's registered connections
        this.connectedWorldSpaceConnectors.push(sourceConnector);

    }

    getAcceptedInputTypes() {
        //Returns the accepted types hierarchy
        return this.compatibleNodes;

    }

}
export class worldSpaceNodeConnectorOut extends worldSpaceNodeConnector {

    //Output conections don't have limitations
    //Type : String ->logically,the ParentsNode's type is the same as all the output nodes type 
    constructor(parentWorldSpaceNode) {
        super(parentWorldSpaceNode);
        this.type = parentWorldSpaceNode.type;

    }
    addConnectionTo(/*worldSpaceNodeConnector*/ targetConnector) {

        this.connectedWorldSpaceConnectors.push(targetConnector);

    }

    getProvidedOutputTypes() {
        //Returns the exported types hierarchy
        return this.type;
    }
}
