import { Task } from "types/lifecycle.types";

interface LifecycleScheduler {
  schedule: (task: Task) => void;
  run: () => void;
}

const createLifecycleScheduler = (): LifecycleScheduler => {
  const queue: Task[] = [];

  const schedule = (task: Task) => {
    queue.push(task);
  };

  const run = () => {
    while (queue.length > 0) {
      const task = queue.shift();
      if (!task) continue;

      const result = task();
      if (Array.isArray(result)) {
        queue.unshift(...result);
      }
    }
  };

  //TODO: frame bucket
  ///TODO: async tasks

  return {
    schedule: schedule,
    run: run,
  };
};

export { createLifecycleScheduler };
export type { LifecycleScheduler };
