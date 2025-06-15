import { flattenTask, queueSteps } from "@utils/dsl";
import { CANVAS_ID } from "config/constants";
import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { Lifecycle, Task } from "types/lifecycle.types";
import { createThreeJsInstance } from "./ThreeJSManager";

export interface RenderManager extends Lifecycle {
  onInit: () => void;
}

export const createRenderManager = (): RenderManager => {
  const serviceRegistry = getServiceRegistry();
  const logger = serviceRegistry.get("Logger");
  const threeJsManager = createThreeJsInstance({ domMountId: CANVAS_ID });

  const onInit = () => {};

  const onLoad = (): Task[] => {
    const tasks: Task[] = [];

    tasks.push(...flattenTask(threeJsManager.onLoad() as Task[]));
    tasks.push(...queueSteps([logger.onLoad, { origin: "Render-Manager" }]));
    return tasks;
  };

  const onMount = (): Task[] => {
    const tasks: Task[] = [];

    tasks.push(
      ...flattenTask(
        threeJsManager.onMount(() => {
          console.log("Updating");
        }) as Task[]
      )
    );
    tasks.push(...queueSteps([logger.onMount, { origin: "Render-Manager" }]));
    tasks.push(...queueSteps([threeJsManager.onUpdate]));

    return tasks;
  };

  const onUpdate = () => {
    logger.onUpdate(0, { origin: "Render-Manager" });
  };

  const onUnmount = () => {
    logger.onUnmount({ origin: "Render-Manager" });
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
