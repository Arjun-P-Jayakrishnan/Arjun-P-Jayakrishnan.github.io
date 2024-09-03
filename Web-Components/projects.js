const projectTemplate = document.createElement("template");

projectTemplate.innerHTML = `
      <link rel="stylesheet" href="/Web-Components/projects.css">  
      <div class="root">
          <div class="card-banner">
             <slot name="projectImage">Default Image</slot>
          </div>
          <div class="card-details">
            <slot name="heading" >Default Heading</slot>
            <slot name="summary">Default Summary</slot>
          </div>
          <div>
            <button onclick=""> </button>
          </div>
      </div>
`;

class CardProjectTemplate extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "closed" });

    let clone = projectTemplate.content.cloneNode(true);

    this.root.append(clone);
  }
}



export  { CardProjectTemplate };
