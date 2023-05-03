export class worldSpaceNodeConnector{

    /*
    Representa os pontos do WorldSpaceNode nos quais as conexões serão feitas
    
    
    parentWorldSpaceNode = worldSpaceNode
    connectedWorldSpaceConnectors = List<worldSpaceNodeConnector>

    */

    constructor(parentWorldSpaceNode){

    this.connectedWorldSpaceConnectors= []
    this.parentWorldSpaceNode = parentWorldSpaceNode

    }

    static makeConnection(/*worldSpaceNodeConnectorOut*/ sourceConnector , /*worldSpaceNodeConnectorIn*/ targetConnector){
        //Uses the sourceConnector and targetConnector methods to verify it the connection can be made and if so, do it accordingly
        //TODO

    }

}
export class worldSpaceNodeConnectorIn extends worldSpaceNodeConnector{
/*

    Input Connectors have type and ammount limitations

    compatipleNodes = Dict{typeIds:String}   
    connectionsRange:(int,int)

*/
    constructor(parentWorldSpaceNode, compatibleNodes , connectionsRange){
        super(parentWorldSpaceNode)
        this.compatibleNodes = compatibleNodes
        this.connectionsRange = connectionsRange

    }
    receiveConnection(/*worldSpaceNodeConnectorOut*/ sourceConnector){
        //add the connector to this input's registered connections
        //TODO
    }



}
export class worldSpaceNodeConnectorOut extends worldSpaceNodeConnector{

    //Output conections don't have limitations
    //Type : String ->logically,the ParentsNode's type is the same as all the output nodes type 
    constructor(parentWorldSpaceNode){
        this.type = parentWorldSpaceNode.type
        super(parentWorldSpaceNode)
    }

    canConnectTo(/*worldSpaceNodeConnectorIn*/ targetInput){
        //Verifies if the parentNode type can be connected to the targetInput
        //TODO
    }
    supplyConnection(/*worldSpaceNodeConnectorOut*/ targeInput){
        //add the connector to this input's registered connections
        //TODO


    }
}