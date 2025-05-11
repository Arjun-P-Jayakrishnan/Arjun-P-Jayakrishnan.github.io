import {
  ProjectCard
} from "./chunk-P47HCMVN.js";
import {
  ProjectGallery
} from "./chunk-2IHVB7FE.js";
import {
  Navbar
} from "./chunk-6LLUGI2C.js";
import {
  LoadingModal
} from "./chunk-JAXJMVVI.js";

// src/components/main.ts
var mountComponents = () => {
  customElements.define("loading-modal", LoadingModal);
  customElements.define("nav-bar", Navbar);
  customElements.define("project-gallery", ProjectGallery);
  customElements.define("project-card", ProjectCard);
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
};

export {
  mountComponents,
  attachReferences
};
//# sourceMappingURL=chunk-XMGR7NKB.js.map