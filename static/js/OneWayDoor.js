/**
 * @class
 */
class OneWayDoor {
    /**
     * creates an unlocked door
     * @param {string} dir direction (in, out)
     */
    constructor(dir) {
        this.container = new THREE.Object3D();
        let geometry = new THREE.PlaneGeometry(Settings.tileWidth / 4, Settings.tileWidth / 2);
        let material;
        if (dir == 'in') {
            material = new THREE.MeshPhongMaterial({
                map: Settings.oneWayInDoorMap,
                bumpMap: Settings.oneWayDoorBumpMap,
                side: THREE.DoubleSide,
            });
        } else {
            material = new THREE.MeshPhongMaterial({
                map: Settings.oneWayOutDoorMap,
                bumpMap: Settings.oneWayDoorBumpMap,
                side: THREE.DoubleSide,
            });
        }
        let w1 = new THREE.Mesh(geometry, material);
        let w2 = w1.clone();
        this.container.add(w1);
        this.container.add(w2);
        w1.position.x -= 37.5;
        w2.position.x += 37.5;
        let forceGeometry = new THREE.PlaneGeometry(Settings.tileWidth / 2, Settings.tileWidth / 2);
        let forceMaterial = new THREE.MeshPhongMaterial({
            map: Settings.oneWayForceMap,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5,
        });

        let w3 = new THREE.Mesh(forceGeometry, forceMaterial);
        w3.material.opacity = 0.5;
        this.container.add(w3);
    }
}
