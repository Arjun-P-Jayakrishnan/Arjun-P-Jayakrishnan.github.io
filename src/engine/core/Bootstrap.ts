import { createLogger } from "@utils/Logger";
import { createEngine, Engine } from "./Engine";
import { createLifecycleScheduler } from "./LifecycleScheduler";
import { getServiceRegistry } from "./ServiceRegistry";

export const bootstrap = () => {
  const registry = getServiceRegistry();
  registry.register("Logger", createLogger());
  registry.register("LifecycleScheduler", createLifecycleScheduler());

  const engine: Engine = createEngine();
  engine.run();
};
