import { ThreeJs } from "./scripts/three-js/main.js";
import {navigateToPage} from "./scripts/utils/icon.js"
import { registerWebComponents } from "./scripts/web-components/registerElements.js";

/**
 * 
 * @param {*} tag string html id tag
 * @param {*} eventType the type of event listner tag eg "click"
 * @param {*} callback the function that has to be called upon the following the given event
 */
function registerEvents(tag,eventType,callback) {
    const icons = document.querySelectorAll(tag);
    icons.forEach((icon) => {
      icon.addEventListener(eventType, callback);
    });
}

function registerAllEvents(){
    registerEvents("custom-icon","click",navigateToPage);
    registerWebComponents();
    const threeJs=ThreeJs();
    threeJs.configure();
    threeJs.runThreeJs();
}

/**
 * @description primary end point on the script
 */
const runApp=()=>{
    document.addEventListener("DOMContentLoaded", () => {
        registerAllEvents();
       
    });
}

runApp();