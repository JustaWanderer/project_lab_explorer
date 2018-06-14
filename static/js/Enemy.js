'esversion: 6';
/**
 * @class
 */
class Enemy {
    /**
     * Creates new enemy.
     * @since 1.0.0
     * @param {Number} x staring x position (default 0)
     * @param {Number} z staring z position (default 0)
     * @param {Number} index index of enemy model
     */
    constructor(x, z, index) {
        this.container = new THREE.Object3D();
        this.x = x;
        this.z = z;

        this.model = Settings.enemyModels[index];
        this.model.mixer = new THREE.AnimationMixer(this.model);
        mixers.push(this.model.mixer);
        this.model.scale.set(0.55, 0.55, 0.55);
        this.container.add(this.model);
        this.container.position.set(x*Settings.tileWidth, 0, z*Settings.tileWidth);

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
