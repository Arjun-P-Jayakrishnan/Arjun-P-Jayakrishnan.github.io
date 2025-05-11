// src/utils/event_management/eventBus.ts
var createEventBus = () => {
  const listeners = /* @__PURE__ */ new Map();
  const _on = (type, callback) => {
    if (!listeners.has(type)) {
      listeners.set(type, /* @__PURE__ */ new Set());
    }
    listeners.get(type).add(callback);
  };
  const _off = (type, callback) => {
    listeners.get(type)?.delete(callback);
  };
  const _emit = (event) => {
    listeners.get(event.type)?.forEach((callback) => {
      callback(event);
    });
  };
  const _clear = () => {
    listeners.clear();
  };
  const _once = (type, callback) => {
    const wrapper = (event) => {
      callback(event);
      _off(type, wrapper);
    };
    _on(type, wrapper);
  };
  return Object.freeze({
    on: _on,
    off: _off,
    emit: _emit,
    clear: _clear,
    once: _once
  });
};

export {
  createEventBus
};
//# sourceMappingURL=chunk-GZBB6ODF.js.map