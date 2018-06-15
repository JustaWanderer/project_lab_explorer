/**
 * @class
 */
class UI {
    /**
     * Creates a minimap controller
     * @param {object} level level to be source of data
     * @param {Player} player player to be the source of data
     */
    constructor(level, player) {
        let canvas = document.createElement('canvas');
        canvas.width = $(window).width();
        canvas.height = 100;
        canvas.style.borderBottom = '3px white solid';
        let context = canvas.getContext('2d');
        this.update = () => {
            context.fillStyle = 'black';
            context.fillRect(0, 0, $(window).width(), 100);
            context.fillStyle = 'white';
            context.font = '80px monospace';
            context.fillText('HP:', 10, 77, 120);
            context.fillStyle = 'red';
            for (let i = 0; i < player.hp; i++) {
                context.fillRect(
                    130 + i * 70,
                    20,
                    60,
                    60
                );
            }
            context.fillStyle = 'white';
            context.font = '20px monospace';
            for (let i = 0; i < 2; i++) {
                let v = player.inventory[i];
                let txt = '';
                if (!v) {
                    txt = 'none';
                } else {
                    v = v.type + ' ' + v.id;
                }
                context.fillText('inventory ' + i + ': ' + txt, 400, 40 + i * 25, 300);
            }
            context.fillText('level: ' + level.name, 700, 40, 300);
            context.fillText('time: ' + h.formatDate(player.time), 700, 65, 300);
        };

        this.loss = () => {
            $('#loss').css('display', 'block');
        };

        this.update();

        this.getCanvas = () => canvas;
    }
}
