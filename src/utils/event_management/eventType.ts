import type { Scene } from "three";

export type LoadingEvents =
  | { type: "load:start"; url: string; loaded: number; total: number }
  | { type: "load:progress"; url: string; loaded: number; total: number }
  | { type: "load:complete" }
  | { type: "load:error"; url: string };

export type DisplayEvents =
  | { type: "home:show" }
  | { type: "home:hide" }
  | { type: "about:show" }
  | { type: "about:hide" }
  | { type: "project:show" }
  | { type: "project:hide" }
  | { type: "contact:show" }
  | { type: "contact:hide" };

export type DebugEvents = {
  type: "debug:inspector";
  scene: Scene | null;
};
