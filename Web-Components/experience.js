const experienceTemplate = document.createElement("template");

experienceTemplate.innerHTML = `
      
      <link rel="stylesheet" href='/Web-Components/experience.css'>
      <div class="root">
          <div class="illustration">
            <slot name="illustrationImage">Default Image</slot>
          </div>
          <div class="card-details card-style">
            <slot name="heading" >Default Heading</slot>
            <slot name="summary">Default Summary</slot>
            <slot name="languages"></slot>
          </div>
      </div>
`;

class ExperienceTemplate extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "closed" });

    let clone = experienceTemplate.content.cloneNode(true);

    this.root.append(clone);
  }
}

export { ExperienceTemplate };
