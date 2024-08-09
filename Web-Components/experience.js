const  experienceTemplate= document.createElement("template");

experienceTemplate.innerHTML = `
      <style>
            
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Poppins&display=swap');
              
          

            :host(experience-project){
                display:block;
                
                font-familiy:"Poppins",san-serif;
            }

                     
            .root{ 
                height:auto;
                width:100%;
                
                display:flex;
                flex-direction:row;
                flex-wrap:no-wrap;


                justify-content:space-evenly;
                align-items:center;
                
            }

           
           
           
            .illustration{
                
                width:20%;

            }
            
            .card-details{
              width:40%;
              aspect-ratio:2/1;
              padding:1rem 1rem;

              background-color:#f5f5f5;
              border-radius:0.125rem;
              box-shadow:0rem 0.125rem 0.25rem rgba(0,0,0,0.2)


            }

            ::slotted([slot="illustrationImage"]){
                  
                  height:auto;
                  width:100%;
                
                  object-fit:contain;
                  
            }
            
            ::slotted([slot="heading"]){
                  font-size:1rem;
                  margin-bottom:0.5rem !important;
            }
            ::slotted([slot="summary"]){
                font-size:0.75rem;
                color:black !important;
            }
            ::slotted([slot="languages"]){
                
            }

      </style>
      <div class="root">
          <div class="illustration">
             <slot name="illustrationImage">Default Image</slot>
          </div>
          <div class="card-details">
            <slot name="heading" >Default Heading</slot>
            <slot name="summary">Default Summary</slot>
            <slot name="languages"></slot>
          </div>
      </div>
`;

class ExperienceTemplate extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "closed" });

    let clone = experienceTemplate.content.cloneNode(true);

    this.root.append(clone);
  }

  
}

customElements.define("experience-template", ExperienceTemplate);
