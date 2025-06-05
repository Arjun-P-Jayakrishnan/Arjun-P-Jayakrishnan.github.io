import type { Scene } from "three";

export type LoadingEvents =
  | { type: "load:start"; url: string; loaded: number; total: number }
  | { type: "load:progress"; url: string; loaded: number; total: number }
  | { type: "load:complete" }
  | { type: "load:error"; url: string };

export type DisplayEvents =
  | { elementId: "home"; type: "home:show" }
  | { elementId: "home"; type: "home:hide" }
  | { elementId: "about"; type: "about:show" }
  | { elementId: "about"; type: "about:hide" }
  | { elementId: "project"; type: "project:show" }
  | { elementId: "project"; type: "project:hide" }
  | { elementId: "project-screen"; type: "project-screen:show" }
  | { elementId: "project-screen"; type: "project-screen:hide" }
  | { elementId: "contact"; type: "contact:show" }
  | { elementId: "contact"; type: "contact:hide" };

export type DebugEvents = {
  type: "debug:inspector";
  scene: Scene | null;
};
