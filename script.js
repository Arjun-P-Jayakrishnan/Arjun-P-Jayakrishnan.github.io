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
