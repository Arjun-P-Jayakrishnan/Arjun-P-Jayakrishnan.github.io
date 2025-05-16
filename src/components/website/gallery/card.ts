const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="/style/card.css" />
  <div class="card">
    <div class="card-content">
     <div class="card-header">
        <div class="card-image">
          <img src="" alt="" loading="lazy"/>
        </div>
        <div class="title-group">
          <h3></h3>
          <small class="sub-heading"></small>
        </div>
      </div>  
     
      <p class="description"></p>
      <div class="tags"></div>
      <a class="github-link" href="" >
        <img src="/assets/images/github-brands-solid.svg" alt="Github" loading="lazy"/>
        Github
      </a>
    </div>
  </div>
`;

const PROJECT_CARD_CONSTANTS = [
  "title",
  "image",
  "description",
  "tags",
  "linkUrl",
];

export interface CardMarshall {
  title: string;
  description: string;
  imageUrl: string;
  tags?: string;
  linkUrl: string;
}

interface Components {
  logo: HTMLImageElement | null;
  title: HTMLHeadingElement | null;
  description: HTMLParagraphElement | null;
  tagRoot: HTMLDivElement | null;
  link: HTMLAnchorElement | null;
}

export class ProjectCard extends HTMLElement {
  root: ShadowRoot;
  components: Components;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const clone = template.content.cloneNode(true);

    this.root.appendChild(clone);

    this.components = {
      logo: this.root.querySelector("img"),
      title: this.root.querySelector("h3"),
      description: this.root.querySelector("p"),
      tagRoot: this.root.querySelector(".tags"),
      link: this.root.querySelector(".github-link"),
    };
  }

  static get observedAttributes() {
    return PROJECT_CARD_CONSTANTS;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render(name);
    }
  }

  setData(props: CardMarshall) {
    this.setAttribute("title", props.title);
    this.setAttribute("image", props.imageUrl);
    this.setAttribute("description", props.description);
    this.setAttribute("tags", props.tags ?? "");
    this.setAttribute("linkUrl", props.linkUrl);
  }

  render(name: string) {
    switch (name) {
      case "title":
        const title: string = this.getAttribute("title") || "";
        if (this.components.title) this.components.title.textContent = title;
        break;
      case "description":
        const description: string = this.getAttribute("description") || "";
        if (this.components.description)
          this.components.description!.textContent = description;
        break;
      case "image":
        const image: string = this.getAttribute("image") || "";
        const _title: string = this.getAttribute("title") || "";
        if (this.components.logo) {
          this.components.logo.setAttribute("src", image);
          this.components.logo.setAttribute("alt", _title);
        }
        break;
      case "tags":
        const tags = (this.getAttribute("tags") || "").split(",");
        if (this.components.tagRoot) {
          const children = tags.map((tag) => {
            const span = document.createElement("span");
            span.textContent = tag;
            return span;
          });

          this.components.tagRoot.replaceChildren(...children);
        }
        break;
      case "linkUrl":
        const github_link = this.getAttribute("linkUrl") || "";
        if (this.components.link) {
          this.components.link.setAttribute(`href`, github_link);
        }
        break;
    }
  }

  connectedCallback() {}

  disconnectedCallback() {}
}
