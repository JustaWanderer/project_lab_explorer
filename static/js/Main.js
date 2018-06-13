const loadResources = () => new Promise((resolve, reject) => {
    loadTextures().then(resolve);
});

const loadTextures = () => new Promise((resolve, reject) => {
    $(document).trigger('loading-textures-begin');
    const loader = new ResLoader();

    loader.loadTexture('./resources/textures/wall.png')
        .then((texture) => {
            Settings.wallMap = texture;
        }, console.error).then(() => {
            loader.loadTexture('./resources/textures/wall-bump.png')
                .then((texture) => {
                    Settings.wallBumpMap = texture;
                }, console.error).then(() => {
                    loader.loadTexture('./resources/textures/floor.png')
                        .then((texture) => {
                            Settings.floorMap = texture;
                        }, console.error).then(() => {
                            loader.loadTexture('./resources/textures/floor-bump.png')
                                .then((texture) => {
                                    Settings.floorBumpMap = texture;
                                }, console.error)
                                .then(() => {
                                    loader.loadTexture('./resources/textures/unlocked-door.png')
                                        .then((texture) => {
                                            Settings.unlockedDoorMap = texture;
                                        }, console.error)
                                        .then(() => {
                                            loader.loadTexture('./resources/textures/unlocked-door-bump.png')
                                                .then((texture) => {
                                                    Settings.unlockedDoorBumpMap = texture;
                                                }, console.error)
                                                .then(() => {
                                                    loader.loadTexture('./resources/textures/locked-door.png')
                                                        .then((texture) => {
                                                            Settings.lockedDoorMap = texture;
                                                        }, console.error)
                                                        .then(() => {
                                                            loader.loadTexture('./resources/textures/locked-door-bump.png')
                                                                .then((texture) => {
                                                                    Settings.lockedDoorBumpMap = texture;
                                                                }, console.error)
                                                                .then(resolve);
                                                        });
                                                });
                                        });
                                });
                        });
                });
        });
});

const getParameterByName = (name) => {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

$(document).ready(() => {
    // three.js setup
    loadResources().then(() => {
        let clock = new THREE.Clock();
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(
            45,
            $(window).width() / $(window).height(),
            0.1,
            10000
        );
        let renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000);
        renderer.setSize($(window).width(), $(window).height());
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        $('#root').append(renderer.domElement);
        // end three.js setup

        scene.add(camera);
        camera.position.y = 2000;
        camera.lookAt(scene.position);

        let orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.addEventListener('change', () => {
            renderer.render(scene, camera);
        });

        // test data
        h.ajax('/getLevels', 'GET', {
            _id: getParameterByName('id'),
        }).then((data) => {
            let json = JSON.parse(data[0].jsonData);
            if (!data) {
                json = JSON.parse('{"width":5,"length":5,"name":"test2","numOfPlayers":1,"board":[{"x":0,"z":4,"type":7,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":1,"z":4,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":2,"z":4,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":3,"z":4,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":4,"z":4,"type":1,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":{"type":"enemy","strength":1}},{"x":4,"z":3,"type":2,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":{"type":"key","id":0}},{"x":4,"z":2,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":3,"z":2,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":2,"z":2,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":1,"z":2,"type":3,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":{"id":0}},{"x":0,"z":2,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":0,"z":1,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":0,"z":0,"type":3,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":{"id":1}},{"x":1,"z":0,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":2,"z":0,"type":6,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":{"type":"fireplace","strength":1}},{"x":3,"z":0,"type":1,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":{"type":"enemy","strength":1}},{"x":4,"z":0,"type":9,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null}]}');
            }

            let generator = new Generator();
            generator.generateLevel(json); // create level from data
            scene.add(generator.container); // add level to scene

            let player = new Player();
            scene.add(player.container);

            let raycaster = new THREE.Raycaster();
            let mouseVector = new THREE.Vector2();
            $(document).mousedown((event) => {
                mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
                mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;

                raycaster.setFromCamera(mouseVector, camera);
                let intersects = raycaster.intersectObjects(generator.container.children);
                if (intersects.length > 0 && intersects[0].object.name.startsWith('tile')) {
                    let x = intersects[0].object.position.x;
                    let z = intersects[0].object.position.z;
                    player.checkForMove(x / 100, z / 100);
                }
            });

            /**
             * Main rendering loop
             * @method
             * @since 1.0.0
             */
            function render() {
                player.playerMove();
                requestAnimationFrame(render);
                renderer.render(scene, camera);
            }

            render(); // let's get this party started
        }, console.error);
    }, console.error);
});
