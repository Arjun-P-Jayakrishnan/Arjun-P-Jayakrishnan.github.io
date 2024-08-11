class Table extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const headers = this.dataset.headers
      .split(",")
      .map((header) => header.trim());

    console.log(headers);

    this.root.innerHTML = `
    <link rel="stylesheet" href="/utils/table.css">
          <table>
            <thead>
              <tr>
                ${headers.map(header=>`<th>${header}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
    `;
  }

  /**
   * @param data {string[][]}
   */
  set data(data){

    const tableBody = this.root.querySelector("tbody");
    
    const rows= data.map( rowData =>{
        const row=document.createElement("tr");

        const cells= rowData.map(cellData=>{
            const cell = document.createElement('td');
            cell.textContent=cellData;
            return cell;
        });

      console.log(cells)
      row.append(...cells);
      return row;
    });
    console.log(rows)
    tableBody.innerHTML = "";
    tableBody.append(...rows);
  } 
}

export { Table };
