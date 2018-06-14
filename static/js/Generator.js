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
                    map: Settings.floorMap,
                    bumpMap: Settings.floorBumpMap,
                    side: THREE.DoubleSide,
                });
                generateWalls(data.board[i]);
                let tile = new THREE.Mesh(geometry, material);
                // positioning tile by given data
                tile.position.x = data.board[i].x * Settings.tileWidth;
                tile.position.z = data.board[i].z * Settings.tileWidth;
                tile.position.y = -30;
                tile.name = 'tile-' + data.board[i].x + '-' + data.board[i].z;
                tile.rotateX(Math.PI / 2);
                tile.recieveShadow = true;
                tile.castShadow = true;

                this.container.add(tile);
            }
        };

        const generateWalls = (field) => {
            let geometry;
            let material;
            let doorType;
            let wallExists = true;
            let wall;
            for (let i = 0; i < 4; i++) {
                wallExists = true;
                switch (i) {
                    case 0:
                        doorType = field.doorN;
                        break;
                    case 1:
                        doorType = field.doorE;
                        break;
                    case 2:
                        doorType = field.doorS;
                        break;
                    case 3:
                        doorType = field.doorW;
                        break;
                }
                if (doorType === null) {
                    wallExists = false;
                } else if (doorType.code === 0) {
                    geometry = new THREE.PlaneGeometry(Settings.tileWidth, Settings.tileWidth / 2);
                    material = new THREE.MeshPhongMaterial({
                        wireframe: false,
                        map: Settings.wallMap,
                        side: THREE.DoubleSide,
                        bumpMap: Settings.wallBumpMap,
                    });
                    wall = new THREE.Mesh(geometry, material);
                } else if (doorType.code === 1) {
                    wall = new UnlockedDoor().container;
                } else if (doorType.code === 2) {
                    geometry = new THREE.PlaneGeometry(Settings.tileWidth, Settings.tileWidth / 2);
                    material = new THREE.MeshPhongMaterial({
                        wireframe: false,
                        map: Settings.lockedDoorMap,
                        side: THREE.DoubleSide,
                        bumpMap: Settings.lockedDoorBumpMap,
                    });
                    wall = new THREE.Mesh(geometry, material);
                } else if (doorType.code === 3) {
                    wall = new OneWayDoor('in').container;
                } else if (doorType.code === 4) {
                    wall = new OneWayDoor('out').container;
                } else {
                    wallExists = false;
                }
                if (wallExists) {
                    switch (i) {
                        case 0:
                            wall.position.x = field.x * Settings.tileWidth;
                            wall.position.z = field.z * Settings.tileWidth - Settings.tileWidth / 2 + 0.1;
                            break;
                        case 1:
                            wall.position.x = field.x * Settings.tileWidth + Settings.tileWidth / 2 - 0.1;
                            wall.position.z = field.z * Settings.tileWidth;
                            wall.rotateY(Math.PI / 2);
                            break;
                        case 2:
                            wall.position.x = field.x * Settings.tileWidth;
                            wall.position.z = field.z * Settings.tileWidth + Settings.tileWidth / 2 - 0.1;
                            break;
                        case 3:
                            wall.position.x = field.x * Settings.tileWidth - Settings.tileWidth / 2 + 0.1;
                            wall.position.z = field.z * Settings.tileWidth;
                            wall.rotateY(Math.PI / 2);
                            break;
                    }
                    wall.position.y = -5;

                    this.container.add(wall);
                }
            }
        };
    }
}
