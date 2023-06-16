import { WorldSpaceNode } from '../world-space-node.js';
import { worldSpaceNodeConnector } from "./index.js";

export class worldSpaceNodeConnectorOut extends worldSpaceNodeConnector {
    /**
     * Creates a new worldSpaceNodeConnectorOut instance.
     * @param {WorldSpaceNode} parentWorldSpaceNode - The parent WorldSpaceNode.
     * @param {string} outputType - The output type.
     * @param {[number, number]} connectionsRange - The range of connections allowed.
     */
    constructor(parentWorldSpaceNode, outputType, connectionsRange, id) {
        super(parentWorldSpaceNode, id);
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
