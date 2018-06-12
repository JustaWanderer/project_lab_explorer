$(document).ready(() => {
    // three.js setup
    let clock = new THREE.Clock();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
        45,
        16 / 9,
        0.1,
        10000
    );
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize($(window).width(), $(window).height());
    $('#root').append(renderer.domElement);
    // end three.js setup

    camera.position.y = 200;
    camera.lookAt(scene.position);

    // test data
    let json = JSON.parse('{"width":5,"length":5,"name":"test","numOfPlayers":1,"board":[{"x":0,"z":2,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":1,"z":3,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":2,"z":3,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":3,"z":3,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":4,"z":2,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":3,"z":0,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":1,"z":0,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":1,"z":2,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":2,"z":2,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null},{"x":3,"z":2,"type":0,"doorN":null,"doorE":null,"doorS":null,"doorW":null,"content":null}]}');
    let generator = new Generator();
    generator.generateLevel(json); // create level from data
    scene.add(generator.container); // add level to scene

    /**
    * Main rendering loop
    * @method
    * @since 1.0.0
    */
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    render(); // let's get this party started
});
