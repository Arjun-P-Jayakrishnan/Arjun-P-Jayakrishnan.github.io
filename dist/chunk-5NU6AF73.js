import {a as a$1}from'./chunk-EBLUBMTU.js';import {a as a$2}from'./chunk-RLKPQEDV.js';var c=document.createElement("template");c.innerHTML=`
    <link rel="stylesheet" href="/style/about.css">
    <div class="about hidden">
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
`;var a=class extends HTMLElement{constructor(){super();this.state={currentIndex:0};this.displayBus=null;this.carouselItem=null;this.prevClick=e=>this.swapSlides(-1);this.nextClick=e=>this.swapSlides(1);this.navButtonClicks=[];this.defineElements=()=>{customElements.get("background-page")||customElements.define("background-page",a$1),customElements.get("experience-page")||customElements.define("experience-page",a$2);};this.querySlottedElements=()=>{let s=(this.root.querySelector('slot[name="background"]')?.assignedElements?.()||[]).find(o=>o instanceof a$1),u=(this.root.querySelector('slot[name="experience"]')?.assignedElements?.()||[]).find(o=>o instanceof a$2);this.carouselItem={background:s,experience:u};};this.onShow=()=>{this.components.about?.classList.toggle("hidden",false);};this.onHide=()=>{this.components.about?.classList.toggle("hidden",true);};this.bindEvents=()=>{this.components.prev?.addEventListener("click",this.prevClick),this.components.next?.addEventListener("click",this.nextClick),this.components.navButtons.forEach((e,t)=>{e.addEventListener("click",this.navButtonClicks[t]);});};this.unbindEvents=()=>{this.components.prev?.removeEventListener("click",this.prevClick),this.components.next?.removeEventListener("click",this.nextClick),this.components.navButtons.forEach((e,t)=>{e.removeEventListener("click",this.navButtonClicks[t]);});};this.root=this.attachShadow({mode:"open"});let e=c.content.cloneNode(true);this.root.appendChild(e);let t=Array.from(this.root.querySelector(".carousel_nav")?.children??[]);this.components={about:this.root.querySelector(".about"),carousel:this.root.querySelector(".carousel"),next:this.root.querySelector(".next"),prev:this.root.querySelector(".prev"),track:this.root.querySelector(".carousel-track"),navButtons:t},console.log(this.components.navButtons),this.components.navButtons.forEach((s,n)=>{this.navButtonClicks.push(l=>this.swapSlides(n-this.state.currentIndex));}),this.defineElements(),this.querySlottedElements();}set eventBusManager(e){this.displayBus=e.displayBus,this.displayBus.on("about:show",this.onShow),this.displayBus.on("about:hide",this.onHide);}set updateData(e){e.isError?this.root.innerHTML=`
        <p>${e.message}</p>
      `:this.inflateCarousel(e.records);}connectedCallback(){this.bindEvents();}disconnectedCallback(){this.unbindEvents(),this.displayBus?.off("about:show",this.onShow),this.displayBus?.off("about:hide",this.onHide);}swapSlides(e){if(!this.components.track)return;let t=this.state.currentIndex,s=this.components.track.children.length;this.state.currentIndex+=e,this.state.currentIndex<0&&(this.state.currentIndex=s-1),this.state.currentIndex>=s&&(this.state.currentIndex=0);let n=this.components.track.children[t];this.components.track.children[this.state.currentIndex].dataset.active="true",delete n.dataset.active,this.components.navButtons[this.state.currentIndex].dataset.activeButton="true",delete this.components.navButtons[t].dataset.activeButton;}setBackground(e){if(!this.carouselItem?.background)return;this.carouselItem.background.Summary={title:e.summary.title??"Title-Placeholder",description:e.summary.description??"Description"};let t=e.education;this.carouselItem.background.Education={course:t.course,institute:t.institute,description:t.description};let s=e.skills;this.carouselItem.background.Skills=s.map(n=>({title:n.title,tags:n.tags}));}setExperience(e){this.carouselItem?.experience&&(this.carouselItem.experience.Experience=e.map(t=>({title:t.title,duration:t.duration,responsibilities:t.responsibilities})));}inflateCarousel(e){this.setBackground(e.personal.data),this.setExperience(e.experience.data);}};export{a};//# sourceMappingURL=chunk-5NU6AF73.js.map
//# sourceMappingURL=chunk-5NU6AF73.js.map