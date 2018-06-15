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
                                                                                                .then(() => {
                                                                                                    loader.loadTexture('./resources/textures/pressure-plate.png')
                                                                                                        .then((texture) => {
                                                                                                            Settings.pressurePlateMap = texture;
                                                                                                        }, console.error)
                                                                                                        .then(() => {
                                                                                                            loader.loadTexture('./resources/textures/pressure-plate-bump.png')
                                                                                                                .then((texture) => {
                                                                                                                    Settings.pressurePlateBumpMap = texture;
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
                .then(() => {
                    loader.loadFBX('resources/models/Enemy.fbx')
                        .then((object) => {
                            Settings.enemyModels.push(object);
                        }, console.error)
                        .then(() => {
                            loader.loadFBX('resources/models/Enemy.fbx')
                                .then((object) => {
                                    Settings.enemyModels.push(object);
                                }, console.error)
                                .then(() => {
                                    loader.loadFBX('resources/models/Enemy.fbx')
                                        .then((object) => {
                                            Settings.enemyModels.push(object);
                                        }, console.error)
                                        .then(() => {
                                            loader.loadFBX('resources/models/Enemy.fbx')
                                                .then((object) => {
                                                    Settings.enemyModels.push(object);
                                                }, console.error)
                                                .then(() => {
                                                    loader.loadFBX('resources/models/Enemy.fbx')
                                                        .then((object) => {
                                                            Settings.enemyModels.push(object);
                                                        }, console.error)
                                                        .then(() => {
                                                            loader.loadFBX('resources/models/Enemy.fbx')
                                                                .then((object) => {
                                                                    Settings.enemyModels.push(object);
                                                                }, console.error)
                                                                .then(() => {
                                                                    loader.loadFBX('resources/models/Enemy.fbx')
                                                                        .then((object) => {
                                                                            Settings.enemyModels.push(object);
                                                                        }, console.error)
                                                                        .then(() => {
                                                                            loader.loadFBX('resources/models/Enemy.fbx')
                                                                                .then((object) => {
                                                                                    Settings.enemyModels.push(object);
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

            let player1 = new Player(1, generator.player1start.x, generator.player1start.z);
            scene.add(player1.container);
            player1.playAnimation('Armature|Armature|Armature|Idle|Armature|Idle');

            let player2 = new Player(2, generator.player2start.x, generator.player2start.z);
            scene.add(player2.container);
            player2.playAnimation('Armature|Armature|Armature|Idle|Armature|Idle');

            let yourPlayer; // 1 or 2

            h.ajax('/connect').then((data) => {
                if (data.player == 1) {
                    orbitControl.target = player1.container.position;
                    yourPlayer = 1;
                    h.ajax('/setPos', 'POST', {
                        player: 1,
                        playerData: {
                            dx: player1.x,
                            dy: player1.y,
                        },
                    });
                } else {
                    orbitControl.target = player2.container.position;
                    yourPlayer = 2;
                    h.ajax('/setPos', 'POST', {
                        player: 1,
                        playerData: {
                            dx: player2.x,
                            dy: player2.y,
                        },
                    });
                }
                let iid = setInterval(() => {
                    h.ajax('/listen').then((data) => {
                        if (data.ok) {
                            clearInterval(iid);
                            $('#root').append(renderer.domElement);

                            // test light (to change)
                            let directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
                            scene.add(directionalLight);
                            directionalLight.position.set(2, 200, 2);
                            directionalLight.target.position.set(0, 0, 0);

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
                                    let clickedinfo;
                                    for (let i = 0; i < json.board.length; i++) {
                                        if (json.board[i].x == x / Settings.tileWidth && json.board[i].z == z / Settings.tileWidth) {
                                            clickedinfo = json.board[i];
                                        }
                                    }

                                    let info;
                                    if (yourPlayer == 1) {
                                        for (let i = 0; i < json.board.length; i++) {
                                            if (json.board[i].x == player1.x && json.board[i].z == player1.z) {
                                                info = json.board[i];
                                            }
                                        }
                                        player1.checkForMove(x / Settings.tileWidth, z / Settings.tileWidth, info, clickedinfo);
                                        if (player1.hp == 0) {
                                            uiObj.loss();
                                            h.ajax('/setPos', 'POST', {
                                                player: 1,
                                                type: 'loss',
                                            });
                                        }

                                        h.ajax('/setPos', 'POST', {
                                            player: 1,
                                            playerData: {
                                                dx: player1.dx,
                                                dz: player1.dz,
                                            },
                                        });
                                    } else {
                                        for (let i = 0; i < json.board.length; i++) {
                                            if (json.board[i].x == player2.x && json.board[i].z == player2.z) {
                                                info = json.board[i];
                                            }
                                        }
                                        player2.checkForMove(x / Settings.tileWidth, z / Settings.tileWidth, info, clickedinfo);
                                        if (player2.hp == 0) {
                                            uiObj.loss();
                                            h.ajax('/setPos', 'POST', {
                                                player: 2,
                                                type: 'loss',
                                            });
                                        }

                                        h.ajax('/setPos', 'POST', {
                                            player: 2,
                                            playerData: {
                                                dx: player2.dx,
                                                dz: player2.dz,
                                            },
                                        });
                                    }
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

                            let uiObj;
                            if (yourPlayer == 1) {
                                uiObj = new UI(json, player1);
                            } else {
                                uiObj = new UI(json, player2);
                            }

                            $(uiObj.getCanvas())
                                .css('position', 'absolute')
                                .css('top', 0)
                                .css('left', 0)
                                .appendTo($('#root'));

                            let iid2 = setInterval(() => {
                                let body = {
                                    player: yourPlayer,
                                };
                                h.ajax('/checkMoves', 'GET', body)
                                    .then((data) => {
                                        let info;
                                        if (data.type == 'loss') {
                                            uiObj.loss();
                                        } else if (data.dx && data.dz) {
                                            for (let i = 0; i < json.board.length; i++) {
                                                if (json.board[i].x == data.dx && json.board[i].z == data.dz) {
                                                    info = json.board[i];
                                                }
                                            }
                                            if (yourPlayer == 1) {
                                                if (data.dx != player2.dx || data.dy != player2.dz) {
                                                    player2.checkForMove(data.dx, data.dz, info);
                                                }
                                            } else {
                                                if (data.dx != player1.dx || data.dy != player1.dz) {
                                                    player1.checkForMove(data.dx, data.dz, info);
                                                }
                                            }
                                        }
                                    }, console.log);
                            }, 500);

                            $(document).on('actiontrigger', (e) => {
                                console.log('actiontrigger');
                                json.board.forEach((field) => {
                                    if (field.doorN.code && field.doorN.code == 2 && field.doorN.id == e.id) {
                                        field.doorN.code = 1;
                                    }
                                    if (field.doorS.code && field.doorS.code == 2 && field.doorS.id == e.id) {
                                        field.doorS.code = 1;
                                    }
                                    if (field.doorE.code && field.doorE.code == 2 && field.doorE.id == e.id) {
                                        field.doorE.code = 1;
                                    }
                                    if (field.doorE.code && field.doorE.code == 2 && field.doorE.id == e.id) {
                                        field.doorE.code = 1;
                                    }
                                });
                                scene.remove(generator.container);
                                generator.generateLevel(json);
                                scene.add(generator.container);
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
                                orbitControl.update();
                                uiObj.update();
                                minimapObj.update();
                                player1.time = Date.now() - player1.birthdate;
                                player2.time = Date.now() - player2.birthdate;
                                if (yourPlayer == 1) {
                                    player1.playerMove(orbitControl);
                                    player2.playerMove();
                                } else {
                                    player1.playerMove();
                                    player2.playerMove(orbitControl);
                                }
                                requestAnimationFrame(render);
                                renderer.render(scene, camera);
                            }

                            render(); // let's get this party started
                        }
                    });
                }, 300);
            });
        }, console.error);
    }, console.error);
});
