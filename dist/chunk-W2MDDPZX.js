var n=document.createElement("template");n.innerHTML=`
  <link rel="stylesheet" href="/style/header.css"/>
  <nav class="navbar">
      <div class="logo">Logo</div>
      <button class="toggle-btn">&#9776</button>
      <ul class="nav-links">
          <li><a href="" id="home">Home</a></li>
          <li><a href="" id="about">About</a></li>
          <li><a href="" id="projects">Projects</a></li>
          <li><a href="" id="contact">Contact</a></li>
      </ul>
  </nav>
`;var s=class extends HTMLElement{constructor(){super();this.handleTransitionEnd=e=>{e.propertyName==="transform"&&(this.navLinks.classList.contains("closing")&&this.navLinks.classList.remove("closing"),this.state.hamburgerMenu.isTransitioning=!1)};this.toggleOpenState=e=>{this.state.hamburgerMenu.isTransitioning||(this.state.hamburgerMenu.isTransitioning=!0,this.state.hamburgerMenu.isOpen?(e.classList.remove("open"),e.classList.add("closing"),this.state.hamburgerMenu.isOpen=!1):(e.classList.add("open"),e.classList.remove("closing"),this.state.hamburgerMenu.isOpen=!0))};let e=this.attachShadow({mode:"open"}),t=n.content.cloneNode(!0);e.appendChild(t),this.toggleBtn=e.querySelector(".toggle-btn"),this.navLinks=e.querySelector(".nav-links"),this.state={hamburgerMenu:{isOpen:!1,isTransitioning:!1},isProjectsShown:!1}}static get observedAttributes(){return[]}set eventBusManager(e){this.displayEventBus=e.displayBus,this.displayEventBus.on("project:show",t=>{this.handleShowEvent(t)}),this.displayEventBus.on("project:hide",t=>{this.handleHideEvent(t)})}handleShowEvent(e){this.state.isProjectsShown=!0}handleHideEvent(e){this.state.isProjectsShown=!1}connectedCallback(){this.toggleBtn.addEventListener("click",()=>{this.toggleOpenState(this.navLinks)}),this.navLinks.addEventListener("transitionend",t=>{this.handleTransitionEnd(t)}),this.navLinks.querySelector("#projects")?.addEventListener("click",t=>{t.preventDefault(),this.state.isProjectsShown=!this.state.isProjectsShown,this.state.isProjectsShown?this.displayEventBus?.emit({type:"project:show"}):this.displayEventBus?.emit({type:"project:hide"})})}disconnectedCallback(){this.displayEventBus?.off("project:show",e=>{this.handleShowEvent(e)}),this.displayEventBus?.off("project:hide",e=>{this.handleHideEvent(e)})}};export{s as a};
//# sourceMappingURL=chunk-W2MDDPZX.js.map