export const initProjects = (): void => {
  const items = Array.from(
    document.querySelectorAll<HTMLDivElement>(".project-item")
  );
  const details = document.querySelector<HTMLDivElement>(".project-details");

  const projects = [
    {
      name: "LCVS",
      subtitle: "Localized Version Control System",
      description:
        "Git-like version control tool, not Git, ideal for learning semantic versioning (semver).",
      visit: "#",
      github: "#",
    },
    {
      name: "VS Code GLSL Highlighter",
      subtitle: "GLSL Highlighting & Live Preview",
      description:
        "VS Code extension that provides GLSL syntax highlighting, grammar checking, and live shader preview.",
      visit: "#",
      github: "#",
    },
    {
      name: "Developer Tools",
      subtitle: "Custom Developer Utilities",
      description:
        "A set of tools for developers including a ticketing system similar to Jira and automation scripts for easier workflows.",
      visit: "#",
      github: "#",
    },
    {
      name: "AGI - Animated Graphical Illustrator",
      subtitle: "Custom Animation Tool",
      description:
        "Used to create animations based on a custom file type with procedural animation features.",
      visit: "#",
      github: "#",
    },
    {
      name: "OpenGL Local Version",
      subtitle: "Static Bundler / Renderer",
      description:
        "A static bundler that handles OpenGL assets locally with a rendering pipeline for quick previews.",
      visit: "#",
      github: "#",
    },
    // Add more projects as needed...
  ];

  if (!details) return;

  const updateDetails = (index: number) => {
    items.forEach((item, i) => item.classList.toggle("active", i === index));
    const project = projects[index];
    if (!project) return;

    details.querySelector<HTMLDivElement>(".project-icon-large")!.textContent =
      items[index].querySelector<HTMLDivElement>(".project-icon")!
        .textContent || "📁";
    details.querySelector<HTMLHeadingElement>(".project-name")!.textContent =
      project.name;
    details.querySelector<HTMLParagraphElement>(
      ".project-subtitle"
    )!.textContent = project.subtitle;
    details.querySelector<HTMLParagraphElement>(
      ".project-description"
    )!.textContent = project.description;
    details.querySelector<HTMLAnchorElement>(".btn.visit")!.href =
      project.visit;
    details.querySelector<HTMLAnchorElement>(".btn.github")!.href =
      project.github;
  };

  items.forEach((item, i) => {
    item.addEventListener("click", () => updateDetails(i));
  });

  updateDetails(0); // initial selection
};
