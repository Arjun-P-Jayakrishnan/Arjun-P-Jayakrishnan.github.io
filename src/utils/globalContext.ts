import {
  createEventBusManager,
  EventBusManager,
} from "./event_management/eventBusFactory";
import { createGlobalState, GlobalState } from "./state/globalState";
import { GlobalStateContext } from "./state/globalStateData";
import { createGlobalStorage, GlobalStorage } from "./storage/globalStorage";

const GLOBAL_STATE_INITIAL: GlobalStateContext = {
  loading: {
    active: false,
    progress: 0,
  },
} as const;

export interface References {
  globalState: GlobalState;
  eventBusManager: EventBusManager;
  globalStorage: GlobalStorage;
}

export let references: References;

export const getGlobalContext = () => {
  if (!references) {
    references = {
      globalState: createGlobalState(GLOBAL_STATE_INITIAL),
      eventBusManager: createEventBusManager(),
      globalStorage: createGlobalStorage({}),
    };

    references.globalState.inflate();
    references.globalStorage.mount();
  }

  return references;
};
