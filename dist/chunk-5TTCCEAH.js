// src/utils/state/observable.ts
var createObservable = (props) => {
  let value = props.initial;
  const listeners = /* @__PURE__ */ new Set();
  let scheduled = false;
  const setValue = (_value) => {
    if (value === _value) {
      return;
    }
    value = _value;
    if (!scheduled) {
      setTimeout(() => {
        listeners.forEach((fn) => fn(_value));
      }, 0);
    }
  };
  const _getValue = () => {
    return value;
  };
  const subscribeToChanges = (fn) => {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  };
  const dispose = () => {
    listeners.clear();
  };
  return Object.freeze({
    getValue: _getValue,
    setValue,
    subscribeToChanges,
    dispose
  });
};

export {
  createObservable
};
//# sourceMappingURL=chunk-5TTCCEAH.js.map