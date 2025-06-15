//Domain Specific Language

import { Task } from "types/lifecycle.types";

type Step<F extends (...args: any[]) => any> = [F, ...Parameters<F>];

function queueSteps<Steps extends Step<any>[]>(...steps: Steps): Task[] {
  return steps.map(
    ([fn, ...args]) =>
      () =>
        fn(...args)
  );
}

function flattenTask(tasks: (Task | Task[])[]): Task[] {
  const result: Task[] = [];

  for (const task of tasks) {
    if (Array.isArray(task)) {
      result.push(...flattenTask(task));
    } else {
      result.push(task);
    }
  }

  return result;
}

export { flattenTask, queueSteps };
