export class worldSpaceNodeConnector{

    /*
    Representa os pontos do WorldSpaceNode nos quais as conexões serão feitas
    
    
    parentWorldSpaceNode = worldSpaceNode
    connectedWorldSpaceNodes = List<worldSpaceNodeConnector>

    */

    constructor(parentWorldSpaceNode){

    this.connectedWorldSpaceNodes = []
    this.parentWorldSpaceNode = parentWorldSpaceNode

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

}

export class worldSpaceNodeConnectorOut extends worldSpaceNodeConnector{

    //Output conections don't have limitations

    constructor(parentWorldSpaceNode){
        super(parentWorldSpaceNode)
    }
}