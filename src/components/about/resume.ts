const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/style/resume.css">
    <div class="resume">
      <div class="resume__layout">
        <div class="resume__pdf">
          <iframe 
            src="/assets/pdf/my_resume.pdf"
            title="Resume PDF Viewer"
            loading="lazy"
          >
            Your browser does not support embedded PDFs. 
            <a href="/assets/pdf/my_resume.pdf" download>Download the resume</a>.
          </iframe>
        </div>
        <a 
          class="download" 
          href="/assets/pdf/my_resume.pdf" 
          download 
          title="Download a copy of the resume"
        >
          📄 Download Resume
        </a>
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
