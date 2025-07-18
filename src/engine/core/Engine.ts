import { queueStep } from "@utils/dsl";
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
  const [logger, lifecycleScheduler, storage, input] = [
    serviceRegistry.get("Logger"),
    serviceRegistry.get("LifecycleScheduler"),
    serviceRegistry.get("GlobalStorageManager"),
    serviceRegistry.get("InputManager"),
  ];

  let domManager: DOMManager;
  let renderManager: RenderManager;

  const onInit = () => {
    console.log("Engine initialized");
    domManager = createDomManager();
    renderManager = createRenderManager();

    lifecycleScheduler.schedule(storage.inflate);
    lifecycleScheduler.schedule(input.onInit);
    lifecycleScheduler.schedule(domManager.onInit);
    lifecycleScheduler.schedule(renderManager.onInit);
  };

  const onLoad = () => {
    lifecycleScheduler.schedule(domManager.onLoad);
    lifecycleScheduler.schedule(renderManager.onLoad);
    lifecycleScheduler.schedule(queueStep(logger.onLoad, { origin: "Engine" }));
  };

  const onMount = () => {
    logger.onMount({ origin: "Engine" });

    lifecycleScheduler.schedule(domManager.onMount);
    lifecycleScheduler.schedule(renderManager.onMount);
  };

  const onUpdate = () => {
    domManager.onUpdate();
    lifecycleScheduler.schedule(renderManager.onUpdate);
  };

  const onUnmount = () => {
    logger.onUnmount({ origin: "Engine" });
    lifecycleScheduler.schedule(domManager.onUnmount);
    lifecycleScheduler.schedule(renderManager.onUnmount);
    lifecycleScheduler.schedule(input.onUnmount);
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
    window.addEventListener("load", () => {});

    const toggleButton = document.getElementById(
      "toggle3D"
    ) as HTMLButtonElement;

    const portfolio2D = document.getElementById("portfolio-2d");
    const portfolio3D = document.getElementById("portfolio-3d");

    if (toggleButton && portfolio2D && portfolio3D) {
      toggleButton.addEventListener(
        "click",
        () => {
          portfolio2D.style.display = "none";
          portfolio3D.style.display = "block";

          onMount();
          onUpdate();
        },
        { once: true }
      );
    }

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
