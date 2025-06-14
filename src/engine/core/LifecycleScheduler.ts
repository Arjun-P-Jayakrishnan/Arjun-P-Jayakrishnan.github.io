import { MAX_FRAME_BUCKET_TIME } from "config/constants";
import { Task } from "types/lifecycle.types";

interface LifecycleScheduler {
  schedule: (task: Task) => void;
  run: () => void;
}

//TODO: [FEATURE] DAG scheduler for dependency management
//TODO: [FEATURE] frame bucket
//TODO: [FEATURE] async tasks
//TODO: [FEATURE] idle time scheduling
//TODO: [FEATURE] batch update
//TODO: [FEATURE] micro task and macro task separation before and after
//TODO: [ISSUE]   maybe issue of incorrect ordering due to async tasks

const createLifecycleScheduler = (): LifecycleScheduler => {
  const queue: Task[] = [];

  const schedule = (task: Task) => {
    queue.push(task);
  };

  const run = () => {
    const loop = async () => {
      const start = performance.now();

      while (
        queue.length > 0 &&
        performance.now() - start < MAX_FRAME_BUCKET_TIME
      ) {
        const task = queue.shift();
        if (!task) continue;

        const result = task();

        if (result instanceof Promise) {
          const resolved = await result;
          if (Array.isArray(resolved)) {
            queue.unshift(...resolved);
          }
        } else if (Array.isArray(result)) {
          queue.unshift(...result);
        }
      }

      requestAnimationFrame(() => {
        loop();
      });
    };
    loop();
  };

  return {
    schedule: schedule,
    run: run,
  };
};

export { createLifecycleScheduler };
export type { LifecycleScheduler };
