import { Vector2 } from "./auxiliary-types.js";
import { WorldSpace } from "./world-space.js";

export class WorldSpaceSubcomponentBehaviour {
    /*
        Representa qualquer componente que possa estar no espaço do workflow
    */

    /*
    individualId: Int
    position: Vector2
    */


    constructor(position = new Vector2(0, 0)) {

        this.position = position;
        this.individualId = WorldSpace.createdWSSubcomponentsAmmount;
        WorldSpace.createdWSSubcomponentsAmmount ++;
        WorldSpace.onWorldSpaceComponents[this.individualId] = this;
    }

    Destroy(){
        /*Deletes itself and removes references if necessary*/
        //TODO

    }
    /*Vector2*/ getPosition(){
        return this.position;
    }

    setPosition(/*Vector2*/ newPosition){
        this.position = newPosition;
    }
}
