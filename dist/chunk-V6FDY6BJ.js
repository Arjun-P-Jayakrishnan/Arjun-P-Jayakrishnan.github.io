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
`;var s=class extends HTMLElement{constructor(){super();this.displayBus=null;this.webClick=e=>this.openPage(0);this.mobileClick=e=>this.openPage(1);this.languagesClick=e=>this.openPage(2);this.cliClick=e=>this.openPage(3);this.bindEvents=()=>{this.navigation.web&&this.navigation.web.addEventListener("click",this.webClick),this.navigation.mobile&&this.navigation.mobile.addEventListener("click",this.mobileClick),this.navigation.language&&this.navigation.language.addEventListener("click",this.languagesClick),this.navigation.cli&&this.navigation.cli.addEventListener("click",this.cliClick);};this.unbindEvents=()=>{this.navigation.web&&this.navigation.web.removeEventListener("click",this.webClick),this.navigation.mobile&&this.navigation.mobile.removeEventListener("click",this.mobileClick),this.navigation.language&&this.navigation.language.removeEventListener("click",this.languagesClick),this.navigation.cli&&this.navigation.cli.removeEventListener("click",this.cliClick);};this.root=this.attachShadow({mode:"open"});let e=c.content.cloneNode(true);this.root.appendChild(e),this.components={framework:this.root.querySelector(".frameworks"),web:this.root.querySelector(".web__content"),mobile:this.root.querySelector(".mobile__content"),languages:this.root.querySelector(".languages__content"),cli:this.root.querySelector(".cli__content")},this.navigation={web:this.root.querySelector(".nav--web"),mobile:this.root.querySelector(".nav--mobile"),language:this.root.querySelector(".nav--languages"),cli:this.root.querySelector(".nav--cli")};}connectedCallback(){this.bindEvents(),this.root.querySelector(".web")?.classList.toggle("active",true),this.navigation.web?.classList.toggle("active",true);}disconnectedCallback(){this.unbindEvents();}openPage(e){let o=[this.navigation.web,this.navigation.mobile,this.navigation.language,this.navigation.cli],i=[this.root.querySelector(".web"),this.root.querySelector(".mobile"),this.root.querySelector(".languages"),this.root.querySelector(".cli")];o.forEach(n=>n?.classList.toggle("active",false)),i.forEach(n=>n?.classList.toggle("active",false)),o[e]&&o[e].classList.toggle("active",true),i[e]&&i[e].classList.toggle("active",true);}addIcon(e,o,i){let n=document.createElement("li"),a=document.createElement("img");return a.setAttribute("src",i),a.setAttribute("alt",e),a.classList.add("framework_logo"),n.appendChild(a),n}inflate(e,o){switch(o){case "web":let i=document.createDocumentFragment();e.forEach(t=>{i.appendChild(this.addIcon(t.name,[],t.link));}),this.components.web?.appendChild(i);break;case "mobile":let n=document.createDocumentFragment();e.forEach(t=>{n.appendChild(this.addIcon(t.name,[],t.link));}),this.components.mobile?.appendChild(n);break;case "languages":let a=document.createDocumentFragment();e.forEach(t=>{a.appendChild(this.addIcon(t.name,[],t.link));}),this.components.languages?.appendChild(a);break;case "command-line":let l=document.createDocumentFragment();e.forEach(t=>{l.appendChild(this.addIcon(t.name,[],t.link));}),this.components.cli?.appendChild(l);break;default:console.warn("The types doesnt match for frameworks");}}set FrameworkData(e){this.inflate(e.web,"web"),this.inflate(e.mobile,"mobile"),this.inflate(e.languages,"languages"),this.inflate(e.cli,"command-line");}};export{s as a};//# sourceMappingURL=chunk-V6FDY6BJ.js.map
//# sourceMappingURL=chunk-V6FDY6BJ.js.map