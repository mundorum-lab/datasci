import { WorldSpaceNode } from "../world-space-node.js";
import { worldSpaceNodeConnector } from "./index.js";

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
    constructor(parentWorldSpaceNode, compatibleNodes, connectionsRange, id) {
        super(parentWorldSpaceNode, id);
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
