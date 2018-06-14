/**
 * @class
 */
class Minimap {
    /**
     * Creates a minimap controller
     * @param {object} level level for the minimap to be based on
     * @param {Player} [player1] player1
     * @param {Player} [player2] player1
     */
    constructor(level, player1 = null, player2 = null) {
        const fieldColors = [
            '#808080',
            '#ff0000',
            'gold',
            'green',
            'green',
            'green',
            'orange',
            'aqua',
            'blue',
            'pink',
            'purple',
        ];

        const doorColors = [
            'dimgrey',
            'lightgrey',
            'darkred',
            'beige',
            'bisque',
        ];

        let canvas = document.createElement('canvas');
        canvas.width = level.width * Settings.minimapTileWidth;
        canvas.height = level.length * Settings.minimapTileWidth;
        canvas.style.border = '3px white solid';
        let context = canvas.getContext('2d');
        this.update = () => {
            context.fillStyle = 'black';
            context.fillRect(0, 0, level.width * Settings.minimapTileWidth, level.length * Settings.minimapTileWidth);
            level.board.forEach((field) => {
                context.fillStyle = fieldColors[field.type];
                context.fillRect(
                    field.x * Settings.minimapTileWidth,
                    field.z * Settings.minimapTileWidth,
                    Settings.minimapTileWidth,
                    Settings.minimapTileWidth
                );
                if (field.doorN !== null) {
                    let door = field.doorN;
                    context.fillStyle = doorColors[door.code];
                    context.fillRect(
                        field.x * Settings.minimapTileWidth + 10,
                        field.z * Settings.minimapTileWidth,
                        Settings.minimapTileWidth - 20,
                        10
                    );
                }
                if (field.doorS !== null) {
                    let door = field.doorS;
                    context.fillStyle = doorColors[door.code];
                    context.fillRect(
                        field.x * Settings.minimapTileWidth + 10,
                        (field.z + 1) * Settings.minimapTileWidth - 10,
                        Settings.minimapTileWidth - 20,
                        10
                    );
                }
                if (field.doorE !== null) {
                    let door = field.doorE;
                    context.fillStyle = doorColors[door.code];
                    context.fillRect(
                        (field.x + 1) * Settings.minimapTileWidth - 10,
                        field.z * Settings.minimapTileWidth + 10,
                        10,
                        Settings.minimapTileWidth - 20
                    );
                }
                if (field.doorW !== null) {
                    let door = field.doorW;
                    context.fillStyle = doorColors[door.code];
                    context.fillRect(
                        field.x * Settings.minimapTileWidth,
                        field.z * Settings.minimapTileWidth + 10,
                        10,
                        Settings.minimapTileWidth - 20
                    );
                }

                if (player1) {
                    context.fillStyle='cadetblue';
                    context.fillRect(
                        (player1.x + 1 / 3) * Settings.minimapTileWidth,
                        (player1.z + 1 / 3) * Settings.minimapTileWidth,
                        Settings.minimapTileWidth / 3,
                        Settings.minimapTileWidth / 3
                    );
                }

                if (player2) {
                    context.fillStyle='indianred';
                    context.fillRect(
                        (player2.x + 1 / 3) * Settings.minimapTileWidth,
                        (player2.z + 1 / 3) * Settings.minimapTileWidth,
                        Settings.minimapTileWidth / 3,
                        Settings.minimapTileWidth / 3
                    );
                }
            });
        };

        this.update();

        this.getCanvas = () => canvas;
    }
}
