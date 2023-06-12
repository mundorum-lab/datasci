export class Vector2 {
    /**
     * Represents a 2D Vector.
     * @param {number} x - The x-coordinate
     * @param {number} y - The y-coordinate
     */

    constructor(x, y) {
        /** @type {number} */
        this.x = y;
        /** @type {number} */
        this.x = y;
    }

    /** 
     * Calculates the modulo (magnitude) of the vector. 
     * @returns {number} - The modulo.
     * */
    modulo() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}