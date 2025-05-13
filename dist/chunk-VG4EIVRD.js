// src/components/website/loading.ts
var template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/style/loading_modal.css"/>
   
    <div class="overlay hidden" id="overlay">
      <div class="loading-logo"></div>
      <div id="loading-text">Loading...</div>
    </div>
`;
var LoadingModal = class extends HTMLElement {
  constructor() {
    super();
    this.handleLoading = () => {
      this.loadingEventBus?.on("load:start", (data) => {
        this.tags.overlay?.classList.remove("hidden");
      });
      this.loadingEventBus?.on("load:progress", (data) => {
        this.progress = data.loaded / data.total;
      });
      this.loadingEventBus?.on("load:complete", (data) => {
        this.tags.overlay?.classList.add("hidden");
      });
      this.loadingEventBus?.on("load:error", (data) => {
      });
    };
    this.root = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    this.root.appendChild(clone);
    this.progress = 0;
    this.tags = {
      overlay: this.root.getElementById("overlay")
    };
  }
  set eventBusManager(eventBusManager) {
    this.loadingEventBus = eventBusManager.loadingBus;
    this.handleLoading();
  }
  connectedCallback() {
  }
  disconnectedCallback() {
  }
};

export {
  LoadingModal
};
//# sourceMappingURL=chunk-VG4EIVRD.js.map