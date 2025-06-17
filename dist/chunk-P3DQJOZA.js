var d=document.createElement("template");d.innerHTML=`
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
`;var a=class extends HTMLElement{constructor(){super();this.events={};this.root=this.attachShadow({mode:"open"});let e=d.content.cloneNode(true);this.root.appendChild(e),this.components={root:this.root.querySelector(".experience"),jobList:this.root.querySelector(".job-list")};}connectedCallback(){}disconnectedCallback(){}addEvent(e,t,n){let i=s=>{n.classList.toggle("hidden"),console.log("button is clicked ",t);};this.events[`button :${t}`]={button:e,callback:i},e.addEventListener("click",i),console.log("attaching event",t);}addJobExperience(e){let t=document.createElement("li");t.classList.add("job-item");let n=document.createElement("div");n.classList.add("job-header");let i=document.createElement("h3");i.classList.add("job-title"),i.textContent=e.title;let s=document.createElement("h5");s.classList.add("job-duration"),s.textContent=e.duration,n.appendChild(i),n.appendChild(s);let o=document.createElement("div");o.classList.add("job-details"),o.classList.add("hidden");let l=document.createElement("ul");l.classList.add("job-responsibilities");let r=document.createDocumentFragment();return e.responsibilities.forEach(m=>{let c=document.createElement("li");c.classList.add("job-responsibility-item"),c.textContent=m,r.appendChild(c);}),l.appendChild(r),o.appendChild(l),t.appendChild(n),t.appendChild(o),t}removeEvents(){console.log("remove all"),Object.entries(this.events).forEach(e=>{e[1].button.removeEventListener("click",e[1].callback);});}inflateCarousel(e){this.components.jobList&&(this.removeEvents(),this.components.jobList.innerHTML="",e.forEach((t,n)=>{this.components.jobList?.appendChild(this.addJobExperience({...t,index:n}));}));}set Experience(e){console.log("experience",e),this.inflateCarousel(e);}};export{a};//# sourceMappingURL=chunk-P3DQJOZA.js.map
//# sourceMappingURL=chunk-P3DQJOZA.js.map