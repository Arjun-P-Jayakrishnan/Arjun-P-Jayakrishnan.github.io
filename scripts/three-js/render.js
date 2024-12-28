import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  HemisphereLight,
  WebGLRenderer
} from "three";
import { Loader } from "./loader.js";

/**
 *  @typedef {Object} Render
 *  @property {(props:{modelUrls:Array<String>,hdriUrl:String})=>void} loadBaseLayout
 *  @property {Function} render
 * 
 */

/**
 * @description provides a abstraction layer where all render logic holds
 * @param {Scene} scene
 * @param {PerspectiveCamera} camera
 * @param {WebGLRenderer} renderer
 * @returns {Render}
 */
export const RenderScene = (scene, camera,renderer) => {
  /**@type {Loader} */
  let loader;

  /**@type {HemisphereLight} */
  let light;

  let assets;

  /**
   * @description completes the basic layouts and loading before a scene has to be rendered
   * @param {{modelUrls:Array<String>,hdriUrl:String}} param0 
   *
   */
  const _loadBaseLayout = (
    {
      modelUrls,
      hdriUrl
    }
  ) => {
    light = new HemisphereLight(0xffffff, 0x444444);
    scene.add(light);
    loader= Loader(scene,renderer);

    (async ()=>{assets = await loader.load({modelUrls,hdriUrl});})();
    console.log(assets)

    // adjust zoom level
    camera.position.z = 0.5;
  };

  const _render = () => {
    assets.loadedMeshes.forEach((mesh)=>{
      mesh.rotation.y+=0.01;
    })
  };

  return {
    loadBaseLayout:_loadBaseLayout,
    render: _render,
  };
};
