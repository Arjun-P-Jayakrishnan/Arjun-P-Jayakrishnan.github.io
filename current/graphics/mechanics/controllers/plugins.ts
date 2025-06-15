import { KeyboardController } from "./plugins/keyboard";
import { MouseController } from "./plugins/mouse";

export interface ControllerPlugin {
  mount: () => void;
  unmount: () => void;
}

export interface Controllers {
  mouse: MouseController;
  keyboard: KeyboardController;
}
