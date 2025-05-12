import { attachReferences, mountComponents } from "@components/main";
import {
  createEventBusManager,
  EventBusManager,
} from "@utils/event_management/eventBusFactory";
import { getGlobalContext, References } from "@utils/globalContext";
import { createGlobalState, GlobalState } from "@utils/state/globalState";
import { GlobalStateContext } from "@utils/state/globalStateData";
import { createGameplay, Gameplay } from "graphics/instance/gameplay";
import { createGameEngineInstance, GameEngineInstance } from "graphics/main";




interface Instances {
  gameEngine: GameEngineInstance;
  gamePlay: Gameplay;
}

let references: References;
let instances: Instances;



const mountWindowEventListeners = () => {};

const preMount = () => {
  /**
   * References
   */
  references = getGlobalContext();

  references.globalState.inflate();

  // references.eventBusManager.loadingBus.on("load:complete", () => {
  //   console.log("loading complete");
  // });

  // references.globalState.subscribe("loading", (observable) => {
  //   console.log("global state ", observable);
  // });

  mountComponents();
};

/**
 * helps to add all necessary mounting function
 */
const mount = () => {
  attachReferences({
    state: references.globalState,
    eventBusManager: references.eventBusManager,
  });

  /**
   * Instances
   */

  instances = {
    gameEngine: createGameEngineInstance({
      globalState: references.globalState,
      eventBusManager: references.eventBusManager,
    }),
    gamePlay: createGameplay(
      {},
      {
        globalState: references.globalState,
        eventBusManager: references.eventBusManager,
      }
    ),
  };

  Promise.allSettled([instances.gameEngine.mount(instances.gamePlay)]).then(
    () => {
      console.log("all components mounted");
      instances.gameEngine.update();
    }
  );
};

/**
 * helps to clear any unmounted objects
 */
const unmount = () => {
  instances.gameEngine.unmount();
};

/**
 * entry point for the whole app
 */
const main = () => {
  preMount();

  /**
   * Mounts the components when dom is fully loaded
   */
  document.addEventListener("DOMContentLoaded", () => {
    mount();
    mountWindowEventListeners();
    /**
     * Unmounts everything when the window is going to unload
     */
    window.addEventListener("beforeunload", () => {
      unmount();
    });
  });
};

main();
