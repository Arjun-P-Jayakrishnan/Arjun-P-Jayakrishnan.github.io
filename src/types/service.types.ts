import { Logger } from "@utils/Logger";
import { LifecycleScheduler } from "engine/core/LifecycleScheduler";

interface ServiceRegistry {
  register: <K extends ServiceKey>(name: K, service: ServiceMap[K]) => void;
  get: <K extends ServiceKey>(name: K) => ServiceMap[K];
  has: (name: ServiceKey) => boolean;
}

type ServiceMap = {
  Logger: Logger;
  LifecycleScheduler: LifecycleScheduler;
};
type ServiceType = ServiceMap[ServiceKey];
type ServiceKey = keyof ServiceMap;

export type { ServiceKey, ServiceMap, ServiceRegistry, ServiceType };
