import {
  createEventBusManager
} from "./chunk-YX72NHVV.js";
import {
  createGlobalState
} from "./chunk-7BMUEPDY.js";
import {
  createGlobalStorage
} from "./chunk-KRR62UQE.js";

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
//# sourceMappingURL=chunk-VPKETTYQ.js.map