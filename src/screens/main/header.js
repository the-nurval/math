// Шапка главной: учебная неделя, дата, таймер, класс, тип работы (развёрнутый и свёрнутый вид).
import { U } from "../../i18n/index.js";
import { esc, fmtD, parseDate } from "../../lib/format.js";
import { st } from "../../state.js";
import { seg } from "../../ui/controls.js";
import { ICON_DOWN, ICON_SHUF, ICON_UP } from "../../ui/icons.js";
import { mixOn, posInfo, tc, workGrade } from "../../work/grades.js";

export function weekHtml() {
  const P = posInfo();
  const n = P.cur.length;
  const wt = P.pos.before
    ? U.before
    : P.pos.after && P.pos.weeks >= 35
      ? U.after
      : `${U.week} ${Math.min(35, P.pos.weeks + (P.pos.inBreak ? 0 : 1))} ${U.of} 35`;
  return `<section class="week" id="week"><div class="week-h"><span class="week-t">${esc(wt)}</span>${n ? `<button class="pill-btn" type="button" data-act="weektoggle" aria-expanded="${st.weekOpen}">${st.weekOpen ? U.weekHide : U.weekShow(n)}${ICON_DOWN}</button>` : ""}</div>
  ${st.weekOpen && n ? `<div class="tags" id="tags">${P.cur.map((nm, i) => `<span class="chip now ${tc(P.curIds[i])}" style="--d:${i * 50}ms">${U.now}: ${esc(nm)}</span>`).join("")}</div>` : ""}</section>`;
}

// элементы шапки — общие для развёрнутого (A) и свёрнутого (B) вида
function hDate() {
  return `<input type="date" id="f-date" value="${st.date}" aria-label="${esc(U.date)}">`;
}

function hTimer() {
  return `<div class="tline">${seg("timer", ["off", "watch", "limit"], st.timer, U.tm)}<input class="num" type="number" id="f-limit" min="5" max="240" step="5" value="${st.limit}" aria-label="${U.min}" ${st.timer === "limit" ? "" : "disabled"}><span class="unit${st.timer === "limit" ? "" : " off"}">${U.min}</span></div>`;
}

function hGrade(avail) {
  const mix = mixOn();
  return `<div class="tline gline"><span class="${mix ? "segdis" : ""}">${seg("workGrade", avail.map(String), String(workGrade()), Object.fromEntries(avail.map(n => [String(n), String(n)])))}</span><button class="mixbtn" type="button" aria-pressed="${mix}" data-act="mixtoggle">${ICON_SHUF}<span>${U.mixT}</span></button></div>`;
}

function hType() {
  return `<div class="tline">${seg("type", ["theme", "period"], st.type, U.ty)}</div>`;
}

export function headA(avail, multi) {
  const row = (k, v) => `<div class="hsrow"><span class="hk">${k}</span><div>${v}</div></div>`;
  return `<section class="head head-a">${row(U.date, hDate())}${row(U.timer, hTimer())}${multi ? row(U.gradeLbl, hGrade(avail)) : ""}${row(U.type, hType())}
    <div class="hfoot"><button class="btn" type="button" data-act="new">${U.create}</button><button class="pill-btn hidebtn" type="button" data-act="headmode" data-m="compact" aria-label="${esc(U.hideSet)}"><span>${U.hideSet}</span>${ICON_UP}</button></div></section>`;
}

export function headB(avail, multi) {
  const pop = st.pop;
  const chip = (k, label, body) =>
    `<div class="fwrap"><button class="fchip" type="button" data-act="pop" data-p="${k}" aria-expanded="${pop === k}">${esc(label)}${ICON_DOWN}</button>${pop === k ? `<div class="hpop" role="dialog">${body}</div>` : ""}</div>`;
  const tl = st.timer === "limit" ? `${U.tm.limit} · ${st.limit} ${U.min}` : U.tm[st.timer];
  const gl = mixOn() ? `${U.mixed}: ${avail.join(", ")}` : U.gradeN(workGrade());
  return `<section class="head head-b"><div class="fchips">
    ${chip("date", fmtD(parseDate(st.date)), `<span class="hk">${U.date}</span>${hDate()}`)}
    ${chip("timer", tl, `<span class="hk">${U.timer}</span>${hTimer()}`)}
    ${multi ? chip("grade", gl, `<span class="hk">${U.gradeLbl}</span>${hGrade(avail)}`) : ""}
    ${chip("type", U.ty[st.type], `<span class="hk">${U.type}</span>${hType()}`)}</div>
    <div class="fright"><button class="ib-soft" type="button" data-act="headmode" data-m="full" aria-label="${esc(U.showSet)}" title="${esc(U.showSet)}">${ICON_DOWN}</button><button class="btn" type="button" data-act="new">${U.create}</button></div></section>`;
}
