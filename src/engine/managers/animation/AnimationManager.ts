import { AnimationFSM } from "./FSM";
import { AnimationGraphRuntime } from "./GraphRuntime";
import { AnimationParameters } from "./Parameters";
import { PlaybackManager, PlayingAnimation } from "./PlaybackManager";

/** Represents a single entity managed by the orchestrator */
export interface AnimationEntity {
  /** Unique entity ID */
  id: string;

  /** Animation parameters for this entity */
  params: AnimationParameters;

  /** Animation graph runtime */
  graph: AnimationGraphRuntime;

  /** FSM controlling this entity */
  fsm: AnimationFSM;

  /** Playback manager handling clip playback */
  playback: PlaybackManager;
}

/**
 * Public API exposed by the animation orchestrator.
 */
export interface AnimationOrchestrator {
  /** Add or replace an entity */
  addEntity(entity: AnimationEntity): void;

  /** Remove an entity by ID */
  removeEntity(id: string): void;

  /** Mount lifecycle hook */
  mount(): void;

  /** Unmount lifecycle hook */
  unmount(): void;

  /** Update all entities */
  update(deltaTime: number): void;

  /** Query currently playing animations for an entity */
  getPlayingAnimations(id: string): PlayingAnimation[];
}

/**
 * Creates an animation orchestrator.
 * Owns entity storage and drives FSM + playback lifecycles.
 *
 * @example
 * const orchestrator = createAnimationOrchestrator();
 *
 * orchestrator.addEntity(entity);
 * orchestrator.mount();
 *
 * orchestrator.update(0.016);
 */
export const createAnimationOrchestrator = (): AnimationOrchestrator => {
  /** Internal storage of entities */
  const entities: Record<string, AnimationEntity> = {};

  /** Add or replace an entity */
  const addEntity = (entity: AnimationEntity) => {
    entities[entity.id] = entity;
  };

  /** Remove an entity by ID */
  const removeEntity = (id: string) => {
    delete entities[id];
  };

  /** Mount lifecycle hook */
  const mount = () => {
    // Reserved for future setup logic (events, graph init, etc.)
  };

  /** Unmount lifecycle hook */
  const unmount = () => {
    // Reserved for future teardown logic
    Object.keys(entities).forEach(removeEntity);
  };

  /** Update all mounted entities */
  const update = (deltaTime: number) => {
    Object.values(entities).forEach((entity) => {
      console.log("[update:AnimationOrchestrator] entity", entity);
      entity.fsm.tick(entity.params);
      entity.playback.tick(deltaTime, entity.graph, entity.params, entity.fsm);
    });
  };

  /** Get currently playing animations for a specific entity */
  const getPlayingAnimations = (id: string): PlayingAnimation[] => {
    return entities[id]?.playback.getPlayingAnimations() ?? [];
  };

  return {
    addEntity,
    removeEntity,
    mount,
    unmount,
    update,
    getPlayingAnimations,
  };
};
