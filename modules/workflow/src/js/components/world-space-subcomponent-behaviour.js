import { Vector2 } from "./auxiliary-types.js";

export class WorldSpaceSubcomponentBehaviour {
    /*
        Representa qualquer componente que possa estar no espaço do workflow
    */

    /*
    individualId: Int
    position: Vector2
    allTimeCreatedBehaviours : static int
    onSceneComponents : static List<WorldSpaceComponents>
    */


    static allTimeCreatedBehaviours = 0;
    static onSceneComponents = {}

    constructor(position = Vector2(0, 0)) {

        this.position = position;
        this.individualId =allTimeCreatedBehaviours;
        allTimeCreatedBehaviours++;
        onSceneComponents[this.individualId] = this;
    }

    Destroy(){
        /*Deletes itself and removes references if necessary*/
        //TODO

    }
}
