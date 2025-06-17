var s=document.createElement("template");s.innerHTML=`
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
          \u{1F4C4} Download Resume
        </a>
      </div> 
    </div>
`;var e=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let o=s.content.cloneNode(true);this.root.appendChild(o);}connectedCallback(){}disconnectedCallback(){}};export{e as ResumePage};//# sourceMappingURL=resume.js.map
//# sourceMappingURL=resume.js.map