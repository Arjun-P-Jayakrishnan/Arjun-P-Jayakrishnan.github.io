import { Lifecycle } from "types/lifecycle.types";

type LoggerInfo = { origin: string };

interface Logger
  extends Lifecycle<
    [LoggerInfo], //OnLoad
    [LoggerInfo], //onMount
    [deltaTime: number, info: LoggerInfo], //onUpdate
    [LoggerInfo], //onUnmount
    [LoggerInfo], //onDestroy
    false
  > {
  onActivate: (info: LoggerInfo) => void;
  onDeactivate: (info: LoggerInfo) => void;
}

const createLogger = (): Logger => {
  const onLoad = (info: LoggerInfo) => {
    console.log(`♻️ [${info.origin}] is being loaded....`);
  };

  const onMount = (info: LoggerInfo) => {
    console.log(`➕ [${info.origin}] is being mounted...`);
  };

  const onUpdate = (deltaTime: number, info: LoggerInfo) => {
    console.log(
      `🔄 [${info.origin}] is being updated.. with ${deltaTime.toFixed(2)}`
    );
  };

  const onUnmount = (info: LoggerInfo) => {
    console.log(`➖ [${info.origin}] is being unmounted`);
  };

  const onDestroy = (info: LoggerInfo) => {
    console.log(`🗑️ [${info.origin}] is being disposed`);
  };

  const onActivate = (info: LoggerInfo) => {
    console.log(`✅ [${info.origin}] is being activated`);
  };

  const onDeactivate = (info: LoggerInfo) => {
    console.log(`✖️ [${info.origin}] is being deactiavted`);
  };

  return {
    onLoad,
    onMount,
    onUpdate,
    onUnmount,
    onDestroy,
    onActivate,
    onDeactivate,
  };
};

export { createLogger };
export type { Logger };
