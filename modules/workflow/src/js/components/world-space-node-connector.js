export class worldSpaceNodeConnector{

    /*
        Representa os pontos do WorldSpaceNode nos quais as conexões serão feitas
    
    
    */
    /*
    parentWorldSpaceNode = worldSpaceNode
    connectedWorldSpaceNodes = List<worldSpaceNodeConnector>
    compatipleNodes = Dict{typeIds:String}   
    connectionsRange:(int,int)

    type = String  Input or Output , good to deal with compatibility 
    */

    constructor(parentWorldSpaceNode,compatibleNodes = [],connectionsRange = (1,1) , type = "Input"){

    this.connectedWorldSpaceNodes = []
    this.parentWorldSpaceNode = parentWorldSpaceNode
    this.compatibleNodes = compatibleNodes
    this.connectionsRange = connectionsRange
    this.type = type
    }

}
