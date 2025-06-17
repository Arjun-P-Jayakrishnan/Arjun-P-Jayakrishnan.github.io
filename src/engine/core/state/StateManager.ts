import { createGlobalState } from "./globalState";
import { GlobalStateManager, LoadingContext } from "./stateType";

const createGlobalStateManager = (): GlobalStateManager => {
  const loading = createGlobalState<LoadingContext>({});

  return {
    loading: loading,
  };
};

export { createGlobalStateManager };
