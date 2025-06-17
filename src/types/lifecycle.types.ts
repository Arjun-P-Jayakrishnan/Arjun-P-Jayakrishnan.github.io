interface Lifecycle<
  LoadParams extends any[] = any[],
  MountParams extends any[] = any[],
  UpdateParams extends any[] = any[],
  UnmountParams extends any[] = any[],
  DestroyParams extends any[] = any[],
  LoadAllowPromise extends boolean = false
> {
  /** Registers the component  and add it to lifecycle*/
  onLoad: TaskWrapper<LoadParams, LoadAllowPromise>;

  /** Mountes the registered component */
  onMount: TaskWrapper<MountParams, false>;

  /** Update the mounted component */
  onUpdate: TaskWrapper<UpdateParams, false>;

  /** Unmount the mounted component */
  onUnmount: TaskWrapper<UnmountParams, false>;

  /**Dispose the component and remove from lifecycle */
  onDestroy: TaskWrapper<DestroyParams, false>;
}

type TaskWrapper<
  Args extends any[],
  AllowPromise extends boolean = false
> = AllowPromise extends true ? Task<Args> | Promise<Task<Args>> : Task<Args>;

type Task<Args extends any[] = []> = (...args: Args) => Task[] | void;

export type { Lifecycle, Task };
