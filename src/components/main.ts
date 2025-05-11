import { EventBusManager } from "@utils/event_management/eventBusFactory";
import { GlobalState } from "@utils/state/globalState";
import { ProjectCard } from "./card";
import { ProjectGallery } from "./gallery";
import { Navbar } from "./header";
import { LoadingModal } from "./loading";

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
};
