import { Logger } from "@utils/Logger";
import { EventBusManager } from "engine/core/events/EventBusManager";
import { LifecycleScheduler } from "engine/core/LifecycleScheduler";
import { Loader } from "engine/core/LoadingManager";
import { GlobalStateManager } from "engine/core/state/stateType";
import { ThreeJsContextManager } from "engine/managers/ContextManager";
import { InputManager } from "engine/managers/InputManager";
import { GlobalStorageManager } from "engine/managers/storage/storageTypes";

interface ServiceRegistry {
  register: <K extends ServiceKey>(name: K, service: ServiceMap[K]) => void;
  get: <K extends ServiceKey>(name: K) => ServiceMap[K];
  has: (name: ServiceKey) => boolean;
}

type ServiceMap = {
  Logger: Logger;
  LifecycleScheduler: LifecycleScheduler;
  EventBusManager: EventBusManager;
  GlobalStateManager: GlobalStateManager;
  GlobalStorageManager: GlobalStorageManager;
  ThreeJSContextManager: ThreeJsContextManager;
  Loader: Loader;
  InputManager: InputManager;
};
type ServiceType = ServiceMap[ServiceKey];
type ServiceKey = keyof ServiceMap;

export type { ServiceKey, ServiceMap, ServiceRegistry, ServiceType };
