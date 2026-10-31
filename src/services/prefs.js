// Локальные настройки, незаконченная работа в localStorage, тема оформления.
import { LS } from "../lib/storage.js";
import { session, st } from "../state.js";
import { buildFrom } from "../work/test.js";

export function savePrefs() {
  LS.set("math7.prefs", { lang: st.lang, theme: st.theme, headMode: st.headMode });
}

const WORK_KEYS = [
  "workCid",
  "lastCid",
  "meta",
  "answers",
  "checked",
  "open",
  "elapsed",
  "blockTime",
  "timeUp",
  "laps",
  "lapStart",
  "timer",
  "limit",
  "type",
  "date",
  "limitTouched",
  "confirming",
];

let workT = null;

export function saveWork() {
  if (!session.user || !session.profile || session.profile.role !== "student") return;
  clearTimeout(workT);
  workT = setTimeout(() => {
    const o = {};
    WORK_KEYS.forEach(k => (o[k] = st[k]));
    LS.set("math7.work." + session.user.id, o);
  }, 300);
}

export function restoreWork() {
  const o = LS.get("math7.work." + session.user.id);
  if (o && o.meta) {
    Object.assign(st, o);
    st.test = buildFrom(st.meta);
    st.running = !st.checked && st.timer === "limit";
  }
}

export function applyTheme() {
  const r = document.documentElement;
  if (st.theme === "system") r.removeAttribute("data-theme");
  else r.setAttribute("data-theme", st.theme);
}
