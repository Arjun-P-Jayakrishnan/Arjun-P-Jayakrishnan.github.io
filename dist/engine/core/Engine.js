import {Vector3,Scene,PerspectiveCamera,WebGLRenderer,Clock,LoadingManager,PMREMGenerator,Euler,CatmullRomCurve3,AnimationMixer,DirectionalLight,AmbientLight,PCFShadowMap,Spherical,ShaderMaterial,MathUtils}from'three';import {FBXLoader}from'three/examples/jsm/loaders/FBXLoader.js';import {DRACOLoader}from'three/examples/jsm/loaders/DRACOLoader.js';import {GLTFLoader}from'three/examples/jsm/loaders/GLTFLoader.js';import {RGBELoader}from'three/examples/jsm/loaders/RGBELoader.js';import {OrbitControls}from'three/examples/jsm/controls/OrbitControls.js';function y(r,...n){return ()=>r(...n)}function I(r){let n=[];for(let e of r)Array.isArray(e)?n.push(...I(e)):n.push(e);return n}var V=document.createElement("template");V.innerHTML=`
    <link rel="stylesheet" href="/style/background.css">
    <div class="background">
       <section class="summary">
          <h2 class="summary--title">Title</h2>
          <p class="summary--description">Description</p>
       </section>

       <section class="education">
          <h2 class="education--title">\u{1F393} Education</h2>
          <article class="education--item">
            <h3 class="education--course">Course</h3>
            <h4 class="education--institute">Institute Name</h4>
            <p class="education--description">Description</p>
          </article>
       </section>

       <section class="skills">
        <h2 class="skills-title">\u{1F6E0} Skills</h2>

        <ul class="skills--list">
            <li class="skill--category">
                <h3 class="skill--category--title">Title</h3>
                <ul class="skill--tags">
                  <li class="skill--item">Skill 1</li>
                  <li class="skill--item">Skill 2</li>
                  <li class="skill--item">Skill 3</li>
                  <li class="skill--item">Skill 4</li>
                  <li class="skill--item">Skill 5</li>
                  <li class="skill--item">Skill 6</li>

                </ul>
            </li>
        </ul>
       </section>
    </div>
`;var x=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let n=V.content.cloneNode(true);this.root.appendChild(n),this.components={summary:{root:this.root.querySelector(".summary"),title:this.root.querySelector(".summary--title"),description:this.root.querySelector(".summary--description")},education:{course:this.root.querySelector(".education--course"),institution:this.root.querySelector(".education--institute"),description:this.root.querySelector(".education--description")},skillsRoot:this.root.querySelector(".skills--list")};}connectedCallback(){}disconnectedCallback(){}set Summary(n){console.log("update summary");let e=this.components.summary;e.title&&(e.title.textContent=n.title,e.description&&(e.description.textContent=n.description));}set Education(n){console.log("update education");let e=this.components.education;e.course&&(e.course.textContent=n.course,e.institution&&(e.institution.textContent=n.institute,e.description&&(e.description.textContent=n.description)));}addSkill(n){console.log("update skills");let e=document.createElement("li");e.classList.add("skill--category");let t=document.createElement("h3");t.classList.add("skill--category--title"),t.textContent=n.title,e.appendChild(t);let o=document.createElement("ul");return o.classList.add("skill--tags"),e.appendChild(o),n.tags.forEach(a=>{let i=document.createElement("li");i.classList.add("skill--item"),i.textContent=a,o.appendChild(i);}),e}set Skills(n){let e=document.createDocumentFragment();n.forEach(t=>{let o=this.addSkill(t);e.appendChild(o);}),this.components.skillsRoot.innerHTML="",this.components.skillsRoot.appendChild(e);}};var $=document.createElement("template");$.innerHTML=`
    <link rel="stylesheet" href="/style/experience.css">
    <div class="experience">
        <ul class="job-list">
          <li class="job-item">
            <div class="job-header">
              <h3 class="job-title">Title</h2>
              <h5 class="job-duration">Duration</h2>
            </div>
            <div class="job-details">
              <ul class="job-responsibilities">
                <li class="job-responsibility-item">Done task which improved some item</li>
              </ul>
            </div>
          </li>
        </ul>
    </div>
`;var T=class extends HTMLElement{constructor(){super();this.events={};this.root=this.attachShadow({mode:"open"});let e=$.content.cloneNode(true);this.root.appendChild(e),this.components={root:this.root.querySelector(".experience"),jobList:this.root.querySelector(".job-list")};}connectedCallback(){}disconnectedCallback(){}addEvent(e,t,o){let a=i=>{o.classList.toggle("hidden"),console.log("button is clicked ",t);};this.events[`button :${t}`]={button:e,callback:a},e.addEventListener("click",a),console.log("attaching event",t);}addJobExperience(e){let t=document.createElement("li");t.classList.add("job-item");let o=document.createElement("div");o.classList.add("job-header");let a=document.createElement("h3");a.classList.add("job-title"),a.textContent=e.title;let i=document.createElement("h5");i.classList.add("job-duration"),i.textContent=e.duration,o.appendChild(a),o.appendChild(i);let c=document.createElement("div");c.classList.add("job-details"),c.classList.add("hidden");let s=document.createElement("ul");s.classList.add("job-responsibilities");let m=document.createDocumentFragment();return e.responsibilities.forEach(d=>{let l=document.createElement("li");l.classList.add("job-responsibility-item"),l.textContent=d,m.appendChild(l);}),s.appendChild(m),c.appendChild(s),t.appendChild(o),t.appendChild(c),t}removeEvents(){console.log("remove all"),Object.entries(this.events).forEach(e=>{e[1].button.removeEventListener("click",e[1].callback);});}inflateCarousel(e){this.components.jobList&&(this.removeEvents(),this.components.jobList.innerHTML="",e.forEach((t,o)=>{this.components.jobList?.appendChild(this.addJobExperience({...t,index:o}));}));}set Experience(e){console.log("experience",e),this.inflateCarousel(e);}};var K=document.createElement("template");K.innerHTML=`
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
`;var k=class extends HTMLElement{constructor(){super();this.displayBus=null;this.webClick=e=>this.openPage(0);this.mobileClick=e=>this.openPage(1);this.languagesClick=e=>this.openPage(2);this.cliClick=e=>this.openPage(3);this.bindEvents=()=>{this.navigation.web&&this.navigation.web.addEventListener("click",this.webClick),this.navigation.mobile&&this.navigation.mobile.addEventListener("click",this.mobileClick),this.navigation.language&&this.navigation.language.addEventListener("click",this.languagesClick),this.navigation.cli&&this.navigation.cli.addEventListener("click",this.cliClick);};this.unbindEvents=()=>{this.navigation.web&&this.navigation.web.removeEventListener("click",this.webClick),this.navigation.mobile&&this.navigation.mobile.removeEventListener("click",this.mobileClick),this.navigation.language&&this.navigation.language.removeEventListener("click",this.languagesClick),this.navigation.cli&&this.navigation.cli.removeEventListener("click",this.cliClick);};this.root=this.attachShadow({mode:"open"});let e=K.content.cloneNode(true);this.root.appendChild(e),this.components={framework:this.root.querySelector(".frameworks"),web:this.root.querySelector(".web__content"),mobile:this.root.querySelector(".mobile__content"),languages:this.root.querySelector(".languages__content"),cli:this.root.querySelector(".cli__content")},this.navigation={web:this.root.querySelector(".nav--web"),mobile:this.root.querySelector(".nav--mobile"),language:this.root.querySelector(".nav--languages"),cli:this.root.querySelector(".nav--cli")};}connectedCallback(){this.bindEvents();}disconnectedCallback(){this.unbindEvents();}openPage(e){let t=this.root.querySelector(".web"),o=this.root.querySelector(".mobile"),a=this.root.querySelector(".languages"),i=this.root.querySelector(".cli");t?.classList.toggle("active",false),o?.classList.toggle("active",false),a?.classList.toggle("active",false),i?.classList.toggle("active",false),e===0?t?.classList.toggle("active",true):e==1?o?.classList.toggle("active",true):e==2?a?.classList.toggle("active",true):e==3&&i?.classList.toggle("active",true);}addIcon(e,t,o){let a=document.createElement("li"),i=document.createElement("img");return i.setAttribute("src",o),i.setAttribute("alt",e),i.classList.add("framework_logo"),a.appendChild(i),a}inflate(e,t){switch(t){case "web":let o=document.createDocumentFragment();e.forEach(s=>{o.appendChild(this.addIcon(s.name,[],s.link));}),this.components.web?.appendChild(o);break;case "mobile":let a=document.createDocumentFragment();e.forEach(s=>{a.appendChild(this.addIcon(s.name,[],s.link));}),this.components.mobile?.appendChild(a);break;case "languages":let i=document.createDocumentFragment();e.forEach(s=>{i.appendChild(this.addIcon(s.name,[],s.link));}),this.components.languages?.appendChild(i);break;case "command-line":let c=document.createDocumentFragment();e.forEach(s=>{c.appendChild(this.addIcon(s.name,[],s.link));}),this.components.cli?.appendChild(c);break;default:console.warn("The types doesnt match for frameworks");}}set FrameworkData(e){this.inflate(e.web,"web"),this.inflate(e.mobile,"mobile"),this.inflate(e.languages,"languages"),this.inflate(e.cli,"command-line");}};var W=document.createElement("template");W.innerHTML=`
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
`;var P=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let n=W.content.cloneNode(true);this.root.appendChild(n);}connectedCallback(){}disconnectedCallback(){}};var z=document.createElement("template");z.innerHTML=`
    <link rel="stylesheet" href="/style/about.css">
    <style>
    .hidden {
      opacity: 0;
      pointer-events: none;
      transform: translateY(-50%) scale(0.95);
      transition: all 0.3s ease;
    }
    </style>
    <div class="about hidden">
        <div class="tab">
          <h3 class="tab--name">Background</h3>  
        </div>
        <div class="carousel">
          <div class="carousel-container">
            <ul class="carousel-track">
                <li class="slide" data-active><slot name="background">Background</slot></li>
                <li class="slide"><slot name="experience">Experience</slot></li>
                <li class="slide"><slot name="resume">Resume</slot></li>
                <li class="slide"><slot name="frameworks">Frameworks</slot></li>
            </ul>
          </div>
          <button class="carousel__button prev">&#8678;</button>
          <button class="carousel__button next">&#8680;</button>
          <div class="carousel_nav">
                <button class="carousel_indicator" data-active-button></button>
                <button class="carousel_indicator"></button>
                <button class="carousel_indicator"></button>
                <button class="carousel_indicator"></button>
          </div>
        </div>
    </div>
`;var Fe=["\u{1F468}\u200D\u{1F393} Background","\u{1F468}\u200D\u{1F4BB} Experience","\u{1F4C4} Resume","\u{1F5A5}\uFE0F Frameworks"],D=class extends HTMLElement{constructor(){super();this.state={currentIndex:0};this.displayBus=null;this.carouselItem=null;this.prevClick=e=>this.swapSlides(-1);this.nextClick=e=>this.swapSlides(1);this.navButtonClicks=[];this.defineElements=()=>{customElements.get("background-page")||customElements.define("background-page",x),customElements.get("experience-page")||customElements.define("experience-page",T),customElements.get("resume-page")||customElements.define("resume-page",P),customElements.get("frameworks-page")||customElements.define("frameworks-page",k);};this.querySlottedElements=()=>{let e=this.findElement("background",x),t=this.findElement("experience",T),o=this.findElement("resume",P),a=this.findElement("frameworks",k);this.carouselItem={background:e,experience:t,resume:o,frameworks:a};};this.onShow=()=>{this.components.about?.classList.toggle("hidden",false);};this.onHide=()=>{this.components.about?.classList.toggle("hidden",true);};this.bindEvents=()=>{this.components.prev?.addEventListener("click",this.prevClick),this.components.next?.addEventListener("click",this.nextClick),this.components.navButtons.forEach((e,t)=>{e.addEventListener("click",this.navButtonClicks[t]);});};this.unbindEvents=()=>{this.components.prev?.removeEventListener("click",this.prevClick),this.components.next?.removeEventListener("click",this.nextClick),this.components.navButtons.forEach((e,t)=>{e.removeEventListener("click",this.navButtonClicks[t]);});};this.root=this.attachShadow({mode:"open"});let e=z.content.cloneNode(true);this.root.appendChild(e);let t=Array.from(this.root.querySelector(".carousel_nav")?.children??[]);this.components={about:this.root.querySelector(".about"),tabName:this.root.querySelector(".tab--name"),carousel:this.root.querySelector(".carousel"),next:this.root.querySelector(".next"),prev:this.root.querySelector(".prev"),track:this.root.querySelector(".carousel-track"),navButtons:t},this.components.navButtons.forEach((o,a)=>{this.navButtonClicks.push(i=>this.swapSlides(a-this.state.currentIndex));}),this.defineElements(),this.querySlottedElements(),this.components.about?.classList.toggle("hidden");}findElement(e,t){let o=`slot[name="${e}"]`;return (this.root.querySelector(o).assignedElements?.()||[]).find(s=>s instanceof t)}set eventBusManager(e){this.displayBus=e.displayBus,this.displayBus.on("about:show",this.onShow),this.displayBus.on("about:hide",this.onHide);}set updateData(e){e.isError?this.root.innerHTML=`
        <p>${e.message}</p>
      `:this.inflateCarousel(e.records);}connectedCallback(){this.bindEvents();}disconnectedCallback(){this.unbindEvents(),this.displayBus?.off("about:show",this.onShow),this.displayBus?.off("about:hide",this.onHide);}swapSlides(e){if(!this.components.track)return;let t=this.state.currentIndex,o=this.components.track.children.length;this.state.currentIndex+=e,this.state.currentIndex<0&&(this.state.currentIndex=o-1),this.state.currentIndex>=o&&(this.state.currentIndex=0);let a=this.components.track.children[t];this.components.tabName&&(this.components.tabName.textContent=Fe[this.state.currentIndex]),this.components.track.children[this.state.currentIndex].dataset.active="true",delete a.dataset.active,this.components.navButtons[this.state.currentIndex].dataset.activeButton="true",delete this.components.navButtons[t].dataset.activeButton;}setBackground(e){if(!this.carouselItem?.background)return;this.carouselItem.background.Summary={title:e.summary.title??"Title-Placeholder",description:e.summary.description??"Description"};let t=e.education;this.carouselItem.background.Education={course:t.course,institute:t.institute,description:t.description};let o=e.skills;this.carouselItem.background.Skills=o.map(a=>({title:a.title,tags:a.tags}));}setExperience(e){this.carouselItem?.experience&&(this.carouselItem.experience.Experience=e.map(t=>({title:t.title,duration:t.duration,responsibilities:t.responsibilities})));}setResume(e){this.carouselItem?.resume;}setFrameworks(e){this.carouselItem?.frameworks&&(this.carouselItem.frameworks.FrameworkData=e);}inflateCarousel(e){this.setBackground(e.personal.data),this.setExperience(e.experience.data),this.setResume(e.resume.data),this.setFrameworks(e.frameworks.data);}};var J=document.createElement("template");J.innerHTML=`
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
`;var Ue=["title","image","description","tags","linkUrl"],B=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let n=J.content.cloneNode(true);this.root.appendChild(n),this.components={logo:this.root.querySelector("img"),title:this.root.querySelector("h3"),description:this.root.querySelector("p"),tagRoot:this.root.querySelector(".tags"),link:this.root.querySelector(".github-link")};}static get observedAttributes(){return Ue}attributeChangedCallback(n,e,t){e!==t&&this.render(n);}setData(n){this.setAttribute("title",n.title),this.setAttribute("image",n.imageUrl),this.setAttribute("description",n.description),this.setAttribute("tags",n.tags??""),this.setAttribute("linkUrl",n.linkUrl);}render(n){switch(n){case "title":let e=this.getAttribute("title")||"";this.components.title&&(this.components.title.textContent=e);break;case "description":let t=this.getAttribute("description")||"";this.components.description&&(this.components.description.textContent=t);break;case "image":let o=this.getAttribute("image")||"",a=this.getAttribute("title")||"";this.components.logo&&(this.components.logo.setAttribute("src",o),this.components.logo.setAttribute("alt",a));break;case "tags":let i=(this.getAttribute("tags")||"").split(",");if(this.components.tagRoot){let s=i.map(m=>{let d=document.createElement("span");return d.textContent=m,d});this.components.tagRoot.replaceChildren(...s);}break;case "linkUrl":let c=this.getAttribute("linkUrl")||"";this.components.link&&this.components.link.setAttribute("href",c);break}}connectedCallback(){}disconnectedCallback(){}};var X=document.createElement("template");X.innerHTML=`
    <link rel="stylesheet" href="/style/gallery.css">
    <style>
      .hidden {
        transform: translateX(-50%) scale(0.95);
        opacity: 0;
        pointer-events: none;
      }
    </style>
    <div class="gallery hidden" id="gallery">
    </div>
`;var O=class extends HTMLElement{constructor(){super();this.onShow=e=>this.showComponent(e);this.onHide=e=>this.hideComponent(e);this.root=this.attachShadow({mode:"open"});let e=X.content.cloneNode(true);this.root.appendChild(e),this.gallery=this.root.getElementById("gallery");}set eventBusManager(e){this.viewEventBus=e.viewBus,console.log("event bus attached to project gallery");}showComponent(e){console.log("gallery shown "),this.gallery?.classList.remove("hidden");}hideComponent(e){console.log("gallery hidden"),this.gallery?.classList.add("hidden");}inflateData(e){if(!this.gallery)return;let t=document.createDocumentFragment();e.forEach(o=>{let a=document.createElement("project-card");a.setData(o),t.appendChild(a);}),this.gallery.appendChild(t),this.viewEventBus&&(this.viewEventBus.on("project-screen:show",this.onShow),this.viewEventBus.on("project-screen:hide",this.onHide));}set updateData(e){e.isError?this.root.innerHTML=`
          <p>${e.message}</p>
        `:this.inflateData(e.list);}connectedCallback(){}disconnectedCallback(){this.viewEventBus&&(this.viewEventBus.off("project-screen:show",this.onShow),this.viewEventBus.off("project-screen:hide",this.onHide));}};var qe=()=>{let r=new Map;return {register:(o,a)=>{if(r.has(o))throw new Error(`Error : Redefining the service [${o}]`);r.set(o,a);},get:o=>{let a=r.get(o);if(!a)throw new Error(`Error : Trying to obtain value of an unregistered service ${o}`);return a},has:o=>r.has(o)}},G,M=()=>(G||(G=qe()),G);var Y=document.createElement("template");Y.innerHTML=`
    <link rel="stylesheet" href="/style/loading_modal.css"/>
   
    <div class="overlay hidden" id="overlay">
      <div class="loading-logo"></div>
      <div id="loading-text">Loading...</div>
    </div>
`;var H=class extends HTMLElement{constructor(){super();this.handleLoading=()=>{};this.root=this.attachShadow({mode:"open"});let e=Y.content.cloneNode(true);this.root.appendChild(e),this.progress=0,this.tags={overlay:this.root.getElementById("overlay")},this.logger=M().get("Logger"),this.logger.onLoad({origin:"Loading Modal"});}set eventBusManager(e){this.loadingEventBus=e.loadingBus,this.handleLoading();}connectedCallback(){}disconnectedCallback(){}};var Z=document.createElement("template");Z.innerHTML=`
  <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
  <link rel="stylesheet" href="/style/navbar.css">
  <nav class="navbar" id="main-nav">
      <div class="logo"><img src="/assets/images/logo.png"/></div>
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
`;var N=class extends HTMLElement{constructor(){super();this.displayEventBus=null;this.busHandlers=null;this.sections=["projects","about","contact","home"];this.toggleHamburgerMenu=()=>{if(console.log(this.components.navLinks),!this.components.navLinks)return;let t=!(this.components.navLinks.getAttribute("aria-expanded")==="true");this.components.navLinks.setAttribute("aria-expanded",String(t)),this.components?.toggleBtn?.setAttribute("aria-expanded",String(t));};this.setActiveTab=e=>{this.links.forEach(t=>{t?.classList.remove("active");}),this.components[e]?.classList.add("active"),this.state.activeTab=e;};this.toggleSections=(e,t)=>{if(this.state.activeTab==t)return;e.preventDefault();let o={elementId:t,type:`${this.state.activeTab}:hide`};this.displayEventBus?.emit(o),this.setActiveTab(t);let a={elementId:t,type:`${t}:show`};console.log(`nvbar emits  ${a.type}`),this.displayEventBus?.emit(a);};this.onToggleClick=e=>this.toggleHamburgerMenu();this.onProjectClick=e=>this.toggleSections(e,"projects");this.onAboutClick=e=>this.toggleSections(e,"about");this.onHomeClick=e=>this.toggleSections(e,"home");this.onContactClick=e=>this.toggleSections(e,"contact");this.setupBusListeners=()=>{this.displayEventBus&&this.sections.forEach(e=>{let t=a=>{this.logger.onMount({origin:`[${e}]-component`});},o=a=>{this.logger.onUnmount({origin:`[${e}]-component`});};this.displayEventBus?.on(`${e}:show`,t),this.displayEventBus?.on(`${e}:hide`,o),this.busHandlers&&(this.busHandlers[`${e}:show`]=t,this.busHandlers[`${e}:hide`]=o);});};this.disposeBusListeners=()=>{this.displayEventBus&&this.sections.forEach(e=>{this.busHandlers&&(this.displayEventBus?.off(`${e}:show`,this.busHandlers[`${e}:show`]),this.displayEventBus?.off(`${e}:hide`,this.busHandlers[`${e}:hide`]));});};this.root=this.attachShadow({mode:"open"});let e=Z.content.cloneNode(true);this.root.appendChild(e),this.state={activeTab:"home"},this.components={about:null,navLinks:null,projects:null,contact:null,home:null,toggleBtn:null},this.queryElements(),this.links=[this.components.home,this.components.about,this.components.projects,this.components.contact],this.logger=M().get("Logger"),this.logger.onLoad({origin:"Navbar"});}static get observedAttributes(){return []}connectedCallback(){this.bindEvents(),this.setupBusListeners();}disconnectedCallback(){this.unBindEvents(),this.disposeBusListeners();}queryElements(){this.components.toggleBtn=this.root.querySelector(".toggle-btn"),this.components.navLinks=this.root.querySelector(".nav-links"),this.components.navLinks&&(this.components.projects=this.components.navLinks.querySelector("#projects"),this.components.about=this.components.navLinks.querySelector("#about"),this.components.contact=this.components.navLinks.querySelector("#contact"),this.components.home=this.components.navLinks.querySelector("#home"));}bindEvents(){this.components.toggleBtn?.addEventListener("click",this.onToggleClick),this.components.projects?.addEventListener("click",this.onProjectClick),this.components.about?.addEventListener("click",this.onAboutClick),this.components.home?.addEventListener("click",this.onHomeClick),this.components.contact?.addEventListener("click",this.onContactClick);}unBindEvents(){this.components.toggleBtn?.removeEventListener("click",this.onToggleClick),this.components.projects?.removeEventListener("click",this.onProjectClick),this.components.about?.removeEventListener("click",this.onAboutClick),this.components.home?.removeEventListener("click",this.onHomeClick),this.components.contact?.removeEventListener("click",this.onContactClick);}set eventBusManager(e){this.displayEventBus=e.displayBus;}};var Q=document.createElement("template");Q.innerHTML=`
    <link rel="stylesheet" href="/style/scene_inspector.css">
    <div class="inspector-wrapper">

      <div class="resizer"></div>
    
      <div class="scene-inspector hidden">
        <div class="inspector-header">
          <span class="title">Scene Inspector</span>
          <button class="close-btn"> \u2715 </button>
        </div>

        <div class="inspector-content">
          <ul class="tree-view">

          </ul>
        </div>
      </div>

      
    </div>
`;var _=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let n=Q.content.cloneNode(true);this.root.appendChild(n),this.state={isMenuHidden:true,isResizing:false},this.element=this.root.querySelector(".scene-inspector"),this.treeView={Objects:[],Materials:[]},this.handleResize();}set eventBusManager(n){this.eventBus=n.debugBus,this.eventBus?.on("debug:inspector",e=>{this.handleShowHideEvent(e);});}handleShowHideEvent(n){this.state.isMenuHidden=!this.state.isMenuHidden,this.state.isMenuHidden?this.element.classList.add("hidden"):(this.element.classList.remove("hidden"),n.scene!=null&&n.scene!==void 0&&this.renderTree(n.scene));}handleResize(){let n=this.root.querySelector(".resizer"),e=this.root.querySelector(".scene-inspector");n.addEventListener("mousedown",t=>{this.state.isResizing=true,document.body.style.cursor="ew-resize",t.preventDefault();}),window.addEventListener("mousemove",t=>{if(!this.state.isResizing)return;let o=window.innerWidth-t.clientX;e.style.width=`${Math.min(Math.max(o,200),600)}px`;}),window.addEventListener("mouseup",t=>{this.state.isResizing&&(this.state.isResizing=false,document.body.style.cursor="");});}toggleCloseButton(){this.state.isMenuHidden=true,this.element.classList.add("hidden");}collectSceneData(n){let e=[],t=new Map,o=a=>{let i={id:a.uuid,label:a.name==""?a.type:a.name,type:a.type,nodes:[]};return a.children.forEach(c=>{i.nodes.push(o(c));}),"material"in a&&a.material&&(Array.isArray(a.material)?a.material:[a.material]).forEach(s=>{t.has(s.uuid)||t.set(s.uuid,{id:s.uuid,label:s.name==""?s.type:s.name,type:"material",nodes:[]});}),i};return n.children.forEach(a=>{e.push(o(a));}),{Objects:e,Materials:Array.from(t.values())}}renderTree(n){this.treeView=this.collectSceneData(n);let e=this.root.querySelector(".tree-view");e.innerHTML="",this.addCategory("Objects",e,this.treeView.Objects),this.addCategory("Materials",e,this.treeView.Materials);}addCategory(n,e,t){let o=document.createElement("li");o.classList.add("category","collapsed");let a=document.createElement("div");a.classList.add("category-toggle"),a.textContent=`\u2B9E ${n}`,a.addEventListener("click",c=>{o.classList.toggle("collapsed");let s=o.classList.contains("collapsed");a.textContent=s?`\u2B9E ${n}`:`\u25BC ${n}`;});let i=document.createElement("ul");i.classList.add("category-content"),t.forEach(c=>{i.appendChild(this.renderTreeNode(c));}),o.appendChild(a),o.appendChild(i),e.appendChild(o);}renderTreeNode(n){let e=document.createElement("li");e.classList.add("tree-node");let t=document.createElement("div");if(t.classList.add("node-label"),t.textContent=`${n.label} (${n.type})`,e.appendChild(t),n.nodes.length>0){e.classList.add("collapsed");let o=document.createElement("ul");n.nodes.forEach(a=>{o.appendChild(this.renderTreeNode(a));}),t.addEventListener("click",()=>{e.classList.toggle("collapsed");}),e.appendChild(o);}return e}connectedCallback(){this.root.querySelector(".close-btn").addEventListener("click",()=>{this.toggleCloseButton();});}disconnectedCallback(){}};var Ve=async r=>await(await fetch(r)).json(),$e=async()=>{let r=document.querySelector("about-page");try{let n=await Ve("/public/data/about.json");r.updateData={isError:!1,records:n};}catch(n){r.updateData={isError:true,message:`Error getting data ${n}`},console.error(`Error getting data ${n}`);}},Ke=async()=>{let r=document.querySelector("project-gallery");try{let e=await(await fetch("/public/data/projects.json")).json();r.updateData={isError:!1,list:e.projects};}catch(n){r.updateData={isError:true,message:`Error getting data ${n}`},console.error(`Error getting data ${n}`);}},ee=()=>{let r={navbarDefined:false,loadingModalDefined:false,sceneInspectorDefined:false,projectGalleryDefined:false,aboutPageDefined:false},n=M(),[e,t,o]=[n.get("LifecycleScheduler"),n.get("Logger"),n.get("EventBusManager")];return {onInit:()=>{r.navbarDefined||(customElements.define("nav-bar",N),r.navbarDefined=true),r.loadingModalDefined||(customElements.define("loading-modal",H),r.loadingModalDefined=true),r.sceneInspectorDefined||(customElements.define("scene-inspector",_),r.sceneInspectorDefined=true),o.displayBus.once("projects:show",()=>{r.projectGalleryDefined||(t.onMount({origin:"Projects-Page"}),o.loadingBus.emit({type:"load:start",loaded:0,total:0,url:""}),customElements.define("project-gallery",O),customElements.define("project-card",B),e.schedule(y(()=>{try{let l=document.querySelector("project-gallery");l.eventBusManager=o;}catch(l){console.error(l);}})),e.schedule(y(async()=>{try{console.log("loading data"),await Ke(),o.loadingBus.emit({type:"load:complete"});}catch(l){console.log(`Error while loading projects data ${l}`);}})),r.projectGalleryDefined=true);}),o.displayBus.once("about:show",()=>{r.aboutPageDefined||(t.onMount({origin:"About-Page"}),o.loadingBus.emit({type:"load:start",loaded:0,total:0,url:""}),customElements.define("about-page",D),e.schedule(y(async()=>{await $e(),o.loadingBus.emit({type:"load:complete"});})),e.schedule(y(()=>{try{let l=document.querySelector("about-page");l.eventBusManager=o;}catch(l){console.error(l);}})),r.aboutPageDefined=true);});},onLoad:()=>{t.onLoad({origin:"DOMManager"});try{let l=document.querySelector("loading-modal");l.eventBusManager=o;}catch(l){console.error(`Missing loading modal element :${l}`);}try{let l=document.querySelector("nav-bar");l.eventBusManager=o;}catch(l){console.error(`Missing navbar element : ${l}`);}try{let l=document.querySelector("scene-inspector");l.eventBusManager=o;}catch(l){console.error(l);}},onMount:()=>{t.onMount({origin:"DOMManager"});},onUpdate:()=>{t.onUpdate(0,{origin:"DOMManager"});},onUnmount:()=>{["loading-modal","nav-bar","scene-inspector"].forEach(u=>{let f=document.querySelector(u);f?.parentElement?f.parentElement.removeChild(f):console.warn(`Could not unmount ${u} either already removed or not found`);}),t.onUnmount({origin:"DOMManger"});},onDestroy:()=>{t.onDestroy({origin:"DOMManager"});}}};var te={fov:75,aspectRatio:window.innerWidth/window.innerHeight,near:.1,far:1e3},oe="game-engine";var R={PATH_TO_MODELS:"/assets/Models/",PATH_TO_HDR:"/assets/HDR/"},ne={id:"player",path:R.PATH_TO_MODELS+"player.glb",type:"glb"},re={meshes:[{id:"navigation",path:R.PATH_TO_MODELS+"room.glb",type:"glb"}],hdr:{id:"environment_hdr",path:R.PATH_TO_HDR+"environment.hdr",type:"hdr"}},ae={meshes:[{id:"about",path:R.PATH_TO_MODELS+"about.glb",type:"glb"}]},ie={meshes:[{id:"projects",path:R.PATH_TO_MODELS+"projects.glb",type:"glb"}]};var se={player:{id:"RootNode",storageId:"player"},ground:{id:"ground",storageId:"navigation"}},le={player:{id:"RootNode",storageId:"player"},ground:{id:"ground",storageId:"about"}},ce={player:{id:"RootNode",storageId:"player"},ground:{id:"ground",storageId:"projects"}};var de=({loadingManager:r,scene:n,storageManager:e})=>{let t=new FBXLoader(r),o=async i=>{try{let c=await t.loadAsync(i.path);e.getStorage("model").store(i.id,{animations:c.animations,groups:c}),n.add(c);}catch(c){throw new Error(`Error while loading fbx file : ${c}`)}};return {load:async i=>{let c=[];i.forEach(s=>{c.push(o(s));}),await Promise.allSettled(c);}}};var ue=({scene:r,loadingManager:n,storageManager:e})=>{let t=new GLTFLoader(n),o=new DRACOLoader;o.setDecoderPath("/public/draco/"),t.setDRACOLoader(o);let a=async c=>{try{let s=await t.loadAsync(c.path);e.getStorage("model").store(c.id,{animations:s.animations,groups:s.scene}),r.add(s.scene);}catch(s){throw new Error(`Errr occuerd while loading a glb file : ${s}`)}};return {load:async c=>{let s=[];c.forEach(m=>{s.push(a(m));}),await Promise.allSettled(s);}}};var me=({loadingManager:r,renderer:n,scene:e})=>{let t=new PMREMGenerator(n),o=new RGBELoader(r),a=async s=>new Promise((m,d)=>{console.log("path",s.path),o.load(s.path,(l,u)=>{let f=t.fromEquirectangular(l).texture;l.dispose(),e.environment=f,d();},void 0,l=>{m();});}),i=async s=>{let m=[];s.forEach(async d=>{m.push(a(d));}),await Promise.allSettled(m);};return {load:i}};var pe=({scene:r,renderer:n,loaderEventBus:e,stateManager:t,storageManager:o})=>{let a=new LoadingManager,i=false,[c,s,m]=[ue({scene:r,loadingManager:a,storageManager:o}),de({scene:r,loadingManager:a,storageManager:o}),me({scene:r,loadingManager:a,renderer:n})],d={glb:[],fbx:[],hdr:[]},l=()=>{a.onStart=(b,h,v)=>{e.emit({type:"load:start",url:b,loaded:h,total:v}),t.loading.setState({loading:{active:true,progress:0}});},a.onProgress=(b,h,v)=>{e.emit({type:"load:progress",url:b,loaded:h,total:v}),t.loading.setState({loading:{active:true,progress:h/v}});},a.onLoad=()=>{e.emit({type:"load:complete"});},a.onError=b=>{e.emit({type:"load:error",url:b});},i=true;},u=b=>{switch(b.type){case "glb":d.glb.push(b);break;case "fbx":d.fbx.push(b);break;case "hdr":d.hdr.push(b);break;}},f=b=>{b.forEach(h=>{u(h);});};return {configure:()=>{l();},load:async b=>{if(!i)throw new Error("Error: Trying to load from loader before configuring it");let h=[];return f(b),h.push(c.load(d.glb)),h.push(s.load(d.fbx)),h.push(m.load(d.hdr)),await Promise.allSettled(h),d.fbx=[],d.glb=[],d.hdr=[],{success:[],error:[]}},dispose:()=>{}}};var ge=r=>{let{camera:n}=r,t=new Vector3(0,1,2);return {mount:()=>{},activate:()=>{n.position.set(t.x,1,t.z),n.rotation.set(0,0,0,"XYZ");},deactivate:()=>{},unmount:()=>{}}};var he=({logger:r,reference:n,storage:e})=>{let t=null;return {mount:()=>{if(t=e.getStorage("model").retrieve(n.storageId)?.groups.getObjectByName(n.id),!t){console.error(`Cant get ground mesh from the id : ${n.id}`);return}t.material=t.material.clone(),t.receiveShadow=true,t.material.needsUpdate=true,t.material.opacity=.15,t.material.transparent=true,r.onMount({origin:"about-ground"});},actiavte:()=>{},deactivate:()=>{},unmount:()=>{}}};var ve=({renderer:r,scene:n})=>{let e,t;return {mount:()=>{e=new DirectionalLight(16777215,5),e.castShadow=true,e.position.set(0,2,0),e.target.position.set(0,1,0),e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.camera.near=.1,e.shadow.camera.far=50,e.shadow.camera.left=-10,e.shadow.camera.right=10,e.shadow.camera.top=10,e.shadow.camera.bottom=-10,t=new AmbientLight(16777215),r.shadowMap.enabled=true,r.shadowMap.type=PCFShadowMap;},activate:()=>{e&&n.add(e),t&&n.add(t);},deactivate:()=>{e&&n.remove(e),t&&n.remove(t);},unmount:()=>{}}};var fe=({logger:r,reference:n,scene:e,storage:t})=>{let o,a,i=l=>{l.traverse(u=>{u.castShadow=true;});};return {mount:()=>{try{r.onMount({origin:"about-room-player"});let l=e.getObjectByName(n.id);if(!l)throw new Error(`player doesn't exist for the id ${n.id}`);o={playerRoot:l},a={mixer:new AnimationMixer(l)};}catch(l){console.error(`Player mesh cant be obtained :${l}`);}},activate:()=>{o.playerRoot&&(o.playerRoot.rotation.set(0,-Math.PI/4,0,"XYZ"),o.playerRoot.castShadow=true,i(o.playerRoot),o.playerRoot.position.set(1.5,0,0));},deactiavte:()=>{},unmount:()=>{o.playerRoot&&o.playerRoot.position.set(1.5,0,0);}}};var be=({ground:r,player:n})=>{let e=M(),[t,o,a]=[e.get("GlobalStorageManager"),e.get("Logger"),e.get("ThreeJSContextManager")],{scene:i,camera:c,orbit:s,renderer:m}={scene:a.get("scene"),camera:a.get("camera"),orbit:a.get("orbit"),renderer:a.get("renderer")},d={camera:ge({camera:c}),player:fe({logger:o,reference:n,scene:i,storage:t}),ground:he({logger:o,reference:r,storage:t}),lighting:ve({renderer:m,scene:i})},l=null;return {mount:()=>{o.onMount({origin:"about-room"}),d.ground.mount(),d.player.mount(),d.lighting.mount(),l=t.getStorage("model").retrieve(r.storageId)?.groups??null;},setActive:()=>{l&&(l.visible=true),s.enabled=false,d.camera.activate(),d.lighting.activate(),d.player.activate();},update:b=>{},setDeactive:()=>{l&&(l.visible=false),d.lighting.deactivate();},unmount:()=>{d.player.unmount();},isLoaded:false}};var C={DISTANCE:3,HEIGHT_OFFSET:2,PITCH_MIN:0,PITH_MAX:Math.PI/2,SMOOTHING:.1},Me=new Vector3(0,0,0),w=new Vector3(0,0,0),F=new Vector3(0,0,0);function at(r,n){return {yaw:MathUtils.euclideanModulo(r,Math.PI*2),pitch:MathUtils.clamp(n,C.PITCH_MIN,C.PITH_MAX)}}function it(r){return w.set(0,0,0),w.setFromSpherical(r),w.y+=C.HEIGHT_OFFSET,w}function st(r,n,e){return r.lerp(n,e)}var Ee=({camera:r})=>{let e={mode:"thirdPerson",rotation:{pitch:Math.PI/2,yaw:0},spherical:new Spherical(C.DISTANCE,Math.PI/2,0)},t=u=>{e.mode=u;},o=()=>{},a=()=>{r.position.set(1,2,3);},i=u=>{e.rotation.yaw+=u.yaw,e.rotation.pitch+=u.pitch;let f=at(e.rotation.yaw,e.rotation.pitch);e.rotation.yaw=f.yaw,e.rotation.pitch=f.pitch;},c=u=>{e.spherical.theta=e.rotation.yaw,e.spherical.phi=e.rotation.pitch,w.copy(it(e.spherical)),Me.copy(u.playerPosition).add(w),r.position.copy(st(r.position,Me,C.SMOOTHING)),F.copy(u.playerPosition),F.y+=C.HEIGHT_OFFSET,r.lookAt(F);},s=u=>{r.position.copy(u),r.rotation.set(e.rotation.pitch,e.rotation.yaw,0);};return {setMode:t,update:u=>(i(u.rotationDelta),e.mode==="thirdPerson"?c(u):s(u.playerPosition),{rotation:r.rotation}),mount:o,activate:a,deactivate:()=>{},unmount:()=>{}}};var Se=`
    precision highp float;

    varying vec2 vUV;

    float line(vec2 uv,float lineWidth){

       
        float lineAA=fwidth(uv.x);
 
        float lineUV=1.0-abs(fract(uv.x)*2.0-1.0);

        return smoothstep(lineWidth+lineAA,lineWidth-lineAA,lineUV);
    }  

    float grid(vec2 uv,float lineWidth){

        vec2 uvDeriv=fwidth(uv);
        vec2 drawWidth=max(vec2(lineWidth),uvDeriv);
        vec2 lineAA=uvDeriv*1.5;
 
        vec2 gridUV=1.0-abs(fract(uv)*2.0-1.0);

        vec2 gridLines=smoothstep(drawWidth+lineAA,drawWidth-lineAA,gridUV);
        gridLines*=clamp(lineWidth/drawWidth,0.0,1.0);

        return mix(gridLines.x,1.0,gridLines.y);
    } 

    void main(){
        vec2 st=vUV*1500.0;
       
        gl_FragColor = vec4(vec3(grid(st,0.01)),1.0);
    }

`;var Le=`
    precision highp float;

    

    varying vec2 vUV;
    varying vec4 vWorldPos; 

    void main(){
        vUV=uv;
        vWorldPos=modelViewMatrix*vec4(position,1.0);

        gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
    }

`;var we=r=>{let n=new ShaderMaterial({uniforms:{time:{value:1},cameraPos:{value:r.camera.position},fadeNear:{value:r.fadeNear},fadeFar:{value:r.fadeFar}},vertexShader:Le,fragmentShader:Se});return {mat:n,update:t=>{n.uniforms.cameraPos.value=t;}}};var Ce=({logger:r,references:n,storage:e,camera:t})=>{let o=null,a=null;return {mount:()=>{if(o=e.getStorage("model").retrieve(n.storageId)?.groups.getObjectByName(n.id)??null,!o){console.error(`Cant get ground mesh from the id : ${n.id} ${n.storageId}`);return}a=we({camera:t,fadeNear:.1,fadeFar:1}),o.material=a.mat,r.onMount({origin:"Navigation-Ground"});},update:()=>{a?.update(t.position);},activate:()=>{},deactivate:()=>{},unmount:()=>{}}};var xe=({mixer:r,actions:n,crossFadeDuration:e=.3})=>{let t=null,a=null;return {play:(d,l=0)=>{if(t===d)return;let u=n[d];u&&(u.reset(),u.play(),a?.crossFadeTo(u,e,false),a=u,t=d);},getCurrentAnimation:()=>t,stop:()=>{},update:d=>{d!==void 0&&r.update(d);}}};var ct=r=>({enter:o=>{console.log("enter idle"),r.animationController.play(r.animationId);},execute:o=>{o.isMoving()&&(o.isShiftPressed()?o.changeState("Run"):o.changeState("Walk"));},exit:o=>{console.log("exit idle");}}),dt=r=>({enter:o=>{console.log("enter walk"),r.animationController.play(r.animationId);},execute:o=>{o.isMoving()?o.isShiftPressed()&&o.changeState("Run"):o.changeState("Idle");},exit:o=>{console.log("exit walk");}}),ut=r=>({enter:o=>{console.log("enter run"),r.animationController.play(r.animationId);},execute:o=>{o.isMoving()?o.isShiftPressed()||o.changeState("Walk"):o.changeState("Idle");},exit:o=>{console.log("exit run");}}),Te=({inputs:r,animationController:n})=>{let {keyboard:t}={mouse:r.getController("mouse"),keyboard:r.getController("keyboard")},{idle:a,walk:i,run:c}={idle:ct({animationController:n,animationId:"Idle"}),walk:dt({animationController:n,animationId:"Walk"}),run:ut({animationController:n,animationId:"Run"})},s=a,m="Idle",d=h=>{s.execute(E),n.update(h);},l=()=>!!(t?.isKeyPressed("w")||t?.isKeyPressed("a")||t?.isKeyPressed("s")||t?.isKeyPressed("d")),u=()=>t?.isKeyPressed("shift")??false,f=h=>{switch(h){case "Idle":return a;case "Walk":return i;case "Run":return c;default:return a}},S=h=>{m!==h&&(m=h,s.exit(E),s=f(h),s.enter(E));},p=()=>{s.enter(E);},E={changeState:S,isMoving:l,isShiftPressed:u};return {mount:p,update:d,unmount:()=>{}}};var ke={MOVEMENT_ACCELERATION:.05,MAX_VELOCITY:.05},Pe=({reference:r,storage:n,InputManager:e})=>{let t,o={direction:new Vector3(0,0,-1),velocity:new Vector3(0,0,0),rotationApplied:{pitch:0,yaw:0}},a={inputDirection:new Vector3(0,0,0)},i={player:null},c=()=>{try{let p=n.getStorage("model").retrieve(r.storageId);if(!p)throw new Error(`player doesn't exist for the id ${r.storageId}`);let E=p?.groups,b=p?.animations,h=new AnimationMixer(E),v=xe({mixer:h,actions:{Idle:h.clipAction(b[0]),Walk:h.clipAction(b[3]),Run:h.clipAction(b[1])},crossFadeDuration:.3}),g=Te({animationController:v,inputs:e});g.mount(),i={player:E},t={input:{mouse:e.getController("mouse"),keyboard:e.getController("keyboard")},animation:v,fsm:g};}catch(p){console.error(`Player mesh cant be obtained :${p}`);}},s=p=>{!p||!i.player||(o.rotationApplied=p.getRotation(),i.player.rotation.y+=o.rotationApplied.yaw);},m=(p,E)=>{if(!p||!i.player)return;let h=.001,{inputDirection:v}=a;if(v.set(0,0,0),p.isKeyPressed("w")&&(v.z-=1),p.isKeyPressed("s")&&(v.z+=1),p.isKeyPressed("a")&&(v.x-=1),p.isKeyPressed("d")&&(v.x+=1),v.length()>0)v.applyQuaternion(i.player.quaternion),v.normalize(),o.velocity.add(v.multiplyScalar(ke.MOVEMENT_ACCELERATION*E)),o.velocity.clampLength(0,ke.MAX_VELOCITY);else if(v.length()==0&&o.velocity.length()>0){let g=Math.exp(-5*E);o.velocity.multiplyScalar(g),o.velocity.lengthSq()<h*h&&o.velocity.set(0,0,0);}i.player.position.add(o.velocity);},d=p=>{s(t.input.mouse),m(t.input.keyboard,p);};return {mount:c,activate:()=>{},deactivate:()=>{},update:p=>(d(p),t.fsm.update(p),{position:i.player?.position??new Vector3(0,0,0),rotation:i.player?.rotation??new Euler(0,0,0,"XYZ"),rotationDelta:o.rotationApplied}),unmount:()=>{}}};var Re=({player:r,ground:n})=>{let e=M(),[t,o,a,i,c]=[e.get("Logger"),e.get("GlobalStorageManager"),e.get("EventBusManager"),e.get("InputManager"),e.get("ThreeJSContextManager")],s={camera:Ee({camera:c.get("camera")}),player:Pe({reference:r,InputManager:i,storage:o}),ground:Ce({camera:c.get("camera"),logger:t,references:n,storage:o})},m=null,l=null,u=false;return {mount:()=>{u||!s||(t.onMount({origin:"Navigation Room"}),m={player:{position:new Vector3(0,0,0),rotation:new Euler(0,0,0),rotationDelta:{yaw:0,pitch:0}}},l=o.getStorage("model").retrieve(n.storageId)??null,s.player.mount(),s.ground.mount(),s.camera.mount(),u=true);},update:h=>{!u||!s||!m||(c.get("orbit").update(),m.player=s.player.update(h),s.camera.update({playerPosition:m.player.position,rotationDelta:m.player.rotationDelta}));},unmount:()=>{!u||!s||(t.onUnmount({origin:"Navigation Room"}),s.player.unmount(),s.ground.unmount(),s=null,l=null);},setActive:()=>{!l||!s||(l.groups.visible=true,c.get("orbit").enabled=false,s.camera.activate(),s.ground.activate(),s.player.activate());},setDeactive:()=>{!l||!s||(l.groups.visible=false,s.camera.deactivate(),s.ground.deactivate(),s.player.deactivate());},isLoaded:false}};var Ae=({camera:r,eventBusManager:n,orbit:e,scene:t})=>{let o=[new Vector3(0,2,10),new Vector3(0,2,5),new Vector3(0,2,3),new Vector3(0,2,2),new Vector3(0,2,1),new Vector3(0,2,0),new Vector3(0,2,-1),new Vector3(0,1,-1),new Vector3(0,1,-1.5),new Vector3(0,1,-2)],a=new CatmullRomCurve3(o),i=0,c=false;return {mount:()=>{i=0;},activate:()=>{e.enabled=false,r.position.set(0,2.5,10),r.near=.001,r.far=1e3;},update:f=>{if(!c&&i>1&&(c=true,e.enabled=true,n.viewBus.emit({type:"project-screen:show",elementId:"project-screen"}),console.log("event emitted view event")),!c&&(i+=f*.1,i<=.9)){let S=a.getPointAt(i),p=a.getPointAt(i+.1);p.z-=.1,r.position.copy(S),r.lookAt(p);}},deactivate:()=>{},unmount:()=>{}}};var Ie=({reference:r,logger:n,storage:e})=>{let t=null;return {mount:()=>{let s=e.getStorage("model").retrieve(r.storageId)?.groups;if(t=s?.getObjectByName(r.id),!t){console.error(`Cant get ground mesh from the id : ${r.id}`);return}t.material=t.material.clone(),t.receiveShadow=true,t.material.needsUpdate=true,t.material.opacity=1,t.material.transparent=true;let m=["sky","ground"];s?.traverse(d=>{m.includes(d.name)||(d.castShadow=true);}),n.onMount({origin:"about-ground"});},actiavte:()=>{},deactivate:()=>{},unmount:()=>{}}};var De=({renderer:r,scene:n})=>{let e,t;return {mount:()=>{e=new DirectionalLight(16777215,5),e.castShadow=true,e.position.set(0,1,.5),e.target.position.set(0,0,0),e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.camera.near=.1,e.shadow.camera.far=50,e.shadow.camera.left=-10,e.shadow.camera.right=10,e.shadow.camera.top=10,e.shadow.camera.bottom=-10,t=new AmbientLight(16777215),r.shadowMap.enabled=true,r.shadowMap.type=PCFShadowMap;},activate:()=>{e&&n.add(e),t&&n.add(t);},deactivate:()=>{e&&n.remove(e),t&&n.remove(t);},unmount:()=>{}}};var Be=({logger:r,reference:n,storage:e})=>{let t,o=[],a=l=>{l.traverse(u=>{u.castShadow=true;});};return {mount:()=>{try{let l=e.getStorage("model").retrieve(n.storageId)?.groups,u=e.getStorage("model").retrieve(n.storageId)?.animations??[];if(!l)throw new Error(`player doesn't exist for the id ${n.storageId}`);t={playerRoot:l};let f=new AnimationMixer(l);f.clipAction(u[2]).play(),o.push(f),r.onMount({origin:"Project-Room-Player"});}catch(l){console.error(`Player mesh cant be obtained :${l}`);}},activate:()=>{t.playerRoot&&(t.playerRoot.rotation.set(0,0,0,"XYZ"),t.playerRoot.castShadow=true,a(t.playerRoot));},update:l=>{o.forEach(u=>{u.update(l);});},deactiavte:()=>{},unmount:()=>{}}};var Oe=({player:r,ground:n})=>{let e=M(),[t,o,a,i]=[e.get("GlobalStorageManager"),e.get("ThreeJSContextManager"),e.get("EventBusManager"),e.get("Logger")],{scene:c,camera:s,orbit:m,renderer:d}={scene:o.get("scene"),camera:o.get("camera"),orbit:o.get("orbit"),renderer:o.get("renderer")},l={camera:Ae({camera:s,eventBusManager:a,orbit:m,scene:c}),player:Be({logger:i,reference:r,storage:t}),ground:Ie({logger:i,reference:n,storage:t}),lighting:De({renderer:d,scene:c})},u=null;return {mount:()=>{l.ground.mount(),l.player.mount(),l.camera.mount(),l.lighting.mount(),u=t.getStorage("model").retrieve(n.storageId)?.groups??null,i.onMount({origin:"Projects"});},setActive:()=>{u&&(u.visible=true),l.camera.activate(),l.lighting.activate(),l.player.activate();},update:h=>{l.player.update(h),l.camera.update(h);},setDeactive:()=>{u&&(u.visible=false),l.lighting.deactivate();},unmount:()=>{},isLoaded:false}};var He=()=>{let r=M(),[n,e,t,o,a]=[r.get("GlobalStorageManager"),r.get("Logger"),r.get("EventBusManager"),r.get("ThreeJSContextManager"),r.get("GlobalStateManager")],i=null,c={navigation:null,about:null,projects:null},s={navigation:re,about:ae,projects:ie},m=null,d=null,l=()=>{try{i=pe({storageManager:n,stateManager:a,loaderEventBus:t.loadingBus,renderer:o.get("renderer"),scene:o.get("scene")}),i?.configure();}catch(g){throw new Error(`[Gameplay] Couldnt create and initailize the loader due to ${g}`)}},u=g=>{switch(g){case "navigation":return c[g]=Re(se),c[g];case "about":return c[g]=be(le),c[g];case "projects":return c[g]=Oe(ce),c[g];default:throw new Error(`Unknown Room key ${g}`)}},f=async g=>{if(!i)return;if(!s[g])throw new Error("[Room Controller] sufficient asset meta data is not given.");if(!c[g]){let A=u(g);console.log("load room",s[g]);let q=[...s[g].meshes];s[g].hdr&&q.push(s[g].hdr),await i.load(q),A&&(A.mount(),A.isLoaded=true,m=A);}},S=async g=>{d!==g&&(d!=null&&c[d]!=null&&c[d].setDeactive(),await f(g),c[g]&&c[g].setActive(),d=g);},p=async()=>{e.onMount({origin:"Room Controller"}),l(),await i?.load([ne]),await f("navigation"),await S("navigation");},E=g=>{m?.update(g);},b=()=>{i?.dispose(),Object.values(c).forEach(g=>{g?.unmount();}),e.onUnmount({origin:"room-controller"});},h=g=>{t.loadingBus.emit({type:"load:start",loaded:0,total:0,url:""}),Promise.allSettled([S(g)]).then(()=>{t.loadingBus.emit({type:"load:complete"});});},v=()=>{d&&m?.setDeactive();};return {mount:p,switchRoom:{navigation:()=>h("navigation"),about:()=>h("about"),projects:()=>h("projects"),default:()=>v()},update:E,unmount:b}};var Ne=()=>{let r=M(),[n,e,t]=[r.get("EventBusManager"),r.get("Logger"),r.get("InputManager")],o=new Clock,a={deltaTime:0},i={deltaTime:0},c=false,s=He(),m=()=>{n.displayBus.on("about:show",s.switchRoom.about),n.displayBus.on("about:hide",s.switchRoom.default),n.displayBus.on("projects:show",s.switchRoom.projects),n.displayBus.on("projects:hide",s.switchRoom.default),n.displayBus.on("home:show",s.switchRoom.navigation),n.displayBus.on("home:hide",s.switchRoom.default);},d=async()=>{c||(await s.mount(),m(),c=true,window.addEventListener("keyup",p=>{console.log(p);}));},l=()=>{i.deltaTime=o.getDelta(),!isNaN(i.deltaTime)&&i.deltaTime!==void 0&&(a.deltaTime=i.deltaTime);},u=()=>{l(),s.update(a.deltaTime??0);};return {onMount:d,update:u,onUnmount:()=>{}}};var _e=r=>{let{fov:n,aspectRatio:e,near:t,far:o}=te,a=new Scene,i=new PerspectiveCamera(n,e,t,o),c=new WebGLRenderer({antialias:true}),s,m=null,d=null,l=M().get("ThreeJSContextManager"),u=M().get("Logger"),f=v=>{let g=document.getElementById(v);c.setSize(window.innerWidth,window.innerHeight),c.setPixelRatio(window.devicePixelRatio),g?(g.appendChild(c.domElement),s=new OrbitControls(i,c.domElement)):console.warn(`Could not find element with selector tag : ${v}`);},S=()=>{l.set("scene",a),l.set("camera",i),l.set("orbit",s),l.set("renderer",c);};return {onLoad:()=>[y(f,r.domMountId),y(S),y(u.onLoad,{origin:"ThreeJs-Manager"})],onMount:v=>[()=>{m=v;},y(u.onMount,{origin:"ThreeJs-Manager"})],onUpdate:()=>{if(d!==null)return;let v=()=>{d=requestAnimationFrame(v),m?.(),c.render(a,i);};v();},onUnmount:()=>{let v=document.getElementById(r.domMountId);d!==null&&(cancelAnimationFrame(d),d=0),v&&c.domElement.parentElement===v&&v.removeChild(c.domElement),c.dispose(),u.onUnmount({origin:"ThreeJs-Manager"});},onDestroy:()=>{}}};var je=(r,n)=>{let{height:e,width:t}={height:window.innerHeight,width:window.innerWidth};r.aspect=t/e,r.updateProjectionMatrix(),n.setSize(t,e);},xt=(r,n,e)=>{r.key.toLowerCase()==="u"&&r.shiftKey&&(r.preventDefault(),n.emit({type:"debug:inspector",scene:e}));},Ge=()=>{let r=M(),n=r.get("Logger"),e=_e({domMountId:oe}),t,o=Ne(),a,i,c=()=>{je(t.get("camera"),t.get("renderer")),window.addEventListener("resize",a),window.addEventListener("keydown",i);},s=()=>{window.removeEventListener("resize",a),window.removeEventListener("keydown",i);};return {onInit:()=>{},onLoad:()=>[...I(e.onLoad()),y(n.onLoad,{origin:"Render-Manager"})],onMount:()=>[()=>{t=r.get("ThreeJSContextManager"),a=E=>je(t.get("camera"),t.get("renderer")),i=E=>xt(E,r.get("EventBusManager").debugBus,t.get("scene"));},y(c),y(n.onMount,{origin:"Render-Manager"})],onUpdate:()=>[y(async()=>{try{await o.onMount();}catch{throw new Error("[Game Manager] Loading failed :${error}")}}),...I(e.onMount(()=>{})),y(e.onMount,o.update),y(e.onUpdate),y(n.onUpdate,0,{origin:"Render-Manager"})],onUnmount:()=>[y(s),y(o.onUnmount),y(e.onUnmount),y(n.onUnmount,{origin:"Render-Manager"})],onDestroy:()=>{n.onDestroy({origin:"RenderManager"});}}};var Br=()=>{let r=M(),[n,e,t,o]=[r.get("Logger"),r.get("LifecycleScheduler"),r.get("GlobalStorageManager"),r.get("InputManager")],a,i,c=()=>{console.log("Engine initialized"),a=ee(),i=Ge(),e.schedule(t.inflate),e.schedule(o.onInit),e.schedule(a.onInit),e.schedule(i.onInit);},s=()=>{e.schedule(a.onLoad),e.schedule(i.onLoad),e.schedule(y(n.onLoad,{origin:"Engine"}));},m=()=>{n.onMount({origin:"Engine"}),e.schedule(a.onMount),e.schedule(i.onMount);},d=()=>{a.onUpdate(),e.schedule(i.onUpdate);},l=()=>{n.onUnmount({origin:"Engine"}),e.schedule(a.onUnmount),e.schedule(i.onUnmount),e.schedule(o.onUnmount);};return {run:()=>{c(),document.addEventListener("DOMContentLoaded",()=>{s();}),window.addEventListener("load",()=>{m(),d();}),window.addEventListener("beforeunload",()=>{l();}),e.run();}}};export{Br as createEngine};//# sourceMappingURL=Engine.js.map
//# sourceMappingURL=Engine.js.map