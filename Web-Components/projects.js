const projectTemplate = document.createElement("template");

projectTemplate.innerHTML = `
      <style>
            
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Poppins&display=swap');
              
          

            :host(experience-project){
                display:block;
                
                font-familiy:"Poppins",san-serif;
            }

                     
            .root{
                width:15rem;
                aspect-ratio:1/1.5;

                color:white;
                background-color:black;
                border-radius:2.1em !important;

                overflow:hidden;
                box-shadow:0.3rem 0.3rem rgba(50,50,50,0.5);
            }

            .card-banner{
                height:50%;

                display:flex;
                justify-content:center;

                background:linear-gradient(rgba(255,255,255,1),rgba(0,0,0,1));
            }

           
           

            
            .card-details{
              height:50%;
              padding:1rem;
            }

            ::slotted([slot="projectImage"]){
                  height:100%; 
                  object-fit:contain;
                  opacity:0.7;
            }
            
            ::slotted([slot="heading"]){
                  font-size:1rem;
                  margin-bottom:0.5rem !important;
            }
            ::slotted([slot="summary"]){
                font-size:0.75rem;
                color:white !important;
            } 

      </style>
      <div class="root">
          <div class="card-banner">
             <slot name="projectImage">Default Image</slot>
          </div>
          <div class="card-details">
            <slot name="heading" >Default Heading</slot>
            <slot name="summary">Default Summary</slot>
          </div>
          <div>
            <button onclick=""> </button>
          </div>
      </div>
`;

class CardProjectTemplate extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "closed" });

    let clone = projectTemplate.content.cloneNode(true);

    this.root.append(clone);
  }
}



export  { CardProjectTemplate };
