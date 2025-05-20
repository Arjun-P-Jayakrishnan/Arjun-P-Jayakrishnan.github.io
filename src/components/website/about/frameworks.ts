import { EventBus } from "@utils/event_management/eventBus";
import { EventBusManager } from "@utils/event_management/eventBusFactory";
import { DisplayEvents } from "@utils/event_management/eventType";

const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="/style/frameworks.css">
    <div class="frameworks">
      <div class="framework__navigation">
        <button class="nav-btn nav--web">Web</button>
        <button class="nav-btn nav--mobile">Mobile</button>
        <button class="nav-btn nav--languages">Languages</button>
        <button class="nav-btn nav--cli">CLI</button>
      </div>

      <div class="framework__contents">
        <ul class="web"></ul>
        <ul class="mobile"></ul>
        <ul class="languages"></ul>
        <ul class="cli"></ul>
      </div>

      
    </div>
`;

interface Navigation {
  web: HTMLButtonElement | null;
  mobile: HTMLButtonElement | null;
  language: HTMLButtonElement | null;
  cli: HTMLButtonElement | null;
}

interface Components {
  framework: HTMLDivElement | null;
  web: HTMLUListElement | null;
  mobile: HTMLUListElement | null;
  languages: HTMLUListElement | null;
  cli: HTMLUListElement | null;
}

export interface FrameworkData{

}

export class FrameworkPage extends HTMLElement {
  root: ShadowRoot;
  displayBus: EventBus<DisplayEvents> | null = null;
  components: Components;
  navigation: Navigation;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const clone = template.content.cloneNode(true);

    this.root.appendChild(clone);

    this.components = {
      framework: this.root.querySelector(".frameworks"),
      web: this.root.querySelector(".web"),
      mobile: this.root.querySelector(".mobile"),
      languages: this.root.querySelector(".languages"),
      cli: this.root.querySelector("cli"),
    };

    this.navigation = {
      web: this.root.querySelector(".nav--web"),
      mobile: this.root.querySelector(".nav--mobile"),
      language: this.root.querySelector(".nav--language"),
      cli: this.root.querySelector(".nav--cli"),
    };
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

 
  }



  

  // prevClick = (e: Event) => this.moveSlide(this.state.currentIndex - 1);
  // nextClick = (e: Event) => this.moveSlide(this.state.currentIndex + 1);

  private bindEvents = () => {
 
  };

  private unbindEvents = () => {
   
  };

  private inflateCarousel(data: Record<string, { type: string; data: any }>) {
   
  }

  
}
