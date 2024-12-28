import {Scene,PerspectiveCamera,WebGLRenderer, HemisphereLight} from 'three';
import {Loader} from "./loader.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * @typedef {Object} ThreeConfig
 * @property {()=>{scene:Scene,camera:PerspectiveCamera,controls:OrbitControls}} configure 
 * @property {(fn:()=>void)=>void} runThreeJs runs the render loop with 
 * render logic defined in the fn function passed as input
 * @property {(innerWidth:number,innerHeight:number)=>void} resize sets the aspect ratio again as window dimensions change 
 */

/**
 * @description creates primary three js utilities that msut be initialized during the 
 * primary load
 * @param {String} tag the html element that the three js canvas is going to be attached to
 * @returns {ThreeConfig}
 * 
 */
export const ThreeJs=(
    {
        /**@type {String} */
        tag
    }
)=>{
    /**@type {Scene} */
    let scene;

    /**@type {PerspectiveCamera} */
    let camera;

    /**@type {WebGLRenderer} */
    let renderer;

    /**@type {OrbitControls} */
    let controls;
   
  

    const configure=()=>{
        scene = new Scene();
        camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        renderer= new WebGLRenderer();

        renderer.setSize( window.innerWidth, window.innerHeight );
        document.querySelector(tag).appendChild( renderer.domElement );

        //Add after the type
        controls = new OrbitControls( camera, renderer.domElement );
        return {scene:scene,camera:camera,controls:controls,renderer:renderer}
    }

   
    /**
     * 
     * @function fn render loop function
     */
    const runThreeJs=(fn)=>{
        renderer.setAnimationLoop( ()=>{fn(); renderer.render( scene, camera );} );
    }

    /**
     * @description automatically changes the render size
     * @param {innerWidth:String,innerHeight:String} param0 
     */
    const _resize=({innerWidth,innerHeight})=>{
        renderer.setSize( innerWidth, innerHeight );
        camera.aspect=innerWidth / innerHeight
    }

    return {
        configure:configure,
        runThreeJs:runThreeJs,
        resize:_resize
    };
}
