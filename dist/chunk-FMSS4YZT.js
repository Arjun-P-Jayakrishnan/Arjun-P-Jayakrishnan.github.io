var o=document.createElement("template");o.innerHTML=`
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
`;var e=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let s=o.content.cloneNode(true);this.root.appendChild(s);}connectedCallback(){}disconnectedCallback(){}};export{e as a};//# sourceMappingURL=chunk-FMSS4YZT.js.map
//# sourceMappingURL=chunk-FMSS4YZT.js.map