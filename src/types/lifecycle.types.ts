interface Lifecycle<
  LoadParams = void,
  MountParams = void,
  UpdateParams = void,
  UnmountParams = void,
  DestroyParams = void
> {
  /** Registers the component  and add it to lifecycle*/
  onLoad?: (props: LoadParams) => void | Promise<void>;

  /** Mountes the registered component */
  onMount?: (props: MountParams) => void;

  /** Update the mounted component */
  onUpdate?: (deltaTime: number, props: UpdateParams) => void;

  /** Unmount the mounted component */
  onUnmount?: (props: UnmountParams) => void;

  /**Dispose the component and remove from lifecycle */
  onDestroy?: (propsd: DestroyParams) => void;
}

export type { Lifecycle };
