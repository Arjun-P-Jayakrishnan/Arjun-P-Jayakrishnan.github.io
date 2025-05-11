// src/components/header.ts
var template = document.createElement("template");
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
var Navbar = class extends HTMLElement {
  constructor() {
    super();
    /**
     *
     * @param e event triggered
     * @returns
     */
    this.handleTransitionEnd = (e) => {
      if (e.propertyName !== "transform") return;
      if (this.navLinks.classList.contains("closing")) {
        this.navLinks.classList.remove("closing");
      }
      this.state.hamburgerMenu.isTransitioning = false;
    };
    /**
     *
     * @param navLinks reference to navigation
     */
    this.toggleOpenState = (navLinks) => {
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
    const shadowRoot = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    shadowRoot.appendChild(clone);
    this.toggleBtn = shadowRoot.querySelector(".toggle-btn");
    this.navLinks = shadowRoot.querySelector(".nav-links");
    this.state = {
      hamburgerMenu: {
        isOpen: false,
        isTransitioning: false
      },
      isProjectsShown: false
    };
  }
  static get observedAttributes() {
    return [];
  }
  set eventBusManager(eventBusManager) {
    this.displayEventBus = eventBusManager.displayBus;
    this.displayEventBus.on("project:show", (data) => {
      this.handleShowEvent(data);
    });
    this.displayEventBus.on("project:hide", (data) => {
      this.handleHideEvent(data);
    });
  }
  handleShowEvent(_) {
    this.state.isProjectsShown = true;
    console.log("shown");
  }
  handleHideEvent(_) {
    this.state.isProjectsShown = false;
    console.log("hidden");
  }
  /**
   * @description called when the component is mounted
   */
  connectedCallback() {
    this.toggleBtn.addEventListener("click", () => {
      this.toggleOpenState(this.navLinks);
    });
    this.navLinks.addEventListener("transitionend", (e) => {
      this.handleTransitionEnd(e);
    });
    const projectLink = this.navLinks.querySelector("#projects");
    projectLink?.addEventListener("click", (e) => {
      e.preventDefault();
      this.state.isProjectsShown = !this.state.isProjectsShown;
      this.state.isProjectsShown ? this.displayEventBus?.emit({ type: "project:show" }) : this.displayEventBus?.emit({ type: "project:hide" });
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
};

export {
  Navbar
};
//# sourceMappingURL=chunk-6LLUGI2C.js.map