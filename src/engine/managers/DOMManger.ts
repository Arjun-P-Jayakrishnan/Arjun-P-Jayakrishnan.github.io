import { AboutPage } from "@components/about/about";
import { CardMarshall, ProjectCard } from "@components/gallery/card";
import { ProjectGallery } from "@components/gallery/gallery";
import { LoadingModal } from "@components/loading/loading";
import { Navbar } from "@components/navbar/navbar";
import { SceneInspector } from "@components/threejs/scene_inspector";
import { queueStep } from "@utils/dsl";
import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { Lifecycle } from "types/lifecycle.types";

interface DOMManager extends Lifecycle {
  onInit: () => void;
}

const _loadJSON = async (url: string): Promise<any> => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

const loadAboutData = async () => {
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

const loadProjectData = async () => {
  const projectGallery: ProjectGallery =
    document.querySelector("project-gallery")!;
  try {
    const data = await fetch("/public/data/projects.json");
    const projects = await data.json();

    projectGallery.updateData = {
      isError: false,
      list: projects["projects"] as Array<CardMarshall>,
    };
  } catch (err) {
    projectGallery.updateData = {
      isError: true,
      message: `Error getting data ${err}`,
    };
    console.error(`Error getting data ${err}`);
  }
};

const createDomManager = (): DOMManager => {
  let flags = {
    navbarDefined: false,
    loadingModalDefined: false,
    sceneInspectorDefined: false,
    projectGalleryDefined: false,
    projectCardDefined: false,
    aboutPageDefined: false,
  };

  const serviceRegsitry = getServiceRegistry();
  const [lifecycleScheduler, logger, eventBusManager] = [
    serviceRegsitry.get("LifecycleScheduler"),
    serviceRegsitry.get("Logger"),
    serviceRegsitry.get("EventBusManager"),
  ];

  /**
   * @description definition part
   */
  const onInit = () => {
    // Navbar
    if (!flags.navbarDefined) {
      customElements.define("nav-bar", Navbar);
      flags.navbarDefined = true;
    }
    // Loading Modal
    if (!flags.loadingModalDefined) {
      customElements.define("loading-modal", LoadingModal);
      flags.loadingModalDefined = true;
    }
    // Scene Inspector
    if (!flags.sceneInspectorDefined) {
      customElements.define("scene-inspector", SceneInspector);
      flags.sceneInspectorDefined = true;
    }

    // Projects
    eventBusManager.displayBus.once("projects:show", () => {
      if (flags.projectGalleryDefined) return;
      logger.onMount({ origin: "Projects-Page" });
      //Loading
      eventBusManager.loadingBus.emit({
        type: "load:start",
        loaded: 0,
        total: 0,
        url: "",
      });
      customElements.define("project-gallery", ProjectGallery);
      customElements.define("project-card", ProjectCard);

      lifecycleScheduler.schedule(
        queueStep(() => {
          try {
            const projectGallery: ProjectGallery =
              document.querySelector("project-gallery")!;

            projectGallery.eventBusManager = eventBusManager;
          } catch (err) {
            console.error(err);
          }
        })
      );

      lifecycleScheduler.schedule(
        queueStep(async () => {
          try {
            console.log("loading data");
            await loadProjectData();
            eventBusManager.loadingBus.emit({ type: "load:complete" });
          } catch (err) {
            console.log(`Error while loading projects data ${err}`);
          }
        })
      );

      flags.projectGalleryDefined = true;
    });

    // About Page
    eventBusManager.displayBus.once("about:show", () => {
      if (flags.aboutPageDefined) return;
      logger.onMount({ origin: "About-Page" });
      //Loading
      eventBusManager.loadingBus.emit({
        type: "load:start",
        loaded: 0,
        total: 0,
        url: "",
      });

      customElements.define("about-page", AboutPage);
      lifecycleScheduler.schedule(
        queueStep(async () => {
          await loadAboutData();
          eventBusManager.loadingBus.emit({ type: "load:complete" });
        })
      );

      lifecycleScheduler.schedule(
        queueStep(() => {
          try {
            const about: AboutPage = document.querySelector("about-page")!;
            about.eventBusManager = eventBusManager;
          } catch (err) {
            console.error(err);
          }
        })
      );

      flags.aboutPageDefined = true;
    });
  };

  /**
   * @description data-fetch part
   */
  const onLoad = () => {
    logger.onLoad({ origin: "DOMManager" });
    try {
      const loadingModal: LoadingModal =
        document.querySelector("loading-modal")!;
      loadingModal.eventBusManager = eventBusManager;
    } catch (err) {
      console.error(`Missing loading modal element :${err}`);
    }

    try {
      const navbar: Navbar = document.querySelector("nav-bar")!;
      navbar.eventBusManager = eventBusManager;
    } catch (err) {
      console.error(`Missing navbar element : ${err}`);
    }

    try {
      const sceneInspector: SceneInspector =
        document.querySelector("scene-inspector")!;
      sceneInspector.eventBusManager = eventBusManager;
    } catch (err) {
      console.error(err);
    }

    // try {
    //   const gallery: ProjectGallery =
    //     document.querySelector("project-gallery")!;
    //   gallery.eventBusManager = context.eventBusManager;
    // } catch (err) {
    //   console.error(`Missing project gallery component : ${err}`);
    // }
  };

  /**
   * @description attach components with data /events
   */
  const onMount = () => {
    logger.onMount({ origin: "DOMManager" });
  };

  const onUpdate = () => {
    logger.onUpdate(0, { origin: "DOMManager" });
  };

  const onUnmount = () => {
    const selectors = [
      "loading-modal",
      "nav-bar",
      "scene-inspector",
      // "project-gallery",
      // "project-card",

      // "about-page",
      // "background-page",
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
    logger.onUnmount({ origin: "DOMManger" });
  };

  /**
   * @deprecated
   */
  const onDispose = () => {
    logger.onDestroy({ origin: "DOMManager" });
  };

  return {
    onInit: onInit,
    onLoad: onLoad,
    onMount: onMount,
    onUpdate: onUpdate,
    onUnmount: onUnmount,
    onDestroy: onDispose,
  };
};

export { createDomManager };

export type { DOMManager };
