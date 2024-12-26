// import { Table } from "./utils/table.js";
// import { ExperienceTemplate } from "./Web-Components/experience.js";

import { Icon } from "../components/icons/icons.js" 
// import { AboutCard } from "./Web-Components/about-card.js";
// import { CodeSnippets } from "./utils/code.js";
import { NavbarTemplate } from "../components/navbar/navbar.js"




export function registerWebComponents(){
    //define custom elements
    // customElements.define("card-project", Card);
    // customElements.define("experience-template", ExperienceTemplate);
    // customElements.define("programming-table", Table);
    customElements.define("custom-icon", Icon);
    // customElements.define("about-card", AboutCard);
    // customElements.define("code-snippets",CodeSnippets);
    customElements.define("nav-bar",NavbarTemplate);
}