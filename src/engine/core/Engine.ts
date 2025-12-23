import { createScene2DManager, Scene2DManager } from "2d/scene2DManager";
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
  let scene2DManager: Scene2DManager;

  const onInit = () => {
    console.log("[Engine]: Engine initialized");
    domManager = createDomManager();
    renderManager = createRenderManager();
    scene2DManager = createScene2DManager();

    //2D
    lifecycleScheduler.schedule(scene2DManager.onInit);

    //3D
    lifecycleScheduler.schedule(storage.inflate);
    lifecycleScheduler.schedule(input.onInit);
    lifecycleScheduler.schedule(domManager.onInit);
    lifecycleScheduler.schedule(renderManager.onInit);
  };

  const onLoad = () => {
    //2D
    lifecycleScheduler.schedule(scene2DManager.onLoad);

    //3D
    lifecycleScheduler.schedule(domManager.onLoad);
    lifecycleScheduler.schedule(renderManager.onLoad);
    lifecycleScheduler.schedule(queueStep(logger.onLoad, { origin: "Engine" }));
  };

  const onMount = () => {
    logger.onMount({ origin: "Engine" });

    //2D
    lifecycleScheduler.schedule(scene2DManager.onMount);

    //3D
    lifecycleScheduler.schedule(domManager.onMount);
    lifecycleScheduler.schedule(renderManager.onMount);
  };

  const onUpdate = () => {
    //2D
    scene2DManager.onUpdate();

    //3D
    domManager.onUpdate();
    lifecycleScheduler.schedule(renderManager.onUpdate);
  };

  const onUnmount = () => {
    //2D
    scene2DManager.onUnmount();

    //3D
    logger.onUnmount({ origin: "Engine" });
    lifecycleScheduler.schedule(domManager.onUnmount);
    lifecycleScheduler.schedule(renderManager.onUnmount);
    lifecycleScheduler.schedule(input.onUnmount);
  };

  const onDispose = () => {
    //2D
    scene2DManager.onDestroy();

    //3D
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
