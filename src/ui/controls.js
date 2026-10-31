// Общие элементы: переключатель (сегменты), список выбора, заголовок экрана.
import { U } from "../i18n/index.js";
import { esc } from "../lib/format.js";
import { ICON_BACK, ICON_DOWN } from "./icons.js";
import { reduced } from "./motion.js";

export function seg(name, vals, cur, labels, cls) {
  return `<div class="seg${cls ? " " + cls : ""}" role="group" data-seg="${name}"><span class="thumb" aria-hidden="true"></span>${vals.map(v => `<button type="button" data-set="${name}" data-v="${v}" aria-pressed="${cur === v}">${labels[v]}</button>`).join("")}</div>`;
}

export function selectHtml(id, vals, cur, label) {
  return `<label class="fld"><span>${label}</span><span class="selwrap"><select class="txt sel" id="${id}">${vals.map(v => `<option value="${v}"${String(v) === String(cur) ? " selected" : ""}>${v}</option>`).join("")}</select>${ICON_DOWN}</span></label>`;
}

export function subhead(title, backTo) {
  return `<div class="subhead"><button class="back" type="button" data-go="${backTo}" aria-label="${esc(U.back)}">${ICON_BACK}</button><h2>${esc(title)}</h2></div>`;
}

const segPos = {};

export function placeThumbs() {
  document.querySelectorAll(".seg").forEach(sg => {
    const th = sg.querySelector(".thumb"),
      on = sg.querySelector('button[aria-pressed="true"]');
    if (!th) return;
    if (!on) {
      th.style.opacity = "0";
      return;
    }
    const key = sg.dataset.seg + "|" + (sg.closest("[id]") || {}).id;
    const x = on.offsetLeft,
      w = on.offsetWidth;
    const prev = segPos[key];
    segPos[key] = x;
    th.style.width = w + "px";
    th.style.opacity = "1";
    // новая подложка (экран перерисован) встаёт на прошлое место без анимации, едет только изменившаяся
    const from = prev != null && !reduced() ? prev : x;
    if (th.dataset.x !== String(from)) {
      th.style.transition = "none";
      th.style.transform = `translateX(${from}px)`;
      th.getBoundingClientRect();
      th.style.transition = "";
    }
    th.dataset.x = x;
    th.style.transform = `translateX(${x}px)`;
  });
}
