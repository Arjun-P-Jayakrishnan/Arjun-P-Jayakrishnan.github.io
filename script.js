import { Table } from "./utils/table.js";
import {ExperienceTemplate} from './Web-Components/experience.js'
import {CardProjectTemplate} from './Web-Components/projects.js'


customElements.define("card-project", CardProjectTemplate);
customElements.define("experience-template", ExperienceTemplate);
customElements.define("programming-table", Table);







const programsAcademicTable=document.getElementById("academic");
const programsHobbyTable=document.getElementById("hobby");













/**
 * @type {Table}
 */
programsAcademicTable.data=[
  ["Blue J","java","Basics Of Programming"],
  ["Shell Scripting","shell","Basics Of Shell Scripting"],
  ["C","C","Data Structures, Memory Mangement,Pointers"],
  ["MySQL","MySQL","Basics Of SQL"]
];

programsHobbyTable.data=[
  ["JavaScript","js","Basics of DOM Manipulation"],
  ["Dart","dart","Flutter integration"],
  ["TypeScript","ts","Basics and usage of types for javascript"]

]



















/*
 * toggle Menu
 */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  /*Add or Remove open class*/
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/*
 *Open the pdf
 * */
function openPDF() {
  window.open("./assets/resume.pdf");
}

/*
 * Navigate to contacts
 */
function navigateToContact() {
  location.href = "./#contact";
}

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
