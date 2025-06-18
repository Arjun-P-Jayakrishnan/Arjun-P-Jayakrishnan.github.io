import {a}from'./chunk-P6US56ME.js';var s=document.createElement("template");s.innerHTML=`
    <link rel="stylesheet" href="/style/loading_modal.css"/>
   
    <div class="overlay" id="overlay">
      <div class="loading-logo"></div>
      <div id="loading-text">Loading...</div>
    </div>
`;var t=class extends HTMLElement{constructor(){super();this.handleLoading=()=>{this.loadingEventBus?.on("load:start",e=>{this.tags.overlay?.classList.remove("hidden");}),this.loadingEventBus?.on("load:progress",e=>{this.progress=e.loaded/e.total;}),this.loadingEventBus?.on("load:complete",e=>{this.tags.overlay?.classList.add("hidden");}),this.loadingEventBus?.on("load:error",e=>{});};this.root=this.attachShadow({mode:"open"});let e=s.content.cloneNode(true);this.root.appendChild(e),this.progress=0,this.tags={overlay:this.root.getElementById("overlay")},this.logger=a().get("Logger"),this.logger.onLoad({origin:"Loading Modal"});}set eventBusManager(e){this.loadingEventBus=e.loadingBus,this.handleLoading();}connectedCallback(){}disconnectedCallback(){}};export{t as a};//# sourceMappingURL=chunk-IVMZFPRE.js.map
//# sourceMappingURL=chunk-IVMZFPRE.js.map