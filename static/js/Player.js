'esversion: 6';
/**
 * @class
 */
class Player {
    /**
     * Creates new player.
     * @since 1.0.0
     * @param {Number} number number of player (1 or 2)
     * @param {Number} x staring x position (default 0)
     * @param {Number} z staring z position (default 0)
     */
    constructor(number, x = 0, z = 0) {
        // container with player model
        this.container = new THREE.Object3D();
        this.x = x;
        this.z = z;
        this.dx = x; // destination x, used for moving player
        this.dz = z; // destination z
        // flags used to set x and z only once in playerMove()
        this.setxPosFlag = false;
        this.setzPosFlag = false;
        // player model
        this.model;

        // adding model depending on player number
        if (number == 1) {
            this.model = Settings.player1Model;
        } else if (number == 2) {
            this.model = Settings.player2Model;
        }
        this.container.add(this.model);

        // set player starting position
        this.container.position.x = x*100;
        this.container.position.z = z*100;
        // let light = new THREE.PointLight(0xffffff, 1, 300, 2);
        // light.rotateX(Math.PI);
        // light.position.y = 1;
        // light.castShadow = true;
        // light.shadow.camera.far = 10000;
        // this.container.add(light);

        /**
         * Checks if player can move to clicked field
         * @method
         * @since 1.0.0
         * @param {Number} x x position of clicked field
         * @param {Number} z z position of clicked field
         */
        this.checkForMove = (x, z) => {
            let distance = Math.sqrt(Math.pow((x - this.x), 2) + Math.pow((z - this.z), 2)); // distance from player to clicked tile
            if (distance == 1 && !this.setxPosFlag && !this.setzPosFlag) {
                // setting destination coordinates
                this.dx = x;
                this.dz = z;
                // setting flag to true, to make x and z change once player reaches destination
                if (x != this.x) {
                    this.setxPosFlag = true;
                } else if (z != this.z) {
                    this.setzPosFlag = true;
                }
                // play walking animation
                this.stopAnimation();
                this.playAnimation('Armature|Walk');
            }

            if (this.dx - this.x == 1) {
                this.model.rotation.y = Math.PI/2;
            } else if (this.dx - this.x == -1) {
                this.model.rotation.y = -Math.PI/2;
            } else if (this.dz - this.z == 1) {
                this.model.rotation.y = 0;
            } else if (this.dz - this.z == -1) {
                this.model.rotation.y = Math.PI;
            }
        };

        /**
         * Moves player to dx, dz
         * @method
         * @since 1.0.0
         */
        this.playerMove = () => {
            if (this.container.position.x < this.dx * 100) {
                this.container.position.x += 2;
            } else if (this.container.position.x > this.dx * 100) {
                this.container.position.x -= 2;
                // increment or decrement players position until it reaches destination
            } else if (this.setxPosFlag) {
                this.x = this.dx;
                // once player reached destination set x and z to dx and dz
                this.setxPosFlag = false;
                // set flags to false to prevent further changing
                this.stopAnimation();
                this.playAnimation('Armature|Idle');
                // stop walking animation, play idle animation
            }

            if (this.container.position.z < this.dz * 100) {
                this.container.position.z += 2;
            } else if (this.container.position.z > this.dz * 100) {
                this.container.position.z -= 2;
            } else if (this.setzPosFlag) {
                this.z = this.dz;
                this.setzPosFlag = false;
                this.stopAnimation();
                this.playAnimation('Armature|Idle');
            }
        };

        /**
         * Plays animation embeded in model
         * @method
         * @since 1.0.0
         * @param {String} name name of animation to play
         */
        this.playAnimation = (name) => {
            this.model.mixer.clipAction(name).play();
        };

        /**
         * Stops all animations
         * @method
         * @since 1.0.0
         */
        this.stopAnimation = () => {
            this.model.mixer.uncacheRoot(this.model);
        };
    }
}
