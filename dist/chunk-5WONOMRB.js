import {
  createEventBus
} from "./chunk-GZBB6ODF.js";

// src/utils/event_management/eventBusFactory.ts
var createEventBusManager = () => {
  const loadingBus = createEventBus();
  const displayBus = createEventBus();
  return {
    loadingBus,
    displayBus
  };
};

export {
  createEventBusManager
};
//# sourceMappingURL=chunk-5WONOMRB.js.map