'esversion: 6';
/**
 * @class
 */
class Generator {
    /**
     * Creates new generator.
     * @since 1.0.0
     */
    constructor() {
        this.container = new THREE.Object3D();

        /**
        * Creates level based on given data
        * @method
        * @since 1.0.0
        * @param {Object} data data for building level
        */
        this.generateLevel = (data) => {
            for (let i = 0; i < data.board.length; i++) {
                let geometry = new THREE.PlaneGeometry(100, 100);
                let material = new THREE.Material({
                    color: 0x0f0f0f,
                });

                let tile = new THREE.Mesh(geometry, material);
                // positioning tile by given data
                tile.position.x = data.board[i].x * 100;
                tile.position.z = data.board[i].z * 100;

                this.container.add(tile);
            }
        };
    }
}

