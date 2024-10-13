import { Table } from "./utils/table.js";
import { ExperienceTemplate } from "./Web-Components/experience.js";
import { CardProjectTemplate } from "./Web-Components/projects.js";
import { Icon } from "./utils/icons.js";
import { AboutCard } from "./Web-Components/about-card.js";
import { CodeSnippets } from "./utils/code.js";

//define custom elements

customElements.define("card-project", CardProjectTemplate);
customElements.define("experience-template", ExperienceTemplate);
customElements.define("programming-table", Table);
customElements.define("custom-icon", Icon);
customElements.define("about-card", AboutCard);
customElements.define("code-snippets",CodeSnippets);

//First render
document.addEventListener("DOMContentLoaded", () => {
  registerEvents();
  main();
 });


//Register Events for 
function registerEvents() {
  const icons = document.querySelectorAll("custom-icon");
  icons.forEach((icon) => {
    icon.addEventListener("click", navigateToPage);
  });
}

function main() {
  //HTML has loaded
}

// Navigate to sites
function navigate(site) {
  switch (site) {
    case "github":
      location.href = "https://github.com/Arjun-P-Jayakrishnan";
      break;
    case "linkedin":
      location.href =
        "https://www.linkedin.com/in/arjun-p-jayakrishnan-5b971b244";
      break;
    default:
      break;
  }
}


//Navigate To Pages
function navigateToPage(ev) {
  const target = ev.target;

  switch (target.link) {
    case "github":
      navigate("github");
      break;
    case "linkedIn":
      navigate("linkedin");
      break;
  }
}


const programsAcademicTable = document.getElementById("academic");
const programsHobbyTable = document.getElementById("hobby");
/**
 * @type {Table}
 */
programsAcademicTable.data = [
  ["Blue J", "java", "Basics Of Programming"],
  ["Shell Scripting", "shell", "Basics Of Shell Scripting"],
  ["C", "C", "Data Structures, Memory Mangement,Pointers"],
  ["MySQL", "MySQL", "Basics Of SQL"],
];

programsHobbyTable.data = [
  ["JavaScript", "js", "Basics of DOM Manipulation"],
  ["Dart", "dart", "Flutter integration"],
  ["TypeScript", "ts", "Basics and usage of types for javascript"],
];

