const template=document.createElement('template');


template.innerHTML=`
  <link rel="stylesheet" href="/Web-Components/about-card.css">
  <div class="root">
      <div class="illustration">
        <slot name="illustrationImage">Default Image</slot> 
      </div>
      <div class="card-details">
          <slot name="heading"></slot>
          <slot name="sub-heading"></slot>
          <slot name="area"></slot>
          <slot name="content"></slot>
      </div>
  </div>
`;





class AboutCard extends HTMLElement{


  constructor(){
    
    super();
    this.root=this.attachShadow({mode:"closed"})
    const clone=template.content.cloneNode(true)
    this.root.append(clone);
  }


}

export {AboutCard}
