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

        this.hp = 3; // Health Points
        this.inventory = [null, null];
        this.time = 0;
        this.birthdate = Date.now();

        // adding model depending on player number
        if (number == 1) {
            this.model = Settings.player1Model;
        } else if (number == 2) {
            this.model = Settings.player2Model;
        }
        this.container.add(this.model);
        this.model.scale.set(0.55, 0.55, 0.55);

        // set player starting position
        this.container.position.x = x * Settings.tileWidth;
        this.container.position.z = z * Settings.tileWidth;
        this.container.position.y = -30;
        let light = new THREE.PointLight(0xffffff, 1, 300, 2);
        light.rotateX(Math.PI);
        light.position.y = 1;
        light.castShadow = true;
        light.shadow.camera.far = 10000;
        this.container.add(light);

        /**
         * Checks if player can move to clicked field
         * @method
         * @since 1.0.0
         * @param {Number} x x position of clicked field
         * @param {Number} z z position of clicked field
         * @param {Object} info information about field that player is standing on
         * @param {Object} clickedinfo information about clicked field
         */
        this.checkForMove = (x, z, info = {
            doorE: null,
            doorW: null,
            doorN: null,
            doorS: null,
        },
        clickedinfo = {
            type: null,
        }) => {
            let block = true;

            if (x - this.x == 1) {
                this.model.rotation.y = Math.PI / 2;

                if (info.doorE) {
                    if (info.doorE.code == 1 || info.doorE.code == 3) {
                        block = false;
                    }
                } else {
                    block = false;
                }
            } else if (x - this.x == -1) {
                this.model.rotation.y = -Math.PI / 2;

                if (info.doorW) {
                    if (info.doorW.code == 1 || info.doorW.code == 3) {
                        block = false;
                    }
                } else {
                    block = false;
                }
            } else if (z - this.z == 1) {
                this.model.rotation.y = 0;

                if (info.doorS) {
                    if (info.doorS.code == 1 || info.doorS.code == 3) {
                        block = false;
                    }
                } else {
                    block = false;
                }
            } else if (z - this.z == -1) {
                this.model.rotation.y = Math.PI;

                if (info.doorN) {
                    if (info.doorN.code == 1 || info.doorN.code == 3) {
                        block = false;
                    }
                } else {
                    block = false;
                }
            }

            let distance = Math.sqrt(Math.pow((x - this.x), 2) + Math.pow((z - this.z), 2)); // distance from player to clicked tile
            if (clickedinfo.content) {
                if (clickedinfo.content.type == 'enemy') {
                    if (distance == 1) {
                        if (this.hp == 1) {
                            this.stopAnimation();
                            this.playAnimation('Armature|Armature|Armature|Death|Armature|Death');
                            setTimeout(() => {
                                this.stopAnimation();
                                this.container.remove(this.model);
                            }, 2200);
                            block = true;
                            this.hp--;
                        } else {
                            this.stopAnimation();
                            this.playAnimation('Armature|Armature|Armature|Punch|Armature|Punch');
                            setTimeout(() => {
                                this.stopAnimation();
                                this.playAnimation('Armature|Armature|Armature|Idle|Armature|Idle');
                            }, 1000);
                            block = true;
                            this.hp--;
                        }
                    }
                }
            }

            if (distance == 1 && !this.setxPosFlag && !this.setzPosFlag && !block) {
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
                this.playAnimation('Armature|Armature|Armature|Walk|Armature|Walk');
            }
        };

        /**
         * Moves player to dx, dz
         * @method
         * @since 1.0.0
         * @param {Object} orbitControl orbitControls camera
         */
        this.playerMove = (orbitControl) => {
            if (this.container.position.x < this.dx * Settings.tileWidth) {
                this.container.position.x += 2;
            } else if (this.container.position.x > this.dx * Settings.tileWidth) {
                this.container.position.x -= 2;
                // increment or decrement players position until it reaches destination
            } else if (this.setxPosFlag) {
                this.x = this.dx;
                // once player reached destination set x and z to dx and dz
                this.setxPosFlag = false;
                // set flags to false to prevent further changing
                this.stopAnimation();
                this.playAnimation('Armature|Armature|Armature|Idle|Armature|Idle');
                // stop walking animation, play idle animation
            }

            if (this.container.position.z < this.dz * Settings.tileWidth) {
                this.container.position.z += 2;
            } else if (this.container.position.z > this.dz * Settings.tileWidth) {
                this.container.position.z -= 2;
            } else if (this.setzPosFlag) {
                this.z = this.dz;
                this.setzPosFlag = false;
                this.stopAnimation();
                this.playAnimation('Armature|Armature|Armature|Idle|Armature|Idle');
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
