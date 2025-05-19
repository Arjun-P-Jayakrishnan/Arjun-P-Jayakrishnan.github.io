import { getGlobalContext } from "@utils/globalContext";
import { SceneInspector } from "./threejs/scene_inspector";
import { AboutPage } from "./website/about/about";
import { ProjectCard } from "./website/gallery/card";

import { BackgroundPage } from "./website/about/background";
import { ProjectGallery } from "./website/gallery/gallery";
import { LoadingModal } from "./website/loading";
import { Navbar } from "./website/navbar/header";

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
   * @description loading data
   */
  loadData: () => Promise<void>;
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
    customElements.define("about-page", AboutPage);
    
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

    try {
      const about: AboutPage = document.querySelector("about-page")!;
      about.eventBusManager = context.eventBusManager;
    } catch (err) {
      console.error(err);
    }
  };

  const _loadJSON = async (url: string): Promise<any> => {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  };

  const loadData = async () => {
    const about: AboutPage = document.querySelector("about-page")!;
    try {
      const data = await _loadJSON("/public/data/about.json");

      about.updateData = {
        isError: false,
        records: data,
      };
      
    } catch (err) {
      about.updateData = {
        isError: true,
        message: `Error getting data ${err}`,
      };
      console.error(`Error getting data ${err}`);
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
      "about-page",
      "background-page",
    ];

    selectors.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element?.parentElement) {
        //call disconnected  callback for the removal of event listeners
        element.parentElement.removeChild(element);
      } else {
        console.warn(
          `Could not unmount ${selector} either already removed or not found`
        );
      }
    });

    console.log("custom components unmounted");
  };

  return {
    mountComponents: mountComponents,
    attachReferences: attachReferences,
    loadData: loadData,
    unmountComponents: unmountComponents,
  };
};
