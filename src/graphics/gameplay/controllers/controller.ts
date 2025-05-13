import { Controllers } from "./plugins";
import { createKeyboardController } from "./plugins/keyboard";
import { createMouseController } from "./plugins/mouse";

export interface ControllerProps {
  mouse: {
    sensitivity: number;
  };
}

export interface ControllerManger {
  mount: (props: ControllerProps) => void;
  unmount: () => void;
  getController: <K extends keyof Controllers>(key: K) => Controllers[K] | null;
}

let controllers: Controllers | null = null;

export const getControllers = (): ControllerManger => {
  /**
   *
   */
  const mount = (props: ControllerProps) => {
    if (!controllers) {
      controllers = {
        mouse: createMouseController(props.mouse),
        keyboard: createKeyboardController(),
      };

      controllers.mouse.mount();
      controllers.keyboard.mount();
    }
  };

  /**
   *
   */
  const unmount = () => {
    if (!controllers) return;

    controllers.mouse.unmount();
    controllers.keyboard.unmount();
  };

  /**
   *
   * @param key which plugin are you looking for
   * @returns the controller if it exists
   */
  const getController = <K extends keyof Controllers>(
    key: K
  ): Controllers[K] | null => {
    return controllers ? controllers[key] : null;
  };

  return {
    mount: mount,
    getController: getController,
    unmount: unmount,
  };
};
