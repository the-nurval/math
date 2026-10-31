// Отрисовка: главная область, навбар, всё сразу.
import { U, useLang } from "../i18n/index.js";
import { esc } from "../lib/format.js";
import { viewAccount, viewMe } from "../screens/account.js";
import { viewAuth, viewBye, viewInvite, viewRestore, viewRole } from "../screens/auth.js";
import { viewKid, viewKids } from "../screens/family/kids.js";
import { studentProfileOpts } from "../screens/family/parts.js";
import { viewMain } from "../screens/main/index.js";
import { viewProfile, viewReview } from "../screens/profile/index.js";
import { viewProg } from "../screens/program.js";
import { viewFaq, viewSettings } from "../screens/settings.js";
import { session, st } from "../state.js";
import { renderBar } from "./bar.js";
import { placeThumbs } from "./controls.js";
import { ICON_DOWN } from "./icons.js";
import { runEnter } from "./motion.js";
import { G, GRADES, gradesTitle } from "../work/grades.js";

const LANGS = { ru: "Русский", et: "Eesti", en: "English" };

export function renderMain() {
  G.setLang(st.lang);
  const v = st.view;
  const m = document.getElementById("main");
  if (session.authState === "loading") {
    m.innerHTML = `<p class="empty">${U.loading}</p>`;
    return;
  }
  if (session.bye) {
    m.innerHTML = viewBye();
    return;
  }
  if (session.authState === "out") {
    m.innerHTML = session.pendInv && session.invInfo ? viewInvite() : viewAuth();
    return;
  }
  if (session.authState === "deleted") {
    m.innerHTML = viewRestore();
    return;
  }
  if (session.authState === "role") {
    m.innerHTML = viewRole();
    return;
  }
  const isP = session.profile && session.profile.role === "parent";
  m.innerHTML =
    v === "settings"
      ? viewSettings()
      : v === "account"
        ? viewAccount()
        : v === "faq"
          ? viewFaq()
          : v === "prog"
            ? viewProg()
            : v === "review"
              ? viewReview()
              : isP
                ? v === "kid"
                  ? viewKid()
                  : v === "me"
                    ? viewMe()
                    : viewKids()
                : v === "profile"
                  ? viewProfile(studentProfileOpts())
                  : viewMain();
  document
    .getElementById("navprog")
    .setAttribute("aria-current", st.view === "prog" ? "page" : "false");
  document
    .getElementById("ib-set")
    .setAttribute(
      "aria-current",
      st.view === "settings" || st.view === "faq" || st.view === "account" ? "page" : "false",
    );
  document
    .getElementById("ib-prof")
    .setAttribute(
      "aria-current",
      st.view === "profile" || st.view === "review" || st.view === "me" ? "page" : "false",
    );
  placeThumbs();
  runEnter();
}

export function renderNav() {
  document.getElementById("ttl").innerHTML = `<span>${esc(gradesTitle())}</span>${ICON_DOWN}`;
  document.getElementById("ttl").setAttribute("aria-expanded", String(st.menuOpen));
  const gm = document.getElementById("gmenu");
  gm.hidden = !st.menuOpen;
  if (st.menuOpen)
    gm.innerHTML = `<p class="gm-t">${U.gradesPick}</p>${GRADES.map(n => `<div class="gm-row${st.grades.includes(n) ? " on" : ""}"><label><input type="checkbox" data-grade="${n}"${st.grades.includes(n) ? " checked" : ""}>${U.gradeN(n)}${n === Number(st.grade) ? ` · ${U.mine}` : ""}</label><button class="link-btn" type="button" data-go="prog" data-pg="${n}">${U.prog}</button></div>`).join("")}`;
  document.getElementById("ib-set").setAttribute("aria-label", U.settings);
  document.getElementById("ib-prof").setAttribute("aria-label", U.profile);
  const lb = document.getElementById("lbtn");
  lb.innerHTML = `<span>${st.lang.toUpperCase()}</span>${ICON_DOWN}`;
  lb.setAttribute("aria-label", U.langLbl);
  lb.setAttribute("aria-expanded", String(st.langOpen));
  const lm = document.getElementById("lmenu");
  lm.hidden = !st.langOpen;
  if (st.langOpen)
    lm.innerHTML = Object.entries(LANGS)
      .map(
        ([v, nm]) =>
          `<button type="button" role="menuitemradio" data-set="lang" data-v="${v}" aria-checked="${st.lang === v}">${nm}</button>`,
      )
      .join("");
  requestAnimationFrame(placeThumbs);
  const inApp = session.authState === "in";
  ["ib-set", "ib-prof"].forEach(id => {
    document.getElementById(id).hidden = !inApp;
  });
  const isS = inApp && session.profile && session.profile.role === "student";
  ["gwrap", "navsep"].forEach(id => {
    document.getElementById(id).hidden = !isS;
  });
  document.getElementById("navprog").hidden = true;
}

// главная область и нижняя панель работы вместе
export function renderScreen() {
  renderMain();
  renderBar();
}

export function renderAll() {
  useLang(st.lang);
  document.documentElement.lang = st.lang;
  renderNav();
  renderMain();
  renderBar();
}

export function navShadow() {
  const n = document.querySelector(".nav");
  if (n) n.classList.toggle("scrolled", window.scrollY > 4);
}
