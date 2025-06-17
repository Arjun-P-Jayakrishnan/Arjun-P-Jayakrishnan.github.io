var c=document.createElement("template");c.innerHTML=`
    <link rel="stylesheet" href="/style/frameworks.css">
    <div class="frameworks">
      <div class="framework__navigation">
        <button class="nav-btn nav--web">Web</button>
        <button class="nav-btn nav--mobile">Mobile</button>
        <button class="nav-btn nav--languages">Languages</button>
        <button class="nav-btn nav--cli">CLI</button>
      </div>

      <div class="framework__contents">
        <div class="web">
          <ul class="web__content"></ul>
        </div>
        <div class="mobile">
          <ul class="mobile__content"></ul>
        </div>
        <div class="languages">
          <ul class="languages__content"></ul>
        </div>
        <div class="cli">
          <ul class="cli__content"></ul>
        </div>
      </div>
    </div>
`;var o=class extends HTMLElement{constructor(){super();this.displayBus=null;this.webClick=e=>this.openPage(0);this.mobileClick=e=>this.openPage(1);this.languagesClick=e=>this.openPage(2);this.cliClick=e=>this.openPage(3);this.bindEvents=()=>{this.navigation.web&&this.navigation.web.addEventListener("click",this.webClick),this.navigation.mobile&&this.navigation.mobile.addEventListener("click",this.mobileClick),this.navigation.language&&this.navigation.language.addEventListener("click",this.languagesClick),this.navigation.cli&&this.navigation.cli.addEventListener("click",this.cliClick);};this.unbindEvents=()=>{this.navigation.web&&this.navigation.web.removeEventListener("click",this.webClick),this.navigation.mobile&&this.navigation.mobile.removeEventListener("click",this.mobileClick),this.navigation.language&&this.navigation.language.removeEventListener("click",this.languagesClick),this.navigation.cli&&this.navigation.cli.removeEventListener("click",this.cliClick);};this.root=this.attachShadow({mode:"open"});let e=c.content.cloneNode(true);this.root.appendChild(e),this.components={framework:this.root.querySelector(".frameworks"),web:this.root.querySelector(".web__content"),mobile:this.root.querySelector(".mobile__content"),languages:this.root.querySelector(".languages__content"),cli:this.root.querySelector(".cli__content")},this.navigation={web:this.root.querySelector(".nav--web"),mobile:this.root.querySelector(".nav--mobile"),language:this.root.querySelector(".nav--languages"),cli:this.root.querySelector(".nav--cli")};}connectedCallback(){this.bindEvents();}disconnectedCallback(){this.unbindEvents();}openPage(e){let l=this.root.querySelector(".web"),a=this.root.querySelector(".mobile"),i=this.root.querySelector(".languages"),n=this.root.querySelector(".cli");l?.classList.toggle("active",false),a?.classList.toggle("active",false),i?.classList.toggle("active",false),n?.classList.toggle("active",false),e===0?l?.classList.toggle("active",true):e==1?a?.classList.toggle("active",true):e==2?i?.classList.toggle("active",true):e==3&&n?.classList.toggle("active",true);}addIcon(e,l,a){let i=document.createElement("li"),n=document.createElement("img");return n.setAttribute("src",a),n.setAttribute("alt",e),n.classList.add("framework_logo"),i.appendChild(n),i}inflate(e,l){switch(l){case "web":let a=document.createDocumentFragment();e.forEach(t=>{a.appendChild(this.addIcon(t.name,[],t.link));}),this.components.web?.appendChild(a);break;case "mobile":let i=document.createDocumentFragment();e.forEach(t=>{i.appendChild(this.addIcon(t.name,[],t.link));}),this.components.mobile?.appendChild(i);break;case "languages":let n=document.createDocumentFragment();e.forEach(t=>{n.appendChild(this.addIcon(t.name,[],t.link));}),this.components.languages?.appendChild(n);break;case "command-line":let s=document.createDocumentFragment();e.forEach(t=>{s.appendChild(this.addIcon(t.name,[],t.link));}),this.components.cli?.appendChild(s);break;default:console.warn("The types doesnt match for frameworks");}}set FrameworkData(e){this.inflate(e.web,"web"),this.inflate(e.mobile,"mobile"),this.inflate(e.languages,"languages"),this.inflate(e.cli,"command-line");}};export{o as FrameworkPage};//# sourceMappingURL=frameworks.js.map
//# sourceMappingURL=frameworks.js.map