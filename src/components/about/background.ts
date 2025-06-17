const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/style/background.css">
    <div class="background">
       <section class="summary">
          <h2 class="summary--title">Title</h2>
          <p class="summary--description">Description</p>
       </section>

       <section class="education">
          <h2 class="education--title">🎓 Education</h2>
          <article class="education--item">
            <h3 class="education--course">Course</h3>
            <h4 class="education--institute">Institute Name</h4>
            <p class="education--description">Description</p>
          </article>
       </section>

       <section class="skills">
        <h2 class="skills-title">🛠 Skills</h2>

        <ul class="skills--list">
            <li class="skill--category">
                <h3 class="skill--category--title">Title</h3>
                <ul class="skill--tags">
                  <li class="skill--item">Skill 1</li>
                  <li class="skill--item">Skill 2</li>
                  <li class="skill--item">Skill 3</li>
                  <li class="skill--item">Skill 4</li>
                  <li class="skill--item">Skill 5</li>
                  <li class="skill--item">Skill 6</li>

                </ul>
            </li>
        </ul>
       </section>
    </div>
`;

interface Components {
  summary: {
    root: HTMLElement | null;
    title: HTMLHeadingElement | null;
    description: HTMLParagraphElement | null;
  };
  education: {
    course: HTMLHeadingElement | null;
    institution: HTMLHeadingElement | null;
    description: HTMLParagraphElement | null;
  };
  skillsRoot: HTMLUListElement;
}

export interface Skill {
  title: string;
  tags: string[];
}

export interface Summary {
  title: string;
  description: string;
}

export interface Education {
  institute: string;
  course: string;
  description: string;
}

export class BackgroundPage extends HTMLElement {
  root: ShadowRoot;
  components: Components;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const clone = template.content.cloneNode(true);

    this.root.appendChild(clone);

    this.components = {
      summary: {
        root: this.root.querySelector(".summary") as HTMLElement,
        title: this.root.querySelector(".summary--title") as HTMLHeadingElement,
        description: this.root.querySelector(
          ".summary--description"
        ) as HTMLParagraphElement,
      },
      education: {
        course: this.root.querySelector(
          ".education--course"
        ) as HTMLHeadingElement,
        institution: this.root.querySelector(
          ".education--institute"
        ) as HTMLHeadingElement,
        description: this.root.querySelector(
          ".education--description"
        ) as HTMLParagraphElement,
      },

      skillsRoot: this.root.querySelector(".skills--list") as HTMLUListElement,
    };
  }

  connectedCallback() {}

  disconnectedCallback() {}

  set Summary(data: Summary) {
    console.log("update summary");
    const summary = this.components.summary;

    if (!summary.title) return;
    summary.title.textContent = data.title;

    if (!summary.description) return;
    summary.description.textContent = data.description;
  }

  set Education(data: Education) {
    console.log("update education");
    const education = this.components.education;

    if (!education.course) return;
    education.course.textContent = data.course;

    if (!education.institution) return;
    education.institution.textContent = data.institute;

    if (!education.description) return;
    education.description.textContent = data.description;
  }

  private addSkill(data: Skill): HTMLLIElement {
    console.log("update skills");

    const li = document.createElement("li");
    li.classList.add("skill--category");

    const h3 = document.createElement("h3");
    h3.classList.add("skill--category--title");
    h3.textContent = data.title;
    li.appendChild(h3);

    const ul = document.createElement("ul");
    ul.classList.add("skill--tags");
    li.appendChild(ul);

    data.tags.forEach((item) => {
      const tag = document.createElement("li");
      tag.classList.add("skill--item");
      tag.textContent = item;
      ul.appendChild(tag);
    });

    return li;
  }

  set Skills(skills: Array<Skill>) {
    const fragment = document.createDocumentFragment();
    skills.forEach((skill) => {
      const li = this.addSkill(skill);

      fragment.appendChild(li);
    });

    this.components.skillsRoot.innerHTML = "";
    this.components.skillsRoot.appendChild(fragment);
  }
}
