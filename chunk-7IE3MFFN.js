// src/graphics/gameplay/controllers/keyboard.ts
var createKeyboardController = () => {
  const pressedKeys = /* @__PURE__ */ new Set();
  const normalizedKey = (key) => key.toLowerCase();
  const _handleKeyUp = (e) => {
    pressedKeys.delete(normalizedKey(e.key));
  };
  const _handleKeyDown = (e) => {
    pressedKeys.add(normalizedKey(e.key));
  };
  const mountEvents = () => {
    window.addEventListener("keyup", _handleKeyUp);
    window.addEventListener("keydown", _handleKeyDown);
  };
  const unmountEvents = () => {
    window.removeEventListener("keyup", _handleKeyUp);
    window.removeEventListener("keydown", _handleKeyDown);
    pressedKeys.clear();
  };
  const getPressedKeys = () => {
    return Array.from(pressedKeys);
  };
  const isKeyPressed = (key) => {
    return pressedKeys.has(normalizedKey(key));
  };
  return {
    mount: mountEvents,
    unmount: unmountEvents,
    getPressedKeys,
    isKeyPressed
  };
};

export {
  createKeyboardController
};
//# sourceMappingURL=chunk-7IE3MFFN.js.map