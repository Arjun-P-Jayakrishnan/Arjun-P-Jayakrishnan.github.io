import { createLogger } from "@utils/Logger";
import { createThreeJsContextManager } from "engine/managers/ContextManager";
import { createInputManager } from "engine/managers/InputManager";
import { createAnimationManager } from "engine/managers/animation/AnimationManager";
import { createGlobalStorageManager } from "engine/managers/storage/StorageManager";
import { createEngine, Engine } from "./Engine";
import { createLifecycleScheduler } from "./LifecycleScheduler";
import { getServiceRegistry } from "./ServiceRegistry";
import { createEventBusManager } from "./events/EventBusManager";
import { createGlobalStateManager } from "./state/StateManager";

export const bootstrap = () => {
  const registry = getServiceRegistry();

  registry.register("Logger", createLogger());
  registry.register("LifecycleScheduler", createLifecycleScheduler());

  //Register all services
  registry.register("EventBusManager", createEventBusManager());
  registry.register("GlobalStateManager", createGlobalStateManager());
  registry.register("GlobalStorageManager", createGlobalStorageManager());
  registry.register("ThreeJSContextManager", createThreeJsContextManager());
  registry.register("InputManager", createInputManager());
  registry.register("AnimationManager", createAnimationManager());

  const logger = registry.get("Logger");
  logger.onLoad({ origin: "Bootstrap" });

  const engine: Engine = createEngine();
  engine.run();
};
