import { createDomManager, DOMManager } from "engine/managers/DOMManger";
import { ServiceRegistry } from "types/service.types";
import { getServiceRegistry } from "./ServiceRegistry";

interface Engine {
  run: () => void;
}
/**
 * @description Orchestration Layer that acts as a link to native
 * browser events for performing updates
 * @returns {Engine}
 */
const createEngine = (): Engine => {
  const serviceRegistry: ServiceRegistry = getServiceRegistry();
  const [logger] = [serviceRegistry.get("Logger")];

  let domManager: DOMManager;

  const onInit = () => {
    console.log("Engine initialized");
    domManager = createDomManager();
  };

  const onLoad = () => {
    logger.onLoad({ origin: "Engine" });
    domManager.onLoad();
  };

  const onMount = () => {
    logger.onMount({ origin: "Engine" });
    domManager.onMount();
  };

  const onUnmount = () => {
    logger.onUnmount({ origin: "Engine" });
    domManager.onUnmount();
  };

  const onDispose = () => {
    logger.onDestroy({ origin: "Engine" });
    domManager.onDestroy();
  };

  const run = () => {
    //onLoad essentials before mounting
    onInit();

    //after dom loaded mount
    document.addEventListener("DOMContentLoaded", () => {
      onLoad();
    });

    //after resources are achieved
    window.addEventListener("load", () => {
      onMount();
    });

    //unmount and dispose
    window.addEventListener("beforeunload", () => {
      onUnmount();
    });

    window.addEventListener("unload", () => {
      onDispose();
    });
  };

  return {
    run: run,
  };
};

export { createEngine };
export type { Engine };
