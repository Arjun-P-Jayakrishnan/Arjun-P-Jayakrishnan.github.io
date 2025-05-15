var o=document.createElement("template");o.innerHTML=`
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
`;var d=["title","image","description","tags","linkUrl"],n=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let t=o.content.cloneNode(true);this.root.appendChild(t),this.components={logo:this.root.querySelector("img"),title:this.root.querySelector("h3"),description:this.root.querySelector("p"),tagRoot:this.root.querySelector(".tags"),link:this.root.querySelector(".github-link")};}static get observedAttributes(){return d}attributeChangedCallback(t,e,i){e!==i&&this.render(t);}setData(t){this.setAttribute("title",t.title),this.setAttribute("image",t.imageUrl),this.setAttribute("description",t.description),this.setAttribute("tags",t.tags??""),this.setAttribute("linkUrl",t.linkUrl);}render(t){switch(t){case "title":let e=this.getAttribute("title")||"";this.components.title&&(this.components.title.textContent=e);break;case "description":let i=this.getAttribute("description")||"";this.components.description&&(this.components.description.textContent=i);break;case "image":let r=this.getAttribute("image")||"",l=this.getAttribute("title")||"";this.components.logo&&(this.components.logo.setAttribute("src",r),this.components.logo.setAttribute("alt",l));break;case "tags":let a=(this.getAttribute("tags")||"").split(",");if(this.components.tagRoot){let g=a.map(h=>{let s=document.createElement("span");return s.textContent=h,s});this.components.tagRoot.replaceChildren(...g);}break;case "linkUrl":let c=this.getAttribute("linkUrl")||"";this.components.link&&this.components.link.setAttribute("href",c);break}}connectedCallback(){}disconnectedCallback(){}};export{n as a};//# sourceMappingURL=chunk-PCYAXXK4.js.map
//# sourceMappingURL=chunk-PCYAXXK4.js.map