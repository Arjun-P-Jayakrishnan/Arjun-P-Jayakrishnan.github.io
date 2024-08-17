const template = document.createElement("template");
template.innerHTML = ` 
  <link rel="stylesheet" href="/Web-Components/3d-rotation.css">
      <div class="banner">
        <div class="slider">
            
        </div>
  </div>
`;

class Rotation3D extends HTMLElement {
  constructor() {
    super();
    this._childRead = false;
    this.root = this.attachShadow({ mode: "open" });

    const clone = template.content.cloneNode(true);
    this.root.append(clone);

    //this.onMutation = this.onMutation.bind(this);
  }

  connectedCallback() {
    let banner = null;
    let slider = null;
    this.root.querySelectorAll("div").forEach((_div) => {
      console.log(_div.className);
      if (_div.className === "slider") {
        console.log("slider done");
        slider = _div;
      } else if (_div.className === "banner") {
        banner = _div;
      }
    });
 

    if (!this._childRead) {
      this._childRead = true;

      if (this.hasChildNodes()) {
        const children = this.childNodes;

        const items = [];

        for (const node of children) {
          if (node.nodeName === "ABOUT-CARD") {
            const item = document.createElement("div");
            item.className = "item";
            item.append(node);
            items.push(item);
          }
        }

        slider.append(...items);
       // banner.append(slider);
        //this.root.append(banner)
        
      } else {
        console.log("no nodes");
      }
    }
  }

  set data(data) {
    if (div !== null) {
      const rows = data.map((rowData) => {
        //const item = document.createElement('div');
        //item.className = "item";
        // const item.append()
      });
    }
  }
}

export { Rotation3D };
