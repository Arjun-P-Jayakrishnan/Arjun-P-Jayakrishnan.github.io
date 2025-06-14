import { GlobalState } from "./globalState";

export interface LoadingContext {
  active: boolean;
  progress: number;
  currentFile?: string;
  error?: string;
}

export type GlobalStateManager = {
  loading: GlobalState;
};
