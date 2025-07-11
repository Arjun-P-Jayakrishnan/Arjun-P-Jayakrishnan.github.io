import { EventBus } from "@events/eventBus";
import { EventBusManager } from "@events/EventBusManager";
import { Logger } from "@utils/Logger";
import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { NavigationEvents } from "types/event.types";
import { Nullable } from "types/generic.types";

const template = document.createElement("template");

template.innerHTML = `
   <link rel="stylesheet" href="/style/navbar.css">
    <ul class="nav-links" aria-expanded="false">
        <li>
        <a href="" id="home" aria-label="Home" class="active"> 
            <img src="/assets/Icons/home.svg" alt="" width="24" height="24"/>
            <span class="desktop">Home</span>
        </a>
        </li>
        <li>
        <a href="" id="about" aria-label="About">
            <img src="/assets/Icons/about.svg" alt="" width="32" height="32"/>
            <span>About</span>
        </a>
        </li>
        <li>
        <a href="" id="projects" aria-label="Projects">
            <img src="/assets/Icons/projects.svg" alt="" width="24" height="24"/>
            <span>Projects</span>
        </a>
        </li>
        <li>
        <a href="" id="contact" aria-label="Contact">
            <img src="/assets/Icons/contact.svg" alt="" width="24" height="24"/>
            <span>Contact</span>
        </a>
        </li>
    </ul>
`;

type TabKeys = "home" | "about" | "projects" | "contact";
type BusHandler = Record<
  `${TabKeys}:show` | `${TabKeys}:hide`,
  (e: NavigationEvents) => void
>;

interface State {
  activeTab: TabKeys;
}

interface Components {
  toggleBtn: Nullable<HTMLElement>;
  navLinks: Nullable<HTMLElement>;
  projects: Nullable<HTMLAnchorElement>;
  about: Nullable<HTMLAnchorElement>;
  home: Nullable<HTMLAnchorElement>;
  contact: Nullable<HTMLAnchorElement>;
}

export class NavigationPage extends HTMLElement {
  //State
  private state: State;
  private displayEventBus: EventBus<NavigationEvents> | null = null;
  private components: Components;
  private root: ShadowRoot;
  private busHandlers: Nullable<BusHandler> = null;
  private sections = ["projects", "about", "contact", "home"] as const;
  private links;
  private logger: Logger;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    this.root.appendChild(clone);

    this.state = {
      activeTab: "home",
    };

    this.components = {
      about: null,
      navLinks: null,
      projects: null,
      contact: null,
      home: null,
      toggleBtn: null,
    };

    this.queryElements();
    this.links = [
      this.components.home,
      this.components.about,
      this.components.projects,
      this.components.contact,
    ];

    this.logger = getServiceRegistry().get("Logger");
    this.logger.onLoad({ origin: "Navbar-Pages" });
  }

  static get observedAttributes() {
    return [];
  }

  /**
   * @description called when the component is mounted
   */
  connectedCallback() {
    this.bindEvents();
    this.setupBusListeners();
  }

  /**
   * @description called when component is un mounted
   */
  disconnectedCallback() {
    this.unBindEvents();
    this.disposeBusListeners();
  }

  queryElements() {
    this.components.navLinks = this.root.querySelector(".nav-links");

    if (this.components.navLinks) {
      this.components.projects =
        this.components.navLinks.querySelector("#projects");

      this.components.about = this.components.navLinks.querySelector("#about");

      this.components.contact =
        this.components.navLinks.querySelector("#contact");

      this.components.home = this.components.navLinks.querySelector("#home");
    }
  }

  bindEvents() {
    this.components.projects?.addEventListener("click", this.onProjectClick);
    this.components.about?.addEventListener("click", this.onAboutClick);
    this.components.home?.addEventListener("click", this.onHomeClick);
    this.components.contact?.addEventListener("click", this.onContactClick);
  }

  unBindEvents() {
    this.components.projects?.removeEventListener("click", this.onProjectClick);
    this.components.about?.removeEventListener("click", this.onAboutClick);
    this.components.home?.removeEventListener("click", this.onHomeClick);
    this.components.contact?.removeEventListener("click", this.onContactClick);
  }

  setActiveTab = (tabId: TabKeys) => {
    this.links.forEach((link) => {
      link?.classList.remove("active");
    });

    this.components[tabId]?.classList.add("active");
    this.state.activeTab = tabId;
  };

  toggleSections = <K extends NavigationEvents["elementId"]>(
    e: Event,
    key: K
  ) => {
    if (this.state.activeTab == key) return;
    e.preventDefault();

    const hideEvent = {
      elementId: key,
      type: `${this.state.activeTab}:hide`,
    } as NavigationEvents;
    this.displayEventBus?.emit(hideEvent);

    this.setActiveTab(key);

    const showEvent = {
      elementId: key,
      type: `${key}:show`,
    } as NavigationEvents;

    console.log(`nvbar emits  ${showEvent.type}`);
    this.displayEventBus?.emit(showEvent);
  };

  private onProjectClick = (e: Event) => this.toggleSections(e, "projects");
  private onAboutClick = (e: Event) => this.toggleSections(e, "about");
  private onHomeClick = (e: Event) => this.toggleSections(e, "home");
  private onContactClick = (e: Event) => this.toggleSections(e, "contact");

  setupBusListeners = () => {
    if (!this.displayEventBus) return;

    this.sections.forEach((id) => {
      const showHandler = (e: NavigationEvents) => {
        this.logger.onMount({ origin: `[${id}]-component` });
      };
      const hideHandler = (e: NavigationEvents) => {
        this.logger.onUnmount({ origin: `[${id}]-component` });
      };

      this.displayEventBus?.on(`${id}:show`, showHandler);
      this.displayEventBus?.on(`${id}:hide`, hideHandler);

      if (!this.busHandlers) return;

      this.busHandlers[`${id}:show`] = showHandler;
      this.busHandlers[`${id}:hide`] = hideHandler;
    });
  };

  disposeBusListeners = () => {
    if (!this.displayEventBus) return;

    this.sections.forEach((id) => {
      if (!this.busHandlers) return;

      this.displayEventBus?.off(`${id}:show`, this.busHandlers[`${id}:show`]);
      this.displayEventBus?.off(`${id}:hide`, this.busHandlers[`${id}:hide`]);
    });
  };

  set eventBusManager(eventBusManager: EventBusManager) {
    this.displayEventBus = eventBusManager.displayBus;
  }
}
