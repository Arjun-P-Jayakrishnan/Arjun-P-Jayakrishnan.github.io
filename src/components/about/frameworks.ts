import { EventBus } from "@events/eventBus";
import { NavigationEvents } from "types/event.types";

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
        <div class="web">
          <ul class="web__content"></ul>
        </div>
        <div class="mobile">
          <ul class="mobile__content"></ul>
        </div>
        <div class="languages">
          <ul class="languages__content"></ul>
        </div>
        <div class="cli">
          <ul class="cli__content"></ul>
        </div>
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
  framework: HTMLUListElement | null;
  web: HTMLUListElement | null;
  mobile: HTMLUListElement | null;
  languages: HTMLUListElement | null;
  cli: HTMLUListElement | null;
}

export interface FrameworkData {
  web: any;
  mobile: any;
  languages: any;
  cli: any;
}

export class FrameworkPage extends HTMLElement {
  root: ShadowRoot;
  displayBus: EventBus<NavigationEvents> | null = null;
  components: Components;
  navigation: Navigation;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const clone = template.content.cloneNode(true);

    this.root.appendChild(clone);

    this.components = {
      framework: this.root.querySelector(".frameworks"),
      web: this.root.querySelector(".web__content"),
      mobile: this.root.querySelector(".mobile__content"),
      languages: this.root.querySelector(".languages__content"),
      cli: this.root.querySelector(".cli__content"),
    };

    this.navigation = {
      web: this.root.querySelector(".nav--web"),
      mobile: this.root.querySelector(".nav--mobile"),
      language: this.root.querySelector(".nav--languages"),
      cli: this.root.querySelector(".nav--cli"),
    };
  }

  connectedCallback() {
    this.bindEvents();
    const web = this.root.querySelector(".web");
    web?.classList.toggle("active", true);
    this.navigation.web?.classList.toggle("active", true);
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  webClick = (e: Event) => this.openPage(0);
  mobileClick = (e: Event) => this.openPage(1);
  languagesClick = (e: Event) => this.openPage(2);
  cliClick = (e: Event) => this.openPage(3);

  private openPage(index: number) {
    const tabs = [
      this.navigation.web,
      this.navigation.mobile,
      this.navigation.language,
      this.navigation.cli,
    ];

    const pages = [
      this.root.querySelector(".web"),
      this.root.querySelector(".mobile"),
      this.root.querySelector(".languages"),
      this.root.querySelector(".cli"),
    ];

    tabs.forEach((tab) => tab?.classList.toggle("active", false));
    pages.forEach((page) => page?.classList.toggle("active", false));

    if (tabs[index]) tabs[index].classList.toggle("active", true);
    if (pages[index]) pages[index].classList.toggle("active", true);
  }

  private bindEvents = () => {
    if (this.navigation.web) {
      this.navigation.web.addEventListener("click", this.webClick);
    }

    if (this.navigation.mobile) {
      this.navigation.mobile.addEventListener("click", this.mobileClick);
    }

    if (this.navigation.language) {
      this.navigation.language.addEventListener("click", this.languagesClick);
    }

    if (this.navigation.cli) {
      this.navigation.cli.addEventListener("click", this.cliClick);
    }
  };

  private unbindEvents = () => {
    if (this.navigation.web) {
      this.navigation.web.removeEventListener("click", this.webClick);
    }

    if (this.navigation.mobile) {
      this.navigation.mobile.removeEventListener("click", this.mobileClick);
    }

    if (this.navigation.language) {
      this.navigation.language.removeEventListener(
        "click",
        this.languagesClick
      );
    }

    if (this.navigation.cli) {
      this.navigation.cli.removeEventListener("click", this.cliClick);
    }
  };

  private addIcon(
    name: string,
    className: string[],
    url: string
  ): HTMLLIElement {
    const li = document.createElement("li");

    // const icon = document.createElement("i");
    // icon.classList.add(...className);

    // const span = document.createElement("span");
    // span.textContent = name;

    // li.appendChild(icon);
    // li.appendChild(span);

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.setAttribute("alt", name);
    img.classList.add("framework_logo");

    li.appendChild(img);

    return li;
  }

  private inflate(data: Array<{ name: string; link: string }>, type: string) {
    switch (type) {
      case "web":
        const fragmentWeb = document.createDocumentFragment();
        data.forEach((icon) => {
          fragmentWeb.appendChild(this.addIcon(icon.name, [], icon.link));
        });
        this.components.web?.appendChild(fragmentWeb);
        break;
      case "mobile":
        const fragmentMobile = document.createDocumentFragment();
        data.forEach((icon) => {
          fragmentMobile.appendChild(this.addIcon(icon.name, [], icon.link));
        });
        this.components.mobile?.appendChild(fragmentMobile);
        break;
      case "languages":
        const fragmentLanguages = document.createDocumentFragment();
        data.forEach((icon) => {
          fragmentLanguages.appendChild(this.addIcon(icon.name, [], icon.link));
        });
        this.components.languages?.appendChild(fragmentLanguages);
        break;
      case "command-line":
        const fragment = document.createDocumentFragment();
        data.forEach((icon) => {
          fragment.appendChild(this.addIcon(icon.name, [], icon.link));
        });

        this.components.cli?.appendChild(fragment);
        break;
      default:
        console.warn("The types doesnt match for frameworks");
    }
  }

  set FrameworkData(data: FrameworkData) {
    this.inflate(data["web"], "web");
    this.inflate(data["mobile"], "mobile");
    this.inflate(data["languages"], "languages");
    this.inflate(data["cli"], "command-line");
  }
}
