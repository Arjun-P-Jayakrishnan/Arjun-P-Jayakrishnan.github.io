import { EventBus } from "@events/eventBus";
import { EventBusManager } from "@events/EventBusManager";
import { Logger } from "@utils/Logger";
import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { NavigationEvents } from "types/event.types";
import { Nullable } from "types/generic.types";

const template = document.createElement("template");

template.innerHTML = `
  <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
  <link rel="stylesheet" href="/style/navbar.css">
  <nav class="navbar" id="main-nav">
      <div class="logo"><img src="/assets/images/logo.png" aria-label="Logo" style="min-height: 1em;min-width: 1em;"/></div>
      <button class="toggle-btn" aria-expanded="false" aria-controls="main-nav">&#9776</button>
      <ul class="nav-links" aria-expanded="false">
          <li>
            <a href="" id="home" aria-label="Home" class="active"> 
              <i class="fas fa-home"></i>
              <span class="desktop">Home</span>
            </a>
          </li>
          <li>
            <a href="" id="about" aria-label="About">
              <i class="fas fa-user"></i> 
              <span>About</span>
            </a>
          </li>
          <li>
            <a href="" id="projects" aria-label="Projects">
              <i class="fas fa-folder-open"></i>
              <span>Projects</span>
            </a>
          </li>
          <li>
            <a href="" id="contact" aria-label="Contact">
              <i class="fas fa-envelope"></i>
              <span>Contact</span>
            </a>
          </li>
      </ul>
  </nav>
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

export class Navbar extends HTMLElement {
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
    this.logger.onLoad({ origin: "Navbar" });
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
    this.components.toggleBtn = this.root.querySelector(".toggle-btn");
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
    this.components.toggleBtn?.addEventListener("click", this.onToggleClick);
    this.components.projects?.addEventListener("click", this.onProjectClick);
    this.components.about?.addEventListener("click", this.onAboutClick);
    this.components.home?.addEventListener("click", this.onHomeClick);
    this.components.contact?.addEventListener("click", this.onContactClick);
  }

  unBindEvents() {
    this.components.toggleBtn?.removeEventListener("click", this.onToggleClick);
    this.components.projects?.removeEventListener("click", this.onProjectClick);
    this.components.about?.removeEventListener("click", this.onAboutClick);
    this.components.home?.removeEventListener("click", this.onHomeClick);
    this.components.contact?.removeEventListener("click", this.onContactClick);
  }

  /***
   * @description on Click handler for hamburger menu closing or opening
   */
  toggleHamburgerMenu = (): void => {
    console.log(this.components.navLinks);
    if (!this.components.navLinks) return;

    const isOpen =
      this.components.navLinks.getAttribute("aria-expanded") === "true";
    const nextState = !isOpen;

    this.components.navLinks.setAttribute("aria-expanded", String(nextState));
    this.components?.toggleBtn?.setAttribute(
      "aria-expanded",
      String(nextState)
    );
  };

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

  private onToggleClick = (e: Event) => this.toggleHamburgerMenu();
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
