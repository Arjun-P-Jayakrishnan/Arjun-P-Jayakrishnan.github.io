import { EventBus } from "@events/eventBus";
import { EventBusManager } from "@events/EventBusManager";
import { Logger } from "@utils/Logger";
import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { NavigationEvents, ViewEvents } from "types/event.types";
import { Nullable } from "types/generic.types";
import { NavigationPage } from "./pages";

const template = document.createElement("template");

template.innerHTML = `
  <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
  <link rel="stylesheet" href="/style/navbar.css">
  <nav class="navbar" id="main-nav">
      <div class="logo"><img src="/assets/images/logo.png" aria-label="Logo" width="1em" height="1em"/></div>
      <button class="toggle-btn" aria-expanded="false" aria-controls="main-nav">&#9776</button>
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
  navRoot: Nullable<HTMLElement>;
  navigationPage: Nullable<NavigationPage>;
}

export class Navbar extends HTMLElement {
  //State
  private state: State;
  private displayEventBus: EventBus<NavigationEvents> | null = null;
  private viewEventBus: EventBus<ViewEvents> | null = null;
  private components: Components;
  private root: ShadowRoot;
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
      navRoot: null,
      toggleBtn: null,
      navigationPage: null,
    };

    this.queryElements();

    this.logger = getServiceRegistry().get("Logger");
    this.logger.onLoad({ origin: "Navbar" });

    customElements.define("navigation-page", NavigationPage);
    const navigationPage = document.createElement("navigation-page");
    this.components.navRoot?.appendChild(navigationPage);
    this.components.navigationPage = navigationPage as NavigationPage;
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
    this.components.navRoot = this.root.querySelector(".navbar");
  }

  bindEvents() {
    this.components.toggleBtn?.addEventListener("click", this.onToggleClick);
  }

  unBindEvents() {
    this.components.toggleBtn?.removeEventListener("click", this.onToggleClick);
  }

  /***
   * @description on Click handler for hamburger menu closing or opening
   */
  toggleHamburgerMenu = (): void => {
    console.log(this.components.navigationPage);
    if (!this.components.navigationPage) return;

    const isOpen =
      this.components.navigationPage.getAttribute("aria-expanded") === "true";
    const nextState = !isOpen;

    this.components.navigationPage.setAttribute(
      "aria-expanded",
      String(nextState)
    );
    this.components?.toggleBtn?.setAttribute(
      "aria-expanded",
      String(nextState)
    );
  };

  private onToggleClick = (e: Event) => this.toggleHamburgerMenu();

  private openNavigationPages = () => () => {
    this.components.navigationPage?.classList.remove("hidden");
  };

  private closeNavigationPage = () => {
    this.components.navigationPage?.classList.add("hidden");
  };

  setupBusListeners = () => {
    if (!this.displayEventBus) return;

    this.viewEventBus?.on("project-screen:show", this.openNavigationPages);

    this.viewEventBus?.on("project-screen:hide", this.closeNavigationPage);
  };

  disposeBusListeners = () => {
    if (!this.displayEventBus) return;
  };

  set eventBusManager(eventBusManager: EventBusManager) {
    this.displayEventBus = eventBusManager.displayBus;
    this.viewEventBus = eventBusManager.viewBus;

    if (this.components.navigationPage) {
      this.components.navigationPage!.eventBusManager = eventBusManager;
    }
  }
}
