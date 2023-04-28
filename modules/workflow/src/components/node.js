class Node extends WorldSpaceBehaviour {
    /*
    Representa os nodes que estarão localizados no espaço do workflow
    
    */

    /*
    TypeId : String
    Attributes: List<Attributes>
    
    InputRange : (int,int)
    OutputRange : (int,int)

    InputConnectedNodes : List<Node>
    OutputConnectedNodes : List<Node>
    
    AvailableInputNodeTypes : Dict<Int>
    AvailableOutputNodeTypes : Dict<Int>
    */

    AvailableInputNodeTypes = {}
    AvailableOutputNodeTypes = {}

    Attributes = []

    InputConnectednodes = []
    OutputConnectedNodes = []

    constructor(TypeID, Attributes, AvailableInputNodeTypes, AvailableOutputNodeTypes, InputRange = (1, 1), OutputRange = (1, 10)) {
        super();

        this.TypeID = TypeID;
        this.Attributes = Attributes;
        this.InputRange = InputRange;
        this.OutputRange = OutputRange;


        this.AvailableInputNodeTypes = AvailableInputNodeTypes;
        this.AvailableOutputNodeTypes = AvailableOutputNodeTypes;
    }

    CanConnectOnInput(targetNode) {
        //TODO

    }
    CanReceiveConnectionOnOutput(targetNode) {
        //TODO

    }
}

class WorldSpaceComponents {
    /*
        Representa qualquer componente que possa estar no espaço do workflow
    */

    /*
    IndividualId: Int
    position: Vector2
    behaviourAmmount : static int
    onSceneBehavioursComponents : static List<WorldSpaceComponents>

    CurrentTab
    */
    static behaviourAmmount = 0;
    static onSceneComponents = {}

    constructor(position = Vector2(0, 0), currentTab = 0) {

        this.position = position;
        this.IndividualId = behaviourAmmount;
        behaviourAmmount++;
        onSceneComponents[this.IndividualId] = this;
        this.currentTab = currentTab;
    }

}

//Classes auxiliares de tipo

class Vector2 {
    //float x,y

    constructor(x, y) {
        this.x = y;
        this.x = y;
    }

    modulo() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

class Attributes {

    //Type : String
    //InputConfig : String

    constructor(Type, InputConfig) {

        this.Type = Type;
        this.InputConfig = InputConfig;

    }

}