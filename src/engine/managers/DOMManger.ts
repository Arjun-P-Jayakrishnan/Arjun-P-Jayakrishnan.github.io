import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { Lifecycle } from "types/lifecycle.types";

interface DOMManager extends Lifecycle {}

const createDomManager = (): DOMManager => {
  const logger = getServiceRegistry().get("Logger");

  const onLoad = () => {
    logger.onLoad({ origin: "DOMManager" });
  };

  const onMount = () => {
    logger.onMount({ origin: "DOMManager" });
  };

  const onUpdate = () => {
    logger.onUpdate(0, { origin: "DOMManager" });
  };

  const onUnmount = () => {
    logger.onUnmount({ origin: "DOMManger" });
  };

  const onDispose = () => {
    logger.onDestroy({ origin: "DOMManager" });
  };

  return {
    onLoad: onLoad,
    onMount: onMount,
    onUpdate: onUpdate,
    onUnmount: onUnmount,
    onDestroy: onDispose,
  };
};

export { createDomManager };

export type { DOMManager };
