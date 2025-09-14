var b=document.createElement("template");b.innerHTML=`
    <link rel="stylesheet" href="/style/experience.css">
    <div class="experience">
        <ul class="job-list">
          <li class="job-item">
            <div class="job-header">
              <h3 class="job-title">Title</h3>
              <h5 class="job-duration">Duration</h5>
            </div>
            <div class="job-details">
              <ul class="job-responsibilities">
                <li class="job-responsibility-item">Done task which improved some item</li>
              </ul>
            </div>
          </li>
        </ul>
    </div>
`;var p=class extends HTMLElement{constructor(){super();this.events={};this.root=this.attachShadow({mode:"open"});let e=b.content.cloneNode(true);this.root.appendChild(e),this.components={root:this.root.querySelector(".experience"),jobList:this.root.querySelector(".job-list")};}connectedCallback(){}disconnectedCallback(){}bindEvents(e,t){console.log(e,t),e.addEventListener("click",()=>{let n=t.querySelector(".job-details");this.components.jobList?.querySelectorAll(".job-details.active").forEach(i=>{i!==n&&i.classList.remove("active");}),console.log("toggle visibility"),n.classList.toggle("active");});}addEvent(e,t,n){let i=s=>{n.classList.toggle("hidden"),console.log("button is clicked ",t);};this.events[`button :${t}`]={button:e,callback:i},e.addEventListener("click",i),console.log("attaching event",t);}addJobExperience(e){let t=document.createElement("li");t.classList.add("job-item");let n=document.createElement("div");n.classList.add("job-header");let i=document.createElement("div");i.classList.add("job-main");let s=document.createElement("h3");if(s.classList.add("job-title"),s.textContent=e.title,i.appendChild(s),e.company){let o=document.createElement("h5");o.classList.add("job-company"),o.textContent=e.company,i.appendChild(o);}let l=document.createElement("div");l.classList.add("job-meta");let c=document.createElement("h5");if(c.classList.add("job-duration"),c.textContent=e.duration,l.appendChild(c),e.location){let o=document.createElement("span");o.classList.add("job-location"),o.textContent=e.location,l.appendChild(o);}n.appendChild(i),n.appendChild(l);let a=document.createElement("div");a.classList.add("job-details");let r=document.createElement("ul");r.classList.add("job-responsibilities");let m=document.createDocumentFragment();return e.responsibilities.forEach(o=>{let d=document.createElement("li");d.classList.add("job-responsibility-item"),d.textContent=o,m.appendChild(d);}),r.appendChild(m),a.appendChild(r),t.appendChild(n),t.appendChild(a),this.bindEvents(n,t),t}removeEvents(){console.log("remove all"),Object.entries(this.events).forEach(e=>{e[1].button.removeEventListener("click",e[1].callback);});}inflateCarousel(e){this.components.jobList&&(this.removeEvents(),this.components.jobList.innerHTML="",e.forEach((t,n)=>{this.components.jobList?.appendChild(this.addJobExperience({...t,index:n}));}));}set Experience(e){console.log("experience",e),this.inflateCarousel(e);}};export{p as a};//# sourceMappingURL=chunk-FMN4SSMF.js.map
//# sourceMappingURL=chunk-FMN4SSMF.js.map