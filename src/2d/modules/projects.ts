/**
 * @file projects.ts
 * @description Handles the project items and updates the details panel.
 */

interface Project {
  name: string;
  subtitle: string;
  description: string;
  visit: string;
  github: string;
}

/**
 * Initialize projects section
 * @returns A cleanup function to remove click listeners
 */
export function initProjects(): () => void {
  const items = Array.from(
    document.querySelectorAll<HTMLDivElement>(".project-item")
  );
  const details = document.querySelector<HTMLDivElement>(".project-details");
  if (!details || items.length === 0) return () => {};

  const projects: Project[] = [
    {
      name: "LCVS",
      subtitle: "Localized Version Control System",
      description: "Git-like version control tool",
      visit: "#",
      github: "#",
    },
    {
      name: "VS Code GLSL Highlighter",
      subtitle: "GLSL Highlighting & Live Preview",
      description: "Live shader preview",
      visit: "#",
      github: "#",
    },
    {
      name: "Developer Tools",
      subtitle: "Custom Developer Utilities",
      description: "Ticketing & automation tools",
      visit: "#",
      github: "#",
    },
    {
      name: "AGI - Animated Graphical Illustrator",
      subtitle: "Custom Animation Tool",
      description: "Procedural animation editor",
      visit: "#",
      github: "#",
    },
    {
      name: "OpenGL Local Version",
      subtitle: "Static Bundler / Renderer",
      description: "OpenGL preview pipeline",
      visit: "#",
      github: "#",
    },
  ];

  const listeners: Array<() => void> = [];

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
    const handler = () => updateDetails(i);
    item.addEventListener("click", handler);
    listeners.push(() => item.removeEventListener("click", handler));
  });

  updateDetails(0);

  return () => listeners.forEach((fn) => fn());
}
