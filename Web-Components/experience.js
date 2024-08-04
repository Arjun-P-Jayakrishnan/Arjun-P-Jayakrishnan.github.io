const template = document.createElement("template");

template.innerHTML = `
      <style>
            
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Poppins&display=swap');

            :host(experience-project){
                display:block;
                
                font-familiy:"Poppins",san-serif;
            }

                        
            .root{
                width:20vw;
                height:auto; 

                color:white;
                background-color:black;
                border-radius:2.1em !important;

                overflow:hidden;
            }

            .banner{
                height:10vh;
                background-image:linear-gradient(0,#EEE,#000);
            }

           


            .details{
              height:16vh
              
            }

            ::slotted([slot="projectImage"]){
                  height:5vh;
            }

            ::slotted([slot="summary"]){
                color:white !important;
            } 

      </style>
      <div class="root">
          <div class="banner">
             <slot name="projectImage">Image Default</slot>
          </div>
          <div class="details">
            <slot name="heading" >Default Text</slot>
            <slot name="summary">Default Summary</slot>
          </div>
      </div>
`;

class ExperienceTemplate extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "closed" });

    let clone = template.content.cloneNode(true);

    this.root.append(clone);
  }
}

customElements.define("experience-project", ExperienceTemplate);
