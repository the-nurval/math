// Конспект темы: панель справа поверх работы.
import { GEN } from "../../generator/index.js";
import { U } from "../i18n/index.js";
import { esc } from "../lib/format.js";
import { reduced } from "./motion.js";
import { tc } from "../work/grades.js";

let sumOpen = null;

function sumHtml(g, id) {
  const s = GEN.summary(g, id);
  if (!s) return "";
  return `<div class="sum-h"><span class="sum-k ${tc(id)}"><i></i>${esc(U.sumOf(g))}</span><button class="ib" type="button" data-act="sumclose" aria-label="${esc(U.close)}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <h2 id="sum-t">${esc(s.t)}</h2>
    <h3>${U.sMain}</h3><ul>${s.main.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <h3>${U.sEx}</h3><div class="sum-ex"><b>${esc(s.ex.q)}</b>${s.ex.s.map((x, i) => `<span>${i + 1}) ${esc(x)}</span>`).join("")}<b>${U.sAns}: ${esc(s.ex.a)}</b></div>
    ${s.alt ? `<h3>${U.sAlt}</h3><p>${esc(s.alt)}</p>` : ""}${s.err ? `<h3>${U.sErr}</h3><p>${esc(s.err)}</p>` : ""}`;
}

export function openSum(g, id) {
  sumOpen = { g, id };
  let el = document.getElementById("sumdrawer");
  if (el) el.remove();
  el = document.createElement("div");
  el.id = "sumdrawer";
  el.className = "sum-ov";
  el.innerHTML = `<aside class="sum" role="dialog" aria-modal="true" aria-labelledby="sum-t">${sumHtml(g, id)}</aside>`;
  document.body.appendChild(el);
  document.body.classList.add("modal-open");
  if (!reduced()) {
    el.getBoundingClientRect();
    el.classList.add("in");
  } else el.classList.add("in");
  const b = el.querySelector('[data-act="sumclose"]');
  if (b) b.focus();
}

export function closeSum() {
  const el = document.getElementById("sumdrawer");
  sumOpen = null;
  if (!el) return;
  document.body.classList.remove("modal-open");
  if (reduced()) {
    el.remove();
    return;
  }
  el.classList.remove("in");
  el.classList.add("out");
  setTimeout(() => el.remove(), 260);
}

export function bindSummary() {
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && sumOpen) closeSum();
  });
  document.addEventListener("click", e => {
    if (sumOpen && e.target.id === "sumdrawer") closeSum();
  });
}
