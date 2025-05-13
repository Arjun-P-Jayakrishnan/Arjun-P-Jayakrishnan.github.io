import { Controllers } from "./controller";

export const createMouseController = (): Controllers => {
  const mountEvents = () => {};

  const unmountEvents = () => {};

  return {
    mount: mountEvents,
    unmount: unmountEvents,
  };
};
