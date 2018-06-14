let mixers = [];

const loadWallTextures = () => new Promise((resolve, reject) => {
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
                                                                .then(() => {
                                                                    loader.loadTexture('./resources/textures/one-way-door-bump.png')
                                                                        .then((texture) => {
                                                                            Settings.oneWayDoorBumpMap = texture;
                                                                        }, console.error)
                                                                        .then(() => {
                                                                            loader.loadTexture('./resources/textures/one-way-in-door.png')
                                                                                .then((texture) => {
                                                                                    Settings.oneWayInDoorMap = texture;
                                                                                }, console.error)
                                                                                .then(() => {
                                                                                    loader.loadTexture('./resources/textures/one-way-out-door.png')
                                                                                        .then((texture) => {
                                                                                            Settings.oneWayOutDoorMap = texture;
                                                                                        }, console.error)
                                                                                        .then(() => {
                                                                                            loader.loadTexture('./resources/textures/one-way-force.png')
                                                                                                .then((texture) => {
                                                                                                    Settings.oneWayForceMap = texture;
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
                        });
                });
        });
});
const loadResources = () => new Promise((resolve, reject) => {
    loadWallTextures()
        .then(() => {
            loadModels()
                .then(resolve);
        });
});

const loadModels = () => new Promise((resolve, reject) => {
    $(document).trigger('loading-models-begin');
    const loader = new ResLoader();

    loader.loadFBX('resources/models/Player1.fbx')
        .then((object) => {
            object.mixer = new THREE.AnimationMixer(object);
            mixers.push(object.mixer);
            Settings.player1Model = object;
        }, console.error)
        .then(() => {
            loader.loadFBX('resources/models/Player2.fbx')
                .then((object) => {
                    object.mixer = new THREE.AnimationMixer(object);
                    mixers.push(object.mixer);
                    Settings.player2Model = object;
                }, console.error)
                .then(resolve);
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
    loadResources().then(() => {
        // three.js setup
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


            let player1 = new Player(1);
            scene.add(player1.container);
            player1.playAnimation('Armature|Armature|Armature|Idle|Armature|Idle');

            let player2 = new Player(2, 2, 2);
            scene.add(player2.container);
            player2.playAnimation('Armature|Armature|Armature|Idle|Armature|Idle');

            // test light (to change)
            let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            scene.add(directionalLight);
            directionalLight.rotateX(Math.PI / 16);
            directionalLight.rotateZ(Math.PI / 16);


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
                    player1.checkForMove(x / Settings.tileWidth, z / Settings.tileWidth);
                    player2.checkForMove(x / Settings.tileWidth, z / Settings.tileWidth);
                }
            });

            let minimapVisible = false;
            let minimapObj = new Minimap(json, player1, player2);
            let minimap = $(minimapObj.getCanvas())
                .css('position', 'absolute')
                .css('top', 100)
                .css('right', 0)
                .appendTo($('#root'))
                .hide();

            $(document).keydown((event) => {
                if (event.which === 77) {
                    if (minimapVisible) {
                        minimapVisible = false;
                        minimap.hide();
                    } else {
                        minimapVisible = true;
                        minimap.show();
                    }
                }
            });

            /**
             * Main rendering loop
             * @method
             * @since 1.0.0
             */
            function render() {
                let delta = clock.getDelta();
                if (mixers.length > 0) {
                    for (let i = 0; i < mixers.length; i++) {
                        mixers[i].update(delta);
                    }
                }
                minimapObj.update();
                player1.playerMove();
                player2.playerMove();
                requestAnimationFrame(render);
                renderer.render(scene, camera);
            }


            render(); // let's get this party started
        }, console.error);
    }, console.error);
});
