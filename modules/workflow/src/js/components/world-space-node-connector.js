import { WorldSpaceNode } from "./world-space-node.js";

/**
 * Represents the connectors of a WorldSpaceNode where connections can be made.
 * @property {WorldSpaceNode} parentWorldSpaceNode - The node that owns the connector.
 * @property {Array.<worldSpaceNodeConnector>} connectedWorldSpaceConnectors - The list of connectors connected to this connector.
 */
export class worldSpaceNodeConnector {

    /*
    Representa as portas do WorldSpaceNode nos quais as conexões serão feitas.
    Possui:
        parentWorldSpaceNode: nó que possui a porta de conexão.
        connectedWorldSpaceConnectors: lista de quais portas estão conectadas nela.
    
    Tipos: 
        parentWorldSpaceNode: worldSpaceNode
        connectedWorldSpaceConnectors: [worldSpaceNodeConnector]

    */


    /**
    * Creates a new worldSpaceNodeConnector instance.
    * @param {WorldSpaceNode} parentWorldSpaceNode - The parent WorldSpaceNode.
    */

    constructor(parentWorldSpaceNode) {
        /** @type {WorldSpaceNode} */
        this.parentWorldSpaceNode = parentWorldSpaceNode;
        /** @type {Array.<worldSpaceNodeConnector>} */
        this.connectedWorldSpaceConnectors = [];

    }

    /**
     * Checks if a connection can be made between a source connector and a target connector.
     * @param {worldSpaceNodeConnectorOut} sourceConnector - The source connector.
     * @param {worldSpaceNodeConnectorIn} targetConnector - The target connector.
     * @returns {boolean} - True if the connection can be made, false otherwise.
     */

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
            const result = worldSpaceNodeConnector.isRestrictionRespected(outputType, restriction);
            if (result) {
                return true;
            }
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
    /**
    * Removes a connection between the current connector and another connector.
    * @param {worldSpaceNodeConnector} connector - The connector to remove the connection from.
    * @returns {boolean} - True if the connection was removed successfully, false otherwise.
    */
    removeConnection(/*worldSpaceNodeConnector*/ connector) {

        var indexSelf = connector.connectedWorldSpaceConnectors.indexOf(this);
        var indexOther = this.connectedWorldSpaceConnectors.indexOf(connector);

        if (this.isConnectedTo(connector)) {
            this.connectedWorldSpaceConnectors.splice(indexOther, 1);
            connector.connectedWorldSpaceConnectors.splice(indexSelf, 1);
            return true;
        }

        console.log("Problem removing connection")
        return false;
    }
    /**
     * Checks if the current connector is connected to another connector.
     * @param {worldSpaceNodeConnector} connected - The connector to check the connection with.
     * @returns {boolean} - True if the current connector is connected to the other connector, false otherwise.
     */
    isConnectedTo(connected) {
        var indexSelf = connected.connectedWorldSpaceConnectors.indexOf(this);
        var indexOther = this.connectedWorldSpaceConnectors.indexOf(connected);

        return indexSelf >= 0 && indexOther >= 0;
    }
    /**
     * Returns the parent WorldSpaceNode of the connector.
     * @returns {WorldSpaceNode} - The parent WorldSpaceNode.
     */
    getParentNode() {
        return this.parentWorldSpaceNode;
    }

    /**
    * Returns the ID of the parent WorldSpaceNode.
    * @returns {number} - The ID of the parent WorldSpaceNode.
    */
    getParentNodeId() {
        return this.parentWorldSpaceNode.individualId;
    }


    Destroy() {
        //Destroy the connectorcleaning all the connections

        this.connectedWorldSpaceConnectors.forEach(function (connector) {
            this.removeConnection(connector);
        });

    }
    /**
    * Checks if a restriction is respected based on the output type and input restriction.
    * @param {string} outType - The output type.
    * @param {string} inRestriction - The input restriction.
    * @returns {boolean} - True if the restriction is respected, false otherwise.
     */
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

/**
 * Represents an input connector of a WorldSpaceNode where connections can be made.
 * @extends worldSpaceNodeConnector
 */
export class worldSpaceNodeConnectorIn extends worldSpaceNodeConnector {
    /**
     * Creates a new worldSpaceNodeConnectorIn instance.
     * @param {WorldSpaceNode} parentWorldSpaceNode - The parent WorldSpaceNode.
     * @param {Array.<string>} compatibleNodes - The dictionary of compatible node types.
     * @param {[number, number]} connectionsRange - The range of connections allowed.
     */
    constructor(parentWorldSpaceNode, compatibleNodes, connectionsRange) {
        super(parentWorldSpaceNode);
        /** @type {Array.<string>} */
        this.compatibleNodes = compatibleNodes;
        /** @type {[number, number]} */
        this.connectionsRange = connectionsRange;
    }

    /**
     * Receives a connection from a source connector and adds it to the list of connectedWorldSpaceConnectors.
     * @param {worldSpaceNodeConnectorOut} sourceConnector - The source connector.
     */
    receiveConnectionFrom(sourceConnector) {
        this.connectedWorldSpaceConnectors.push(sourceConnector);
    }

    /**
     * Gets the accepted input types of the connector.
     * @returns {Array.<string>} - The accepted types hierarchy.
     */
    getAcceptedInputTypes() {
        return this.compatibleNodes;
    }
}


/**
 * Represents an output connector of a WorldSpaceNode where connections can be made.
 * @extends worldSpaceNodeConnector
 */
export class worldSpaceNodeConnectorOut extends worldSpaceNodeConnector {
    /**
     * Creates a new worldSpaceNodeConnectorOut instance.
     * @param {WorldSpaceNode} parentWorldSpaceNode - The parent WorldSpaceNode.
     * @param {string} outputType - The output type.
     * @param {[number, number]} connectionsRange - The range of connections allowed.
     */
    constructor(parentWorldSpaceNode, outputType, connectionsRange) {
        super(parentWorldSpaceNode);
        /** @type {string} */
        this.outputType = outputType;
        /** @type {[number, number]} */
        this.connectionsRange = connectionsRange;
    }

    /**
     * Adds a connection to a target connector and updates the connectedWorldSpaceConnectors list.
     * @param {worldSpaceNodeConnectorIn} targetConnector - The target connector.
     */
    addConnectionTo(targetConnector) {
        this.connectedWorldSpaceConnectors.push(targetConnector);
    }

    /**
     * Gets the provided output types of the connector.
     * @returns {string} - The exported types hierarchy.
     */
    getProvidedOutputTypes() {
        return this.outputType;
    }
}
