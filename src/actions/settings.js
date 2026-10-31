// Переключатели data-set="ключ" data-v="значение": меняют настройку в st и то, что от неё зависит.
import { useLang } from "../i18n/index.js";
import { saveProfile } from "../services/auth.js";
import { applyTheme, savePrefs } from "../services/prefs.js";
import { st } from "../state.js";
import { renderAll } from "../ui/render.js";
import { syncGen } from "../work/grades.js";
import { buildFrom } from "../work/test.js";
import { renderScreen } from "../ui/render.js";

export function changeSetting(s) {
  const k = s.dataset.set,
    v = s.dataset.v;
  if (st[k] === v) return;
  st[k] = v;
  if (k === "lang") {
    useLang(v);
    if (st.meta) st.test = buildFrom(st.meta, v);
    saveProfile();
    savePrefs();
    renderAll();
    return;
  }
  if (k === "theme") {
    applyTheme();
    saveProfile();
  }
  if (k === "level") saveProfile();
  if (k === "workGrade") {
    saveProfile();
    syncGen();
  }
  if (k === "program") {
    saveProfile();
    syncGen();
  }
  if (k === "progGrade") {
    st.progGrade = Number(v);
    st.progPick = null;
    st[k] = v;
    renderScreen();
    return;
  }
  if (k === "timer" && st.test && !st.checked) st.running = v !== "off";
  if (k === "type" && !st.limitTouched) st.limit = v === "period" ? 90 : 45;
  renderScreen();
}
