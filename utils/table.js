class Table extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const headers = this.dataset.headers
      .split(",")
      .map((header) => header.trim());

    this.root.innerHTML = `
    <link rel="stylesheet" href="/utils/table.css">
          <table>
            <thead>
              <tr>
                ${headers.map((header) => `<th>${header}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
    `;
  }

  /**
   *@description  allows to get the link of the programming language
   *@param {*} name programming language name
   */
  getProgrammingLink(name) {
    let link = "";

    switch (name) {
      case "java":
        link =
          "https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white";
        break;
      case "shell":
        link =
          "https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white";
        break;
      case "C":
        link =
          "https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white";
        break;
      case 'MySQL':
              link='https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white';
              break;
      case 'js':
            link='https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E';
            break;
      case 'ts':
            link='https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white';
            break;
      case 'dart':
            link='https://img.shields.io/badge/dart-%230175C2.svg?style=for-the-badge&logo=dart&logoColor=white';
            break;
    }

    return link;
  }

  /**
   * @param data {string[][]}
   */
  set data(data) {
    const tableBody = this.root.querySelector("tbody");

    const rows = data.map((rowData) => {
      const row = document.createElement("tr");
      const cells = rowData.map((cellData, index) => {
        const cell = document.createElement("td");
        /*
         * @description changes link with image
         */
        if (index === 1) {
          
          const image = document.createElement("img");
          image.src = this.getProgrammingLink(cellData);
          image.alt = cellData;
          cell.append(image);
        } else {
          cell.textContent = cellData;
        }
        return cell;
      });

      
      row.append(...cells);
      return row;
    });

    //clear out contents
    tableBody.innerHTML = "";
    tableBody.append(...rows);
  }
}

export { Table };
