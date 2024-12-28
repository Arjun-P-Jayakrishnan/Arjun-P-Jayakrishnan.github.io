import { ThreeJs } from "./scripts/three-js/main.js";
import { RenderScene } from "./scripts/three-js/render.js";
import { navigateToPage } from "./scripts/utils/icon.js";
import { registerWebComponents } from "./scripts/web-components/registerElements.js";
import { resizeObserver } from "./scripts/webpage-observers/resize.js";

/**
 *
 * @param {*} tag string html id tag
 * @param {*} eventType the type of event listner tag eg "click"
 * @param {*} callback the function that has to be called upon the following the given event
 */
function registerEvents(tag, eventType, callback) {
  const icons = document.querySelectorAll(tag);
  icons.forEach((icon) => {
    icon.addEventListener(eventType, callback);
  });
}

function registerObservers(threeJs) {
  resizeObserver((event) => {
    console.log(event);
    threeJs.resize({
      innerWidth: event.target.innerWidth,
      innerHeight: event.target.innerHeight,
    });
  });
}

function registerAllEvents() {
  registerEvents("custom-icon", "click", navigateToPage);
  registerWebComponents();

  const threeJs = ThreeJs({ tag: "main" });
  const configureProps = threeJs.configure();

  const renderScene = RenderScene(
    configureProps.scene,
    configureProps.camera,
    configureProps.renderer
  );
  renderScene.loadBaseLayout({
    modelUrls: ["../assets/Models/carved_wooden_elephant_1k.glb"],
    hdriUrl: "../assets/HDR/metro_noord_1k.hdr",
  });

  registerObservers(threeJs);

  threeJs.runThreeJs(renderScene.render);
}

/**
 * @description primary end point on the script
 */
const runApp = () => {
  document.addEventListener("DOMContentLoaded", () => {
    registerAllEvents();
  });
};

runApp();
