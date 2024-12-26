//create template
const navbarTemplate = document.createElement("template");

navbarTemplate.innerHTML = `
      <link rel="stylesheet" href="/scripts/components/navbar/navbar.css">  
      <nav id="desktop-nav"class="root">
        <div class="logo">Arjun P Jayakrishnan</div>
        <div>
            <ul class="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
        </nav>
      <nav id="hamburger-nav">
      <div class="logo">Arjun P Jayakrishnan</div>
      <div class="hamburger-menu">
        <div class="hamburger-icon" onclick="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="menu-links">
          <li><a href="#about" onclick="toggleMenu()">About</a></li>
          <li><a href="#experience" onclick="toggleMenu()">Experience</a></li>
          <li><a href="#projects" onclick="toggleMenu()">Projects</a></li>
          <li><a href="#contact" onclick="toggleMenu()">Contact</a></li>
        </div>
      </div>
    </nav>
`;

class NavbarTemplate extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });

    let clone = navbarTemplate.content.cloneNode(true);
    
    this.root.append(clone);
  }
}



export  { NavbarTemplate };
