import {
  createThreeJsInstance
} from "./chunk-NCT4VP26.js";
import {
  createLoader
} from "./chunk-ESBHI3E2.js";

// src/graphics/main.ts
var FILE_CONSTANTS = {
  PATH_TO_MODELS: "../../assets/Models/",
  PATH_TO_HDR: "../../assets/HDR/"
};
var createGameEngineInstance = (props) => {
  const engineInstance = createThreeJsInstance({
    camera: {},
    domMountTag: "game-engine"
  });
  const loaderInstance = createLoader(
    {
      meshesMetaData: [
        // {
        //   path: FILE_CONSTANTS.PATH_TO_MODELS + "carved_wooden_elephant_1k.glb",
        // },
        // {
        //   path: FILE_CONSTANTS.PATH_TO_MODELS + "environment.glb",
        // },
        {
          path: FILE_CONSTANTS.PATH_TO_MODELS + "room.glb"
        }
      ],
      hdrMetaData: {
        path: FILE_CONSTANTS.PATH_TO_HDR + "environment.hdr"
      }
    },
    {
      globalState: props.globalState,
      loaderEventBus: props.eventBusManager.loadingBus,
      renderer: engineInstance.renderer,
      scene: engineInstance.scene
    }
  );
  const mountWindowEventListeners = () => {
    window.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "u" && e.shiftKey) {
        e.preventDefault();
        props.eventBusManager.debugBus.emit({
          type: "debug:inspector",
          scene: engineInstance.scene
        });
      }
    });
  };
  const mount = async (gameplay) => {
    gameplay.mount({
      renderer: engineInstance.renderer,
      scene: engineInstance.scene,
      camera: engineInstance.camera,
      controls: engineInstance.controls
    });
    engineInstance.register(gameplay.update);
    mountWindowEventListeners();
    loaderInstance.configure();
    await loaderInstance.loadAll();
  };
  const unmount = () => {
  };
  const update = () => {
    engineInstance.render();
  };
  return {
    mount,
    unmount,
    update
  };
};

export {
  createGameEngineInstance
};
//# sourceMappingURL=chunk-ED2RMVDL.js.map