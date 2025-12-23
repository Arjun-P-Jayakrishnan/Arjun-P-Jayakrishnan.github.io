/**
 * Plays the visor boot sequence with line-by-line typing.
 * Returns a promise that resolves when boot completes.
 */
export function showIntro(): Promise<void> {
  return new Promise((resolve) => {
    console.log("shwoing into // / / / // / // /");
    const boot = document.getElementById("visor-boot");
    if (!boot) {
      console.log("showIntro:No boot");
      resolve();
      return;
    }

    const lines = Array.from(
      boot.querySelectorAll<HTMLParagraphElement>(".boot-line")
    );

    let lineIndex = 0;

    const typeLine = (el: HTMLParagraphElement, text: string) => {
      let i = 0;
      const speed = 25;

      const interval = setInterval(() => {
        el.textContent += text[i];
        i++;

        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(() => {
            lineIndex++;
            if (lineIndex < lines.length) {
              startNextLine();
            } else {
              finishBoot();
            }
          }, 200);
        }
      }, speed);
    };

    const startNextLine = () => {
      const el = lines[lineIndex];
      const text = el.dataset.text;
      if (!text) return;
      typeLine(el, text);
    };

    const finishBoot = () => {
      setTimeout(() => {
        boot.classList.add("hidden");
        setTimeout(() => {
          boot.remove();
          console.log("[BOOT] Visor online");
          resolve();
        }, 500);
      }, 400);
    };

    startNextLine();
  });
}
