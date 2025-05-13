import {
  Navbar
} from "./chunk-ENFNW7QU.js";
import {
  LoadingModal
} from "./chunk-VG4EIVRD.js";
import {
  getGlobalContext
} from "./chunk-SST3M2JD.js";
import {
  SceneInspector
} from "./chunk-Y5OJP2U5.js";
import {
  ProjectCard
} from "./chunk-SMKCWAHP.js";
import {
  ProjectGallery
} from "./chunk-5I4CIZ7R.js";

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
//# sourceMappingURL=chunk-A347YDUQ.js.map