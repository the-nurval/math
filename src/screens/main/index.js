// Главный экран: шапка и лист работы.
import { U } from "../../i18n/index.js";
import { headA, headB, weekHtml } from "./header.js";
import { sheetHtml } from "./sheet.js";
import { st } from "../../state.js";
import { availGrades, syncGen } from "../../work/grades.js";

export function viewMain() {
  syncGen();
  const avail = availGrades(),
    multi = avail.length > 1;
  let h =
    st.focus && st.test
      ? ""
      : `${st.headMode === "compact" ? headB(avail, multi) : headA(avail, multi)}${weekHtml()}`;
  if (!st.test) h += `<p class="empty">${U.noTest}</p>`;
  else
    h += sheetHtml({
      focusBtn: true,
      helpCid: st.checked ? st.lastCid || st.workCid : st.workCid || null,
      test: st.test,
      meta: st.meta,
      answers: st.answers,
      checked: st.checked,
      open: st.open,
      blockTime: st.blockTime,
      timeSec: st.timer !== "off" ? st.elapsed : 0,
      timeUp: st.timeUp,
      laps: st.laps,
    });
  return h;
}
