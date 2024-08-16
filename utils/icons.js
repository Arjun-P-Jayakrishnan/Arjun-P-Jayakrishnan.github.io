const template=document.createElement('template');
template.innerHTML=`
  <link rel='stylesheet' href='/utils//icons.css'>
  <div class="root">
  
  </div>
`


class Icon extends HTMLElement{


  constructor(){
    super();
    this.root=this.attachShadow({mode:'closed'});
    const clone=template.content.cloneNode(true);
    this.root.append(clone);
  }


  //allowed attributes
  static get observedAttributes(){
      return ['link','size'];
  }

  //sync with attributes
  get link(){
      
      return this.getAttribute('link');
  }

  set link(value){
      
    this.setAttribute('link',value);
  }

  get size(){
      
        return this.getAttribute('size');
  }

  set size(value){

        return this.setAttribute('size',value)
  }

  attributeChangedCallback(attrName,oldVal,newVal){
  
      if(attrName.toLowerCase()==='link'){
          const div=this.root.querySelector('.root');
        
        //checks if it exists or create it
        let img = div.querySelector('img')?div.querySelector('img'):document.createElement('img');

        img.className='link'
        img.src=this.getLinkFromIconName(newVal);

        div.append(img)
      }

      if(attrName === 'size') {
        
        const div=this.root.querySelector('.root');

        div.style.height =newVal ?? "1rem"

      }

  }


  /*
   *@description - allows to get links
   * */
  getLinkFromIconName(iconName){

    let link="";

    switch(iconName){

        case "github":
                link="./assets/Icons/github.png";
                break;
        case "linkedIn":
                link="./assets/Icons/linkedin.png";
                break;
        case "down-arrow":
                link="./assets/Icons/angle-bottom-icon.png";
                break;
    }

    return link;

  }
}

export {Icon}
