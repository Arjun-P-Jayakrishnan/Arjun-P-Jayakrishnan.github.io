import * as THREE from 'three';

export const ThreeJs=()=>{
    let scene;
    let camera;
    let renderer;
    let cube;

    const configure=()=>{
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
    
        document.querySelector("main").appendChild( renderer.domElement );
    }

    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }

    const runThreeJs=()=>{
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;
        renderer.setAnimationLoop( animate );
    }

    return {
        configure:configure,
        runThreeJs:runThreeJs
    };
}