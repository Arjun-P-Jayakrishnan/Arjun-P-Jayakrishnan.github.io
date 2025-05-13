// src/components/threejs/scene_inspector.ts
var template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/style/scene_inspector.css">
    <div class="inspector-wrapper">

      <div class="resizer"></div>
    
      <div class="scene-inspector hidden">
        <div class="inspector-header">
          <span class="title">Scene Inspector</span>
          <button class="close-btn"> \u2715 </button>
        </div>

        <div class="inspector-content">
          <ul class="tree-view">

          </ul>
        </div>
      </div>

      
    </div>
`;
var SceneInspector = class extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    this.root.appendChild(clone);
    this.state = {
      isMenuHidden: true,
      isResizing: false
    };
    this.element = this.root.querySelector(".scene-inspector");
    this.treeView = {
      Objects: [],
      Materials: []
    };
    this.handleResize();
  }
  set eventBusManager(eventBusManager) {
    this.eventBus = eventBusManager.debugBus;
    this.eventBus?.on("debug:inspector", (data) => {
      this.handleShowHideEvent(data);
    });
  }
  handleShowHideEvent(data) {
    this.state.isMenuHidden = !this.state.isMenuHidden;
    if (this.state.isMenuHidden) {
      this.element.classList.add("hidden");
    } else {
      this.element.classList.remove("hidden");
      if (data.scene != null && data.scene !== void 0) {
        this.renderTree(data.scene);
      }
    }
  }
  handleResize() {
    const resizer = this.root.querySelector(".resizer");
    const panel = this.root.querySelector(".scene-inspector");
    resizer.addEventListener("mousedown", (e) => {
      this.state.isResizing = true;
      document.body.style.cursor = "ew-resize";
      e.preventDefault();
    });
    window.addEventListener("mousemove", (e) => {
      if (!this.state.isResizing) return;
      const newWidth = window.innerWidth - e.clientX;
      panel.style.width = `${Math.min(Math.max(newWidth, 200), 600)}px`;
    });
    window.addEventListener("mouseup", (e) => {
      if (this.state.isResizing) {
        this.state.isResizing = false;
        document.body.style.cursor = "";
      }
    });
  }
  toggleCloseButton() {
    this.state.isMenuHidden = true;
    this.element.classList.add("hidden");
  }
  collectSceneData(scene) {
    const objects = [];
    const materialsMap = /* @__PURE__ */ new Map();
    const traverse = (object) => {
      const node = {
        id: object.uuid,
        label: object.name == "" ? object.type : object.name,
        type: object.type,
        nodes: []
      };
      object.children.forEach((child) => {
        node.nodes.push(traverse(child));
      });
      if ("material" in object && object.material) {
        const mats = Array.isArray(object.material) ? object.material : [object.material];
        mats.forEach((mat) => {
          if (!materialsMap.has(mat.uuid)) {
            materialsMap.set(mat.uuid, {
              id: mat.uuid,
              label: mat.name == "" ? mat.type : mat.name,
              type: "material",
              nodes: []
            });
          }
        });
      }
      return node;
    };
    scene.children.forEach((child) => {
      objects.push(traverse(child));
    });
    return {
      Objects: objects,
      Materials: Array.from(materialsMap.values())
    };
  }
  renderTree(scene) {
    this.treeView = this.collectSceneData(scene);
    const treeNode = this.root.querySelector(".tree-view");
    treeNode.innerHTML = ``;
    this.addCategory("Objects", treeNode, this.treeView.Objects);
    this.addCategory("Materials", treeNode, this.treeView.Materials);
  }
  addCategory(label, treeRoot, nodes) {
    const li = document.createElement("li");
    li.classList.add("category", "collapsed");
    const header = document.createElement("div");
    header.classList.add("category-toggle");
    header.textContent = `\u2B9E ${label}`;
    header.addEventListener("click", (e) => {
      li.classList.toggle("collapsed");
      const isCollapsed = li.classList.contains("collapsed");
      header.textContent = isCollapsed ? `\u2B9E ${label}` : `\u25BC ${label}`;
    });
    const nodeList = document.createElement("ul");
    nodeList.classList.add("category-content");
    nodes.forEach((node) => {
      nodeList.appendChild(this.renderTreeNode(node));
    });
    li.appendChild(header);
    li.appendChild(nodeList);
    treeRoot.appendChild(li);
  }
  renderTreeNode(node) {
    const nodeRoot = document.createElement("li");
    nodeRoot.classList.add("tree-node");
    const label = document.createElement("div");
    label.classList.add("node-label");
    label.textContent = `${node.label} (${node.type})`;
    nodeRoot.appendChild(label);
    if (node.nodes.length > 0) {
      nodeRoot.classList.add("collapsed");
      const ul = document.createElement("ul");
      node.nodes.forEach((node2) => {
        ul.appendChild(this.renderTreeNode(node2));
      });
      label.addEventListener("click", () => {
        nodeRoot.classList.toggle("collapsed");
      });
      nodeRoot.appendChild(ul);
    }
    return nodeRoot;
  }
  connectedCallback() {
    const closeButton = this.root.querySelector(".close-btn");
    closeButton.addEventListener("click", () => {
      this.toggleCloseButton();
    });
  }
  disconnectedCallback() {
  }
};

export {
  SceneInspector
};
//# sourceMappingURL=chunk-Y5OJP2U5.js.map