import { getGlobalContext } from "managers/globalContext";
import { SceneInspector } from "../../components/threejs/scene_inspector";
import { AboutPage } from "../../components/website/about/about";
import { ProjectCard } from "../../components/website/gallery/card";

import { ProjectGallery } from "../../components/website/gallery/gallery";
import { LoadingModal } from "../../components/website/loading";
import { Navbar } from "../../components/website/navbar/header";
import { processPipelineDebugger } from "debug/debugger";
import { LifeCycle } from "core/lifecyle";

export interface WebComponentManager extends LifeCycle{
  /**attach global context references */
  attachReferences: () => void;

  /**load external data */
  load: () => Promise<void>;

  /**unmounts web components */
  unmount: () => void;
}

export const createWebComponentManager = (): WebComponentManager => {
 
  const mountComponents = () => {
    customElements.define("loading-modal", LoadingModal);
    customElements.define("nav-bar", Navbar);
    customElements.define("project-gallery", ProjectGallery);
    customElements.define("project-card", ProjectCard);
    customElements.define("scene-inspector", SceneInspector);
    customElements.define("about-page", AboutPage);
    
    processPipelineDebugger.onMount('web-components');
  };

  /**
   * attach references like global context for the web components
   */
  const attachReferences = () => {
    processPipelineDebugger.onLoad('web-components')
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
    processPipelineDebugger.onUnmount('web-components')
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
  };

  return {
    mount: mountComponents,
    attachReferences: attachReferences,
    load: loadData,
    unmount: unmountComponents,
  };
};
