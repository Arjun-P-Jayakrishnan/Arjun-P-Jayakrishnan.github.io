import { EventBus } from "@managers/events/eventBus";
import { EventBusManager } from "@managers/events/eventBusFactory";
import { DisplayEvents } from "@managers/events/eventType";
import { CardMarshall, ProjectCard } from "./card";


const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/style/gallery.css">
    <div class="gallery hidden" id="gallery">
    </div>
`;

export class ProjectGallery extends HTMLElement {
  root: ShadowRoot;
  gallery: HTMLElement | null;

  displayEventBus: EventBus<DisplayEvents> | undefined;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    this.root.appendChild(clone);

    this.gallery = this.root.getElementById("gallery");
  }

  set eventBusManager(eventBusManager: EventBusManager) {
    this.displayEventBus = eventBusManager.displayBus;
  }

  showComponent(_: any) {
    console.log("gallery shown ");
    this.gallery?.classList.remove("hidden");
  }

  hideComponent(_: any) {
    this.gallery?.classList.add("hidden");
  }

  private onShow = (data: any) => this.showComponent(data);
  private onHide = (data: any) => this.hideComponent(data);

  async connectedCallback() {
    if (!this.gallery) return;

    const res = await fetch("/public/data/projects.json");
    if (!res.ok) {
      this.gallery.innerHTML = `
        <p> Failed to load projects</p>
      `;
      return;
    }

    const projects = await res.json();

    const fragment = document.createDocumentFragment();

    (projects["projects"] as Array<CardMarshall>).forEach((cardProps) => {
      const card: ProjectCard = document.createElement(
        "project-card"
      ) as ProjectCard;
      card.setData(cardProps);
      fragment.appendChild(card);
    });

    this.gallery.appendChild(fragment);

    if (!this.displayEventBus) return;

    this.displayEventBus.on("project:show", this.onShow);
    this.displayEventBus.on("project:hide", this.onHide);
  }

  disconnectedCallback() {
    if (!this.displayEventBus) return;

    this.displayEventBus.off("project:show", this.onShow);
    this.displayEventBus.off("project:hide", this.onHide);
  }
}
