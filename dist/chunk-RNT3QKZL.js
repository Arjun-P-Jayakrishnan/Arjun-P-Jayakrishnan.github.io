var o=document.createElement("template");o.innerHTML=`
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
`;var n=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let e=o.content.cloneNode(true);this.root.appendChild(e),this.components={summary:{root:this.root.querySelector(".summary"),title:this.root.querySelector(".summary--title"),description:this.root.querySelector(".summary--description")},education:{course:this.root.querySelector(".education--course"),institution:this.root.querySelector(".education--institute"),description:this.root.querySelector(".education--description")},skillsRoot:this.root.querySelector(".skills--list")};}connectedCallback(){}disconnectedCallback(){}set Summary(e){console.log("update summary");let t=this.components.summary;t.title&&(t.title.textContent=e.title,t.description&&(t.description.textContent=e.description));}set Education(e){console.log("update education");let t=this.components.education;t.course&&(t.course.textContent=e.course,t.institution&&(t.institution.textContent=e.institute,t.description&&(t.description.textContent=e.description)));}addSkill(e){console.log("update skills");let t=document.createElement("li");t.classList.add("skill--category");let i=document.createElement("h3");i.classList.add("skill--category--title"),i.textContent=e.title,t.appendChild(i);let s=document.createElement("ul");return s.classList.add("skill--tags"),t.appendChild(s),e.tags.forEach(c=>{let l=document.createElement("li");l.classList.add("skill--item"),l.textContent=c,s.appendChild(l);}),t}set Skills(e){let t=document.createDocumentFragment();e.forEach(i=>{let s=this.addSkill(i);t.appendChild(s);}),this.components.skillsRoot.innerHTML="",this.components.skillsRoot.appendChild(t);}};export{n as a};//# sourceMappingURL=chunk-RNT3QKZL.js.map
//# sourceMappingURL=chunk-RNT3QKZL.js.map