import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { UltraHDRLoader } from "three/addons/loaders/UltraHDRLoader.js";
import { EquirectangularReflectionMapping, Scene, PMREMGenerator } from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

/**
 * @typedef {Object} Loader
 * @property { (props:{modelUrls:Array<String>,hdriUrl:String})=>{loadedMeshes:Mesh}} load
 */

/**
 *
 * @param {Scene} scene
 * @returns {Loader}
 */
export const Loader = (scene, renderer) => {
  /**
   * @type {GLTFLoader}
   */
  const loader = new GLTFLoader();
  const pmremGenerator = new PMREMGenerator(renderer);

  /**
   * @type {RGBELoader}
   */
  const hdriLoader = new RGBELoader();

  /**
   * @description loads the models in the asset
   * @param {String} url
   * @param {(model)=>void} fn
   */
  const _loadAssets = async (url, fn) => {
    const modelGLB = await loader.loadAsync(url);
    const model = modelGLB.scene;

    const meshes = [];

    model.traverse((child) => {
      if (child.isMesh) {
        fn(child);
        meshes.push(child);
      }
    });

    return {
      loadedMeshes: meshes,
    };
  };

  /**
   *
   * @description loads the hdr
   * @param {String} url
   * @param {(asset)=>void} fn
   */
  const _loadHDR = (url, fn) => {
    hdriLoader.load(url, function (texture) {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      texture.dispose();
      scene.environment = envMap;
    });
  };

  const _load = async ({ modelUrls, hdriUrl }) => {

    const loadedMeshes=[];

    /**
     * load models
     */
    const promises = [];
    modelUrls.forEach((modelUrl) => {
      promises.push(
        _loadAssets(modelUrl, (mesh) => {
          loadedMeshes.push(mesh)
        })
      );
    });

    Promise.allSettled(promises).then((props) => {
      props.forEach((prop) => {
        prop.value.loadedMeshes.forEach((mesh) => {
          scene.add(mesh);
        });
      });
    });

    /**
     * load HDRI for lighting
     */
    if (hdriUrl !== null) {
      _loadHDR(hdriUrl, () => {});
    }

    return {
      loadedMeshes:loadedMeshes
    }
  };

  return {
   load:_load
  };
};
