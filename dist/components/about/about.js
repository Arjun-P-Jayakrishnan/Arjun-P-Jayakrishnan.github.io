var g=document.createElement("template");g.innerHTML=`
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
`;var r=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let o=g.content.cloneNode(true);this.root.appendChild(o),this.components={summary:{root:this.root.querySelector(".summary"),title:this.root.querySelector(".summary--title"),description:this.root.querySelector(".summary--description")},education:{course:this.root.querySelector(".education--course"),institution:this.root.querySelector(".education--institute"),description:this.root.querySelector(".education--description")},skillsRoot:this.root.querySelector(".skills--list")};}connectedCallback(){}disconnectedCallback(){}set Summary(o){console.log("update summary");let e=this.components.summary;e.title&&(e.title.textContent=o.title,e.description&&(e.description.textContent=o.description));}set Education(o){console.log("update education");let e=this.components.education;e.course&&(e.course.textContent=o.course,e.institution&&(e.institution.textContent=o.institute,e.description&&(e.description.textContent=o.description)));}addSkill(o){console.log("update skills");let e=document.createElement("li");e.classList.add("skill--category");let t=document.createElement("h3");t.classList.add("skill--category--title"),t.textContent=o.title,e.appendChild(t);let s=document.createElement("ul");return s.classList.add("skill--tags"),e.appendChild(s),o.tags.forEach(n=>{let i=document.createElement("li");i.classList.add("skill--item"),i.textContent=n,s.appendChild(i);}),e}set Skills(o){let e=document.createDocumentFragment();o.forEach(t=>{let s=this.addSkill(t);e.appendChild(s);}),this.components.skillsRoot.innerHTML="",this.components.skillsRoot.appendChild(e);}};var v=document.createElement("template");v.innerHTML=`
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
`;var c=class extends HTMLElement{constructor(){super();this.events={};this.root=this.attachShadow({mode:"open"});let e=v.content.cloneNode(true);this.root.appendChild(e),this.components={root:this.root.querySelector(".experience"),jobList:this.root.querySelector(".job-list")};}connectedCallback(){}disconnectedCallback(){}addEvent(e,t,s){let n=i=>{s.classList.toggle("hidden"),console.log("button is clicked ",t);};this.events[`button :${t}`]={button:e,callback:n},e.addEventListener("click",n),console.log("attaching event",t);}addJobExperience(e){let t=document.createElement("li");t.classList.add("job-item");let s=document.createElement("div");s.classList.add("job-header");let n=document.createElement("h3");n.classList.add("job-title"),n.textContent=e.title;let i=document.createElement("h5");i.classList.add("job-duration"),i.textContent=e.duration,s.appendChild(n),s.appendChild(i);let l=document.createElement("div");l.classList.add("job-details"),l.classList.add("hidden");let a=document.createElement("ul");a.classList.add("job-responsibilities");let p=document.createDocumentFragment();return e.responsibilities.forEach(L=>{let h=document.createElement("li");h.classList.add("job-responsibility-item"),h.textContent=L,p.appendChild(h);}),a.appendChild(p),l.appendChild(a),t.appendChild(s),t.appendChild(l),t}removeEvents(){console.log("remove all"),Object.entries(this.events).forEach(e=>{e[1].button.removeEventListener("click",e[1].callback);});}inflateCarousel(e){this.components.jobList&&(this.removeEvents(),this.components.jobList.innerHTML="",e.forEach((t,s)=>{this.components.jobList?.appendChild(this.addJobExperience({...t,index:s}));}));}set Experience(e){console.log("experience",e),this.inflateCarousel(e);}};var b=document.createElement("template");b.innerHTML=`
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
`;var u=class extends HTMLElement{constructor(){super();this.displayBus=null;this.webClick=e=>this.openPage(0);this.mobileClick=e=>this.openPage(1);this.languagesClick=e=>this.openPage(2);this.cliClick=e=>this.openPage(3);this.bindEvents=()=>{this.navigation.web&&this.navigation.web.addEventListener("click",this.webClick),this.navigation.mobile&&this.navigation.mobile.addEventListener("click",this.mobileClick),this.navigation.language&&this.navigation.language.addEventListener("click",this.languagesClick),this.navigation.cli&&this.navigation.cli.addEventListener("click",this.cliClick);};this.unbindEvents=()=>{this.navigation.web&&this.navigation.web.removeEventListener("click",this.webClick),this.navigation.mobile&&this.navigation.mobile.removeEventListener("click",this.mobileClick),this.navigation.language&&this.navigation.language.removeEventListener("click",this.languagesClick),this.navigation.cli&&this.navigation.cli.removeEventListener("click",this.cliClick);};this.root=this.attachShadow({mode:"open"});let e=b.content.cloneNode(true);this.root.appendChild(e),this.components={framework:this.root.querySelector(".frameworks"),web:this.root.querySelector(".web__content"),mobile:this.root.querySelector(".mobile__content"),languages:this.root.querySelector(".languages__content"),cli:this.root.querySelector(".cli__content")},this.navigation={web:this.root.querySelector(".nav--web"),mobile:this.root.querySelector(".nav--mobile"),language:this.root.querySelector(".nav--languages"),cli:this.root.querySelector(".nav--cli")};}connectedCallback(){this.bindEvents();}disconnectedCallback(){this.unbindEvents();}openPage(e){let t=this.root.querySelector(".web"),s=this.root.querySelector(".mobile"),n=this.root.querySelector(".languages"),i=this.root.querySelector(".cli");t?.classList.toggle("active",false),s?.classList.toggle("active",false),n?.classList.toggle("active",false),i?.classList.toggle("active",false),e===0?t?.classList.toggle("active",true):e==1?s?.classList.toggle("active",true):e==2?n?.classList.toggle("active",true):e==3&&i?.classList.toggle("active",true);}addIcon(e,t,s){let n=document.createElement("li"),i=document.createElement("img");return i.setAttribute("src",s),i.setAttribute("alt",e),i.classList.add("framework_logo"),n.appendChild(i),n}inflate(e,t){switch(t){case "web":let s=document.createDocumentFragment();e.forEach(a=>{s.appendChild(this.addIcon(a.name,[],a.link));}),this.components.web?.appendChild(s);break;case "mobile":let n=document.createDocumentFragment();e.forEach(a=>{n.appendChild(this.addIcon(a.name,[],a.link));}),this.components.mobile?.appendChild(n);break;case "languages":let i=document.createDocumentFragment();e.forEach(a=>{i.appendChild(this.addIcon(a.name,[],a.link));}),this.components.languages?.appendChild(i);break;case "command-line":let l=document.createDocumentFragment();e.forEach(a=>{l.appendChild(this.addIcon(a.name,[],a.link));}),this.components.cli?.appendChild(l);break;default:console.warn("The types doesnt match for frameworks");}}set FrameworkData(e){this.inflate(e.web,"web"),this.inflate(e.mobile,"mobile"),this.inflate(e.languages,"languages"),this.inflate(e.cli,"command-line");}};var E=document.createElement("template");E.innerHTML=`
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
`;var d=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let o=E.content.cloneNode(true);this.root.appendChild(o);}connectedCallback(){}disconnectedCallback(){}};var f=document.createElement("template");f.innerHTML=`
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
`;var y=["\u{1F468}\u200D\u{1F393} Background","\u{1F468}\u200D\u{1F4BB} Experience","\u{1F4C4} Resume","\u{1F5A5}\uFE0F Frameworks"],k=class extends HTMLElement{constructor(){super();this.state={currentIndex:0};this.displayBus=null;this.carouselItem=null;this.prevClick=e=>this.swapSlides(-1);this.nextClick=e=>this.swapSlides(1);this.navButtonClicks=[];this.defineElements=()=>{customElements.get("background-page")||customElements.define("background-page",r),customElements.get("experience-page")||customElements.define("experience-page",c),customElements.get("resume-page")||customElements.define("resume-page",d),customElements.get("frameworks-page")||customElements.define("frameworks-page",u);};this.querySlottedElements=()=>{let e=this.findElement("background",r),t=this.findElement("experience",c),s=this.findElement("resume",d),n=this.findElement("frameworks",u);this.carouselItem={background:e,experience:t,resume:s,frameworks:n};};this.onShow=()=>{this.components.about?.classList.toggle("hidden",false);};this.onHide=()=>{this.components.about?.classList.toggle("hidden",true);};this.bindEvents=()=>{this.components.prev?.addEventListener("click",this.prevClick),this.components.next?.addEventListener("click",this.nextClick),this.components.navButtons.forEach((e,t)=>{e.addEventListener("click",this.navButtonClicks[t]);});};this.unbindEvents=()=>{this.components.prev?.removeEventListener("click",this.prevClick),this.components.next?.removeEventListener("click",this.nextClick),this.components.navButtons.forEach((e,t)=>{e.removeEventListener("click",this.navButtonClicks[t]);});};this.root=this.attachShadow({mode:"open"});let e=f.content.cloneNode(true);this.root.appendChild(e);let t=Array.from(this.root.querySelector(".carousel_nav")?.children??[]);this.components={about:this.root.querySelector(".about"),tabName:this.root.querySelector(".tab--name"),carousel:this.root.querySelector(".carousel"),next:this.root.querySelector(".next"),prev:this.root.querySelector(".prev"),track:this.root.querySelector(".carousel-track"),navButtons:t},this.components.navButtons.forEach((s,n)=>{this.navButtonClicks.push(i=>this.swapSlides(n-this.state.currentIndex));}),this.defineElements(),this.querySlottedElements(),this.components.about?.classList.toggle("hidden");}findElement(e,t){let s=`slot[name="${e}"]`;return (this.root.querySelector(s).assignedElements?.()||[]).find(a=>a instanceof t)}set eventBusManager(e){this.displayBus=e.displayBus,this.displayBus.on("about:show",this.onShow),this.displayBus.on("about:hide",this.onHide);}set updateData(e){e.isError?this.root.innerHTML=`
        <p>${e.message}</p>
      `:this.inflateCarousel(e.records);}connectedCallback(){this.bindEvents();}disconnectedCallback(){this.unbindEvents(),this.displayBus?.off("about:show",this.onShow),this.displayBus?.off("about:hide",this.onHide);}swapSlides(e){if(!this.components.track)return;let t=this.state.currentIndex,s=this.components.track.children.length;this.state.currentIndex+=e,this.state.currentIndex<0&&(this.state.currentIndex=s-1),this.state.currentIndex>=s&&(this.state.currentIndex=0);let n=this.components.track.children[t];this.components.tabName&&(this.components.tabName.textContent=y[this.state.currentIndex]),this.components.track.children[this.state.currentIndex].dataset.active="true",delete n.dataset.active,this.components.navButtons[this.state.currentIndex].dataset.activeButton="true",delete this.components.navButtons[t].dataset.activeButton;}setBackground(e){if(!this.carouselItem?.background)return;this.carouselItem.background.Summary={title:e.summary.title??"Title-Placeholder",description:e.summary.description??"Description"};let t=e.education;this.carouselItem.background.Education={course:t.course,institute:t.institute,description:t.description};let s=e.skills;this.carouselItem.background.Skills=s.map(n=>({title:n.title,tags:n.tags}));}setExperience(e){this.carouselItem?.experience&&(this.carouselItem.experience.Experience=e.map(t=>({title:t.title,duration:t.duration,responsibilities:t.responsibilities})));}setResume(e){this.carouselItem?.resume;}setFrameworks(e){this.carouselItem?.frameworks&&(this.carouselItem.frameworks.FrameworkData=e);}inflateCarousel(e){this.setBackground(e.personal.data),this.setExperience(e.experience.data),this.setResume(e.resume.data),this.setFrameworks(e.frameworks.data);}};export{k as AboutPage};//# sourceMappingURL=about.js.map
//# sourceMappingURL=about.js.map