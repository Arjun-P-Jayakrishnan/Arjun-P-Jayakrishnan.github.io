import {
  Navbar
} from "./chunk-GYVXQHTM.js";
import {
  LoadingModal
} from "./chunk-FV5FXLPE.js";
import {
  getGlobalContext
} from "./chunk-VPKETTYQ.js";
import {
  SceneInspector
} from "./chunk-MF5EUZRL.js";
import {
  ProjectCard
} from "./chunk-SAIL7PNR.js";
import {
  ProjectGallery
} from "./chunk-ILJ6575Z.js";

// src/components/main.ts
var createWebComponentManager = () => {
  const mountComponents = () => {
    customElements.define("loading-modal", LoadingModal);
    customElements.define("nav-bar", Navbar);
    customElements.define("project-gallery", ProjectGallery);
    customElements.define("project-card", ProjectCard);
    customElements.define("scene-inspector", SceneInspector);
    console.log("custom components mounted");
  };
  const attachReferences = () => {
    const context = getGlobalContext();
    try {
      const loadingModal = document.querySelector("loading-modal");
      loadingModal.eventBusManager = context.eventBusManager;
    } catch (err) {
      console.error(`Missing loading modal element :${err}`);
    }
    try {
      const navbar = document.querySelector("nav-bar");
      navbar.eventBusManager = context.eventBusManager;
    } catch (err) {
      console.error(`Missing navbar element : ${err}`);
    }
    try {
      const gallery = document.querySelector("project-gallery");
      gallery.eventBusManager = context.eventBusManager;
    } catch (err) {
      console.error(`Missing project gallery component : ${err}`);
    }
    try {
      const sceneInspector = document.querySelector("scene-inspector");
      sceneInspector.eventBusManager = context.eventBusManager;
    } catch (err) {
      console.error(err);
    }
  };
  const unmountComponents = () => {
    const selectors = [
      "loading-modal",
      "nav-bar",
      "project-gallery",
      "project-card",
      "scene-inspector"
    ];
    selectors.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element?.parentElement) {
        element.parentElement.removeChild(element);
      } else {
        console.warn(`Could not unmount ${selector} either already removed or not found`);
      }
    });
    console.log("custom components unmounted");
  };
  return {
    mountComponents,
    attachReferences,
    unmountComponents
  };
};

export {
  createWebComponentManager
};
//# sourceMappingURL=chunk-XNOJY5EL.js.map