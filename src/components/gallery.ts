import { EventBus } from "@utils/event_management/eventBus";
import { EventBusManager } from "@utils/event_management/eventBusFactory";
import { DisplayEvents } from "@utils/event_management/eventType";
import { CardMarshall } from "./card";

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
    console.log("gallery hidden");
    this.gallery?.classList.add("hidden");
  }

  async connectedCallback() {
    console.log("fetching data");
    const res = await fetch("/public/data/projects.json");
    const projects = await res.json();

    (projects["projects"] as Array<CardMarshall>).forEach((cardProps) => {
      const projectElement = document.createElement("project-card");
      projectElement.setAttribute("title", cardProps.title);
      projectElement.setAttribute("image", cardProps.imageUrl);
      projectElement.setAttribute("description", cardProps.description);
      projectElement.setAttribute("tags", cardProps.tags ?? "");
      projectElement.setAttribute("github_link", cardProps.linkUrl);

      this.gallery?.appendChild(projectElement);
    });

    this.displayEventBus?.on("project:show", (data) => {
      this.showComponent(data);
    });
    this.displayEventBus?.on("project:hide", (data) => {
      this.hideComponent(data);
    });
  }

  disconnectedCallback() {
    this.displayEventBus?.off("project:show", (data) => {
      this.showComponent(data);
    });
    this.displayEventBus?.off("project:hide", (data) => {
      this.hideComponent(data);
    });
  }
}
