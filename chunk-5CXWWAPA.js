import {
  createObservable
} from "./chunk-Q3X5D5A7.js";

// src/utils/state/globalState.ts
var createGlobalState = (map) => {
  const stateMap = {};
  const inflate = () => {
    for (const key in map) {
      const observable = createObservable({ initial: map[key] });
      stateMap[key] = observable;
    }
  };
  const getState = () => {
    const state = {};
    for (const key in stateMap) {
      state[key] = stateMap[key].getValue();
    }
    return state;
  };
  const setState = (newState) => {
    for (const key in newState) {
      if (stateMap[key]) {
        stateMap[key].setValue(newState[key]);
      }
    }
  };
  const getObservable = (key) => {
    return stateMap[key];
  };
  const subscribe = (key, fn) => {
    return stateMap[key].subscribeToChanges(fn);
  };
  const dispose = () => {
    for (const key in stateMap) {
      stateMap[key].dispose();
    }
  };
  return Object.freeze({
    inflate,
    getState,
    setState,
    getObservable,
    subscribe,
    dispose
  });
};

export {
  createGlobalState
};
//# sourceMappingURL=chunk-5CXWWAPA.js.map