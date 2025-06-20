import {a as a$1}from'./chunk-P6US56ME.js';var a=document.createElement("template");a.innerHTML=`
   <link rel="stylesheet" href="/style/navbar.css">
    <ul class="nav-links" aria-expanded="false">
        <li>
        <a href="" id="home" aria-label="Home" class="active"> 
            <img src="/assets/Icons/home.svg" alt="" width="24" height="24"/>
            <span class="desktop">Home</span>
        </a>
        </li>
        <li>
        <a href="" id="about" aria-label="About">
            <img src="/assets/Icons/about.svg" alt="" width="32" height="32"/>
            <span>About</span>
        </a>
        </li>
        <li>
        <a href="" id="projects" aria-label="Projects">
            <img src="/assets/Icons/projects.svg" alt="" width="24" height="24"/>
            <span>Projects</span>
        </a>
        </li>
        <li>
        <a href="" id="contact" aria-label="Contact">
            <img src="/assets/Icons/contact.svg" alt="" width="24" height="24"/>
            <span>Contact</span>
        </a>
        </li>
    </ul>
`;var i=class extends HTMLElement{constructor(){super();this.displayEventBus=null;this.busHandlers=null;this.sections=["projects","about","contact","home"];this.setActiveTab=t=>{this.links.forEach(e=>{e?.classList.remove("active");}),this.components[t]?.classList.add("active"),this.state.activeTab=t;};this.toggleSections=(t,e)=>{if(this.state.activeTab==e)return;t.preventDefault();let s={elementId:e,type:`${this.state.activeTab}:hide`};this.displayEventBus?.emit(s),this.setActiveTab(e);let n={elementId:e,type:`${e}:show`};console.log(`nvbar emits  ${n.type}`),this.displayEventBus?.emit(n);};this.onProjectClick=t=>this.toggleSections(t,"projects");this.onAboutClick=t=>this.toggleSections(t,"about");this.onHomeClick=t=>this.toggleSections(t,"home");this.onContactClick=t=>this.toggleSections(t,"contact");this.setupBusListeners=()=>{this.displayEventBus&&this.sections.forEach(t=>{let e=n=>{this.logger.onMount({origin:`[${t}]-component`});},s=n=>{this.logger.onUnmount({origin:`[${t}]-component`});};this.displayEventBus?.on(`${t}:show`,e),this.displayEventBus?.on(`${t}:hide`,s),this.busHandlers&&(this.busHandlers[`${t}:show`]=e,this.busHandlers[`${t}:hide`]=s);});};this.disposeBusListeners=()=>{this.displayEventBus&&this.sections.forEach(t=>{this.busHandlers&&(this.displayEventBus?.off(`${t}:show`,this.busHandlers[`${t}:show`]),this.displayEventBus?.off(`${t}:hide`,this.busHandlers[`${t}:hide`]));});};this.root=this.attachShadow({mode:"open"});let t=a.content.cloneNode(true);this.root.appendChild(t),this.state={activeTab:"home"},this.components={about:null,navLinks:null,projects:null,contact:null,home:null,toggleBtn:null},this.queryElements(),this.links=[this.components.home,this.components.about,this.components.projects,this.components.contact],this.logger=a$1().get("Logger"),this.logger.onLoad({origin:"Navbar-Pages"});}static get observedAttributes(){return []}connectedCallback(){this.bindEvents(),this.setupBusListeners();}disconnectedCallback(){this.unBindEvents(),this.disposeBusListeners();}queryElements(){this.components.navLinks=this.root.querySelector(".nav-links"),this.components.navLinks&&(this.components.projects=this.components.navLinks.querySelector("#projects"),this.components.about=this.components.navLinks.querySelector("#about"),this.components.contact=this.components.navLinks.querySelector("#contact"),this.components.home=this.components.navLinks.querySelector("#home"));}bindEvents(){this.components.projects?.addEventListener("click",this.onProjectClick),this.components.about?.addEventListener("click",this.onAboutClick),this.components.home?.addEventListener("click",this.onHomeClick),this.components.contact?.addEventListener("click",this.onContactClick);}unBindEvents(){this.components.projects?.removeEventListener("click",this.onProjectClick),this.components.about?.removeEventListener("click",this.onAboutClick),this.components.home?.removeEventListener("click",this.onHomeClick),this.components.contact?.removeEventListener("click",this.onContactClick);}set eventBusManager(t){this.displayEventBus=t.displayBus;}};export{i as a};//# sourceMappingURL=chunk-7L2A73GM.js.map
//# sourceMappingURL=chunk-7L2A73GM.js.map