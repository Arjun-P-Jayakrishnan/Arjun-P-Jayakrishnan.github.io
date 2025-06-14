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
  const [logger, lifecycleScheduler, storage] = [
    serviceRegistry.get("Logger"),
    serviceRegistry.get("LifecycleScheduler"),
    serviceRegistry.get("GlobalStorageManager"),
  ];

  let domManager: DOMManager;

  const onInit = () => {
    console.log("Engine initialized");
    domManager = createDomManager();
    lifecycleScheduler.schedule(storage.inflate);
    lifecycleScheduler.schedule(domManager.onInit);
  };

  const onLoad = () => {
    logger.onLoad({ origin: "Engine" });

    lifecycleScheduler.schedule(domManager.onLoad);
  };

  const onMount = () => {
    logger.onMount({ origin: "Engine" });

    lifecycleScheduler.schedule(domManager.onMount);
  };

  const onUnmount = () => {
    logger.onUnmount({ origin: "Engine" });
    lifecycleScheduler.schedule(domManager.onUnmount);
  };

  const onDispose = () => {
    logger.onDestroy({ origin: "Engine" });
    lifecycleScheduler.schedule(domManager.onDestroy);
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

    //Deprecated
    // window.addEventListener("unload", () => {
    //   onDispose();
    // });

    lifecycleScheduler.run();
  };

  return {
    run: run,
  };
};

export { createEngine };
export type { Engine };
