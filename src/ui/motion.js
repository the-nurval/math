// Движение: анимация входа экрана и листа (токены — в css/motion.css).
export const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let enterNext = null;

export function enter(kind) {
  enterNext = kind;
}

export function runEnter() {
  const k = enterNext;
  enterNext = null;
  if (!k || reduced()) return;
  const m = document.getElementById("main");
  if (k === "screen") {
    m.classList.remove("in-screen");
    m.getBoundingClientRect();
    m.classList.add("in-screen");
  }
  if (k === "test") {
    const els = [...m.querySelectorAll(".sheet .sheet-head,.sheet .hint,.sheet .task")].slice(0, 8);
    els.forEach((el, i) => {
      el.style.setProperty("--d", i * 50 + "ms");
      el.classList.add("in-up");
    });
  }
  if (k === "profile") {
    m.querySelectorAll(".trow .meter i").forEach((el, i) => {
      el.style.setProperty("--d", i * 50 + "ms");
      el.classList.add("in-fill");
    });
  }
  if (k === "score") {
    const b = m.querySelector(".score .big");
    if (!b) return;
    const [g, mx] = b.textContent.split("/").map(s => parseFloat(s));
    if (!(g > 0)) return;
    const t0 = performance.now(),
      D = 420;
    const step = t => {
      const p = Math.min(1, (t - t0) / D),
        e = 1 - Math.pow(1 - p, 3);
      b.textContent = `${Math.round(g * e)} / ${mx}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
