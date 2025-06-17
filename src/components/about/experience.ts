const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/style/experience.css">
    <div class="experience">
        <ul class="job-list">
          <li class="job-item">
            <div class="job-header">
              <h3 class="job-title">Title</h2>
              <h5 class="job-duration">Duration</h2>
            </div>
            <div class="job-details">
              <ul class="job-responsibilities">
                <li class="job-responsibility-item">Done task which improved some item</li>
              </ul>
            </div>
          </li>
        </ul>
    </div>
`;

interface Components {
  root: HTMLDivElement | null;
  jobList: HTMLUListElement | null;
}

export interface JobExperience {
  title: string;
  duration: string;
  responsibilities: string[];
}

export class ExperiencePage extends HTMLElement {
  root: ShadowRoot;
  components: Components;
  events: Record<
    string,
    { button: HTMLButtonElement; callback: (e: Event) => void }
  > = {};

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const clone = template.content.cloneNode(true);

    this.root.appendChild(clone);

    this.components = {
      root: this.root.querySelector(".experience") as HTMLDivElement,
      jobList: this.root.querySelector(".job-list") as HTMLUListElement,
    };
  }

  connectedCallback() {}

  disconnectedCallback() {}

  private addEvent(
    button: HTMLButtonElement,
    index: number,
    collapsibleElement: HTMLDivElement
  ) {
    const fn = (e: Event) => {
      collapsibleElement.classList.toggle("hidden");
      console.log("button is clicked ", index);
    };
    this.events[`button :${index}`] = {
      button: button,
      callback: fn,
    };
    button.addEventListener("click", fn);
    console.log("attaching event", index);
  }

  private addJobExperience(data: {
    title: string;
    duration: string;
    responsibilities: string[];
    index: number;
  }): HTMLLIElement {
    const li = document.createElement("li");
    li.classList.add("job-item");

    const header = document.createElement("div");
    header.classList.add("job-header");

    const title = document.createElement("h3");
    title.classList.add("job-title");
    title.textContent = data.title;

    const duration = document.createElement("h5");
    duration.classList.add("job-duration");
    duration.textContent = data.duration;

    header.appendChild(title);
    header.appendChild(duration);
    // header.appendChild(button);

    const details = document.createElement("div");
    details.classList.add("job-details");
    details.classList.add("hidden");

    // this.addEvent(button, data.index, details);

    const responsibilities = document.createElement("ul");
    responsibilities.classList.add("job-responsibilities");

    const documentFragment = document.createDocumentFragment();

    data.responsibilities.forEach((responsibility) => {
      const _li = document.createElement("li");
      _li.classList.add("job-responsibility-item");
      _li.textContent = responsibility;
      documentFragment.appendChild(_li);
    });

    responsibilities.appendChild(documentFragment);
    details.appendChild(responsibilities);
    li.appendChild(header);
    li.appendChild(details);

    return li;
  }

  private removeEvents() {
    console.log("remove all");
    Object.entries(this.events).forEach((entry) => {
      entry[1].button.removeEventListener("click", entry[1].callback);
    });
  }

  private inflateCarousel(dataList: Array<JobExperience>) {
    if (!this.components.jobList) return;
    this.removeEvents();
    this.components.jobList.innerHTML = "";

    dataList.forEach((data, index) => {
      this.components.jobList?.appendChild(
        this.addJobExperience({
          ...data,
          index: index,
        })
      );
    });
  }

  set Experience(data: Array<JobExperience>) {
    console.log("experience", data);
    this.inflateCarousel(data);
  }
}
