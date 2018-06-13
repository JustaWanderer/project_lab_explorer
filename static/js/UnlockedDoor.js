/**
 * @class
 */
class UnlockedDoor {
    /**
     * creates an unlocked door
     */
    constructor() {
        this.container = new THREE.Object3D();
        let geometry = new THREE.PlaneGeometry(Settings.tileWidth / 4, 50);
        let material = new THREE.MeshPhongMaterial({
            map: Settings.unlockedDoorMap,
            bumpMap: Settings.unlockedDoorBumpMap,
            side: THREE.DoubleSide,
        });
        let w1 = new THREE.Mesh(geometry, material);
        let w2 = w1.clone();
        this.container.add(w1);
        this.container.add(w2);
        w1.position.x -= 37.5;
        w2.position.x += 37.5;
    }
}
