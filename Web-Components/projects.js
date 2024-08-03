const template = document.createElement('template');
template.innerHTML=`
  <style>
      div{
          border:1em solid black;
      }

      :host{
          background-color:blue;
          display:block;
      }
      :host(project-template){
        background-color:white;
        display:block;
      }
  </style>
  <div>

      <h1>Detail</h1>
      <slot name="title"> Default Text</slot>
  </div>
`;

class ProjectTemplate extends HTMLElement {
  shadowRoot;
  div;

  constructor() {
    super();

    /**
     * the shadow root enables us not to affect outside
     *
     * mode
     *
     * open  :- parent components can actually access the elemnt
     *
     * close :- parent component cannot access the element
     */
    this.shadowRoot = this.attachShadow({ mode: "closed" });

    /*
     * @description - The div instead of being explicity done we now can use concept  of slots
     *
     * */
    this.div = template.content.cloneNode(true);
    this.addDivToDom();
  }

  /*
   *@description - component that adds the html elemnt to the shadowDom
   */
  addDivToDom = () => {
    this.shadowRoot.append(this.div);
  };

  /**
   * @description - creates a HTML Div Element which contains all the
   * inner HTML of the component
   *
   * @returns - div
   */
  createHTMlElement = () => {
    const div = document.createElement("div");
    div.textContent = " Detail ";

    return div;
  };
}

/*
 * Adds the component to the DOM 
 *
 * @note - all web components will have a '-' sign inside it 
 */
customElements.define("project-template", ProjectTemplate);
