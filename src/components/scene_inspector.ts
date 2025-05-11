const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/style/">
`;

export class SceneInspector extends HTMLElement {
  root: ShadowRoot;
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);

    this.root.appendChild(clone);
  }

  connectedCallback() {}

  disconnectedCallback() {}
}
