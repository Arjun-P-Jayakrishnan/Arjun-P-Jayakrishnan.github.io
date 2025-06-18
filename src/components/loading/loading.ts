import { EventBus } from "@events/eventBus";
import { EventBusManager } from "@events/EventBusManager";
import { Logger } from "@utils/Logger";
import { getServiceRegistry } from "engine/core/ServiceRegistry";
import { LoadingEvents } from "types/eventType";

const template = document.createElement("template");
///TODO: Re-add hidden in overlay
template.innerHTML = `
    <link rel="stylesheet" href="/style/loading_modal.css"/>
   
    <div class="overlay" id="overlay">
      <div class="loading-logo"></div>
      <div id="loading-text">Loading...</div>
    </div>
`;

interface Tags {
  overlay: HTMLElement | null;
}

export class LoadingModal extends HTMLElement {
  loadingEventBus?: EventBus<LoadingEvents>;
  root: ShadowRoot;
  tags: Tags;
  progress: number;
  logger: Logger;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const clone = template.content.cloneNode(true);
    this.root.appendChild(clone);
    this.progress = 0;

    this.tags = {
      overlay: this.root.getElementById("overlay"),
    };
    this.logger = getServiceRegistry().get("Logger");
    this.logger.onLoad({ origin: "Loading Modal" });
  }

  handleLoading = () => {
    this.loadingEventBus?.on("load:start", (data) => {
      this.tags.overlay?.classList.remove("hidden");
    });
    this.loadingEventBus?.on("load:progress", (data) => {
      this.progress = data.loaded / data.total;
    });
    this.loadingEventBus?.on("load:complete", (data) => {
      this.tags.overlay?.classList.add("hidden");
    });
    this.loadingEventBus?.on("load:error", (data) => {});
  };

  set eventBusManager(eventBusManager: EventBusManager) {
    this.loadingEventBus = eventBusManager.loadingBus;
    this.handleLoading();
  }

  connectedCallback() {}

  disconnectedCallback() {}
}
