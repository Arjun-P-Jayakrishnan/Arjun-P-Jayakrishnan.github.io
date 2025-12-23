// engine/managers/Scene2DManager.ts

import { initTechCarousel, initTimelineCarousel } from "./modules/carousels";
import { removeAllListeners } from "./modules/events";
import { showIntro } from "./modules/intro";
import { initProjects } from "./modules/projects";
import { initVisorHUD } from "./modules/visorHUD";

/**
 * @interface Scene2DManager
 * @description Lifecycle hooks for the 2D scene: initialization, mounting, updating, unmounting, destroying
 */
export interface Scene2DManager {
  onInit: () => void;
  onLoad: () => void;
  onMount: () => void;
  onUpdate: () => void;
  onUnmount: () => void;
  onDestroy: () => void;
}

/**
 * @function createScene2DManager
 * @returns Scene2DManager
 * @description Manages the 2D scene: intro, carousels, outro, projects, HUD, and event listeners.
 */
export const createScene2DManager = (): Scene2DManager => {
  let introPlayed = false;

  // Cleanup functions for unmounting
  const cleanupFns: Array<() => void> = [];

  const onInit = () => {
    console.log("[Scene2D] Initialized");
  };

  const onLoad = () => {
    console.log("[Scene2D] Loaded");

    const mountScene = () => {
      // 1️⃣ Carousels
      const timelineCleanup = initTimelineCarousel();
      if (timelineCleanup) cleanupFns.push(timelineCleanup);

      const techCleanup = initTechCarousel();
      if (techCleanup) cleanupFns.push(techCleanup);

      // 2️⃣ Outro
      // const outroCleanup = initOutro(); // pass goTo3D if needed
      // if (outroCleanup) cleanupFns.push(outroCleanup);

      // 3️⃣ Projects
      const projectsCleanup = initProjects();
      if (projectsCleanup) cleanupFns.push(projectsCleanup);

      // 4️⃣ HUD
      const hudCleanup = initVisorHUD();
      if (hudCleanup) cleanupFns.push(hudCleanup);

      // 5️⃣ Global event listeners (example: window resize)
      // addListener(window, "resize", () => {
      //   timelineCleanup?.();
      //   techCleanup?.();
      // });
    };

    // Play intro only once
    if (!introPlayed) {
      introPlayed = true;
      showIntro().then(() => mountScene());
    } else {
      mountScene();
    }
  };

  const onMount = () => {
    console.log("[Scene2D] Mounted");

    // const outroCleanup = initOutro(); // pass goTo3D if needed
    // if (outroCleanup) cleanupFns.push(outroCleanup);
  };

  const onUpdate = () => {
    // Optional: update animations or HUD if needed
  };

  const onUnmount = () => {
    console.log("[Scene2D] Unmounted");

    // Run all cleanup functions
    cleanupFns.forEach((fn) => fn());
    cleanupFns.length = 0;

    // Remove global event listeners
    removeAllListeners();
  };

  const onDestroy = () => {
    console.log("[Scene2D] Destroyed");
  };

  return { onInit, onLoad, onMount, onUpdate, onUnmount, onDestroy };
};
