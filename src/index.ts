import {
  createWebComponentManager,
  WebComponentManager,
} from "@components/main";
import { getGlobalContext, References } from "@utils/globalContext";
import { assetMetaData } from "config/assetMetaData";
import { createGameManager, GameEngineManager } from "graphics/main";

interface Managers {
  webComponent: WebComponentManager;
  gameEngine: GameEngineManager;
}

let references: References;

let managers: Managers;

const mountWindowEventListeners = () => {};

const preMount = () => {
  /**
   * References
   */
  references = getGlobalContext();
  /**
   * Managers
   */
  managers = {
    webComponent: createWebComponentManager(),
    gameEngine: createGameManager({
      loaderOptions: {
        meshesMetaData: assetMetaData.meshes,
        hdrMetaData: assetMetaData.hdr,
      },
    }),
  };

  managers.webComponent.mountComponents();
};

/**
 * helps to add all necessary mounting function
 */
const mount = () => {
  /**
   * Add Event Manager reference to web components for interaction
   */
  managers.webComponent.attachReferences();

  /**
   * Loads all models , HDR  etc
   */
  Promise.allSettled([managers.gameEngine.mount()]).then((responses) => {
    responses.forEach((response) => {
      if (response.status == "rejected") {
        throw new Error(
          `Failed to load models and mount game engine ${response.reason}`
        );
      }
    });

    console.log("all components mounted");
    /**
     * @description update the game engine
     * (uses self recursion method for rendering so only need to call once)
     */
    managers.gameEngine.update();
  });
};

/**
 * helps to clear any unmounted objects
 */
const unmount = () => {
  managers.webComponent.unmountComponents();
  managers.gameEngine.unmount();
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

/**
 * IIFE function
 * (Immediately Invoked Function Expression)
 */
(() => {
  main();
})();
