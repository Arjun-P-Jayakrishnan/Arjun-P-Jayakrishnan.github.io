// src/components/scene_inspector.ts
var template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/style/">
`;
var SceneInspector = class extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    this.root.appendChild(clone);
  }
  connectedCallback() {
  }
  disconnectedCallback() {
  }
};
export {
  SceneInspector
};
//# sourceMappingURL=scene_inspector.js.map