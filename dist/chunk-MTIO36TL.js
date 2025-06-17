import {a}from'./chunk-RNT3QKZL.js';import {a as a$1}from'./chunk-P3DQJOZA.js';import {a as a$3}from'./chunk-JQ4PZAOA.js';import {a as a$2}from'./chunk-DVYKHAFX.js';var l=document.createElement("template");l.innerHTML=`
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
`;var d=["\u{1F468}\u200D\u{1F393} Background","\u{1F468}\u200D\u{1F4BB} Experience","\u{1F4C4} Resume","\u{1F5A5}\uFE0F Frameworks"],c=class extends HTMLElement{constructor(){super();this.state={currentIndex:0};this.displayBus=null;this.carouselItem=null;this.prevClick=e=>this.swapSlides(-1);this.nextClick=e=>this.swapSlides(1);this.navButtonClicks=[];this.defineElements=()=>{customElements.get("background-page")||customElements.define("background-page",a),customElements.get("experience-page")||customElements.define("experience-page",a$1),customElements.get("resume-page")||customElements.define("resume-page",a$2),customElements.get("frameworks-page")||customElements.define("frameworks-page",a$3);};this.querySlottedElements=()=>{let e=this.findElement("background",a),t=this.findElement("experience",a$1),s=this.findElement("resume",a$2),n=this.findElement("frameworks",a$3);this.carouselItem={background:e,experience:t,resume:s,frameworks:n};};this.onShow=()=>{this.components.about?.classList.toggle("hidden",false);};this.onHide=()=>{this.components.about?.classList.toggle("hidden",true);};this.bindEvents=()=>{this.components.prev?.addEventListener("click",this.prevClick),this.components.next?.addEventListener("click",this.nextClick),this.components.navButtons.forEach((e,t)=>{e.addEventListener("click",this.navButtonClicks[t]);});};this.unbindEvents=()=>{this.components.prev?.removeEventListener("click",this.prevClick),this.components.next?.removeEventListener("click",this.nextClick),this.components.navButtons.forEach((e,t)=>{e.removeEventListener("click",this.navButtonClicks[t]);});};this.root=this.attachShadow({mode:"open"});let e=l.content.cloneNode(true);this.root.appendChild(e);let t=Array.from(this.root.querySelector(".carousel_nav")?.children??[]);this.components={about:this.root.querySelector(".about"),tabName:this.root.querySelector(".tab--name"),carousel:this.root.querySelector(".carousel"),next:this.root.querySelector(".next"),prev:this.root.querySelector(".prev"),track:this.root.querySelector(".carousel-track"),navButtons:t},this.components.navButtons.forEach((s,n)=>{this.navButtonClicks.push(u=>this.swapSlides(n-this.state.currentIndex));}),this.defineElements(),this.querySlottedElements(),this.components.about?.classList.toggle("hidden");}findElement(e,t){let s=`slot[name="${e}"]`;return (this.root.querySelector(s).assignedElements?.()||[]).find(m=>m instanceof t)}set eventBusManager(e){this.displayBus=e.displayBus,this.displayBus.on("about:show",this.onShow),this.displayBus.on("about:hide",this.onHide);}set updateData(e){e.isError?this.root.innerHTML=`
        <p>${e.message}</p>
      `:this.inflateCarousel(e.records);}connectedCallback(){this.bindEvents();}disconnectedCallback(){this.unbindEvents(),this.displayBus?.off("about:show",this.onShow),this.displayBus?.off("about:hide",this.onHide);}swapSlides(e){if(!this.components.track)return;let t=this.state.currentIndex,s=this.components.track.children.length;this.state.currentIndex+=e,this.state.currentIndex<0&&(this.state.currentIndex=s-1),this.state.currentIndex>=s&&(this.state.currentIndex=0);let n=this.components.track.children[t];this.components.tabName&&(this.components.tabName.textContent=d[this.state.currentIndex]),this.components.track.children[this.state.currentIndex].dataset.active="true",delete n.dataset.active,this.components.navButtons[this.state.currentIndex].dataset.activeButton="true",delete this.components.navButtons[t].dataset.activeButton;}setBackground(e){if(!this.carouselItem?.background)return;this.carouselItem.background.Summary={title:e.summary.title??"Title-Placeholder",description:e.summary.description??"Description"};let t=e.education;this.carouselItem.background.Education={course:t.course,institute:t.institute,description:t.description};let s=e.skills;this.carouselItem.background.Skills=s.map(n=>({title:n.title,tags:n.tags}));}setExperience(e){this.carouselItem?.experience&&(this.carouselItem.experience.Experience=e.map(t=>({title:t.title,duration:t.duration,responsibilities:t.responsibilities})));}setResume(e){this.carouselItem?.resume;}setFrameworks(e){this.carouselItem?.frameworks&&(this.carouselItem.frameworks.FrameworkData=e);}inflateCarousel(e){this.setBackground(e.personal.data),this.setExperience(e.experience.data),this.setResume(e.resume.data),this.setFrameworks(e.frameworks.data);}};export{c as a};//# sourceMappingURL=chunk-MTIO36TL.js.map
//# sourceMappingURL=chunk-MTIO36TL.js.map