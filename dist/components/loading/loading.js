var c=()=>{let r=new Map;return {register:(e,i)=>{if(r.has(e))throw new Error(`Error : Redefining the service [${e}]`);r.set(e,i);},get:e=>{let i=r.get(e);if(!i)throw new Error(`Error : Trying to obtain value of an unregistered service ${e}`);return i},has:e=>r.has(e)}},o,s=()=>(o||(o=c()),o);var a=document.createElement("template");a.innerHTML=`
    <link rel="stylesheet" href="/style/loading_modal.css"/>
   
    <div class="overlay hidden" id="overlay">
      <div class="loading-logo"></div>
      <div id="loading-text">Loading...</div>
    </div>
`;var n=class extends HTMLElement{constructor(){super();this.handleLoading=()=>{};this.root=this.attachShadow({mode:"open"});let t=a.content.cloneNode(true);this.root.appendChild(t),this.progress=0,this.tags={overlay:this.root.getElementById("overlay")},this.logger=s().get("Logger"),this.logger.onLoad({origin:"Loading Modal"});}set eventBusManager(t){this.loadingEventBus=t.loadingBus,this.handleLoading();}connectedCallback(){}disconnectedCallback(){}};export{n as LoadingModal};//# sourceMappingURL=loading.js.map
//# sourceMappingURL=loading.js.map