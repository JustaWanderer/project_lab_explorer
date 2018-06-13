'esversion: 6';
/**
 * @class
 */
class Player {
    /**
     * Creates new player.
     * @since 1.0.0
     * @param {Number} x staring x position (default 0)
     * @param {Number} z staring z position (default 0)
     */
    constructor(x = 0, z = 0) {
        // container with player model
        this.container = new THREE.Object3D();
        this.x = 0;
        this.z = 0;
        this.dx = 0; // destination x, used for moving player
        this.dz = 0; // destination z
        // flags used to set x and z only once in playerMove()
        this.setxPosFlag = false;
        this.setzPosFlag = false;

        let geometry = new THREE.CylinderGeometry(20, 20, 60, 20);
        let material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide,
            wireframe: false,
        });
        let mesh = new THREE.Mesh(geometry, material);
        // this.container.add(mesh);

        let model = Settings.playerModel;
        this.container.add(model);

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
                model.rotation.y = Math.PI/2;
            } else if (this.dx - this.x == -1) {
                model.rotation.y = -Math.PI/2;
            } else if (this.dz - this.z == 1) {
                model.rotation.y = 0;
            } else if (this.dz - this.z == -1) {
                model.rotation.y = Math.PI;
            }
        };

        /**
         * Moves player to dx, dz
         * @method
         * @since 1.0.0
         */
        this.playerMove = () => {
            if (this.container.position.x < this.dx*100) {
                this.container.position.x += 2;
            } else if (this.container.position.x > this.dx*100) {
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

            if (this.container.position.z < this.dz*100) {
                this.container.position.z += 2;
            } else if (this.container.position.z > this.dz*100) {
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
            model.mixer.clipAction(name).play();
        };

        /**
         * Stops all animations
         * @method
         * @since 1.0.0
         */
        this.stopAnimation = () => {
            model.mixer.uncacheRoot(model);
        };
    }
}
