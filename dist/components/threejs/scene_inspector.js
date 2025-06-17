var l=document.createElement("template");l.innerHTML=`
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
`;var o=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"});let e=l.content.cloneNode(true);this.root.appendChild(e),this.state={isMenuHidden:true,isResizing:false},this.element=this.root.querySelector(".scene-inspector"),this.treeView={Objects:[],Materials:[]},this.handleResize();}set eventBusManager(e){this.eventBus=e.debugBus,this.eventBus?.on("debug:inspector",s=>{this.handleShowHideEvent(s);});}handleShowHideEvent(e){this.state.isMenuHidden=!this.state.isMenuHidden,this.state.isMenuHidden?this.element.classList.add("hidden"):(this.element.classList.remove("hidden"),e.scene!=null&&e.scene!==void 0&&this.renderTree(e.scene));}handleResize(){let e=this.root.querySelector(".resizer"),s=this.root.querySelector(".scene-inspector");e.addEventListener("mousedown",n=>{this.state.isResizing=true,document.body.style.cursor="ew-resize",n.preventDefault();}),window.addEventListener("mousemove",n=>{if(!this.state.isResizing)return;let i=window.innerWidth-n.clientX;s.style.width=`${Math.min(Math.max(i,200),600)}px`;}),window.addEventListener("mouseup",n=>{this.state.isResizing&&(this.state.isResizing=false,document.body.style.cursor="");});}toggleCloseButton(){this.state.isMenuHidden=true,this.element.classList.add("hidden");}collectSceneData(e){let s=[],n=new Map,i=t=>{let a={id:t.uuid,label:t.name==""?t.type:t.name,type:t.type,nodes:[]};return t.children.forEach(d=>{a.nodes.push(i(d));}),"material"in t&&t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(r=>{n.has(r.uuid)||n.set(r.uuid,{id:r.uuid,label:r.name==""?r.type:r.name,type:"material",nodes:[]});}),a};return e.children.forEach(t=>{s.push(i(t));}),{Objects:s,Materials:Array.from(n.values())}}renderTree(e){this.treeView=this.collectSceneData(e);let s=this.root.querySelector(".tree-view");s.innerHTML="",this.addCategory("Objects",s,this.treeView.Objects),this.addCategory("Materials",s,this.treeView.Materials);}addCategory(e,s,n){let i=document.createElement("li");i.classList.add("category","collapsed");let t=document.createElement("div");t.classList.add("category-toggle"),t.textContent=`\u2B9E ${e}`,t.addEventListener("click",d=>{i.classList.toggle("collapsed");let r=i.classList.contains("collapsed");t.textContent=r?`\u2B9E ${e}`:`\u25BC ${e}`;});let a=document.createElement("ul");a.classList.add("category-content"),n.forEach(d=>{a.appendChild(this.renderTreeNode(d));}),i.appendChild(t),i.appendChild(a),s.appendChild(i);}renderTreeNode(e){let s=document.createElement("li");s.classList.add("tree-node");let n=document.createElement("div");if(n.classList.add("node-label"),n.textContent=`${e.label} (${e.type})`,s.appendChild(n),e.nodes.length>0){s.classList.add("collapsed");let i=document.createElement("ul");e.nodes.forEach(t=>{i.appendChild(this.renderTreeNode(t));}),n.addEventListener("click",()=>{s.classList.toggle("collapsed");}),s.appendChild(i);}return s}connectedCallback(){this.root.querySelector(".close-btn").addEventListener("click",()=>{this.toggleCloseButton();});}disconnectedCallback(){}};export{o as SceneInspector};//# sourceMappingURL=scene_inspector.js.map
//# sourceMappingURL=scene_inspector.js.map