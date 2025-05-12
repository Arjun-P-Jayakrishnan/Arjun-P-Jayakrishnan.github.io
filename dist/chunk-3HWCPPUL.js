import {
  LoadingModal
} from "./chunk-FV5FXLPE.js";
import {
  SceneInspector
} from "./chunk-MF5EUZRL.js";
import {
  ProjectCard
} from "./chunk-SAIL7PNR.js";
import {
  ProjectGallery
} from "./chunk-ILJ6575Z.js";
import {
  Navbar
} from "./chunk-GYVXQHTM.js";

// src/components/main.ts
var mountComponents = () => {
  customElements.define("loading-modal", LoadingModal);
  customElements.define("nav-bar", Navbar);
  customElements.define("project-gallery", ProjectGallery);
  customElements.define("project-card", ProjectCard);
  customElements.define("scene-inspector", SceneInspector);
  console.log("custom components mounted");
};
var attachReferences = (context) => {
  try {
    const loadingModal = document.querySelector("loading-modal");
    loadingModal.eventBusManager = context.eventBusManager;
    console.log("attaching references");
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

export {
  mountComponents,
  attachReferences
};
//# sourceMappingURL=chunk-3HWCPPUL.js.map