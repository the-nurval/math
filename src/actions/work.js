// Действия с работой: новая, проверка, тренировка, вид шапки, конспект.
// Кнопки с data-act="имя" вызывают одноимённую функцию; a — нажатая кнопка.
import { weekHtml } from "../screens/main/header.js";
import { saveProfile } from "../services/auth.js";
import { savePrefs } from "../services/prefs.js";
import { st } from "../state.js";
import { renderBar } from "../ui/bar.js";
import { reduced } from "../ui/motion.js";
import { renderMain, renderNav, renderScreen } from "../ui/render.js";
import { closeSum, openSum } from "../ui/summary.js";
import { mixOn } from "../work/grades.js";
import { finish, newTest, totals } from "../work/test.js";

export const workActions = {
  new(a) {
    st.pop = null;
    newTest();
  },
  gmenu(a) {
    st.menuOpen = !st.menuOpen;
    st.langOpen = false;
    renderNav();
  },
  lmenu(a) {
    st.langOpen = !st.langOpen;
    st.menuOpen = false;
    renderNav();
  },
  weektoggle(a) {
    st.weekOpen = !st.weekOpen;
    const w = document.getElementById("week");
    if (w) w.outerHTML = weekHtml();
  },
  trainpick(a) {
    const ids = Object.keys(st.progPick.pick).filter(k => st.progPick.pick[k]);
    if (!ids.length) return;
    st.train = ids;
    st.view = "main";
    newTest();
  },
  mixtoggle(a) {
    st.mix = !mixOn();
    saveProfile();
    renderMain();
  },
  // раздел профиля: итоги, история, семья…
  psec(a) {
    st.psec = a.dataset.s;
    renderScreen();
    window.scrollTo({ top: 0 });
  },
  headmode(a) {
    st.headMode = a.dataset.m;
    st.pop = null;
    savePrefs();
    renderMain();
  },
  pop(a) {
    st.pop = st.pop === a.dataset.p ? null : a.dataset.p;
    renderMain();
  },
  focus(a) {
    st.focus = !st.focus;
    st.pop = null;
    renderMain();
    window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" });
  },
  sum(a) {
    openSum(Number(a.dataset.g), a.dataset.t);
  },
  sumclose(a) {
    closeSum();
  },
  train(a) {
    st.train = a.dataset.only.split(",");
    newTest();
  },
  check(a) {
    const T = totals(st.test, st.answers);
    if (T.filled < T.count) {
      st.confirming = true;
      renderBar();
      return;
    }
    finish();
  },
  finish(a) {
    finish();
  },
  cancel(a) {
    st.confirming = false;
    renderBar();
  },
  openall(a) {
    st.test.blocks.forEach((b, bi) => b.items.forEach((it, ii) => (st.open[bi + "-" + ii] = true)));
    renderMain();
  },
};
