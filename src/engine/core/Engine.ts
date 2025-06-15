import { queueSteps } from "@utils/dsl";
import { createDomManager, DOMManager } from "engine/managers/DOMManger";
import {
  createRenderManager,
  RenderManager,
} from "engine/managers/RenderManager";
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
  let renderManager: RenderManager;

  const onInit = () => {
    console.log("Engine initialized");
    domManager = createDomManager();
    renderManager = createRenderManager();

    lifecycleScheduler.schedule(storage.inflate);
    lifecycleScheduler.schedule(domManager.onInit);
    lifecycleScheduler.schedule(renderManager.onInit);
  };

  const onLoad = () => {
    lifecycleScheduler.schedule(domManager.onLoad);
    lifecycleScheduler.schedule(renderManager.onLoad);
    lifecycleScheduler.schedule(
      ...queueSteps([logger.onLoad, { origin: "Engine" }])
    );
  };

  const onMount = () => {
    logger.onMount({ origin: "Engine" });

    lifecycleScheduler.schedule(domManager.onMount);
    lifecycleScheduler.schedule(renderManager.onMount);
  };

  const onUnmount = () => {
    logger.onUnmount({ origin: "Engine" });
    lifecycleScheduler.schedule(domManager.onUnmount);
    lifecycleScheduler.schedule(renderManager.onUnmount);
  };

  const onDispose = () => {
    logger.onDestroy({ origin: "Engine" });
    lifecycleScheduler.schedule(domManager.onDestroy);
    lifecycleScheduler.schedule(renderManager.onDestroy);
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
