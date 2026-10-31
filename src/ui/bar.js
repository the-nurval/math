// Нижняя панель работы (прогресс, кнопки) и ход таймера.
import { U } from "../i18n/index.js";
import { esc, fmtTime } from "../lib/format.js";
import { saveWork } from "../services/prefs.js";
import { session, st, ui } from "../state.js";
import { ICON_LAP, ICON_PAUSE, ICON_PLAY, ICON_RESET } from "./icons.js";
import { progTopicsFor } from "../work/grades.js";
import { finish, totals } from "../work/test.js";

export function renderBar() {
  const bar = document.getElementById("bar");
  saveWork();
  if (
    session.authState === "in" &&
    session.profile.role === "student" &&
    st.view === "prog" &&
    st.progPick &&
    progTopicsFor(st.progPick.g).length
  ) {
    const n = Object.values(st.progPick.pick).filter(Boolean).length;
    bar.hidden = false;
    document.getElementById("progress").innerHTML = `<span>${U.pickedN(n)}</span>`;
    document.getElementById("btns").innerHTML =
      `<button class="btn" type="button" data-act="trainpick"${n ? "" : " disabled"}>${U.trainPicked}</button>`;
    return;
  }
  if (
    session.authState !== "in" ||
    session.profile.role !== "student" ||
    st.view !== "main" ||
    !st.test
  ) {
    bar.hidden = true;
    return;
  }
  bar.hidden = false;
  const pr = document.getElementById("progress"),
    b = document.getElementById("btns");
  const T = totals(st.test, st.answers);
  const clock =
    st.timer === "off"
      ? ""
      : st.timer === "limit"
        ? `<span class="clock${st.limit * 60 - st.elapsed < 300 ? " low" : ""}" id="clock">${fmtTime(st.limit * 60 - st.elapsed)}</span>`
        : `<span class="clock${st.running ? "" : " paused"}" id="clock">${fmtTime(st.elapsed)}</span>`;
  let ctl = "";
  if (st.timer !== "off" && !st.checked) {
    const ib = (act, icon, label) =>
      `<button class="tbtn" type="button" data-act="${act}" aria-label="${esc(label)}" title="${esc(label)}">${icon}</button>`;
    if (st.timer === "watch")
      ctl += st.running ? ib("pause", ICON_PAUSE, U.stop) : ib("play", ICON_PLAY, U.start);
    if (st.timer === "watch" && !st.running && st.elapsed > 0)
      ctl += ib("reset", ICON_RESET, U.reset);
    else
      ctl += `<button class="tbtn" type="button" data-act="lap" aria-label="${esc(U.lap)}" title="${esc(U.lap)}" ${st.running ? "" : "disabled"}>${ICON_LAP}</button>`;
    ctl = `<span class="tctl">${ctl}</span>`;
  }
  const lapInfo =
    st.timer !== "off" && st.laps.length
      ? `<span class="lapinfo" id="lapinfo">${U.lap} ${st.laps.length + 1} · ${fmtTime(st.elapsed - st.lapStart)}</span>`
      : "";
  const clockBox = clock + ctl + (st.checked ? "" : lapInfo);
  if (st.checked) {
    pr.innerHTML = `${clockBox}<span>${U.checked(T.got, T.max)}</span>`;
    b.innerHTML = `<button class="btn ghost" type="button" data-act="openall">${U.allExp}</button><button class="btn" type="button" data-act="new">${U.create}</button>`;
  } else if (st.confirming) {
    pr.innerHTML = `${clockBox}<span class="confirm">${U.emptyWarn(T.filled, T.count)}</span>`;
    b.innerHTML = `<button class="btn ghost" type="button" data-act="cancel">${U.back}</button><button class="btn" type="button" data-act="finish">${U.anyway}</button>`;
  } else {
    pr.innerHTML = `${clockBox}<span>${U.filled(T.filled, T.count)}</span>`;
    b.innerHTML = `<button class="btn" type="button" data-act="check">${U.check}</button>`;
  }
}

export function startTimer() {
  setInterval(() => {
    if (!st.test || st.checked || !st.running || st.timer === "off" || st.view !== "main") return;
    if (document.visibilityState === "hidden") return;
    st.elapsed += 1;
    if (ui.activeBlock != null)
      st.blockTime[ui.activeBlock] = (st.blockTime[ui.activeBlock] || 0) + 1;
    const c = document.getElementById("clock");
    if (st.timer === "limit") {
      const left = st.limit * 60 - st.elapsed;
      if (c) {
        c.textContent = fmtTime(left);
        c.classList.toggle("low", left < 300);
      }
      if (left <= 0) {
        st.timeUp = true;
        finish();
      }
    } else if (c) c.textContent = fmtTime(st.elapsed);
    if (st.elapsed % 5 === 0) saveWork();
    const li = document.getElementById("lapinfo");
    if (li)
      li.textContent = `${U.lap} ${st.laps.length + 1} · ${fmtTime(st.elapsed - st.lapStart)}`;
  }, 1000);
}
