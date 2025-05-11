import { EventBus } from "@utils/event_management/eventBus";
import { EventBusManager } from "@utils/event_management/eventBusFactory";
import { DisplayEvents } from "@utils/event_management/eventType";

const template = document.createElement("template");

template.innerHTML = `
  <link rel="stylesheet" href="/style/header.css"/>
  <nav class="navbar">
      <div class="logo">Logo</div>
      <button class="toggle-btn">&#9776</button>
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

export class Navbar extends HTMLElement {
  toggleBtn: Element;
  navLinks: Element;

  state: State;
  displayEventBus: EventBus<DisplayEvents> | undefined;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const clone = template.content.cloneNode(true);

    shadowRoot.appendChild(clone);

    this.toggleBtn = shadowRoot.querySelector(".toggle-btn")!;
    this.navLinks = shadowRoot.querySelector(".nav-links")!;

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

    if (this.navLinks!.classList.contains("closing")) {
      this.navLinks!.classList.remove("closing");
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
  };

  set eventBusManager(eventBusManager: EventBusManager) {
    this.displayEventBus = eventBusManager.displayBus;

    //update its local state to true if fired externally
    this.displayEventBus.on("project:show", (data) => {
      this.handleShowEvent(data);
    });

    //update its local state to false if fired externally
    this.displayEventBus.on("project:hide", (data) => {
      this.handleHideEvent(data);
    });
  }

  handleShowEvent(_: any) {
    this.state.isProjectsShown = true;
    console.log("shown");
  }

  handleHideEvent(_: any) {
    this.state.isProjectsShown = false;
    console.log("hidden");
  }

  /**
   * @description called when the component is mounted
   */
  connectedCallback() {
    this.toggleBtn!.addEventListener("click", () => {
      this.toggleOpenState(this.navLinks!);
    });

    this.navLinks!.addEventListener("transitionend", (e) => {
      this.handleTransitionEnd(e);
    });

    const projectLink = this.navLinks.querySelector("#projects");

    projectLink?.addEventListener("click", (e) => {
      e.preventDefault();

      this.state.isProjectsShown = !this.state.isProjectsShown;

      this.state.isProjectsShown
        ? this.displayEventBus?.emit({ type: "project:show" })
        : this.displayEventBus?.emit({ type: "project:hide" });
    });
  }

  /**
   * @description called when component is un mounted
   */
  disconnectedCallback() {
    this.displayEventBus?.off("project:show", (data) => {
      this.handleShowEvent(data);
    });
    this.displayEventBus?.off("project:hide", (data) => {
      this.handleHideEvent(data);
    });
  }
}
