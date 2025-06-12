import { Lifecycle } from "types/lifecycle.types";

type LoggerInfo = { origin: string };

interface Logger
  extends Lifecycle<
    LoggerInfo, //OnLoad
    LoggerInfo, //onMount
    LoggerInfo, //onUpdate
    LoggerInfo, //onUnmount
    LoggerInfo //onDestroy
  > {}

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

  return {
    onLoad,
    onMount,
    onUpdate,
    onUnmount,
    onDestroy,
  };
};
let logger: Logger | undefined = undefined;

const getLogger = () => {
  if (!logger) {
    logger = createLogger();
  }

  return logger;
};

export { getLogger };
