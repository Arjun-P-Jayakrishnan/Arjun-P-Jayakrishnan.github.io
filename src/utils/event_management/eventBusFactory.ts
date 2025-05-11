import { createEventBus, EventBus } from "./eventBus";
import { DisplayEvents, LoadingEvents } from "./eventType";

export interface EventBusManager {
  /**
   * @description Event Bus for loading related events
   */
  loadingBus: EventBus<LoadingEvents>;
  /**
   * @description Event bus for display related events
   */
  displayBus: EventBus<DisplayEvents>;
}

/**
 * @description creates anf manages event buses designed for various tasks
 * @returns
 */
export const createEventBusManager = (): EventBusManager => {
  const loadingBus = createEventBus<LoadingEvents>();
  const displayBus = createEventBus<DisplayEvents>();

  return {
    loadingBus: loadingBus,
    displayBus: displayBus,
  };
};
