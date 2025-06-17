//Domain Specific Language

import { Task } from "types/lifecycle.types";

type Step<F extends (...args: any[]) => any> = [F, ...Parameters<F>];

function queueStep<F extends (...args: any[]) => any>(
  fn: F,
  ...args: Parameters<F>
): Task {
  return () => fn(...args);
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

export { flattenTask, queueStep };
