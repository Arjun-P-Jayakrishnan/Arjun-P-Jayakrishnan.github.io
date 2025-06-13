import { ServiceRegistry } from "types/service.types";
import { getServiceRegistry } from "./ServiceRegistry";

interface Engine {
  run: () => void;
}

const createEngine = (): Engine => {
  const serviceRegistry: ServiceRegistry = getServiceRegistry();
  const [logger] = [serviceRegistry.get("Logger")];

  const onInit = () => {
    console.log("Engine initialized");
  };

  const onLoad = () => {
    logger.onLoad({ origin: "Engine" });
  };

  const onMount = () => {
    logger.onMount({ origin: "Engine" });
  };

  const onUnmount = () => {
    logger.onUnmount({ origin: "Engine" });
  };

  const onDispose = () => {
    logger.onDestroy({ origin: "Engine" });
  };

  const run = () => {
    //onLoad essentials before mounting
    onInit();

    //after dom loaded mount
    document.addEventListener("DOMContentLoaded", () => {
      onLoad();
    });

    //after resources are achieved
    window.addEventListener("load", () => {
      onMount();
    });

    //unmount and dispose
    window.addEventListener("beforeunload", () => {
      onUnmount();
    });

    window.addEventListener("unload", () => {
      onDispose();
    });
  };

  return {
    run: run,
  };
};

export { createEngine };
export type { Engine };
