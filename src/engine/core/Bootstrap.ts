import { createLogger } from "@utils/Logger";
import { createThreeJsContextManager } from "engine/managers/ContextManager";
import { createGlobalStorageManager } from "engine/managers/storage/StorageManager";
import { createEngine, Engine } from "./Engine";
import { createLifecycleScheduler } from "./LifecycleScheduler";
import { getServiceRegistry } from "./ServiceRegistry";
import { createEventBusManager } from "./events/EventBusManager";
import { createGlobalStateManager } from "./state/StateManager";

export const bootstrap = () => {
  const registry = getServiceRegistry();
  registry.register("LifecycleScheduler", createLifecycleScheduler());

  registry.register("Logger", createLogger());
  registry.register("EventBusManager", createEventBusManager());
  registry.register("GlobalStateManager", createGlobalStateManager());
  registry.register("GlobalStorageManager", createGlobalStorageManager());
  registry.register("ThreeJSContextManager", createThreeJsContextManager());

  const engine: Engine = createEngine();
  engine.run();
};
