import { Vector2 } from "./auxiliary-types.js";
import { WorldSpace } from "./world-space.js";


/**
 * Represents any component that can be in the workflow space. @extends OidBase
 */
export class WorldSpaceSubcomponentBehaviour {
    /**
     * @param {Vector2} position - The initial position of the component. Defaults to (0, 0).
     */
    constructor(position = new Vector2(0, 0)) {

        /** @type {Vector2} - The position of the component. */
        this.position = position;
        /** @type {number} - The individual ID of the component. */
        this.individualId = WorldSpace.createdWSSubcomponentsAmmount;
        WorldSpace.createdWSSubcomponentsAmmount++;
        WorldSpace.onWorldSpaceComponents[this.individualId] = this;
    }

    /** Deletes itself and removes references if necessary. */
    Destroy() {
        // TODO: Implement the destruction logic
        delete onWorldSpaceComponents[this.individualId];
    }

    /** Returns the position of the component. @returns {Vector2} - The position. */
    handleGetPosition() {
        return this.position;
    }

    /** Sets the position of the component. @param {Vector2} newPosition - The new position. */
    handleSetPosition(newPosition) {
        this.position = newPosition;
    }

    /** Gets the ID of the component. @returns {number} - The ID. */
    getId() {
        return this.individualId;
    }

    /**
     * Gets a WorldSpaceSubcomponentBehaviour instance by ID.
     * @param {number} id - The ID of the component.
     * @returns {WorldSpaceSubcomponentBehaviour} - The component instance.
     */
    static getById(id) {
        return WorldSpace.onWorldSpaceComponents[id];
    }
}
