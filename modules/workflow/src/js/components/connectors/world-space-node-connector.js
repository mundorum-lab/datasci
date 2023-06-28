import { WorldSpaceNode } from "../world-space-node.js";

/**
 * Represents the connectors of a WorldSpaceNode where connections can be made.
 * @property {WorldSpaceNode} parentWorldSpaceNode - The node that owns the connector.
 * @property {Array.<worldSpaceNodeConnector>} connectedWorldSpaceConnectors - The list of connectors connected to this connector.
 */
export class worldSpaceNodeConnector {

    /*
    Represents the ports of the WorldSpaceNode where connections will be made.
    It has:
        parentWorldSpaceNode: node that has the connection port.
        connectedWorldSpaceConnectors: list of ports connected to it.
        id: Identifies the port number in the node

    Types:
        parentWorldSpaceNode: worldSpaceNode
        connectedWorldSpaceConnectors: [worldSpaceNodeConnector]
    */



    /**
    * Creates a new worldSpaceNodeConnector instance.
    * @param {WorldSpaceNode} parentWorldSpaceNode - The parent WorldSpaceNode.
    * @param {number} id - The port id on the node.
    */

    constructor(parentWorldSpaceNode, id) {
        /** @type {WorldSpaceNode} */
        this.parentWorldSpaceNode = parentWorldSpaceNode;
        /** @type {Array.<worldSpaceNodeConnector>} */
        this.connectedWorldSpaceConnectors = []
        /** @type {number} */
        this.id = id;

    }


    /**
     * Get the id.
     * @returns {number} - Return the id.
     */

    getId() {
        return this.id;
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
            for (let j = 0; j < outputType.length; j++) {
                const result = worldSpaceNodeConnector.isRestrictionRespected(outputType[j], restriction);
                if (!result) {
                    console.log("Restriction not respected")
                    return false;
                }
            }
        }

        //VERIFY IN GRAPH IF CONNECTION IS POSSIBLE (RESULT IS NOT CYCLIC)
        sourceConnector.addConnectionTo(targetConnector);
        targetConnector.receiveConnectionFrom(sourceConnector);
        if (sourceConnector.getParentNode().isGraphCyclic()) {
            sourceConnector.removeConnection(targetConnector);
            console.log("Cyclic Graph")
            return false;
        }
        else {
            sourceConnector.removeConnection(targetConnector);
            console.log("Connection can happen!")
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
    * @returns {void} 
    */
    removeConnection(/*worldSpaceNodeConnector*/ connector) {

        if (!this.isConnectedTo(connector)) {
            return;
        }
        for (let i = 0; i < connector.connectedWorldSpaceConnectors.length; i++) {
            if (connector.connectedWorldSpaceConnectors[i] == this) {
                connector.connectedWorldSpaceConnectors.splice(i, 1)
            }

        }
        for (let i = 0; i < this.connectedWorldSpaceConnectors.length; i++) {
            if (this.connectedWorldSpaceConnectors[i] == connector) {
                this.connectedWorldSpaceConnectors.splice(i, 1)
            }

        }




    }
    /**
     * Checks if the current connector is connected to another connector.
     * @param {worldSpaceNodeConnector} connected - The connector to check the connection with.
     * @returns {boolean} - True if the current connector is connected to the other connector, false otherwise.
     */
    isConnectedTo(connected) {
        for (let i = 0; i < this.connectedWorldSpaceConnectors.length; i++) {
            if (this.connectedWorldSpaceConnectors[i] == connected) {
                return true;
            }
        }
        return false;
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

    /**
     * Destroy the connector, cleaning all its connections.
     */
    Destroy() {
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
