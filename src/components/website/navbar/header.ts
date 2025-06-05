import { EventBus } from "@managers/events/eventBus";
import { EventBusManager } from "@managers/events/eventBusFactory";
import { DisplayEvents } from "@managers/events/eventType";
import { processPipelineDebugger } from "debug/debugger";

const template = document.createElement("template");

template.innerHTML = `
  <link rel="stylesheet" href="/style/header.css"/>
  <nav class="navbar" id="main-nav">
      <div class="logo">Logo</div>
      <button class="toggle-btn" aria-expanded="false" aria-controls="main-nav">&#9776</button>
      <ul class="nav-links">
          <li><a href="" id="home">Home</a></li>
          <li><a href="" id="about">About</a></li>
          <li><a href="" id="projects">Projects</a></li>
          <li><a href="" id="contact">Contact</a></li>
      </ul>
  </nav>
`;

type TabKeys="home"|"about"|"project"|"contact";

interface State {
  hamburgerMenu: {
    isOpen: boolean;
    isTransitioning: boolean;
  };
  activeTab: TabKeys;
}

interface Components {
  toggleBtn: HTMLElement | null;
  navLinks: HTMLElement | null;
  projects: HTMLAnchorElement | null;
  about: HTMLAnchorElement | null;
  home: HTMLAnchorElement | null;
  contact: HTMLAnchorElement | null;
}

export class Navbar extends HTMLElement {
  //State
  private state: State = {
    hamburgerMenu: {
      isOpen: false,
      isTransitioning: false,
    },
    activeTab:"home"
  };

  private displayEventBus: EventBus<DisplayEvents> | null = null;
  private components: Components = {
    about: null,
    navLinks: null,
    projects: null,
    contact: null,
    home: null,
    toggleBtn: null,
  };

  root: ShadowRoot;

  busHandlers: Record<`${TabKeys}:show` | `${TabKeys}:hide`,(e: DisplayEvents) => void> | null = null;
  sections = ["project", "about", "contact", "home"] as const;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    this.root.appendChild(clone);
    this.queryElements();
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
    this.components.navLinks?.addEventListener(
      "transitionend",
      this.onAnimationEnd
    );
    this.components.projects?.addEventListener("click", this.onProjectClick);
    this.components.about?.addEventListener("click", this.onAboutClick);
    this.components.home?.addEventListener("click", this.onHomeClick);
    this.components.contact?.addEventListener("click", this.onContactClick);
  }

  unBindEvents() {
    this.components.toggleBtn?.removeEventListener("click", this.onToggleClick);
    this.components.navLinks?.removeEventListener(
      "transitionend",
      this.onAnimationEnd
    );
    this.components.projects?.removeEventListener("click", this.onProjectClick);
    this.components.about?.removeEventListener("click", this.onAboutClick);
    this.components.home?.removeEventListener("click", this.onHomeClick);
    this.components.contact?.removeEventListener("click", this.onContactClick);
  }

  /***
   * @description on Click handler for hamburger menu closing or opening
   */
  toggleHamburgerMenu = (): void => {
    if (!this.components.navLinks) return;
    if (this.state.hamburgerMenu.isTransitioning) return;

    this.state.hamburgerMenu.isTransitioning = true;
    this.components.navLinks.classList.toggle(
      "open",
      !this.state.hamburgerMenu.isOpen
    );
    this.components.navLinks.classList.toggle(
      "closing",
      this.state.hamburgerMenu.isOpen
    );
    this.state.hamburgerMenu.isOpen = !this.state.hamburgerMenu.isOpen;

    this.components?.toggleBtn?.setAttribute(
      "aria-expanded",
      String(this.state.hamburgerMenu.isOpen)
    );
  };

  /**
   * @description handle the transition end
   * @param e event triggered
   */
  handleTransitionEnd = (e: Event) => {
    if ((e as TransitionEvent).propertyName !== "transform") return;

    this.components.navLinks?.classList.remove("closing");
    this.state.hamburgerMenu.isTransitioning = false;
  };

  toggleSections = <K extends DisplayEvents["elementId"]>(e: Event, key: K) => {
    if(this.state.activeTab==key) return;
    e.preventDefault();
   
    const showEvent = {
      elementId: key,
      type: `${key}:show`,
    } as DisplayEvents;

    const hideEvent = {
      elementId: key,
      type: `${this.state.activeTab}:hide`,
    } as DisplayEvents;

    this.displayEventBus?.emit(hideEvent);
    this.displayEventBus?.emit(showEvent);
  
    this.state.activeTab = key;
  };

  private onToggleClick = (e: Event) => this.toggleHamburgerMenu();
  private onAnimationEnd = (e: Event) => this.handleTransitionEnd(e);
  private onProjectClick = (e: Event) => this.toggleSections(e, "project");
  private onAboutClick = (e: Event) => this.toggleSections(e, "about");
  private onHomeClick = (e: Event) => this.toggleSections(e, "home");
  private onContactClick = (e: Event) => this.toggleSections(e, "contact");

  setupBusListeners = () => {
    if (!this.displayEventBus) return;

    this.sections.forEach((id) => {
      const showHandler = (e: DisplayEvents) => {
        processPipelineDebugger.onMount(`[${id}]-component`)
      };
      const hideHandler = (e: DisplayEvents) => {
        processPipelineDebugger.onUnmount(`[${id}]-component`)
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
