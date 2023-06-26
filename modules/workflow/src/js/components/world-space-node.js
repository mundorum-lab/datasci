import { NodeInputField } from "./node-input-field.js";
import { worldSpaceNodeConnectorIn, worldSpaceNodeConnectorOut } from "./connectors/index.js";
import { WorldSpaceSubcomponentBehaviour } from "./world-space-subcomponent-behaviour.js"
import { WorldSpace } from "./world-space.js";

export class WorldSpaceNode extends WorldSpaceSubcomponentBehaviour {
    /**
     * Represents the nodes located in the workflow space.
     * @extends WorldSpaceSubcomponentBehaviour
     *
     * Properties:
     * output: List of output ports and their information
     * id: General identifier of the node's function
     * name: Name of the node, used for visualization purposes only
     * presentable: Indicates if the node has a graphical representation at the end of the workflow
     * icon: Path to the icon that visually represents the node
     * input: List of input ports and their information
     * fields: List of fields where the user inputs information to modify the positioning
     *
     * @property {Array.<worldSpaceNodeConnectorOut>} output
     * @property {string} id
     * @property {string} name
     * @property {boolean} presentable
     * @property {string} icon
     * @property {Array.<worldSpaceNodeConnectorIn>} input
     * @property {Array.<NodeInputField>} fields
     *
     * @example
     * output: [{type: ["graph/scatter"], name: "Saída do Gráfico", range: [1, 1]}],
     * id: "visualize:scatter-plot",
     * name: "Scatter Plot",
     * presentable: true,
     * icon: "/assets/scatter.jpg",
     * input: [{type: ["input"], name: "Dados", range: [1, 1]}],
     * fields: [{
     *     name: "Título",
     *     view: "TextBox",
     *     parameters: {
     *         password: false,
     *         maxLength: 10,
     *         minLength: 1,
     *         forbidden: ["abcde"],
     *         placeholder: "Insira o título aqui"
     *     }
     * }]
     */
    nodeValues = {};

    handleGetValues(key) {
        return nodeValues[key];
    }

    handleSetValues(key, value) {
        nodeValues[key] = value;
    }

    constructor(type, name, nodeInfo) {
        super();
        
        if (type == null) {
            throw `Error: ${type} is not a known node`;
        }

        /** @type {Array.<worldSpaceNodeConnectorOut>} */
        this.output = [];
        /** @type {number} */
        this.type = type;
        /** @type {string} */
        this.name = name;
        /** @type {boolean} */
        this.presentable = nodeInfo.presentable;
        /** @type {string} */
        this.icon = nodeInfo.icon;
        /** @type {Array.<worldSpaceNodeConnectorIn>} */
        this.input = [];
        /** @type {Array.<NodeInputField>} */
        this.fields = [];

        for (var i = 0; i < nodeInfo.output.length; i++) {
            var compatible = nodeInfo.output[i]
            var newOutput = new worldSpaceNodeConnectorOut(this, compatible.type, compatible.range, i);
            this.output.push(newOutput);
        }

        for (var i = 0; i < nodeInfo.input.length; i++) {
            var compatible = nodeInfo.input[i];
            var newInput = new worldSpaceNodeConnectorIn(this, compatible.type, compatible.range, i);
            this.input.push(newInput);
        }

        for (var i = 0; i < nodeInfo.fields.length; i++) {
            var fieldInfo = nodeInfo.fields[i];
            var newField = new NodeInputField(fieldInfo.name, fieldInfo.view, fieldInfo.parameters);
            this.fields.push(newField);
        }

    }

    /**
     * Sets the value of the named input field
     * @param {string} name - The field name.
     * @param {object} value - The field value.
     */
    setInputField(name, value) {

        for (var field of this.fields) {
            if (field.getName() == name) {
                field.handleSetInputValue(value);
                break;
            }
        }

    }

    getNodeType() {
        return this.type;
    }

    //fields: [ {name: string, view: string , parameters: [number or string]}]
    /*List<fields>*/ handleGetUserFields() {

        return this.fields;
    }

    getInPort(id) {
        return this.input[id];
    }
    getOutPort(id) {
        return this.output[id];
    }
    Destroy() {
        /*Deletes itself and removes reference from the nodes targeting it and receiving from it, safety measurement */
        //TODO ->Remove reference from the nodes receiving and giving connections to this
        super.Destroy();
    }

    //GRAPH RELATED METHODS -> WILL BE ADDED TO ITS OWN LIB ON REFACTOR

    //NODE -> VERTICE
    //EDGE -> CONNECTION

    /**
     * Returns the vertices that this node is making connections to.
     * @returns {Array.<Number>} - The target vertices.
     */
    getTargetVertices() {
        //RETURNS THE VERTICES THIS ONE IS MAKING CONNECTION **TO**

        let vertices = [];

        this.output.forEach((port) => {


            port.connectedWorldSpaceConnectors.forEach(inPort => {
                vertices.push(inPort.getParentNodeId())
            });


        });

        return vertices;

    }
    /**
     * Checks if the graph is cyclic.
     * @returns {boolean} - True if cyclic, false otherwise.
     */
    isGraphCyclic() {
        const visited = new Set();
        const recStack = new Set();

        for (let nodeId in WorldSpace.onWorldSpaceComponents) {
            let node = WorldSpace.onWorldSpaceComponents[nodeId];
            if (this.isGraphCyclicHelper(node, visited, recStack)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Helper function for checking cycles using DFS   
     * @param {*} node - The current node being processed.
     * @param {*} visited - A set to keep track of visited nodes.
     * @param {*} recStack - A set to keep track of nodes in the recursion stack.
     * @returns {boolean} - True if the current cycle is cyclic, false otherwise
     */
    isGraphCyclicHelper(node, visited, recStack) {
        if (recStack.has(node)) {
            return true;
        }
        if (!visited.has(node)) {
            visited.add(node);
            recStack.add(node);

            const neighborsId = node.getTargetVertices();

            for (let i = 0; i < neighborsId.length; i++) {
                if (this.isGraphCyclicHelper(WorldSpace.getById(neighborsId[i]), visited, recStack)) {
                    return true;
                }
            }

            recStack.delete(node);
        }
    
        return false;
    }
}
