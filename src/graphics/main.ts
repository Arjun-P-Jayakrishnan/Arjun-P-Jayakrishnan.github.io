import { EventBusManager } from "@utils/event_management/eventBusFactory";
import { GlobalState } from "@utils/state/globalState";
import { Gameplay } from "./instance/gameplay";
import { createThreeJsInstance } from "./internal/internal";
import { createLoader } from "./loader/loader";

interface GameEngineInstanceProps {
  globalState: GlobalState;
  eventBusManager: EventBusManager;
}

export interface GameEngineInstance {
  mount: (gameplay: Gameplay) => Promise<void>;
  unmount: () => void;
  update: () => void;
}

const FILE_CONSTANTS = {
  PATH_TO_MODELS: "../../assets/models/",
  PATH_TO_HDR: "../../assets/hdr/",
};

export const createGameEngineInstance = (
  props: GameEngineInstanceProps
): GameEngineInstance => {
  const engineInstance = createThreeJsInstance({
    camera: {},
    domMountTag: "game-engine",
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
          path: FILE_CONSTANTS.PATH_TO_MODELS + "room.glb",
        },
      ],
      hdrMetaData: {
        path: FILE_CONSTANTS.PATH_TO_HDR + "environment.hdr",
      },
    },
    {
      globalState: props.globalState,
      loaderEventBus: props.eventBusManager.loadingBus,
      renderer: engineInstance.renderer,
      scene: engineInstance.scene,
    }
  );

  const mountWindowEventListeners = () => {
    window.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "u" && e.shiftKey) {
        e.preventDefault();
        props.eventBusManager.debugBus.emit({
          type: "debug:inspector",
          scene: engineInstance.scene,
        });
      }
    });
  };

  const mount = async (gameplay: Gameplay) => {
    gameplay.mount({
      renderer: engineInstance.renderer,
      scene: engineInstance.scene,
      camera: engineInstance.camera,
      controls: engineInstance.controls,
    });
    engineInstance.register(gameplay.update);
    mountWindowEventListeners();
    loaderInstance.configure();
    await loaderInstance.loadAll();
  };

  const unmount = () => {};

  const update = () => {
    engineInstance.render();
  };

  return {
    mount: mount,
    unmount: unmount,
    update: update,
  };
};
