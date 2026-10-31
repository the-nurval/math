// Экраны «Настройки» и «Вопросы и ответы».
import { LV, U } from "../i18n/index.js";
import { esc } from "../lib/format.js";
import { st } from "../state.js";
import { seg, subhead } from "../ui/controls.js";
import { ICON_CHEV } from "../ui/icons.js";

export function viewSettings() {
  return `<div class="screen">${subhead(U.settings, "main")}
    <div class="sec">${U.secWork}</div>
    <div class="group"><div class="srow"><span class="k">${U.level}</span>${seg("level", ["n", "a", "o"], st.level, LV, "sm")}</div>
      <div class="srow"><span class="k">${U.program}</span>${seg("program", ["school", "prog"], st.program, U.progs, "sm")}</div>
      <button class="srow link" type="button" data-go="faq" data-faq="0"><span>${U.levelsWhat}</span>${ICON_CHEV}</button></div>
    <div class="sec">${U.secLook}</div>
    <div class="group"><div class="srow"><span class="k">${U.theme}</span>${seg("theme", ["system", "light", "dark"], st.theme, U.th, "sm")}</div></div>
    <div class="sec">${U.secHelp}</div>
    <div class="group"><button class="srow link" type="button" data-go="faq"><span>${U.faq}</span>${ICON_CHEV}</button></div>
    <div class="sec">${U.accountSec}</div>
    <div class="group"><button class="srow link" type="button" data-go="account"><span>${U.accountRow}</span>${ICON_CHEV}</button></div>
  </div>`;
}

export function viewFaq() {
  return `<div class="screen">${subhead(U.faq, st.faqBack || "settings")}<div class="group faq" style="margin-top:14px">${U.faqItems.map(([q, a], i) => `<details ${st.faqOpen === i ? "open" : ""}><summary>${esc(q)}</summary><div class="a">${a}</div></details>`).join("")}</div></div>`;
}
