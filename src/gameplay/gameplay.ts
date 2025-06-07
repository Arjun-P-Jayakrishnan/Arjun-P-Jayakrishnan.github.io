import { getGlobalContext } from "managers/globalContext";
import { Clock } from "three";
import { getThreeJsContext } from "core/game_engine/game_context";
import {
  createRoomController,
  RoomController,
} from "./controller/room_controller";
import { processPipelineDebugger } from "debug/debugger";
import {
  ControllerManger,
  getControllers,
} from "graphics/mechanics/controllers/controller";

export interface Gameplay {
  mount: () => Promise<void>;
  update: () => void;
  unmount: () => void;
}

interface State {
  deltaTime: number;
}

interface TempData {
  deltaTime: number;
}

export const createGameplay = (): Gameplay => {
  //Global properties
  const { globalState, eventBusManager } = getGlobalContext();
  const context = getThreeJsContext();
  const clock: Clock = new Clock();

  //Re usable state (no re-allocation)
  let state: State = { deltaTime: 0 };
  let tempData: TempData = { deltaTime: 0 };
  let isMounted: boolean = false;

  //Controllers
  let roomController: RoomController = createRoomController();
  let inputControllers: ControllerManger = getControllers();

  const bind = () => {
    eventBusManager.displayBus.on(
      "about:show",
      roomController.switchRoom["about"]
    );
    eventBusManager.displayBus.on(
      "about:hide",
      roomController.switchRoom["default"]
    );

    eventBusManager.displayBus.on(
      "project:show",
      roomController.switchRoom["projects"]
    );
    eventBusManager.displayBus.on(
      "project:hide",
      roomController.switchRoom["default"]
    );

    eventBusManager.displayBus.on(
      "home:show",
      roomController.switchRoom["navigation"]
    );
    eventBusManager.displayBus.on(
      "home:hide",
      roomController.switchRoom["default"]
    );
  };

  const mount = async (): Promise<void> => {
    if (isMounted) return;

    processPipelineDebugger.onMount("gameplay");
    // inputControllers.mount({
    //   mouse: {
    //     sensitivity: {
    //       yaw: 0.005,
    //       pitch: 0.000001,
    //     },
    //   },
    // });
    await roomController.mount();
    bind();
    isMounted = true;

    window.addEventListener("keyup", (e) => {
      console.log(e);
    });
  };

  const updateDeltaTime = (): void => {
    tempData.deltaTime = clock.getDelta();

    if (!isNaN(tempData.deltaTime) && tempData.deltaTime !== undefined) {
      state.deltaTime = tempData.deltaTime;
    }
  };

  const update = () => {
    updateDeltaTime();

    roomController.update(state.deltaTime ?? 0);
  };

  const unbind = () => {
    // eventBusManager.displayBus.off("about:show", rooms.navigation.setActive);
    // eventBusManager.displayBus.off("about:hide", rooms.navigation.setDeactive);
  };

  const unmount = () => {
    processPipelineDebugger.onUnmount("gameplay");
    unbind();
  };

  return {
    mount: mount,
    update: update,
    unmount: unmount,
  };
};
