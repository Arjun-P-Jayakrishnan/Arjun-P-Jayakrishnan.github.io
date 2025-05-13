var n=document.createElement("template");n.innerHTML=`
    
    
`;var c=["title","image","description","tags"],s=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let t=n.content.cloneNode(!0);this.root.appendChild(t)}static get observedAttributes(){return c}attributeChangedCallback(t,e,i){this.render()}render(){let t=this.getAttribute("title")||"",e=this.getAttribute("description")||"",i=this.getAttribute("image")||"",r=(this.getAttribute("tags")||"").split(","),a=this.getAttribute("linkUrl")||"";this.root.innerHTML=`
      <link rel="stylesheet" href="/style/card.css">
      <div class="card">
        <div class="card-image">
          <img src="${i}" alt="${t}">
       </div>
       <div class="card-content">
        <h3>${t}</h3>
        <p>${e}</p>
        <div class="tags">
         ${r.map(l=>`<span>${l}</span>`).join("")}
        </div>
        <a class="github-link" href=${a} >
          <img src="/assets/images/github-brands-solid.svg" alt="Github">
          Github
          </a>
        </div>
      </div>
    `}connectedCallback(){}disconnectedCallback(){}};export{s as a};
//# sourceMappingURL=chunk-TLNUNP6C.js.map