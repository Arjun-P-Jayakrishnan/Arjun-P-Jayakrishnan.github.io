import { getGlobalContext } from "@utils/globalContext";
import { SceneInspector } from "./threejs/scene_inspector";
import { ProjectCard } from "./website/card";
import { ProjectGallery } from "./website/gallery";
import { Navbar } from "./website/header";
import { LoadingModal } from "./website/loading";

export interface WebComponentManager {
  /**
   * @description mounts the web components
   */
  mountComponents: () => void;
  /**
   * @description attach global context references
   */
  attachReferences: () => void;
  /**
   * @description unmounts web components
   */
  unmountComponents: () => void;
}

export const createWebComponentManager = (): WebComponentManager => {
  /**
   * @description mount components
   */
  const mountComponents = () => {
    customElements.define("loading-modal", LoadingModal);
    customElements.define("nav-bar", Navbar);
    customElements.define("project-gallery", ProjectGallery);
    customElements.define("project-card", ProjectCard);
    customElements.define("scene-inspector", SceneInspector);
    console.log("custom components mounted");
  };

  /**
   * attach references like global context for the web components
   */
  const attachReferences = () => {
    /***
     * get context attached to web components
     */
    const context = getGlobalContext();

    try {
      const loadingModal: LoadingModal =
        document.querySelector("loading-modal")!;
      loadingModal.eventBusManager = context.eventBusManager;
    } catch (err) {
      console.error(`Missing loading modal element :${err}`);
    }

    try {
      const navbar: Navbar = document.querySelector("nav-bar")!;
      navbar.eventBusManager = context.eventBusManager;
    } catch (err) {
      console.error(`Missing navbar element : ${err}`);
    }

    try {
      const gallery: ProjectGallery =
        document.querySelector("project-gallery")!;
      gallery.eventBusManager = context.eventBusManager;
    } catch (err) {
      console.error(`Missing project gallery component : ${err}`);
    }

    try {
      const sceneInspector: SceneInspector =
        document.querySelector("scene-inspector")!;
      sceneInspector.eventBusManager = context.eventBusManager;
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * unmount web components
   */
  const unmountComponents = () => {
    const selectors = [
      "loading-modal",
      "nav-bar",
      "project-gallery",
      "project-card",
      "scene-inspector",
    ];

    selectors.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element?.parentElement) {
        //call disconnected  callback for the removal of event listeners
        element.parentElement.removeChild(element);
      }
      else{
        console.warn(`Could not unmount ${selector} either already removed or not found`)
      }
    });

    console.log("custom components unmounted");
  };

  return {
    mountComponents: mountComponents,
    attachReferences: attachReferences,
    unmountComponents: unmountComponents,
  };
};
