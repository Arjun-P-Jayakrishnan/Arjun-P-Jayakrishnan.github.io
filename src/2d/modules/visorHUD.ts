/**
 * @file visorHUD.ts
 * @description Handles the Visor HUD scroll tracking for the 2D portfolio.
 */

interface SectionData {
  id: string;
  title: string;
  subtitle: string;
}

/**
 * Initialize the Visor HUD
 * Updates HUD elements (title/subtitle) based on scroll position
 * @returns A cleanup function to remove event listeners
 */
export function initVisorHUD(): () => void {
  const visor = document.getElementById("visor");
  const storyTitle = document.querySelector<HTMLDivElement>(
    "#story-hud .story-title",
  );
  const storySubtitle = document.querySelector<HTMLDivElement>(
    "#story-hud .story-subtitle",
  );
  const sideNavLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".visor-sidenav a"),
  );

  if (!visor || !storyTitle || !storySubtitle) return () => {};

  const sections = getSections()
    .map((sec) => {
      const el = document.getElementById(sec.id);
      return el ? { ...sec, el } : null;
    })
    .filter((sec): sec is SectionData & { el: HTMLElement } => sec !== null);

  let lastSectionId: string | null = null;

  const onScroll = () => {
    const scrollTop = visor.scrollTop;
    const closest = sections.reduce((prev, curr) => {
      const prevDist = Math.abs(prev.el.offsetTop - scrollTop);
      const currDist = Math.abs(curr.el.offsetTop - scrollTop);
      return currDist < prevDist ? curr : prev;
    }, sections[0]);

    if (closest.id !== lastSectionId) {
      storyTitle.textContent = closest.title;
      storySubtitle.textContent = closest.subtitle;

      // 🔹 Side nav sync
      sideNavLinks.forEach((link) =>
        link.classList.toggle("active", link.dataset.section === closest.id),
      );
      lastSectionId = closest.id;
    }
  };

  visor.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // initial update

  return () => visor.removeEventListener("scroll", onScroll);
}

function getSections(): SectionData[] {
  return [
    {
      id: "section-intro",
      title: "INTRODUCTION",
      subtitle: "DECODING SUBJECT",
    },
    { id: "section-about", title: "ABOUT", subtitle: "WHO IS INSIDE THE SUIT" },
    {
      id: "section-experience",
      title: "EXPERIENCE",
      subtitle: "TYPES OF WORK",
    },
    {
      id: "section-projects",
      title: "PROJECTS",
      subtitle: "PORTFOLIO SHOWCASE",
    },
    {
      id: "section-techstack",
      title: "TECH STACK",
      subtitle: "TOOLS & FRAMEWORKS",
    },
    { id: "section-contact", title: "CONTACT", subtitle: "LET'S CONNECT" },
  ];
}
