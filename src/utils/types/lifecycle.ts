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
