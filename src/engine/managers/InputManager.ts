import {
  createKeyboardController,
  KeyboardInput,
} from "plugins/input/keyboard";
import { createMouseController, MouseInput } from "../../plugins/input/mouse";

interface Inputs {
  mouse: MouseInput;
  keyboard: KeyboardInput;
}

export interface InputManager {
  onInit: () => void;
  onUnmount: () => void;
  getController: <K extends keyof Inputs>(key: K) => Inputs[K] | null;
}

let inputs: Inputs | null = null;

export const createInputManager = (): InputManager => {
  /**
   *
   */
  const mount = () => {
    if (!inputs) {
      inputs = {
        mouse: createMouseController(),
        keyboard: createKeyboardController(),
      };

      inputs.mouse.onMount();
      inputs.keyboard.onMount();
    }
  };

  /**
   *
   */
  const unmount = () => {
    if (!inputs) return;

    inputs.mouse.onUnmount();
    inputs.keyboard.onUnmount();
  };

  /**
   *
   * @param key which plugin are you looking for
   * @returns the controller if it exists
   */
  const getController = <K extends keyof Inputs>(key: K): Inputs[K] | null => {
    return inputs ? inputs[key] : null;
  };

  return {
    onInit: mount,
    getController: getController,
    onUnmount: unmount,
  };
};
