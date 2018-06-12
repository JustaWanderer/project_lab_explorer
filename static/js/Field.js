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
    /**
     * Set the content of a door
     * @param {string} direction Direction of the door (N, S, E, W)
     * @param {object} data data to be set
     */
    setDoor(direction, data) {
        direction = direction.toLocaleUpperCase();
        if (/[NWSE]/g.test(direction) && direction.length === 1) {
            this['door' + direction] = data;
        } else {
            console.error('Wrong direction (only N, W, S, E)');
        }
    }
}
