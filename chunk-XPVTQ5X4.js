import {
  createEventBus
} from "./chunk-C7GSUODC.js";

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
//# sourceMappingURL=chunk-XPVTQ5X4.js.map