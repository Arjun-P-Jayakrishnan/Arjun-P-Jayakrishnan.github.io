export interface LoadingContext {
  active: boolean;
  progress: number;
  currentFile?: string;
  error?: string;
}

export type GlobalStateContext = {
  loading: LoadingContext;
};
