/**
 * @file outro.ts
 * @description Handles 2D → 3D outro and progress display.
 */

/**
 * Initialize visor outro sequence
 * @param goTo3D Optional callback to transition to 3D
 * @returns A cleanup function to remove timers/listeners
 */
export function initOutro(goTo3D?: () => void): () => void {
  const outro = document.getElementById("visorOutro");
  const log = document.getElementById("outroLog");
  const bar = document.getElementById("outroProgress");
  if (!outro || !log || !bar) return () => {};

  const steps = [
    "Initializing system core…",
    "Detaching UI layers…",
    "Calibrating depth buffers…",
    "Synchronizing input controllers…",
    "Preparing spatial transition…",
  ];

  let progress = 0;
  const stepDelay = 900;
  const timers: number[] = [];

  outro.classList.add("active");
  document.body.classList.add("ui-fade");
  log.innerHTML = "";
  bar.style.width = "0%";

  steps.forEach((text, i) => {
    const timer = window.setTimeout(() => {
      const line = document.createElement("div");
      line.textContent = text;
      log.appendChild(line);
      progress += 100 / steps.length;
      bar.style.width = `${progress}%`;
    }, i * stepDelay);
    timers.push(timer);
  });

  const finalTimer = window.setTimeout(() => {
    if (goTo3D) {
      outro.classList.remove("active");
      goTo3D();
    } else {
      const done = document.createElement("div");
      done.textContent = "SYSTEM READY";
      log.appendChild(done);
    }
  }, steps.length * stepDelay + 600);
  timers.push(finalTimer);

  return () => timers.forEach((t) => clearTimeout(t));
}
