var m=document.createElement("template");m.innerHTML=`
    <link rel="stylesheet" href="/style/experience.css">
    <div class="experience">
        <ul class="job-list">
          <li class="job-item active">
            <div class="job-header">
              <button class="job-toggle">
                <h2 class="job-title">Title</h2>
                <h2 class="job-duration">Duration</h2>
              </button>
            </div>
            <div class="job-details">
              <ul class="job-responsibilities">
                <li class="job-responsibility-item">Done task which improved some item</li>
              </ul>
            </div>
          </li>
        </ul>
    </div>
`;var d=class extends HTMLElement{constructor(){super();this.events={};this.root=this.attachShadow({mode:"open"});let e=m.content.cloneNode(true);this.root.appendChild(e),this.components={root:this.root.querySelector(".experience"),jobList:this.root.querySelector(".job-list")};}connectedCallback(){}disconnectedCallback(){}addEvent(e,t,i){let n=o=>{i.classList.toggle("hidden"),console.log("button is clicked ",t);};this.events[`button :${t}`]={button:e,callback:n},e.addEventListener("click",n),console.log("attaching event",t);}addJobExperience(e){let t=document.createElement("li");t.classList.add("job-item");let i=document.createElement("div");i.classList.add("job-header");let n=document.createElement("button");n.classList.add("job-toggle");let o=document.createElement("h2");o.classList.add("job-title"),o.textContent=e.title;let l=document.createElement("h2");l.classList.add("job-duration"),l.textContent=e.duration,n.appendChild(o),n.appendChild(l),i.appendChild(n);let s=document.createElement("div");s.classList.add("job-details"),s.classList.add("hidden"),this.addEvent(n,e.index,s);let c=document.createElement("ul");c.classList.add("job-responsibilities");let r=document.createDocumentFragment();return e.responsibilities.forEach(p=>{let a=document.createElement("li");a.classList.add("job-responsibility-item"),a.textContent=p,r.appendChild(a);}),c.appendChild(r),s.appendChild(c),t.appendChild(i),t.appendChild(s),t}removeEvents(){console.log("remove all"),Object.entries(this.events).forEach(e=>{e[1].button.removeEventListener("click",e[1].callback);});}inflateCarousel(e){this.components.jobList&&(this.removeEvents(),this.components.jobList.innerHTML="",e.forEach((t,i)=>{this.components.jobList?.appendChild(this.addJobExperience({...t,index:i}));}));}set Experience(e){console.log("experience",e),this.inflateCarousel(e);}};export{d as a};//# sourceMappingURL=chunk-RLKPQEDV.js.map
//# sourceMappingURL=chunk-RLKPQEDV.js.map