export function initOutro(goTo3D?: () => void) {
  const outro = document.getElementById("visorOutro");
  const log = document.getElementById("outroLog");
  const bar = document.getElementById("outroProgress");

  if (!outro || !log || !bar) return;

  const steps = [
    "Initializing system core…",
    "Detaching UI layers…",
    "Calibrating depth buffers…",
    "Synchronizing input controllers…",
    "Preparing spatial transition…",
  ];

  let progress = 0;
  const stepDelay = 900; // ⬅ slower, more cinematic

  // Reset state (important if reused)
  log.innerHTML = "";
  bar.style.width = "0%";

  outro.classList.add("active");
  document.body.classList.add("ui-fade");

  steps.forEach((text, i) => {
    setTimeout(() => {
      const line = document.createElement("div");
      line.textContent = text;
      log.appendChild(line);

      progress += 100 / steps.length;
      bar.style.width = `${progress}%`;
    }, i * stepDelay);
  });

  // Final phase
  setTimeout(() => {
    // If 3D exists later, transition
    if (goTo3D) {
      outro.classList.remove("active");
      goTo3D();
    } else {
      // Otherwise hold final state
      const done = document.createElement("div");
      done.textContent = "SYSTEM READY";
      log.appendChild(done);
    }
  }, steps.length * stepDelay + 600);
}

export const addOutro = () => {
  const bootBtn = document.querySelector("#boot-button button");

  bootBtn?.addEventListener("click", () => {
    initOutro(); // no 3D yet
  });
};
