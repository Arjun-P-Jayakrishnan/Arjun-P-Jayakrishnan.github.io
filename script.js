import { Table } from "./utils/table.js";

customElements.define("programming-table", Table);


const programsTable=document.getElementById("academic");

/**
 * @type {Table}
 */
programsTable.data=[
  ["1","2","3"],
  ["","",""]
];




















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
