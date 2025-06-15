// import {
//   createWebComponentManager,
//   WebComponentManager,
// } from "core/components/main";
// import { createGameManager, GameEngineManager } from "core/game_engine/main";
// import { bootstrap } from "engine/core/Bootstrap";
// import { getGlobalContext, References } from "managers/globalContext";

import { bootstrap } from "engine/core/Bootstrap";

// interface Managers {
//   webComponent: WebComponentManager;
//   gameEngine: GameEngineManager;
// }

// let references: References;
// let managers: Managers;
// let flags = {
//   isPreMounted: false,
//   isMounted: false,
// };

// /**
//  * Pre-mount setup: Initialize references and managers
//  */
// const preMount = () => {
//   try {
//     /**
//      * References for global access
//      */
//     references = getGlobalContext();
//     /**
//      * Managers for web components and game engine
//      */
//     managers = {
//       webComponent: createWebComponentManager(),
//       gameEngine: createGameManager(),
//     };

//     managers.webComponent.mount();
//     managers.gameEngine.mount();

//     flags.isPreMounted = true;
//   } catch (err) {
//     console.error(`Error during pre-mount setup : ${err}`);
//   }
// };

// const loadData = async () => {
//   try {
//     console.log("getting data from json files");
//     await managers.webComponent.load();
//   } catch (err) {
//     console.error(`Error loading data from json ${err}`);
//   }
// };

// const loadAssets = async () => {
//   try {
//     /**
//      * Loads all models , HDR  etc
//      */
//     const responses = await Promise.allSettled([managers.gameEngine.load()]);

//     responses.forEach((response) => {
//       if (response.status == "rejected") {
//         console.error(
//           `Failed to load models and mount game engine ${response.reason}`
//         );
//       }
//     });

//     /**
//      * @description update the game engine
//      * (uses self recursion method for rendering so only need to call once)
//      */
//     managers.gameEngine.update();
//   } catch (err) {
//     console.error(`Error while trying to load assets : ${err}`);
//   }
// };

// /**
//  * helps to add all necessary mounting function
//  */
// const mount = () => {
//   try {
//     if (!managers) throw new Error(`Error while pre-mounting.`);
//     /**
//      * Attach references to components and then mount tha game engine
//      */
//     managers.webComponent.attachReferences();

//     if ("requestIdleCallback" in window) {
//       window.requestIdleCallback(async () => {
//         await loadAssets();
//         await loadData();
//       });
//     } else {
//       setTimeout(async () => {
//         await loadAssets();
//         await loadData();
//       }, 200);
//     }

//     flags.isMounted = true;
//   } catch (err) {
//     console.error(`Error while main mount due to : ${err}`);
//   }
// };

// /**
//  * helps to clear any unmounted objects
//  */
// const unmount = () => {
//   try {
//     if (!flags.isMounted) return;
//     managers.webComponent.unmount();
//     managers.gameEngine.unmount();
//   } catch (err) {
//     console.error(`Error while main unmount due to : ${err}`);
//   }
// };

// /**
//  * entry point for the whole app
//  */
// const main = () => {
//   preMount();

//   /**
//    * Mounts the components when dom is fully loaded
//    */
//   document.addEventListener("DOMContentLoaded", () => {
//     if (flags.isPreMounted) {
//       mount();
//     }
//     /**
//      * Unmounts everything when the window is going to unload
//      */
//     window.addEventListener("beforeunload", () => {
//       if (flags.isMounted) {
//         unmount();
//       }
//     });
//   });
// };

bootstrap();
