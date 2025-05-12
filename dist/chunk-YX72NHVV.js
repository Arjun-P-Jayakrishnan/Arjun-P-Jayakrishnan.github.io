import {
  createEventBus
} from "./chunk-GZBB6ODF.js";

// src/utils/event_management/eventBusFactory.ts
var createEventBusManager = () => {
  const loadingBus = createEventBus();
  const displayBus = createEventBus();
  const debugBus = createEventBus();
  return {
    loadingBus,
    displayBus,
    debugBus
  };
};

export {
  createEventBusManager
};
//# sourceMappingURL=chunk-YX72NHVV.js.map