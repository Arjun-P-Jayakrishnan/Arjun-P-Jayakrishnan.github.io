var r=document.createElement("template");r.innerHTML=`
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
`;var s=class extends HTMLElement{constructor(){super();this.onShow=e=>this.showComponent(e);this.onHide=e=>this.hideComponent(e);this.root=this.attachShadow({mode:"open"});let e=r.content.cloneNode(true);this.root.appendChild(e),this.gallery=this.root.getElementById("gallery");}set eventBusManager(e){this.viewEventBus=e.viewBus,console.log("event bus attached to project gallery");}showComponent(e){console.log("gallery shown "),this.gallery?.classList.remove("hidden");}hideComponent(e){console.log("gallery hidden"),this.gallery?.classList.add("hidden");}inflateData(e){if(!this.gallery)return;let t=document.createDocumentFragment();e.forEach(o=>{let n=document.createElement("project-card");n.setData(o),t.appendChild(n);}),this.gallery.appendChild(t),this.viewEventBus&&(this.viewEventBus.on("project-screen:show",this.onShow),this.viewEventBus.on("project-screen:hide",this.onHide));}set updateData(e){e.isError?this.root.innerHTML=`
          <p>${e.message}</p>
        `:this.inflateData(e.list);}connectedCallback(){}disconnectedCallback(){this.viewEventBus&&(this.viewEventBus.off("project-screen:show",this.onShow),this.viewEventBus.off("project-screen:hide",this.onHide));}};export{s as a};//# sourceMappingURL=chunk-3UNRKVQH.js.map
//# sourceMappingURL=chunk-3UNRKVQH.js.map