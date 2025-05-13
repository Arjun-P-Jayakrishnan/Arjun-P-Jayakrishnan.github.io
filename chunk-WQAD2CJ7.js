import {
  createStorageUnit
} from "./chunk-FD3PG7P2.js";

// src/utils/storage/globalStorage.ts
var createGlobalStorage = (_props) => {
  let storage;
  const mount = () => {
    storage = {
      animations: createStorageUnit(),
      groups: createStorageUnit()
    };
  };
  const unmount = () => {
    if (storage) {
    }
    storage = void 0;
  };
  const getStorage = (key) => {
    if (storage === void 0) {
      throw new Error(`Must mount the storage first`);
    }
    return storage[key];
  };
  return {
    mount,
    unmount,
    getStorage
  };
};

export {
  createGlobalStorage
};
//# sourceMappingURL=chunk-WQAD2CJ7.js.map