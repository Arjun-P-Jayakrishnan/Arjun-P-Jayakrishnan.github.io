const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/style/resume.css">
    <div class="resume">
      <div class="resume__layout">
        <div class="resume__pdf">
          <iframe src="/assets/pdf/my_resume.pdf">
            This browser doesn't allow viewing pdf. Download to have a look.
          </iframe>
        </div>
        <a class="download" href="/assets/pdf/my_resume.pdf" download title="Download Resume">Download Resume</a>
      </div> 
    </div>
`;

export class ResumePage extends HTMLElement {
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
