// src/utils/storage/storageUnit.ts
var createStorageUnit = () => {
  const storage = /* @__PURE__ */ new Map();
  const store = (id, payload) => {
    storage.set(id, payload);
  };
  const retrieve = (id) => {
    return storage.get(id);
  };
  return {
    store,
    retrieve
  };
};

export {
  createStorageUnit
};
//# sourceMappingURL=chunk-FD3PG7P2.js.map