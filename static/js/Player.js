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

        let geometry = new THREE.CylinderGeometry(20, 20, 60, 20);
        let material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide,
            wireframe: false,
        });
        let mesh = new THREE.Mesh(geometry, material);
        this.container.add(mesh);
        /**
         * Moves player based on clicked position
         * @method
         * @since 1.0.0
         * @param {Number} x x position of clicked field
         * @param {Number} z z position of clicked field
         */
        this.movePlayer = (x, z) => {
            let distance = Math.sqrt(Math.pow((x - this.x), 2) + Math.pow((z - this.z), 2)); // distance from player to clicked tile
            if (distance == 1) {
                this.x = x;
                this.z = z;
                this.container.position.set(x*100, 0, z*100);
            }
        };
    }
}
