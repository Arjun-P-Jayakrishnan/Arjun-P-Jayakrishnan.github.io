import { ControllerPlugin } from "../plugins";


export interface KeyboardController extends ControllerPlugin {
  getPressedKeys: () => string[];
  isKeyPressed: (key: string) => boolean;
}

export const createKeyboardController = (): KeyboardController => {
  const pressedKeys = new Set<string>();

  const normalizedKey = (key: string) => key.toLowerCase();

  const _handleKeyUp = (e: KeyboardEvent) => {
    pressedKeys.delete(normalizedKey(e.key));
  };

  const _handleKeyDown = (e: KeyboardEvent) => {
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

  const getPressedKeys = (): string[] => {
    return Array.from(pressedKeys);
  };

  const isKeyPressed = (key: string) => {
    return pressedKeys.has(normalizedKey(key));
  };

  return {
    mount: mountEvents,
    unmount: unmountEvents,
    getPressedKeys: getPressedKeys,
    isKeyPressed: isKeyPressed,
  };
};
