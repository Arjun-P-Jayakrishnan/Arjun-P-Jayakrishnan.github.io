import { EventBus } from "@events/eventBus";
import { flattenTask, queueStep } from "@utils/dsl";
import { CANVAS_ID } from "config/constants";
import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { DebugEvents } from "types/event.types";
import { Lifecycle, Task } from "types/lifecycle.types";

import {
  createGameplayManager,
  GameplayManager,
} from "gameplay/GameplayManager";
import { ThreeJsContextManager } from "./ContextManager";
import { createThreeJsInstance } from "./ThreeJsManager";

export interface RenderManager extends Lifecycle {
  onInit: () => void;
}

/** Resises Camera and Renderer on window resise */
const handleResize = (camera: PerspectiveCamera, renderer: WebGLRenderer) => {
  const { height, width } = {
    height: window.innerHeight,
    width: window.innerWidth,
  };

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

/**Toggles the Object Tree when you press shift and u*/
const handleDebug = (
  e: KeyboardEvent,
  debugEventBus: EventBus<DebugEvents>,
  scene: Scene
) => {
  if (!(e.key.toLowerCase() === "u" && e.shiftKey)) return;

  e.preventDefault();
  debugEventBus.emit({
    type: "debug:inspector",
    scene: scene,
  });
};

export const createRenderManager = (): RenderManager => {
  const serviceRegistry = getServiceRegistry();
  const logger = serviceRegistry.get("Logger");
  const threeJsManager = createThreeJsInstance({ domMountId: CANVAS_ID });
  let threeJsContext: ThreeJsContextManager;
  const gameplay: GameplayManager = createGameplayManager();

  let _handleResize: (e: UIEvent) => void;
  let _handleDebug: (e: KeyboardEvent) => void;

  /** Adds required event listeners */
  const addEventListeners = () => {
    /**
     * Primary initialization to ensure correct aspect ratios
     */
    handleResize(
      threeJsContext.get("camera")!,
      threeJsContext.get("renderer")!
    );

    window.addEventListener("resize", _handleResize);
    window.addEventListener("keydown", _handleDebug);
  };

  /** Release all event listeners to prevent memory leaks */
  const removeEventListeners = () => {
    window.removeEventListener("resize", _handleResize);
    window.removeEventListener("keydown", _handleDebug);
  };

  const onInit = () => {};

  const onLoad = (): Task[] => {
    const tasks: Task[] = [
      ...flattenTask(threeJsManager.onLoad() as Task[]),
      queueStep(logger.onLoad, { origin: "Render-Manager" }),
    ];
    return tasks;
  };

  const onMount = (): Task[] => {
    const tasks: Task[] = [
      () => {
        threeJsContext = serviceRegistry.get("ThreeJSContextManager");
        //Handle Resize
        _handleResize = (e: UIEvent) =>
          handleResize(
            threeJsContext.get("camera")!,
            threeJsContext.get("renderer")!
          );
        //Handle Debug
        _handleDebug = (e: KeyboardEvent) =>
          handleDebug(
            e,
            serviceRegistry.get("EventBusManager").debugBus,
            threeJsContext.get("scene")!
          );
      },
      queueStep(addEventListeners),
      queueStep(logger.onMount, { origin: "Render-Manager" }),
    ];

    return tasks;
  };

  const onUpdate = (): Task[] => {
    return [
      queueStep(async () => {
        try {
          await gameplay.onMount(); // gameplay logic added after obtaining all assets
        } catch (error) {
          throw new Error("[Game Manager] Loading failed :${error}");
        }
      }),
      ...flattenTask(threeJsManager.onMount(() => {}) as Task[]), // pass the gameplay loop as callback to the game engine
      queueStep(threeJsManager.onMount, gameplay.update),
      queueStep(threeJsManager.onUpdate),
      queueStep(logger.onUpdate, 0, { origin: "Render-Manager" }),
    ];
  };

  const onUnmount = () => {
    const tasks: Task[] = [
      queueStep(removeEventListeners),
      queueStep(gameplay.onUnmount),
      queueStep(threeJsManager.onUnmount),
      queueStep(logger.onUnmount, { origin: "Render-Manager" }),
    ];

    return tasks;
  };

  const onDispose = () => {
    logger.onDestroy({ origin: "RenderManager" });
  };

  return {
    onInit,
    onLoad,
    onMount,
    onUpdate,
    onUnmount,
    onDestroy: onDispose,
  };
};
