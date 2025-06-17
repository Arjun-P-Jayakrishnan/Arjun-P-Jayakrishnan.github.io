var h=()=>{let o=new Map;return {register:(s,n)=>{if(o.has(s))throw new Error(`Error : Redefining the service [${s}]`);o.set(s,n);},get:s=>{let n=o.get(s);if(!n)throw new Error(`Error : Trying to obtain value of an unregistered service ${s}`);return n},has:s=>o.has(s)}},i,a=()=>(i||(i=h()),i);var c=document.createElement("template");c.innerHTML=`
  <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
  <link rel="stylesheet" href="/style/navbar.css">
  <nav class="navbar" id="main-nav">
      <div class="logo">Logo</div>
      <button class="toggle-btn" aria-expanded="false" aria-controls="main-nav">&#9776</button>
      <ul class="nav-links" aria-expanded="false">
          <li>
            <a href="" id="home" aria-label="Home" class="active"> 
              <i class="fas fa-home"></i>
              <span class="desktop">Home</span>
            </a>
          </li>
          <li>
            <a href="" id="about" aria-label="About">
              <i class="fas fa-user"></i> 
              <span>About</span>
            </a>
          </li>
          <li>
            <a href="" id="projects" aria-label="Projects">
              <i class="fas fa-folder-open"></i>
              <span>Projects</span>
            </a>
          </li>
          <li>
            <a href="" id="contact" aria-label="Contact">
              <i class="fas fa-envelope"></i>
              <span>Contact</span>
            </a>
          </li>
      </ul>
  </nav>
`;var r=class extends HTMLElement{constructor(){super();this.displayEventBus=null;this.busHandlers=null;this.sections=["projects","about","contact","home"];this.toggleHamburgerMenu=()=>{if(console.log(this.components.navLinks),!this.components.navLinks)return;let t=!(this.components.navLinks.getAttribute("aria-expanded")==="true");this.components.navLinks.setAttribute("aria-expanded",String(t)),this.components?.toggleBtn?.setAttribute("aria-expanded",String(t));};this.setActiveTab=e=>{this.links.forEach(t=>{t?.classList.remove("active");}),this.components[e]?.classList.add("active"),this.state.activeTab=e;};this.toggleSections=(e,t)=>{if(this.state.activeTab==t)return;e.preventDefault();let s={elementId:t,type:`${this.state.activeTab}:hide`};this.displayEventBus?.emit(s),this.setActiveTab(t);let n={elementId:t,type:`${t}:show`};console.log(`nvbar emits  ${n.type}`),this.displayEventBus?.emit(n);};this.onToggleClick=e=>this.toggleHamburgerMenu();this.onProjectClick=e=>this.toggleSections(e,"projects");this.onAboutClick=e=>this.toggleSections(e,"about");this.onHomeClick=e=>this.toggleSections(e,"home");this.onContactClick=e=>this.toggleSections(e,"contact");this.setupBusListeners=()=>{this.displayEventBus&&this.sections.forEach(e=>{let t=n=>{this.logger.onMount({origin:`[${e}]-component`});},s=n=>{this.logger.onUnmount({origin:`[${e}]-component`});};this.displayEventBus?.on(`${e}:show`,t),this.displayEventBus?.on(`${e}:hide`,s),this.busHandlers&&(this.busHandlers[`${e}:show`]=t,this.busHandlers[`${e}:hide`]=s);});};this.disposeBusListeners=()=>{this.displayEventBus&&this.sections.forEach(e=>{this.busHandlers&&(this.displayEventBus?.off(`${e}:show`,this.busHandlers[`${e}:show`]),this.displayEventBus?.off(`${e}:hide`,this.busHandlers[`${e}:hide`]));});};this.root=this.attachShadow({mode:"open"});let e=c.content.cloneNode(true);this.root.appendChild(e),this.state={activeTab:"home"},this.components={about:null,navLinks:null,projects:null,contact:null,home:null,toggleBtn:null},this.queryElements(),this.links=[this.components.home,this.components.about,this.components.projects,this.components.contact],this.logger=a().get("Logger"),this.logger.onLoad({origin:"Navbar"});}static get observedAttributes(){return []}connectedCallback(){this.bindEvents(),this.setupBusListeners();}disconnectedCallback(){this.unBindEvents(),this.disposeBusListeners();}queryElements(){this.components.toggleBtn=this.root.querySelector(".toggle-btn"),this.components.navLinks=this.root.querySelector(".nav-links"),this.components.navLinks&&(this.components.projects=this.components.navLinks.querySelector("#projects"),this.components.about=this.components.navLinks.querySelector("#about"),this.components.contact=this.components.navLinks.querySelector("#contact"),this.components.home=this.components.navLinks.querySelector("#home"));}bindEvents(){this.components.toggleBtn?.addEventListener("click",this.onToggleClick),this.components.projects?.addEventListener("click",this.onProjectClick),this.components.about?.addEventListener("click",this.onAboutClick),this.components.home?.addEventListener("click",this.onHomeClick),this.components.contact?.addEventListener("click",this.onContactClick);}unBindEvents(){this.components.toggleBtn?.removeEventListener("click",this.onToggleClick),this.components.projects?.removeEventListener("click",this.onProjectClick),this.components.about?.removeEventListener("click",this.onAboutClick),this.components.home?.removeEventListener("click",this.onHomeClick),this.components.contact?.removeEventListener("click",this.onContactClick);}set eventBusManager(e){this.displayEventBus=e.displayBus;}};export{r as Navbar};//# sourceMappingURL=navbar.js.map
//# sourceMappingURL=navbar.js.map