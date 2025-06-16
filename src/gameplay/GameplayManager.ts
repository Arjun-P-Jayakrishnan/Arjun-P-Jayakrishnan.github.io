import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { Clock } from "three";
import { createRoomController, RoomController } from "./RoomManager";

export interface GameplayManager {
  onMount: () => Promise<void>;
  update: () => void;
  onUnmount: () => void;
}

interface State {
  deltaTime: number;
}

interface TempData {
  deltaTime: number;
}

export const createGameplayManager = (): GameplayManager => {
  const serviceRegistry = getServiceRegistry();

  //Global properties
  const [eventBusManager, logger, input] = [
    serviceRegistry.get("EventBusManager"),
    serviceRegistry.get("Logger"),
    serviceRegistry.get("InputManager"),
  ];
  const clock: Clock = new Clock();

  //Re usable state (no re-allocation)
  let state: State = { deltaTime: 0 };
  let tempData: TempData = { deltaTime: 0 };
  let isMounted: boolean = false;

  //Controllers
  let roomController: RoomController = createRoomController();

  const bind = () => {
    eventBusManager.displayBus.on(
      "about:show",
      roomController.switchRoom["about"]
    );
    eventBusManager.displayBus.on(
      "about:hide",
      roomController.switchRoom["default"]
    );

    // eventBusManager.loadingBus.on(
    //   "project:show",
    //   roomController.switchRoom["projects"]
    // );
    // eventBusManager.displayBus.on(
    //   "project:hide",
    //   roomController.switchRoom["default"]
    // );

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
    unbind();
  };

  return {
    onMount: mount,
    update: update,
    onUnmount: unmount,
  };
};
