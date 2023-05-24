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

    canConnectionHappen(/*worldSpaceNodeConnectorOut*/ sourceConnector, /*worldSpaceNodeConnectorIn*/ targetConnector) {
        //Verifies if the parentNode type can be connected to the targetInput

        //VERIFY IF INPUT AND OUTPUT ARE COMPATIBLE

        //VERIFY IN GRAPH IF CONNECTION IS POSSIBLE

        return true;

    }

    static makeConnection(/*worldSpaceNodeConnectorOut*/ sourceConnector, /*worldSpaceNodeConnectorIn*/ targetConnector) {
        //Uses the sourceConnector and targetConnector methods to verify it the connection can be made and if so, do it accordingly


        if (canConnectionHappen(sourceConnector, targetConnector)) {
            sourceConnector.addConnectionTo(targetConnector);
            targetConnector.receiveConnectionFrom(sourceConnector);
            return true;
        }
        else {
            console.log("CANNOT CONNECT");
            return false;

        }

    }
    static removeConnection(/*worldSpaceNodeConnectorOut*/ sourceConnector, /*worldSpaceNodeConnectorIn*/ targetConnector) {



    }
    static onHierarchy(/*string*/ sourceType, /*string*/ targetType) {
        //Return if the source type can connect to the targetType

        /*
        //TODO: DIVIDIR AS BARRAS
        const sourceType = "INPUT/TABELA/CSV";
        const targetType = "INPUT/TABELA";
        */


        if (sourceType.startsWith(targetType))
            return true;

        return false;

    }

    handleGetParentComponentOutputType() {
        //Returns the type hierarchy
        return this.parentWorldSpaceNode.type;
    }

    handleGetParentComponentCompatibleInputTypes() {
        //Returns the type hierarchy
        return this.parentWorldSpaceNode.type;
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
        this.connectionsRange = [connectionsRange];

    }

    receiveConnectionFrom(/*worldSpaceNodeConnectorOut*/ sourceConnector) {
        //add the connector to this input's registered connections
        this.connectedWorldSpaceConnectors.push(sourceConnector);

    }

    removeConnection(/*worldSpaceNodeConnectorOut*/ sourceConnector) {

        index = indexOf(sourceConnector)
        if (index >= 0)
            this.connectedWorldSpaceConnectors.splice(index, 1);
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
    removeConnection(/*worldSpaceNodeConnector*/ targetConnector) {

        index = indexOf(targetConnector)
        if (index >= 0)
            this.connectedWorldSpaceConnectors.splice(index, 1);
    }
}