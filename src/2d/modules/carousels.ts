/**
 * Carousel configuration
 */
export interface CarouselConfig {
  trackSelector: string;
  viewportSelector: string;
  prevSelector: string;
  nextSelector: string;
  itemSelector: string;
  step?: number; // Optional step override
  highlightSelector?: string; // Optional selector for highlight (dots or circles)
}

/**
 * Initialize a generic horizontal carousel
 * @param config Carousel configuration
 */
export const initCarousel = (
  config: CarouselConfig
): (() => void) | undefined => {
  const track = document.querySelector<HTMLDivElement>(config.trackSelector);
  const viewport = document.querySelector<HTMLDivElement>(
    config.viewportSelector
  );
  const prev = document.querySelector<HTMLButtonElement>(config.prevSelector);
  const next = document.querySelector<HTMLButtonElement>(config.nextSelector);
  const items = track
    ? Array.from(track.querySelectorAll<HTMLDivElement>(config.itemSelector))
    : [];
  const highlights = config.highlightSelector
    ? Array.from(
        document.querySelectorAll<HTMLDivElement>(config.highlightSelector)
      )
    : [];

  if (!track || !viewport || !prev || !next || items.length === 0) {
    console.warn("[Carousel] Missing elements", config);
    return;
  }

  const STEP = config.step ?? items[0].offsetWidth + 32; // default to width + gap
  let activeIndex = 0;

  const update = () => {
    prev.disabled = activeIndex === 0;
    next.disabled = activeIndex === items.length - 1;

    // Center active item
    const offset =
      activeIndex * STEP - viewport.offsetWidth / 2 + items[0].offsetWidth / 2;
    track.style.transform = `translateX(${-offset}px)`;

    // Toggle active class for items
    items.forEach((item, i) =>
      item.classList.toggle("active", i === activeIndex)
    );

    // Toggle highlight (if exists)
    highlights.forEach((el, i) =>
      el.classList.toggle("active", i === activeIndex)
    );
  };

  const goPrev = () => {
    activeIndex = Math.max(activeIndex - 1, 0);
    update();
  };

  const goNext = () => {
    activeIndex = Math.min(activeIndex + 1, items.length - 1);
    update();
  };

  prev.addEventListener("click", goPrev);
  next.addEventListener("click", goNext);

  // Optional: click on highlight elements to jump
  highlights.forEach((el, i) =>
    el.addEventListener("click", () => {
      activeIndex = i;
      update();
    })
  );

  window.addEventListener("resize", update);

  // Initial update
  update();

  // Return a cleanup function to remove listeners
  return () => {
    prev.removeEventListener("click", goPrev);
    next.removeEventListener("click", goNext);
    highlights.forEach((el, i) =>
      el.removeEventListener("click", () => {
        activeIndex = i;
        update();
      })
    );
    window.removeEventListener("resize", update);
  };
};

/**
 * Initialize timeline carousel
 */
export const initTimelineCarousel = () => {
  return initCarousel({
    trackSelector: ".timeline-track",
    viewportSelector: ".timeline-viewport",
    prevSelector: ".timeline-nav.prev",
    nextSelector: ".timeline-nav.next",
    itemSelector: ".timeline-card",
    step: 120,
    highlightSelector: ".timeline-dot", // optional: highlights active card
  });
};

/**
 * Initialize tech carousel
 */
export const initTechCarousel = () => {
  return initCarousel({
    trackSelector: ".tech-track",
    viewportSelector: ".tech-viewport",
    prevSelector: ".tech-nav.prev",
    nextSelector: ".tech-nav.next",
    itemSelector: ".tech-category-card",
  });
};
