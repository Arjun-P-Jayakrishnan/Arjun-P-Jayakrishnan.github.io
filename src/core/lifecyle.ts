export interface LifeCycle{
    mount:()=>void;
    unmount:()=>void;
}

export type Nullable<T>=T|null;