/**
 * @typedef {Object} SectionData
 * @property {string} id - The ID of the section in the DOM
 * @property {string} title - The title to show in the HUD
 * @property {string} subtitle - The subtitle to show in the HUD
 */
interface SectionData {
  id: string;
  title: string;
  subtitle: string;
}

/**
 * Initialize the Visor HUD, setting up scroll tracking
 * and updating HUD elements based on the closest section.
 */
export function initVisorHUD() {
  console.log("[HUD] Initializing Visor HUD...");

  const sections: SectionData[] = getSections();

  const visor = document.getElementById("visor");
  const storyTitle = document.querySelector<HTMLDivElement>(
    "#story-hud .story-title"
  );
  const storySubtitle = document.querySelector<HTMLDivElement>(
    "#story-hud .story-subtitle"
  );

  if (!visor || !storyTitle || !storySubtitle) {
    console.warn("[HUD] Missing visor or HUD elements");
    return;
  }

  const sectionElements = mapSectionsToElements(sections);
  if (!sectionElements.length) {
    console.warn("[HUD] No valid sections found");
    return;
  }

  let lastSectionId: string | null = null;

  /**
   * Update the HUD based on the closest section to scrollTop
   */
  const updateHUD = () => {
    const scrollTop = visor.scrollTop;
    const closestSection = findClosestSection(sectionElements, scrollTop);

    if (closestSection && lastSectionId !== closestSection.id) {
      storyTitle.textContent = closestSection.title;
      storySubtitle.textContent = closestSection.subtitle;
      lastSectionId = closestSection.id;
      console.log(`[HUD] Updated HUD: ${closestSection.title}`);
    }
  };

  visor.addEventListener("scroll", updateHUD, { passive: true });

  // Initial HUD update
  updateHUD();
}

/**
 * Define all sections of the visor.
 */
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

/**
 * Map SectionData objects to their DOM elements.
 * @param {SectionData[]} sections
 * @returns {(SectionData & { el: HTMLElement })[]}
 */
function mapSectionsToElements(
  sections: SectionData[]
): (SectionData & { el: HTMLElement })[] {
  return sections
    .map((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) {
        console.warn(`[HUD] Section not found: ${sec.id}`);
        return null;
      }
      return { ...sec, el };
    })
    .filter((sec): sec is SectionData & { el: HTMLElement } => sec !== null);
}

/**
 * Find the section closest to the current scrollTop.
 * @param {(SectionData & { el: HTMLElement })[]} sections
 * @param {number} scrollTop
 * @returns {(SectionData & { el: HTMLElement }) | null}
 */
function findClosestSection(
  sections: (SectionData & { el: HTMLElement })[],
  scrollTop: number
): (SectionData & { el: HTMLElement }) | null {
  let closest: (SectionData & { el: HTMLElement }) | null = null;
  let minDistance = Infinity;

  for (const sec of sections) {
    const distance = Math.abs(sec.el.offsetTop - scrollTop);
    if (distance < minDistance) {
      minDistance = distance;
      closest = sec;
    }
  }

  return closest;
}
