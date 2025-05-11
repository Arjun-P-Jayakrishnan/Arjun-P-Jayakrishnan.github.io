import { EventBusManager } from "@utils/event_management/eventBusFactory";
import { GlobalState } from "@utils/state/globalState";
import { ProjectCard } from "./website/card";
import { ProjectGallery } from "./website/gallery";
import { Navbar } from "./website/header";
import { LoadingModal } from "./website/loading";
import { SceneInspector } from "./threejs/scene_inspector";

export interface DesignContext {
  state: GlobalState;
  eventBusManager: EventBusManager;
}

/**
 *
 */
export const mountComponents = () => {
  customElements.define("loading-modal", LoadingModal);
  customElements.define("nav-bar", Navbar);
  customElements.define("project-gallery", ProjectGallery);
  customElements.define("project-card", ProjectCard);
  customElements.define("scene-inspector", SceneInspector);
  console.log("custom components mounted");
};

export const attachReferences = (context: DesignContext) => {
  try {
    const loadingModal: LoadingModal = document.querySelector("loading-modal")!;
    loadingModal.eventBusManager = context.eventBusManager;
    console.log("attaching references");
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
    const gallery: ProjectGallery = document.querySelector("project-gallery")!;
    gallery.eventBusManager = context.eventBusManager;
  } catch (err) {
    console.error(`Missing project gallery component : ${err}`);
  }

  try {
    const sceneInspector: SceneInspector = document.querySelector("scene-inspector")!;
    sceneInspector.eventBusManager = context.eventBusManager;
  } catch (err) {
    console.error(err);
  }
};
