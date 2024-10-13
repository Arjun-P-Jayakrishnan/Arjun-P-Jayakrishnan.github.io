const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="/utils/icons.css">
  <div class="root">
  <div class="code-header">

  </div>
  <div class="code-content">
  </div>
  </div>
`;

class CodeSnippets extends HTMLElement {

  constructor() {
    super();

    this.root = this.attachShadow({ mode: "closed" });
    const clone = template.content.cloneNode(true);
    this.root.append(clone);
  }

  connectedCallback(){
    const header=this.root.querySelectorAll('code-header');
    console.log(header,this.root.innerHTML)

    header.innerHTML=`
        <h1>Hedaer</h1>
    `;

    thir.root.append(header)
  }

  static get observedAttributes() {
    return ['isBash'];
  }


  //sync with attributes
  get isBash() {
    return this.getAttribute('isBash')
  }

  set isBash(value) {
    return this.setAttribute('isBash', this.SanitizeIsBash(value))
  }

  //sanitisation for isBash
  SanitizeIsBash(value) {
    switch (value.toLowerCase()) {

      case "true":
        return "true";

      case "false":
        return "false";

      default:
        return "false";


    }
  }

  attributeChangedCallback(attrName,olVal,newVal){
    
    if(attrName.toLowerCase()==="isbash"){
      const div=this.root.querySelector(".code-content");
      
      const codeLines=this.ParseCodeBySemicolons(newVal);

      div.append(codeLines)
    
    }

  }

  /*
   * @description - a function that takes in a string and parses the strings into different lines based on semi colons
   * @param code - a code snippet or runnable code lines
   * @returns html elements for each corresponding code line
   */
 ParseCodeBySemicolons(code){
   //create a div element
    const div=document.createElement("div");
    div.className="code";



    const lines=code.split(';');
    
    const codeLines=lines.map((code)=>{
      // create code tag to encapsulate the code and represent each line
      const codeTag=document.createElement("code");
      codeTag.className="code-line";
      codeTag.innerText="";
      codeTag.innerText=code+";";


      return codeTag;
    })

   div.append(...codeLines)
  return div;
 } 

}

export {CodeSnippets}
