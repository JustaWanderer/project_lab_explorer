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
                let geometry = new THREE.PlaneGeometry(Settings.tileWidth, Settings.tileWidth);
                let material = new THREE.MeshPhongMaterial({
                    wireframe: false,
                    map: Settings.floorMap,
                    side: THREE.DoubleSide,
                    bumpMap: Settings.floorBumpMap,
                });

                let tile = new THREE.Mesh(geometry, material);
                // positioning tile by given data
                tile.position.x = data.board[i].x * Settings.tileWidth;
                tile.position.z = data.board[i].z * Settings.tileWidth;
                tile.position.y = -30;
                tile.rotateX(Math.PI/2);

                this.container.add(tile);
            }
        };
    }
}

