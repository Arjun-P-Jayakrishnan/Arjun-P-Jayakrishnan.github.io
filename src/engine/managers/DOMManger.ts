import { LoadingModal } from "@components/loading/loading";
import { Navbar } from "@components/navbar/navbar";
import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { Lifecycle } from "types/lifecycle.types";

interface DOMManager extends Lifecycle {
  onInit: () => void;
}

const createDomManager = (): DOMManager => {
  const logger = getServiceRegistry().get("Logger");

  /**
   * @description definition part
   */
  const onInit = () => {
    customElements.define("nav-bar", Navbar);
    customElements.define("loading-modal", LoadingModal);
  };

  /**
   * @description data-fetch part
   */
  const onLoad = () => {
    logger.onLoad({ origin: "DOMManager" });
  };

  /**
   * @description attach components with data /events
   */
  const onMount = () => {
    logger.onMount({ origin: "DOMManager" });
  };

  const onUpdate = () => {
    logger.onUpdate(0, { origin: "DOMManager" });
  };

  const onUnmount = () => {
    logger.onUnmount({ origin: "DOMManger" });
  };

  /**
   * @deprecated
   */
  const onDispose = () => {
    logger.onDestroy({ origin: "DOMManager" });
  };

  return {
    onInit: onInit,
    onLoad: onLoad,
    onMount: onMount,
    onUpdate: onUpdate,
    onUnmount: onUnmount,
    onDestroy: onDispose,
  };
};

export { createDomManager };

export type { DOMManager };
