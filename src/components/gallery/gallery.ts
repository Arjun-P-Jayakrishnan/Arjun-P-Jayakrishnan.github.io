import { EventBus } from "@events/eventBus";
import { EventBusManager } from "@events/EventBusManager";
import { ViewEvents } from "types/eventType";
import { CardMarshall, ProjectCard } from "./card";

const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/style/gallery.css">
    <style>
      .hidden {
        transform: translateX(-50%) scale(0.95);
        opacity: 0;
        pointer-events: none;
      }
    </style>
    <div class="gallery hidden" id="gallery">
    </div>
`;

export type ProjectData =
  | {
      list: Array<CardMarshall>;
      isError: false;
    }
  | {
      isError: true;
      message: string;
    };

export class ProjectGallery extends HTMLElement {
  root: ShadowRoot;
  gallery: HTMLElement | null;

  viewEventBus: EventBus<ViewEvents> | undefined;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    this.root.appendChild(clone);

    this.gallery = this.root.getElementById("gallery");
  }

  set eventBusManager(eventBusManager: EventBusManager) {
    this.viewEventBus = eventBusManager.viewBus;
    console.log("event bus attached to project gallery");
  }

  showComponent(_: any) {
    console.log("gallery shown ");
    this.gallery?.classList.remove("hidden");
  }

  hideComponent(_: any) {
    console.log("gallery hidden");
    this.gallery?.classList.add("hidden");
  }

  private onShow = (data: any) => this.showComponent(data);
  private onHide = (data: any) => this.hideComponent(data);

  private inflateData(projects: Array<CardMarshall>) {
    if (!this.gallery) return;
    const fragment = document.createDocumentFragment();
    projects.forEach((cardProps) => {
      const card: ProjectCard = document.createElement(
        "project-card"
      ) as ProjectCard;
      card.setData(cardProps);
      fragment.appendChild(card);
    });

    this.gallery.appendChild(fragment);

    if (!this.viewEventBus) return;

    this.viewEventBus.on("project-screen:show", this.onShow);
    this.viewEventBus.on("project-screen:hide", this.onHide);
  }

  set updateData(data: ProjectData) {
    if (!data.isError) {
      this.inflateData(data.list);
    } else {
      this.root.innerHTML = `
          <p>${data.message}</p>
        `;
    }
  }

  connectedCallback() {}

  disconnectedCallback() {
    if (!this.viewEventBus) return;

    this.viewEventBus.off("project-screen:show", this.onShow);
    this.viewEventBus.off("project-screen:hide", this.onHide);
  }
}
