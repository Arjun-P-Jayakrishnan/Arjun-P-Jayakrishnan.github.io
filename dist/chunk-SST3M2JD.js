import {
  createEventBusManager
} from "./chunk-XPVTQ5X4.js";
import {
  createGlobalState
} from "./chunk-5CXWWAPA.js";
import {
  createGlobalStorage
} from "./chunk-WQAD2CJ7.js";

// src/utils/globalContext.ts
var GLOBAL_STATE_INITIAL = {
  loading: {
    active: false,
    progress: 0
  }
};
var references;
var getGlobalContext = () => {
  if (!references) {
    references = {
      globalState: createGlobalState(GLOBAL_STATE_INITIAL),
      eventBusManager: createEventBusManager(),
      globalStorage: createGlobalStorage({})
    };
    references.globalState.inflate();
    references.globalStorage.mount();
  }
  return references;
};

export {
  references,
  getGlobalContext
};
//# sourceMappingURL=chunk-SST3M2JD.js.map