const template = document.createElement("template");
template.innerHTML = `
    
    
`;

const PROJECT_CARD_CONSTANTS = ["title", "image", "description", "tags"];

export interface CardMarshall {
  title: string;
  description: string;
  imageUrl: string;
  tags?: string;
  linkUrl: string;
}

export class ProjectCard extends HTMLElement {
  root: ShadowRoot;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const clone = template.content.cloneNode(true);

    this.root.appendChild(clone);
  }

  static get observedAttributes() {
    return PROJECT_CARD_CONSTANTS;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
  
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "";
    const description = this.getAttribute("description") || "";
    const image = this.getAttribute("image") || "";
    const tags = (this.getAttribute("tags") || "").split(",");
    const github_link = this.getAttribute("linkUrl") || "";

    this.root.innerHTML = `
      <link rel="stylesheet" href="/style/card.css">
      <div class="card">
        <div class="card-image">
          <img src="${image}" alt="${title}">
       </div>
       <div class="card-content">
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="tags">
         ${tags
           .map((tag) => {
             return `<span>${tag}</span>`;
           })
           .join("")}
        </div>
        <a class="github-link" href=${github_link} >
          <img src="/assets/images/github-brands-solid.svg" alt="Github">
          Github
          </a>
        </div>
      </div>
    `;
  }

  connectedCallback() {}

  disconnectedCallback() {}
}
