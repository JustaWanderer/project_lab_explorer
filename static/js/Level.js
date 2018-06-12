'esversion: 6';
/**
 * @class
 */
class Level {
    /**
     * Creates a new empty level.
     * @since 1.0.0
     * @param {Number} width number of rooms horizontally
     * @param {Number} length number of rooms vertically
     * @param {String} name name of the level
     * @param {Number} [numOfPlayers] number of players (default 1)
     */
    constructor(width, length, name, numOfPlayers = 1) {
        this.width = width;
        this.length = length;
        this.name = name;
        this.numOfPlayers = numOfPlayers;
        this.board = [];
        /**
         * Returns JSON code based on the level
         * @method
         * @since 1.0.0
         * @return {string}
         */
        this.getJSON = () => JSON.stringify(this);
        /**
         * Returns a field based on x and z parameters
         * @method
         * @since 1.0.0
         * @param {Number} x x parameter of the field
         * @param {Number} z z parameter of the field
         * @return {Field}
         */
        this.getField = (x, z) => {
            this.board.forEach((field) => {
                if (
                    parseInt(field.x) == parseInt(x) &&
                    parseInt(field.z) == parseInt(z)
                ) {
                    return field;
                }
            });
            return undefined;
        };
    }
}
/**
 * Returns a new level based on JSON code.
 * @function
 * @since 1.0.0
 * @param {String} json JSON code with level data
 * @return {Level}
 */
Level.loadJSON = (json) => {
    let obj = JSON.parse(json);
    let level = new Level(obj.width, obj.length, obj.name, obj.numOfPlayers);
    level.board = obj.board;
    return level;
};
