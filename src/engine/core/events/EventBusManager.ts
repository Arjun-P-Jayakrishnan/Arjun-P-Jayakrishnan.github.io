import {
  DebugEvents,
  LoadingEvents,
  NavigationEvents,
  SwitchTabEvents,
} from "../../../types/eventType";
import { createEventBus, EventBus } from "./eventBus";

interface EventBusManager {
  /**
   * @description Event Bus for loading related events
   */
  loadingBus: EventBus<LoadingEvents>;
  /**
   * @description Event bus for display related events
   */
  displayBus: EventBus<NavigationEvents>;
  /**
   * @description Event bus for debugging
   */
  debugBus: EventBus<DebugEvents>;
  /**
   * @description Event Bus for pre-fetching data and tab switch
   */
  switchTabBus: EventBus<SwitchTabEvents>;
}

/**
 * @description creates anf manages event buses designed for various tasks
 * @returns
 */
const createEventBusManager = (): EventBusManager => {
  const loadingBus = createEventBus<LoadingEvents>();
  const displayBus = createEventBus<NavigationEvents>();
  const debugBus = createEventBus<DebugEvents>();
  const switchTabBus = createEventBus<SwitchTabEvents>();

  return {
    loadingBus: loadingBus,
    displayBus: displayBus,
    debugBus: debugBus,
    switchTabBus: switchTabBus,
  };
};

export { createEventBusManager };
export type { EventBusManager };
