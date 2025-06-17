var T=document.createElement("template");T.innerHTML=`
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
`;var h=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let n=T.content.cloneNode(true);this.root.appendChild(n),this.components={summary:{root:this.root.querySelector(".summary"),title:this.root.querySelector(".summary--title"),description:this.root.querySelector(".summary--description")},education:{course:this.root.querySelector(".education--course"),institution:this.root.querySelector(".education--institute"),description:this.root.querySelector(".education--description")},skillsRoot:this.root.querySelector(".skills--list")};}connectedCallback(){}disconnectedCallback(){}set Summary(n){console.log("update summary");let e=this.components.summary;e.title&&(e.title.textContent=n.title,e.description&&(e.description.textContent=n.description));}set Education(n){console.log("update education");let e=this.components.education;e.course&&(e.course.textContent=n.course,e.institution&&(e.institution.textContent=n.institute,e.description&&(e.description.textContent=n.description)));}addSkill(n){console.log("update skills");let e=document.createElement("li");e.classList.add("skill--category");let t=document.createElement("h3");t.classList.add("skill--category--title"),t.textContent=n.title,e.appendChild(t);let s=document.createElement("ul");return s.classList.add("skill--tags"),e.appendChild(s),n.tags.forEach(o=>{let a=document.createElement("li");a.classList.add("skill--item"),a.textContent=o,s.appendChild(a);}),e}set Skills(n){let e=document.createDocumentFragment();n.forEach(t=>{let s=this.addSkill(t);e.appendChild(s);}),this.components.skillsRoot.innerHTML="",this.components.skillsRoot.appendChild(e);}};var B=document.createElement("template");B.innerHTML=`
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
`;var p=class extends HTMLElement{constructor(){super();this.events={};this.root=this.attachShadow({mode:"open"});let e=B.content.cloneNode(true);this.root.appendChild(e),this.components={root:this.root.querySelector(".experience"),jobList:this.root.querySelector(".job-list")};}connectedCallback(){}disconnectedCallback(){}addEvent(e,t,s){let o=a=>{s.classList.toggle("hidden"),console.log("button is clicked ",t);};this.events[`button :${t}`]={button:e,callback:o},e.addEventListener("click",o),console.log("attaching event",t);}addJobExperience(e){let t=document.createElement("li");t.classList.add("job-item");let s=document.createElement("div");s.classList.add("job-header");let o=document.createElement("h3");o.classList.add("job-title"),o.textContent=e.title;let a=document.createElement("h5");a.classList.add("job-duration"),a.textContent=e.duration,s.appendChild(o),s.appendChild(a);let c=document.createElement("div");c.classList.add("job-details"),c.classList.add("hidden");let r=document.createElement("ul");r.classList.add("job-responsibilities");let u=document.createDocumentFragment();return e.responsibilities.forEach(m=>{let l=document.createElement("li");l.classList.add("job-responsibility-item"),l.textContent=m,u.appendChild(l);}),r.appendChild(u),c.appendChild(r),t.appendChild(s),t.appendChild(c),t}removeEvents(){console.log("remove all"),Object.entries(this.events).forEach(e=>{e[1].button.removeEventListener("click",e[1].callback);});}inflateCarousel(e){this.components.jobList&&(this.removeEvents(),this.components.jobList.innerHTML="",e.forEach((t,s)=>{this.components.jobList?.appendChild(this.addJobExperience({...t,index:s}));}));}set Experience(e){console.log("experience",e),this.inflateCarousel(e);}};var H=document.createElement("template");H.innerHTML=`
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
`;var g=class extends HTMLElement{constructor(){super();this.displayBus=null;this.webClick=e=>this.openPage(0);this.mobileClick=e=>this.openPage(1);this.languagesClick=e=>this.openPage(2);this.cliClick=e=>this.openPage(3);this.bindEvents=()=>{this.navigation.web&&this.navigation.web.addEventListener("click",this.webClick),this.navigation.mobile&&this.navigation.mobile.addEventListener("click",this.mobileClick),this.navigation.language&&this.navigation.language.addEventListener("click",this.languagesClick),this.navigation.cli&&this.navigation.cli.addEventListener("click",this.cliClick);};this.unbindEvents=()=>{this.navigation.web&&this.navigation.web.removeEventListener("click",this.webClick),this.navigation.mobile&&this.navigation.mobile.removeEventListener("click",this.mobileClick),this.navigation.language&&this.navigation.language.removeEventListener("click",this.languagesClick),this.navigation.cli&&this.navigation.cli.removeEventListener("click",this.cliClick);};this.root=this.attachShadow({mode:"open"});let e=H.content.cloneNode(true);this.root.appendChild(e),this.components={framework:this.root.querySelector(".frameworks"),web:this.root.querySelector(".web__content"),mobile:this.root.querySelector(".mobile__content"),languages:this.root.querySelector(".languages__content"),cli:this.root.querySelector(".cli__content")},this.navigation={web:this.root.querySelector(".nav--web"),mobile:this.root.querySelector(".nav--mobile"),language:this.root.querySelector(".nav--languages"),cli:this.root.querySelector(".nav--cli")};}connectedCallback(){this.bindEvents();}disconnectedCallback(){this.unbindEvents();}openPage(e){let t=this.root.querySelector(".web"),s=this.root.querySelector(".mobile"),o=this.root.querySelector(".languages"),a=this.root.querySelector(".cli");t?.classList.toggle("active",false),s?.classList.toggle("active",false),o?.classList.toggle("active",false),a?.classList.toggle("active",false),e===0?t?.classList.toggle("active",true):e==1?s?.classList.toggle("active",true):e==2?o?.classList.toggle("active",true):e==3&&a?.classList.toggle("active",true);}addIcon(e,t,s){let o=document.createElement("li"),a=document.createElement("img");return a.setAttribute("src",s),a.setAttribute("alt",e),a.classList.add("framework_logo"),o.appendChild(a),o}inflate(e,t){switch(t){case "web":let s=document.createDocumentFragment();e.forEach(r=>{s.appendChild(this.addIcon(r.name,[],r.link));}),this.components.web?.appendChild(s);break;case "mobile":let o=document.createDocumentFragment();e.forEach(r=>{o.appendChild(this.addIcon(r.name,[],r.link));}),this.components.mobile?.appendChild(o);break;case "languages":let a=document.createDocumentFragment();e.forEach(r=>{a.appendChild(this.addIcon(r.name,[],r.link));}),this.components.languages?.appendChild(a);break;case "command-line":let c=document.createDocumentFragment();e.forEach(r=>{c.appendChild(this.addIcon(r.name,[],r.link));}),this.components.cli?.appendChild(c);break;default:console.warn("The types doesnt match for frameworks");}}set FrameworkData(e){this.inflate(e.web,"web"),this.inflate(e.mobile,"mobile"),this.inflate(e.languages,"languages"),this.inflate(e.cli,"command-line");}};var x=document.createElement("template");x.innerHTML=`
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
`;var v=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let n=x.content.cloneNode(true);this.root.appendChild(n);}connectedCallback(){}disconnectedCallback(){}};var D=document.createElement("template");D.innerHTML=`
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
`;var I=["\u{1F468}\u200D\u{1F393} Background","\u{1F468}\u200D\u{1F4BB} Experience","\u{1F4C4} Resume","\u{1F5A5}\uFE0F Frameworks"],E=class extends HTMLElement{constructor(){super();this.state={currentIndex:0};this.displayBus=null;this.carouselItem=null;this.prevClick=e=>this.swapSlides(-1);this.nextClick=e=>this.swapSlides(1);this.navButtonClicks=[];this.defineElements=()=>{customElements.get("background-page")||customElements.define("background-page",h),customElements.get("experience-page")||customElements.define("experience-page",p),customElements.get("resume-page")||customElements.define("resume-page",v),customElements.get("frameworks-page")||customElements.define("frameworks-page",g);};this.querySlottedElements=()=>{let e=this.findElement("background",h),t=this.findElement("experience",p),s=this.findElement("resume",v),o=this.findElement("frameworks",g);this.carouselItem={background:e,experience:t,resume:s,frameworks:o};};this.onShow=()=>{this.components.about?.classList.toggle("hidden",false);};this.onHide=()=>{this.components.about?.classList.toggle("hidden",true);};this.bindEvents=()=>{this.components.prev?.addEventListener("click",this.prevClick),this.components.next?.addEventListener("click",this.nextClick),this.components.navButtons.forEach((e,t)=>{e.addEventListener("click",this.navButtonClicks[t]);});};this.unbindEvents=()=>{this.components.prev?.removeEventListener("click",this.prevClick),this.components.next?.removeEventListener("click",this.nextClick),this.components.navButtons.forEach((e,t)=>{e.removeEventListener("click",this.navButtonClicks[t]);});};this.root=this.attachShadow({mode:"open"});let e=D.content.cloneNode(true);this.root.appendChild(e);let t=Array.from(this.root.querySelector(".carousel_nav")?.children??[]);this.components={about:this.root.querySelector(".about"),tabName:this.root.querySelector(".tab--name"),carousel:this.root.querySelector(".carousel"),next:this.root.querySelector(".next"),prev:this.root.querySelector(".prev"),track:this.root.querySelector(".carousel-track"),navButtons:t},this.components.navButtons.forEach((s,o)=>{this.navButtonClicks.push(a=>this.swapSlides(o-this.state.currentIndex));}),this.defineElements(),this.querySlottedElements(),this.components.about?.classList.toggle("hidden");}findElement(e,t){let s=`slot[name="${e}"]`;return (this.root.querySelector(s).assignedElements?.()||[]).find(r=>r instanceof t)}set eventBusManager(e){this.displayBus=e.displayBus,this.displayBus.on("about:show",this.onShow),this.displayBus.on("about:hide",this.onHide);}set updateData(e){e.isError?this.root.innerHTML=`
        <p>${e.message}</p>
      `:this.inflateCarousel(e.records);}connectedCallback(){this.bindEvents();}disconnectedCallback(){this.unbindEvents(),this.displayBus?.off("about:show",this.onShow),this.displayBus?.off("about:hide",this.onHide);}swapSlides(e){if(!this.components.track)return;let t=this.state.currentIndex,s=this.components.track.children.length;this.state.currentIndex+=e,this.state.currentIndex<0&&(this.state.currentIndex=s-1),this.state.currentIndex>=s&&(this.state.currentIndex=0);let o=this.components.track.children[t];this.components.tabName&&(this.components.tabName.textContent=I[this.state.currentIndex]),this.components.track.children[this.state.currentIndex].dataset.active="true",delete o.dataset.active,this.components.navButtons[this.state.currentIndex].dataset.activeButton="true",delete this.components.navButtons[t].dataset.activeButton;}setBackground(e){if(!this.carouselItem?.background)return;this.carouselItem.background.Summary={title:e.summary.title??"Title-Placeholder",description:e.summary.description??"Description"};let t=e.education;this.carouselItem.background.Education={course:t.course,institute:t.institute,description:t.description};let s=e.skills;this.carouselItem.background.Skills=s.map(o=>({title:o.title,tags:o.tags}));}setExperience(e){this.carouselItem?.experience&&(this.carouselItem.experience.Experience=e.map(t=>({title:t.title,duration:t.duration,responsibilities:t.responsibilities})));}setResume(e){this.carouselItem?.resume;}setFrameworks(e){this.carouselItem?.frameworks&&(this.carouselItem.frameworks.FrameworkData=e);}inflateCarousel(e){this.setBackground(e.personal.data),this.setExperience(e.experience.data),this.setResume(e.resume.data),this.setFrameworks(e.frameworks.data);}};var j=document.createElement("template");j.innerHTML=`
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
`;var _=["title","image","description","tags","linkUrl"],f=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let n=j.content.cloneNode(true);this.root.appendChild(n),this.components={logo:this.root.querySelector("img"),title:this.root.querySelector("h3"),description:this.root.querySelector("p"),tagRoot:this.root.querySelector(".tags"),link:this.root.querySelector(".github-link")};}static get observedAttributes(){return _}attributeChangedCallback(n,e,t){e!==t&&this.render(n);}setData(n){this.setAttribute("title",n.title),this.setAttribute("image",n.imageUrl),this.setAttribute("description",n.description),this.setAttribute("tags",n.tags??""),this.setAttribute("linkUrl",n.linkUrl);}render(n){switch(n){case "title":let e=this.getAttribute("title")||"";this.components.title&&(this.components.title.textContent=e);break;case "description":let t=this.getAttribute("description")||"";this.components.description&&(this.components.description.textContent=t);break;case "image":let s=this.getAttribute("image")||"",o=this.getAttribute("title")||"";this.components.logo&&(this.components.logo.setAttribute("src",s),this.components.logo.setAttribute("alt",o));break;case "tags":let a=(this.getAttribute("tags")||"").split(",");if(this.components.tagRoot){let r=a.map(u=>{let m=document.createElement("span");return m.textContent=u,m});this.components.tagRoot.replaceChildren(...r);}break;case "linkUrl":let c=this.getAttribute("linkUrl")||"";this.components.link&&this.components.link.setAttribute("href",c);break}}connectedCallback(){}disconnectedCallback(){}};var q=document.createElement("template");q.innerHTML=`
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
`;var y=class extends HTMLElement{constructor(){super();this.onShow=e=>this.showComponent(e);this.onHide=e=>this.hideComponent(e);this.root=this.attachShadow({mode:"open"});let e=q.content.cloneNode(true);this.root.appendChild(e),this.gallery=this.root.getElementById("gallery");}set eventBusManager(e){this.viewEventBus=e.viewBus,console.log("event bus attached to project gallery");}showComponent(e){console.log("gallery shown "),this.gallery?.classList.remove("hidden");}hideComponent(e){console.log("gallery hidden"),this.gallery?.classList.add("hidden");}inflateData(e){if(!this.gallery)return;let t=document.createDocumentFragment();e.forEach(s=>{let o=document.createElement("project-card");o.setData(s),t.appendChild(o);}),this.gallery.appendChild(t),this.viewEventBus&&(this.viewEventBus.on("project-screen:show",this.onShow),this.viewEventBus.on("project-screen:hide",this.onHide));}set updateData(e){e.isError?this.root.innerHTML=`
          <p>${e.message}</p>
        `:this.inflateData(e.list);}connectedCallback(){}disconnectedCallback(){this.viewEventBus&&(this.viewEventBus.off("project-screen:show",this.onShow),this.viewEventBus.off("project-screen:hide",this.onHide));}};var P=()=>{let i=new Map;return {register:(s,o)=>{if(i.has(s))throw new Error(`Error : Redefining the service [${s}]`);i.set(s,o);},get:s=>{let o=i.get(s);if(!o)throw new Error(`Error : Trying to obtain value of an unregistered service ${s}`);return o},has:s=>i.has(s)}},w,d=()=>(w||(w=P()),w);var A=document.createElement("template");A.innerHTML=`
    <link rel="stylesheet" href="/style/loading_modal.css"/>
   
    <div class="overlay hidden" id="overlay">
      <div class="loading-logo"></div>
      <div id="loading-text">Loading...</div>
    </div>
`;var k=class extends HTMLElement{constructor(){super();this.handleLoading=()=>{};this.root=this.attachShadow({mode:"open"});let e=A.content.cloneNode(true);this.root.appendChild(e),this.progress=0,this.tags={overlay:this.root.getElementById("overlay")},this.logger=d().get("Logger"),this.logger.onLoad({origin:"Loading Modal"});}set eventBusManager(e){this.loadingEventBus=e.loadingBus,this.handleLoading();}connectedCallback(){}disconnectedCallback(){}};var N=document.createElement("template");N.innerHTML=`
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
`;var L=class extends HTMLElement{constructor(){super();this.displayEventBus=null;this.busHandlers=null;this.sections=["projects","about","contact","home"];this.toggleHamburgerMenu=()=>{if(console.log(this.components.navLinks),!this.components.navLinks)return;let t=!(this.components.navLinks.getAttribute("aria-expanded")==="true");this.components.navLinks.setAttribute("aria-expanded",String(t)),this.components?.toggleBtn?.setAttribute("aria-expanded",String(t));};this.setActiveTab=e=>{this.links.forEach(t=>{t?.classList.remove("active");}),this.components[e]?.classList.add("active"),this.state.activeTab=e;};this.toggleSections=(e,t)=>{if(this.state.activeTab==t)return;e.preventDefault();let s={elementId:t,type:`${this.state.activeTab}:hide`};this.displayEventBus?.emit(s),this.setActiveTab(t);let o={elementId:t,type:`${t}:show`};console.log(`nvbar emits  ${o.type}`),this.displayEventBus?.emit(o);};this.onToggleClick=e=>this.toggleHamburgerMenu();this.onProjectClick=e=>this.toggleSections(e,"projects");this.onAboutClick=e=>this.toggleSections(e,"about");this.onHomeClick=e=>this.toggleSections(e,"home");this.onContactClick=e=>this.toggleSections(e,"contact");this.setupBusListeners=()=>{this.displayEventBus&&this.sections.forEach(e=>{let t=o=>{this.logger.onMount({origin:`[${e}]-component`});},s=o=>{this.logger.onUnmount({origin:`[${e}]-component`});};this.displayEventBus?.on(`${e}:show`,t),this.displayEventBus?.on(`${e}:hide`,s),this.busHandlers&&(this.busHandlers[`${e}:show`]=t,this.busHandlers[`${e}:hide`]=s);});};this.disposeBusListeners=()=>{this.displayEventBus&&this.sections.forEach(e=>{this.busHandlers&&(this.displayEventBus?.off(`${e}:show`,this.busHandlers[`${e}:show`]),this.displayEventBus?.off(`${e}:hide`,this.busHandlers[`${e}:hide`]));});};this.root=this.attachShadow({mode:"open"});let e=N.content.cloneNode(true);this.root.appendChild(e),this.state={activeTab:"home"},this.components={about:null,navLinks:null,projects:null,contact:null,home:null,toggleBtn:null},this.queryElements(),this.links=[this.components.home,this.components.about,this.components.projects,this.components.contact],this.logger=d().get("Logger"),this.logger.onLoad({origin:"Navbar"});}static get observedAttributes(){return []}connectedCallback(){this.bindEvents(),this.setupBusListeners();}disconnectedCallback(){this.unBindEvents(),this.disposeBusListeners();}queryElements(){this.components.toggleBtn=this.root.querySelector(".toggle-btn"),this.components.navLinks=this.root.querySelector(".nav-links"),this.components.navLinks&&(this.components.projects=this.components.navLinks.querySelector("#projects"),this.components.about=this.components.navLinks.querySelector("#about"),this.components.contact=this.components.navLinks.querySelector("#contact"),this.components.home=this.components.navLinks.querySelector("#home"));}bindEvents(){this.components.toggleBtn?.addEventListener("click",this.onToggleClick),this.components.projects?.addEventListener("click",this.onProjectClick),this.components.about?.addEventListener("click",this.onAboutClick),this.components.home?.addEventListener("click",this.onHomeClick),this.components.contact?.addEventListener("click",this.onContactClick);}unBindEvents(){this.components.toggleBtn?.removeEventListener("click",this.onToggleClick),this.components.projects?.removeEventListener("click",this.onProjectClick),this.components.about?.removeEventListener("click",this.onAboutClick),this.components.home?.removeEventListener("click",this.onHomeClick),this.components.contact?.removeEventListener("click",this.onContactClick);}set eventBusManager(e){this.displayEventBus=e.displayBus;}};var R=document.createElement("template");R.innerHTML=`
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
`;var M=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let n=R.content.cloneNode(true);this.root.appendChild(n),this.state={isMenuHidden:true,isResizing:false},this.element=this.root.querySelector(".scene-inspector"),this.treeView={Objects:[],Materials:[]},this.handleResize();}set eventBusManager(n){this.eventBus=n.debugBus,this.eventBus?.on("debug:inspector",e=>{this.handleShowHideEvent(e);});}handleShowHideEvent(n){this.state.isMenuHidden=!this.state.isMenuHidden,this.state.isMenuHidden?this.element.classList.add("hidden"):(this.element.classList.remove("hidden"),n.scene!=null&&n.scene!==void 0&&this.renderTree(n.scene));}handleResize(){let n=this.root.querySelector(".resizer"),e=this.root.querySelector(".scene-inspector");n.addEventListener("mousedown",t=>{this.state.isResizing=true,document.body.style.cursor="ew-resize",t.preventDefault();}),window.addEventListener("mousemove",t=>{if(!this.state.isResizing)return;let s=window.innerWidth-t.clientX;e.style.width=`${Math.min(Math.max(s,200),600)}px`;}),window.addEventListener("mouseup",t=>{this.state.isResizing&&(this.state.isResizing=false,document.body.style.cursor="");});}toggleCloseButton(){this.state.isMenuHidden=true,this.element.classList.add("hidden");}collectSceneData(n){let e=[],t=new Map,s=o=>{let a={id:o.uuid,label:o.name==""?o.type:o.name,type:o.type,nodes:[]};return o.children.forEach(c=>{a.nodes.push(s(c));}),"material"in o&&o.material&&(Array.isArray(o.material)?o.material:[o.material]).forEach(r=>{t.has(r.uuid)||t.set(r.uuid,{id:r.uuid,label:r.name==""?r.type:r.name,type:"material",nodes:[]});}),a};return n.children.forEach(o=>{e.push(s(o));}),{Objects:e,Materials:Array.from(t.values())}}renderTree(n){this.treeView=this.collectSceneData(n);let e=this.root.querySelector(".tree-view");e.innerHTML="",this.addCategory("Objects",e,this.treeView.Objects),this.addCategory("Materials",e,this.treeView.Materials);}addCategory(n,e,t){let s=document.createElement("li");s.classList.add("category","collapsed");let o=document.createElement("div");o.classList.add("category-toggle"),o.textContent=`\u2B9E ${n}`,o.addEventListener("click",c=>{s.classList.toggle("collapsed");let r=s.classList.contains("collapsed");o.textContent=r?`\u2B9E ${n}`:`\u25BC ${n}`;});let a=document.createElement("ul");a.classList.add("category-content"),t.forEach(c=>{a.appendChild(this.renderTreeNode(c));}),s.appendChild(o),s.appendChild(a),e.appendChild(s);}renderTreeNode(n){let e=document.createElement("li");e.classList.add("tree-node");let t=document.createElement("div");if(t.classList.add("node-label"),t.textContent=`${n.label} (${n.type})`,e.appendChild(t),n.nodes.length>0){e.classList.add("collapsed");let s=document.createElement("ul");n.nodes.forEach(o=>{s.appendChild(this.renderTreeNode(o));}),t.addEventListener("click",()=>{e.classList.toggle("collapsed");}),e.appendChild(s);}return e}connectedCallback(){this.root.querySelector(".close-btn").addEventListener("click",()=>{this.toggleCloseButton();});}disconnectedCallback(){}};function b(i,...n){return ()=>i(...n)}var $=async i=>await(await fetch(i)).json(),U=async()=>{let i=document.querySelector("about-page");try{let n=await $("/public/data/about.json");i.updateData={isError:!1,records:n};}catch(n){i.updateData={isError:true,message:`Error getting data ${n}`},console.error(`Error getting data ${n}`);}},F=async()=>{let i=document.querySelector("project-gallery");try{let e=await(await fetch("/public/data/projects.json")).json();i.updateData={isError:!1,list:e.projects};}catch(n){i.updateData={isError:true,message:`Error getting data ${n}`},console.error(`Error getting data ${n}`);}},be=()=>{let i={navbarDefined:false,loadingModalDefined:false,sceneInspectorDefined:false,projectGalleryDefined:false,aboutPageDefined:false},n=d(),[e,t,s]=[n.get("LifecycleScheduler"),n.get("Logger"),n.get("EventBusManager")];return {onInit:()=>{i.navbarDefined||(customElements.define("nav-bar",L),i.navbarDefined=true),i.loadingModalDefined||(customElements.define("loading-modal",k),i.loadingModalDefined=true),i.sceneInspectorDefined||(customElements.define("scene-inspector",M),i.sceneInspectorDefined=true),s.displayBus.once("projects:show",()=>{i.projectGalleryDefined||(t.onMount({origin:"Projects-Page"}),s.loadingBus.emit({type:"load:start",loaded:0,total:0,url:""}),customElements.define("project-gallery",y),customElements.define("project-card",f),e.schedule(b(()=>{try{let l=document.querySelector("project-gallery");l.eventBusManager=s;}catch(l){console.error(l);}})),e.schedule(b(async()=>{try{console.log("loading data"),await F(),s.loadingBus.emit({type:"load:complete"});}catch(l){console.log(`Error while loading projects data ${l}`);}})),i.projectGalleryDefined=true);}),s.displayBus.once("about:show",()=>{i.aboutPageDefined||(t.onMount({origin:"About-Page"}),s.loadingBus.emit({type:"load:start",loaded:0,total:0,url:""}),customElements.define("about-page",E),e.schedule(b(async()=>{await U(),s.loadingBus.emit({type:"load:complete"});})),e.schedule(b(()=>{try{let l=document.querySelector("about-page");l.eventBusManager=s;}catch(l){console.error(l);}})),i.aboutPageDefined=true);});},onLoad:()=>{t.onLoad({origin:"DOMManager"});try{let l=document.querySelector("loading-modal");l.eventBusManager=s;}catch(l){console.error(`Missing loading modal element :${l}`);}try{let l=document.querySelector("nav-bar");l.eventBusManager=s;}catch(l){console.error(`Missing navbar element : ${l}`);}try{let l=document.querySelector("scene-inspector");l.eventBusManager=s;}catch(l){console.error(l);}},onMount:()=>{t.onMount({origin:"DOMManager"});},onUpdate:()=>{t.onUpdate(0,{origin:"DOMManager"});},onUnmount:()=>{["loading-modal","nav-bar","scene-inspector"].forEach(S=>{let C=document.querySelector(S);C?.parentElement?C.parentElement.removeChild(C):console.warn(`Could not unmount ${S} either already removed or not found`);}),t.onUnmount({origin:"DOMManger"});},onDestroy:()=>{t.onDestroy({origin:"DOMManager"});}}};export{be as createDomManager};//# sourceMappingURL=DOMManger.js.map
//# sourceMappingURL=DOMManger.js.map