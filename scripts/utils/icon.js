
/**
 * 
 * @param {*} ev th event itself
 * 
 */
export function navigateToPage(ev) {
    const target = ev.target;
  
    switch (target.link) {
      case "github":
        location.href = "https://github.com/Arjun-P-Jayakrishnan";
        break;
      case "linkedIn":
        location.href =
          "https://www.linkedin.com/in/arjun-p-jayakrishnan-5b971b244";
        break;
    }
}
  

