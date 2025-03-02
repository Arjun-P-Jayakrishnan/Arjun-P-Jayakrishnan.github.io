import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  HemisphereLight,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  BackSide,
  FrontSide,
  AxesHelper,
  SphereGeometry
} from "three";
import { Loader } from "./loader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
export const ThreeJs = ({
  /**@type {String} */
  tag,
}) => {
  /**@type {Scene} */
  let scene;

  /**@type {PerspectiveCamera} */
  let camera;

  /**@type {WebGLRenderer} */
  let renderer;

  /**@type {OrbitControls} */
  let controls;

  /**@type {Mesh}*/
  let skybox;

  const _configureCubeMapSkybox = (baseUrl) => {
    const ft = new TextureLoader().load(baseUrl + "/pz.png");
    const bk = new TextureLoader().load(baseUrl + "/nz.png");
    const up = new TextureLoader().load(baseUrl + "/py.png");
    const down = new TextureLoader().load(baseUrl + "/ny.png");
    const rt = new TextureLoader().load(baseUrl + "/nx.png");
    const lf = new TextureLoader().load(baseUrl + "/px.png");

    return [ft,bk,up,down,rt,lf].map((texture)=>{
        return new MeshBasicMaterial({map:texture,side:BackSide})
    });
  };

  const configure = () => {
    scene = new Scene();
    camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer = new WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector(tag).appendChild(renderer.domElement);

    //Add after the type
    controls = new OrbitControls(camera, renderer.domElement);

    /**
     * @description add a skybox
     */
    const geometry = new BoxGeometry(10, 10, 10);
    skybox = new Mesh(geometry, _configureCubeMapSkybox("../../assets/Standard-Cube-Map"));
    //scene.add(skybox);

    const axesHelper = new AxesHelper( 5 );
    scene.add( axesHelper );

    return {
      scene: scene,
      camera: camera,
      controls: controls,
      renderer: renderer,
      skybox: skybox,
    };
  };

  /**
   *
   * @function fn render loop function
   */
  const runThreeJs = (fn) => {
    renderer.setAnimationLoop(() => {
      fn();
      renderer.render(scene, camera);
    });
  };

  /**
   * @description automatically changes the render size
   * @param {innerWidth:String,innerHeight:String} param0
   */
  const _resize = ({ innerWidth, innerHeight }) => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(innerWidth, innerHeight);
  };

  return {
    configure: configure,
    runThreeJs: runThreeJs,
    resize: _resize,
  };
};
