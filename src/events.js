// Обработка событий страницы: клики (переходы, настройки, действия), ввод ответов, Enter, фокус.
import { U } from "./i18n/index.js";
import { weekHtml } from "./screens/main/header.js";
import { saveProfile } from "./services/auth.js";
import { openKid } from "./services/family.js";
import { st, ui } from "./state.js";
import { renderBar } from "./ui/bar.js";
import { renderMain, renderNav } from "./ui/render.js";

import { navigate } from "./actions/navigate.js";
import { changeSetting } from "./actions/settings.js";
import { accountActions } from "./actions/account.js";
import { familyActions } from "./actions/family.js";
import { timerActions } from "./actions/timer.js";
import { workActions } from "./actions/work.js";
import { closeModal } from "./ui/modal.js";
import { syncGen } from "./work/grades.js";
import { renderScreen } from "./ui/render.js";

// все действия кнопок data-act по разделам
const ACTIONS = { ...workActions, ...timerActions, ...accountActions, ...familyActions };

export function bindEvents() {
  document.addEventListener("click", e => {
    if (st.menuOpen && !e.target.closest("#gwrap")) {
      st.menuOpen = false;
      renderNav();
    }
    if (st.langOpen && !e.target.closest("#lwrap")) {
      st.langOpen = false;
      renderNav();
    }
    if (st.pop && !e.target.closest(".fwrap")) {
      st.pop = null;
      if (st.view === "main") renderMain();
    }
    const go = e.target.closest("[data-go]");
    if (go) {
      navigate(go);
      return;
    }
    const s = e.target.closest("[data-set]");
    if (s) {
      if (st.langOpen && s.closest("#lmenu")) {
        st.langOpen = false;
        renderNav();
      }
      changeSetting(s);
      return;
    }
    const a = e.target.closest("[data-act]");
    if (a) {
      const run = ACTIONS[a.dataset.act];
      if (run) {
        run(a, a.dataset.act);
        return;
      }
    }
    if (ui.modal && e.target.id === "modal" && ui.modal.type !== "ask") {
      closeModal();
      return;
    }
    const kd = e.target.closest("[data-kid]");
    if (kd) {
      openKid(kd.dataset.kid);
      return;
    }
    const rv = e.target.closest("[data-review]");
    if (rv) {
      st.rv = { i: Number(rv.dataset.review), src: rv.dataset.src, open: {} };
      st.view = "review";
      renderScreen();
      window.scrollTo({ top: 0 });
      return;
    }
    if (st.view === "review") {
      const w = e.target.closest("[data-why]");
      if (w) {
        st.rv.open[w.dataset.why] = !st.rv.open[w.dataset.why];
        renderMain();
      }
      return;
    }
    const o = e.target.closest("[data-opt]");
    if (o && !st.checked) {
      st.answers[o.dataset.k] = o.dataset.opt;
      ui.activeBlock = Number(o.dataset.k.split("-")[0]);
      st.confirming = false;
      renderScreen();
      return;
    }
    const sg = e.target.closest("[data-self]");
    if (sg) {
      st.answers[sg.dataset.k] = sg.dataset.self;
      renderScreen();
      return;
    }
    const w = e.target.closest("[data-why]");
    if (w) {
      st.open[w.dataset.why] = !st.open[w.dataset.why];
      renderMain();
      return;
    }
  });
  document.addEventListener("input", e => {
    const i = e.target.closest("[data-k]");
    if (i && st.view === "main" && (i.tagName === "INPUT" || i.tagName === "TEXTAREA")) {
      const k = i.dataset.k;
      if (i.tagName === "TEXTAREA") {
        st.answers[k + "t"] = i.value;
        renderBar();
        return;
      }
      if (i.dataset.i != null) {
        const arr = Array.isArray(st.answers[k]) ? st.answers[k].slice() : ["", ""];
        arr[+i.dataset.i] = i.value;
        st.answers[k] = arr;
      } else st.answers[k] = i.value;
      st.confirming = false;
      renderBar();
      return;
    }
    if (e.target.id === "f-date" && e.target.value) {
      st.date = e.target.value;
      const w = document.getElementById("week");
      if (w) w.outerHTML = weekHtml();
      return;
    }
    if (e.target.id === "f-limit") {
      const v = Number(e.target.value);
      if (v > 0) {
        st.limit = v;
        st.limitTouched = true;
      }
      return;
    }
    if (e.target.id === "f-phrase") {
      const ok = e.target.value.trim().toLowerCase() === e.target.dataset.phrase;
      const b = document.getElementById("m-go");
      if (b) b.disabled = !ok;
      return;
    }
    if (e.target.id === "f-name") {
      st.name = e.target.value;
      const av = document.getElementById("ava");
      if (av) av.textContent = (st.name || "").trim().charAt(0).toUpperCase() || "?";
      const pn = document.getElementById("pname");
      if (pn) pn.textContent = st.name.trim() || U.noName;
      saveProfile();
    }
  });
  document.addEventListener("change", e => {
    const t = e.target;
    if (t.dataset.sel === "workGrade") {
      st.mix = t.value === "mix";
      if (!st.mix) st.workGrade = t.value;
      saveProfile();
      syncGen();
      renderMain();
      return;
    }
    if (t.dataset.sel) {
      changeSetting({ dataset: { set: t.dataset.sel, v: t.value } });
      return;
    }
    if (t.dataset.grade) {
      const n = Number(t.dataset.grade);
      st.grades = t.checked
        ? Array.from(new Set(st.grades.concat(n))).sort((a, b) => a - b)
        : st.grades.filter(x => x !== n);
      saveProfile();
      renderNav();
      if (st.view === "main") renderMain();
      return;
    }
    if (t.dataset.pick && st.progPick) {
      st.progPick.pick[t.dataset.pick] = t.checked;
      renderBar();
      return;
    }
    if (t.id === "f-year") {
      st.year = t.value;
      saveProfile();
      return;
    }
    if (t.id === "f-grade") {
      const was = Number(st.grade);
      st.grade = Number(t.value);
      // тренировался только в своём классе — переходит вместе с ним
      if (st.grades.length === 1 && st.grades[0] === was) st.grades = [st.grade];
      saveProfile();
      renderNav();
      return;
    }
    if (t.id === "f-date" && st.headMode === "compact" && st.view === "main") {
      renderMain();
      return;
    }
  });
  // Enter в поле = нажать кнопку этого поля (приглашение, ссылка для входа, подтверждение фразой)
  document.addEventListener("keydown", e => {
    if (e.key !== "Enter" || e.isComposing || e.shiftKey) return;
    const t = e.target;
    if (!t || t.tagName !== "INPUT") return;
    let b = null;
    if (t.id && t.id.startsWith("f-inv-"))
      b = t.closest(".srow") && t.closest(".srow").querySelector("[data-act]");
    else if (t.id === "f-email") b = document.querySelector('[data-act="magic"]');
    else if (t.id === "f-phrase") b = document.getElementById("m-go");
    if (b && !b.disabled) {
      e.preventDefault();
      b.click();
    }
  });
  document.addEventListener("focusin", e => {
    const b = e.target.closest("[data-block]");
    if (b && st.view === "main") ui.activeBlock = Number(b.dataset.block);
  });
}
