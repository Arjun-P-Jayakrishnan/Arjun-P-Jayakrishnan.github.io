export interface GameplayLifecycle {
  mount: () => void;
  update: (deltaTime: number) => void;
  unmount: () => void;
}

export interface Rooms extends GameplayLifecycle {
  setActive: () => void;
  setDeactive: () => void;
}

export type Nullable<T> = T | null;

export interface LifeCycle {
  mount: () => void;
  unmount: () => void;
}

export interface GenericLifeCycle {
  mount: (...props: any) => void;
  activate: (...props: any) => void;
  deactivate: (...props: any) => void;
  unmount: (...props: any) => void;
}
