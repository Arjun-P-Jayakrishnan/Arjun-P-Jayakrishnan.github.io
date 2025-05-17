import { EventBus } from "@utils/event_management/eventBus";
import { EventBusManager } from "@utils/event_management/eventBusFactory";
import { DisplayEvents } from "@utils/event_management/eventType";

const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/style/about.css">
    <div class="about hidden">
        <div class="carousel">
          <div class="carousel-track"></div>
          <button class="prev">←</button>
          <button class="next">→</button>
        </div>
    </div>
`;

interface State {
  currentIndex: number;
}

interface Components {
  about: HTMLDivElement | null;
  carousel: HTMLDivElement | null;
  next: HTMLButtonElement | null;
  prev: HTMLButtonElement | null;
  track: HTMLDivElement | null;
}

export class AboutPage extends HTMLElement {
  state: State = {
    currentIndex: 0,
  };
  root: ShadowRoot;
  displayBus: EventBus<DisplayEvents> | null = null;
  components: Components;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const clone = template.content.cloneNode(true);

    this.root.appendChild(clone);

    this.components = {
      about: this.root.querySelector(".about"),
      carousel: this.root.querySelector(".carousel"),
      next: this.root.querySelector(".next"),
      prev: this.root.querySelector(".prev"),
      track: this.root.querySelector(".carousel-track"),
    };
  }

  set eventBusManager(eventBusManager: EventBusManager) {
    this.displayBus = eventBusManager.displayBus;

    this.displayBus.on("about:show", this.onShow);
    this.displayBus.on("about:hide", this.onHide);
  }

  async connectedCallback() {
    try {
      const res = await fetch("/public/data/about.json");
      const data = await res.json();

      this.inflateCarousel(data);

      this.bindEvents();
    } catch (err) {
      this.root.innerHTML = `
        <p>Error in getting data</p>
      `;
    }
  }

  disconnectedCallback() {
    this.unbindEvents();

    this.displayBus?.off("about:show", this.onShow);
    this.displayBus?.off("about:hide", this.onHide);
  }

  private onShow = () => {
    this.components.about?.classList.toggle("hidden", false);
  };

  private onHide = () => {
    this.components.about?.classList.toggle("hidden", true);
  };

  moveSlide = (index: number) => {
    if (!this.components.track) return;

    this.state.currentIndex = index;
    const slides = this.components.track.children;
    const total = slides.length;

    if (index < 0) this.state.currentIndex = 0;

    if (index >= total) this.state.currentIndex = total - 1;

    console.log("state index", this.state.currentIndex);

    const slideWidth = slides[0].clientWidth ?? 0;
    console.log("move", this.components.track.style);
    if ("transform" in this.components.track.style) {
      this.components.track.style.transform = `translateX(-${
        this.state.currentIndex * slideWidth
      }px)`;
      console.log("move");
    }
  };

  prevClick = (e: Event) => this.moveSlide(this.state.currentIndex - 1);
  nextClick = (e: Event) => this.moveSlide(this.state.currentIndex + 1);

  private bindEvents = () => {
    this.components.prev?.addEventListener("click", this.prevClick);
    this.components.next?.addEventListener("click", this.nextClick);
  };

  private unbindEvents = () => {
    this.components.prev?.removeEventListener("click", this.prevClick);
    this.components.next?.removeEventListener("click", this.nextClick);
  };

  private inflateCarousel(data: Record<string, { type: string; data: any }>) {
    if (!this.components.track) return;

    const fragment = document.createDocumentFragment();

    Object.entries(data).forEach(([key, value]) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");
      const content = this.Content(value.type, value.data);
      slide.appendChild(content);
      fragment.appendChild(slide);
    });

    this.components.track.appendChild(fragment);
  }

  private Content(type: string, data: any): HTMLElement {
    const title = document.createElement("h3");

    title.innerText = type;

    return title;
  }
}
