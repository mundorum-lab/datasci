import { Vector2 } from "./auxiliary-types.js";
import { WorldSpace } from "./world-space.js";
import { OidBase } from "../oidlib-dev.js";


export class WorldSpaceSubcomponentBehaviour extends OidBase {
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
        WorldSpace.createdWSSubcomponentsAmmount++;
        WorldSpace.onWorldSpaceComponents[this.individualId] = this;
    }

    Destroy() {
        /*Deletes itself and removes references if necessary*/
        //TODO
        delete onWorldSpaceComponents[this.individualId];


    }
    /*Vector2*/ handleGetPosition() {
        return this.position;
    }

    handleSetPosition(/*Vector2*/ newPosition) {
        this.position = newPosition;
    }

    getId() {
        return this.individualId;
    }

    static getById(id) {

        return WorldSpace.onWorldSpaceComponents[id]

    }
}
