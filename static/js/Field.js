'esversion: 6';
/**
 * @class
 */
class Field {
    /**
     * Creates a new field.
     * @param {Number} x Horizontal index
     * @param {Number} z Vertical index
     * @param {Number} type Type of the field
     */
    constructor(x, z, type) {
        this.x = x;
        this.z = z;
        this.type = type;
        this.doorN = null;
        this.doorE = null;
        this.doorS = null;
        this.doorW = null;
        this.content = null;
    }
}
