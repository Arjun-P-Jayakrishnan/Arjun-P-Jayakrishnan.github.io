import { EventBus } from "@utils/event_management/eventBus";
import { EventBusManager } from "@utils/event_management/eventBusFactory";
import { DisplayEvents } from "@utils/event_management/eventType";

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

interface State {
  hamburgerMenu: {
    isOpen: boolean;
    isTransitioning: boolean;
  };
  isProjectsShown: boolean;
}

interface Components {
  toggleBtn: HTMLElement | null;
  navLinks: HTMLElement | null;
  projects: HTMLAnchorElement | null;
}

export class Navbar extends HTMLElement {
  state: State;
  displayEventBus: EventBus<DisplayEvents> | undefined;
  components: Components;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const clone = template.content.cloneNode(true);

    shadowRoot.appendChild(clone);

    this.components = {
      toggleBtn: shadowRoot.querySelector(".toggle-btn"),
      navLinks: shadowRoot.querySelector(".nav-links"),
      projects: null,
    };

    if (this.components.navLinks) {
      this.components.projects =
        this.components.navLinks.querySelector("#projects");
    }

    this.state = {
      hamburgerMenu: {
        isOpen: false,
        isTransitioning: false,
      },
      isProjectsShown: false,
    };
  }

  static get observedAttributes() {
    return [];
  }

  /**
   *
   * @param e event triggered
   * @returns
   */
  handleTransitionEnd = (e: Event) => {
    if ((e as TransitionEvent).propertyName !== "transform") return;

    if (!this.components.navLinks) return;

    if (this.components.navLinks.classList.contains("closing")) {
      this.components.navLinks.classList.remove("closing");
    }

    this.state.hamburgerMenu.isTransitioning = false;
  };
  /**
   *
   * @param navLinks reference to navigation
   */
  toggleOpenState = (navLinks: Element): void => {
    if (this.state.hamburgerMenu.isTransitioning) return;

    this.state.hamburgerMenu.isTransitioning = true;

    if (this.state.hamburgerMenu.isOpen) {
      navLinks.classList.remove("open");
      navLinks.classList.add("closing");
      this.state.hamburgerMenu.isOpen = false;
    } else {
      navLinks.classList.add("open");
      navLinks.classList.remove("closing");
      this.state.hamburgerMenu.isOpen = true;
    }

    this.components?.toggleBtn?.setAttribute(
      "aria-expanded",
      String(this.state.hamburgerMenu.isOpen)
    );
  };

  handleShowEvent(_: any) {
    this.state.isProjectsShown = true;
  }

  handleHideEvent(_: any) {
    this.state.isProjectsShown = false;
  }

  handleOnProjectClick = (e: Event) => {
    e.preventDefault();

    this.state.isProjectsShown = !this.state.isProjectsShown;

    this.state.isProjectsShown
      ? this.displayEventBus?.emit({ type: "project:show" })
      : this.displayEventBus?.emit({ type: "project:hide" });
  };

  private showEventBound = (data: any) => this.handleShowEvent(data);
  private hideEventBound = (data: any) => this.handleHideEvent(data);
  private onToggleClick = (e: Event) =>
    this.toggleOpenState(this.components.navLinks!);
  private onAnimationEnd = (e: Event) => this.handleTransitionEnd(e);
  private onProjectClick = (e: Event) => this.handleOnProjectClick(e);

  set eventBusManager(eventBusManager: EventBusManager) {
    this.displayEventBus = eventBusManager.displayBus;

    //update its local state to true if fired externally
    this.displayEventBus.on("project:show", this.showEventBound);

    //update its local state to false if fired externally
    this.displayEventBus.on("project:hide", this.hideEventBound);
  }

  /**
   * @description called when the component is mounted
   */
  connectedCallback() {
    /**
     * Show or hide the hamburger menu
     */
    if (this.components.toggleBtn)
      this.components.toggleBtn.addEventListener("click", this.onToggleClick);
    /**
     * if it completes animation
     */
    if (this.components.navLinks)
      this.components.navLinks.addEventListener(
        "transitionend",
        this.onAnimationEnd
      );
    /**
     * Projects
     */
    if (this.components.projects)
      this.components.projects.addEventListener("click", this.onProjectClick);
  }

  /**
   * @description called when component is un mounted
   */
  disconnectedCallback() {
    if (!this.displayEventBus) return;

    this.displayEventBus.off("project:show", this.showEventBound);
    this.displayEventBus.off("project:hide", this.hideEventBound);

    if (this.components.toggleBtn)
      this.components.toggleBtn.removeEventListener(
        "click",
        this.onToggleClick
      );

    if (this.components.navLinks)
      this.components.navLinks.removeEventListener(
        "transitionend",
        this.onAnimationEnd
      );

    if (this.components.projects)
      this.components.projects.removeEventListener(
        "click",
        this.onProjectClick
      );
  }
}
