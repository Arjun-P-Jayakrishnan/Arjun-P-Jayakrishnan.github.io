import { EventBus } from "@utils/event_management/eventBus";
import { EventBusManager } from "@utils/event_management/eventBusFactory";
import { DisplayEvents } from "@utils/event_management/eventType";
import { BackgroundPage } from "./background";
import { ExperiencePage, JobExperience } from "./experience";

const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/style/about.css">
    <div class="about hidden">
        <div class="carousel">
          <div class="carousel-container">
            <ul class="carousel-track">
                <li class="slide" data-active><slot name="background">Background</slot></li>
                <li class="slide"><slot name="experience">Experience</slot></li>
                <li class="slide"><slot name="resume">Resume</slot></li>
                <li class="slide"><slot name="frameworks">Frameworks</slot></li>
            </ul>
          </div>
          <button class="carousel__button prev">&#8678;</button>
          <button class="carousel__button next">&#8680;</button>
          <div class="carousel_nav">
                <button class="carousel_indicator" data-active-button></button>
                <button class="carousel_indicator"></button>
                <button class="carousel_indicator"></button>
                <button class="carousel_indicator"></button>
          </div>
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
  track: HTMLUListElement | null;
  navButtons: HTMLButtonElement[];
}

interface CarouselItems {
  background: BackgroundPage;
  experience: ExperiencePage;
}

export type AboutData =
  | {
      isError: false;
      records: Record<string, { type: string; data: any }>;
    }
  | {
      isError: true;
      message: string;
    };

export class AboutPage extends HTMLElement {
  state: State = {
    currentIndex: 0,
  };
  root: ShadowRoot;
  displayBus: EventBus<DisplayEvents> | null = null;
  components: Components;
  carouselItem: CarouselItems | null = null;

  prevClick = (e: Event) => this.swapSlides(-1);
  nextClick = (e: Event) => this.swapSlides(1);
  navButtonClicks: Array<(e: Event) => void> = [];

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const clone = template.content.cloneNode(true);

    this.root.appendChild(clone);

    const buttons = Array.from(
      this.root.querySelector(".carousel_nav")?.children ?? []
    );

    this.components = {
      about: this.root.querySelector(".about"),
      carousel: this.root.querySelector(".carousel"),
      next: this.root.querySelector(".next"),
      prev: this.root.querySelector(".prev"),
      track: this.root.querySelector(".carousel-track"),
      navButtons: buttons as any as HTMLButtonElement[],
    };

    console.log(this.components.navButtons);

    this.components.navButtons.forEach((_, index) => {
      this.navButtonClicks.push((e: Event) =>
        this.swapSlides(index - this.state.currentIndex)
      );
    });
    this.defineElements();
    this.querySlottedElements();
  }

  private defineElements = () => {
    if (!customElements.get("background-page")) {
      customElements.define("background-page", BackgroundPage);
    }

    if (!customElements.get("experience-page")) {
      customElements.define("experience-page", ExperiencePage);
    }
  };

  private querySlottedElements = () => {
    const slotBackground = this.root.querySelector(
      'slot[name="background"]'
    ) as HTMLSlotElement;

    const nodesBackground = slotBackground?.assignedElements?.() || [];

    const background = nodesBackground.find(
      (el) => el instanceof BackgroundPage
    ) as BackgroundPage;

    const slotExperience=this.root.querySelector('slot[name="experience"]') as HTMLSlotElement;

    const nodesExperience = slotExperience?.assignedElements?.()||[];

    const experience: ExperiencePage = nodesExperience.find(
      (el) => el instanceof ExperiencePage
    ) as ExperiencePage;
    
    this.carouselItem = {
      background: background,
      experience: experience,
    };
  };

  set eventBusManager(eventBusManager: EventBusManager) {
    this.displayBus = eventBusManager.displayBus;

    this.displayBus.on("about:show", this.onShow);
    this.displayBus.on("about:hide", this.onHide);
  }

  set updateData(data: AboutData) {
    if (!data.isError) {
      this.inflateCarousel(data.records);
    } else {
      this.root.innerHTML = `
        <p>${data.message}</p>
      `;
    }
  }

  connectedCallback() {
    this.bindEvents();
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

  swapSlides(offset: number) {
    if (!this.components.track) return;

    const prevIndex = this.state.currentIndex;
    const length = this.components.track.children.length;

    this.state.currentIndex += offset;
    if (this.state.currentIndex < 0) this.state.currentIndex = length - 1;
    if (this.state.currentIndex >= length) this.state.currentIndex = 0;

    const activeSlide = this.components.track.children[
      prevIndex
    ] as HTMLElement;

    (
      this.components.track.children[this.state.currentIndex] as HTMLElement
    ).dataset.active = "true";
    delete activeSlide.dataset.active;

    this.components.navButtons[this.state.currentIndex].dataset.activeButton =
      "true";
    delete this.components.navButtons[prevIndex].dataset.activeButton;
  }

  private bindEvents = () => {
    this.components.prev?.addEventListener("click", this.prevClick);
    this.components.next?.addEventListener("click", this.nextClick);
    this.components.navButtons.forEach((button, index) => {
      button.addEventListener("click", this.navButtonClicks[index]);
    });
  };

  private unbindEvents = () => {
    this.components.prev?.removeEventListener("click", this.prevClick);
    this.components.next?.removeEventListener("click", this.nextClick);
    this.components.navButtons.forEach((button, index) => {
      button.removeEventListener("click", this.navButtonClicks[index]);
    });
  };

  private setBackground(data: any) {
    if (!this.carouselItem?.background) return;

    this.carouselItem.background.Summary = {
      title: data["summary"]["title"] ?? "Title-Placeholder",
      description: data["summary"]["description"] ?? "Description",
    };

    const education = data["education"];

    this.carouselItem.background.Education = {
      course: education["course"],
      institute: education["institute"],
      description: education["description"],
    };

    const skills: Array<any> = data["skills"] as Array<any>;
    this.carouselItem.background.Skills = skills.map((skillItem) => {
      return {
        title: skillItem["title"],
        tags: skillItem["tags"] as Array<string>,
      };
    });
  }

  private setExperience(experienceData: any) {
    if (!this.carouselItem?.experience) return;

    this.carouselItem.experience.Experience = experienceData.map(
      (data: any) => {
        return {
          title: data.title,
          duration: data.duration,
          responsibilities: data["responsibilities"] as Array<string>,
        } as JobExperience;
      }
    );
  }

  private inflateCarousel(data: Record<string, { type: string; data: any }>) {
    this.setBackground(data["personal"].data);
    this.setExperience(data["experience"].data);
  }
}
