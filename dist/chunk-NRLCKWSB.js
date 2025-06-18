var o=document.createElement("template");o.innerHTML=`
    <link rel="stylesheet" href="/style/gallery.css">
    <style>
      .hidden {
        display:none;
        opacity: 0;
        pointer-events: none;
      }
    </style>
    <div class="gallery hidden" id="gallery">
      <div class="gallery--container" id="gallery--container">

      </div>
    </div>
`;var r=class extends HTMLElement{constructor(){super();this.onShow=e=>this.showComponent(e);this.onHide=e=>this.hideComponent(e);this.root=this.attachShadow({mode:"open"});let e=o.content.cloneNode(true);this.root.appendChild(e),this.gallery=this.root.getElementById("gallery"),this.container=this.root.getElementById("gallery--container");}set eventBusManager(e){this.viewEventBus=e.viewBus;}showComponent(e){console.log("gallery shown "),this.gallery?.classList.remove("hidden");}hideComponent(e){console.log("gallery hidden"),this.gallery?.classList.add("hidden");}inflateData(e){if(!this.container)return;let t=document.createDocumentFragment();e.forEach(s=>{let n=document.createElement("project-card");n.setData(s),t.appendChild(n);}),this.container.appendChild(t),this.viewEventBus&&(this.viewEventBus.on("project-screen:show",this.onShow),this.viewEventBus.on("project-screen:hide",this.onHide));}set updateData(e){e.isError?this.root.innerHTML=`
          <p>${e.message}</p>
        `:this.inflateData(e.list);}connectedCallback(){}disconnectedCallback(){this.viewEventBus&&(this.viewEventBus.off("project-screen:show",this.onShow),this.viewEventBus.off("project-screen:hide",this.onHide));}};export{r as a};//# sourceMappingURL=chunk-NRLCKWSB.js.map
//# sourceMappingURL=chunk-NRLCKWSB.js.map