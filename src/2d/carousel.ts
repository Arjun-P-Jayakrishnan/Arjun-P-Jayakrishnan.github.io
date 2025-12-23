/**
 * Initializes a horizontal timeline carousel.
 * Handles navigation via arrows and dots and keeps track of active slide.
 */
export const carousel = (): void => {
  const track = document.querySelector<HTMLDivElement>(".timeline-track");
  const viewport = document.querySelector<HTMLDivElement>(".timeline-viewport");

  const dots = Array.from(
    document.querySelectorAll<HTMLDivElement>(".timeline-dot")
  );
  const cards = Array.from(
    document.querySelectorAll<HTMLDivElement>(".timeline-card")
  );

  const prev = document.querySelector<HTMLButtonElement>(".timeline-nav.prev");
  const next = document.querySelector<HTMLButtonElement>(".timeline-nav.next");

  if (
    !track ||
    !viewport ||
    !prev ||
    !next ||
    dots.length === 0 ||
    dots.length !== cards.length
  ) {
    console.warn("[Carousel] Missing elements or mismatch between dots/cards");
    return;
  }

  const STEP = 120; // should match CSS grid-auto-columns
  let activeIndex = 0;

  /**
   * Updates carousel UI: active dot, active card, arrow states, and track position.
   */
  const updateCarousel = (): void => {
    updateDots();
    updateCards();
    updateNav();
    updateTrack();
  };

  /**
   * Toggle active class on dots based on active index.
   */
  const updateDots = (): void => {
    dots.forEach((dot, i) => dot.classList.toggle("active", i === activeIndex));
  };

  /**
   * Toggle active class on cards based on active index.
   */
  const updateCards = (): void => {
    cards.forEach((card, i) =>
      card.classList.toggle("active", i === activeIndex)
    );
  };

  /**
   * Enable/disable prev/next buttons depending on active index.
   */
  const updateNav = (): void => {
    prev.disabled = activeIndex === 0;
    next.disabled = activeIndex === dots.length - 1;
  };

  /**
   * Translate track so active card is centered in the viewport.
   */
  const updateTrack = (): void => {
    const offset = activeIndex * STEP - viewport.offsetWidth / 2 + STEP / 2;
    track.style.transform = `translateX(${-offset}px)`;
  };

  /**
   * Move to previous card.
   */
  const goPrev = (): void => {
    activeIndex = Math.max(activeIndex - 1, 0);
    updateCarousel();
  };

  /**
   * Move to next card.
   */
  const goNext = (): void => {
    activeIndex = Math.min(activeIndex + 1, dots.length - 1);
    updateCarousel();
  };

  /**
   * Jump to a specific card index.
   * @param index Index of card to jump to
   */
  const goTo = (index: number): void => {
    activeIndex = Math.min(Math.max(index, 0), dots.length - 1);
    updateCarousel();
  };

  // Event listeners
  prev.addEventListener("click", goPrev);
  next.addEventListener("click", goNext);
  dots.forEach((dot, index) =>
    dot.addEventListener("click", () => goTo(index))
  );
  window.addEventListener("resize", updateCarousel);

  // Initial render
  updateCarousel();
};

export const initTechCarousel = (): void => {
  const track = document.querySelector<HTMLDivElement>(".tech-track");
  const viewport = document.querySelector<HTMLDivElement>(".tech-viewport");

  const prev = document.querySelector<HTMLButtonElement>(".tech-nav.prev");
  const next = document.querySelector<HTMLButtonElement>(".tech-nav.next");

  if (!track || !viewport || !prev || !next) return;

  const cards = Array.from(
    track.querySelectorAll<HTMLDivElement>(".tech-category-card")
  );

  if (cards.length === 0) return;

  let activeIndex = 0;

  const STEP = cards[0].offsetWidth + 32;
  // 32 = gap between cards (must match CSS gap)

  const update = () => {
    prev.disabled = activeIndex === 0;
    next.disabled = activeIndex === cards.length - 1;

    const offset =
      activeIndex * STEP - viewport.offsetWidth / 2 + cards[0].offsetWidth / 2;

    track.style.transform = `translateX(${-offset}px)`;
  };

  prev.addEventListener("click", () => {
    activeIndex = Math.max(0, activeIndex - 1);
    update();
  });

  next.addEventListener("click", () => {
    activeIndex = Math.min(cards.length - 1, activeIndex + 1);
    update();
  });

  window.addEventListener("resize", () => {
    update();
  });

  update();
};
