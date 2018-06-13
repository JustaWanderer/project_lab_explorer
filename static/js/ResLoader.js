/**
 * Overviews loading of resources such as textures or models
 * @class
 * @since 1.0.0
 */
class ResLoader {
    /**
     * @constructor
     */
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
        this.modelLoader = new THREE.JSONLoader();
        this.FBXLoader = new THREE.FBXLoader();
    }

    /**
     * Loads a texture from a file
     * @param {string} path relative path to the resource
     * @return {Promise<THREE.Texture | ErrorEvent>}
     * @since 1.0.0
     * @method
     */
    loadTexture(path) {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(path, resolve, null, reject);
        });
    }

    /**
     * Loads a geometry from a file
     * @param {string} path relative path to the resource
     * @return {Promise<THREE.Geometry | ErrorEvent>}
     * @since 1.0.0
     * @method
     */
    loadGeometry(path) {
        return new Promise((resolve, reject) => {
            this.modelLoader.load(path, resolve, null, reject);
        });
    }

    /**
     * Loads a FBX Model from a file
     * @param {string} path relative path to the resource
     * @return {Promise<THREE.Geometry | ErrorEvent>}
     * @since 1.0.0
     * @method
     */
    loadFBX(path) {
        return new Promise((resolve, reject) => {
            this.FBXLoader.load(path, resolve, null, reject);
        });
    }
}
