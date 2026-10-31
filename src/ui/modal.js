// Окна подтверждения: удаление, отвязка, приглашения, просьбы.
import { GEN } from "../../generator/index.js";
import { U } from "../i18n/index.js";
import { esc, fmtD } from "../lib/format.js";
import { hasParent } from "../services/family.js";
import { family, session, st, ui } from "../state.js";
import { reduced } from "./motion.js";
import { G, HEX, TCOL, allTopics, genFor } from "../work/grades.js";

// закрыть открытое окно
export function closeModal() {
  ui.modal = null;
  renderModal();
}

export function renderModal() {
  let el = document.getElementById("modal");
  if (!ui.modal) {
    if (el) {
      if (reduced()) el.remove();
      else {
        el.classList.remove("in");
        el.classList.add("out");
        setTimeout(() => el.remove(), 200);
      }
    }
    document.body.classList.remove("modal-open");
    return;
  }
  if (el && el.classList.contains("out")) {
    el.remove();
    el = null;
  }
  if (!el) {
    el = document.createElement("div");
    el.id = "modal";
    el.className = "overlay";
    document.body.appendChild(el);
  }
  document.body.classList.add("modal-open");
  const other = session.profile && session.profile.role === "student" ? U.roleP : U.roleS;
  let h = "";
  if (ui.modal.type === "full") {
    const o = ui.modal.oldest || {};
    h = `<h2>${hasParent() ? U.fullTitleP : U.fullTitle}</h2><p>${U.fullText}</p><div class="mnote"><b>${esc(o.title || "")}</b><br><span class="sub">${o.created_at ? fmtD(new Date(o.created_at)) : ""}</span></div><p class="sub">${U.fullHint}</p><div class="mbtns"><button class="btn ghost" type="button" data-act="fullself">${U.pickSelf}</button><button class="btn" type="button" data-act="fullreplace">${U.saveReplace}</button></div>`;
  }
  if (ui.modal.type === "invother") {
    const i = ui.modal.info;
    const isP = i.role === "parent";
    const ue = (session.user && session.user.email) || "";
    const who = isP
      ? i.from_role === "student"
        ? { n: i.from_name, e: i.from_email }
        : { n: i.student_name, e: "" }
      : { n: i.from_name, e: i.from_email };
    const nm = (who.n || "").trim() || who.e || "";
    h = `<h2>${isP ? U.otherTitleP : U.otherTitleS}</h2><p>${esc(U.otherText(i.email, ue, isP))}</p>
    <div class="mnote person"><div class="ava sm">${esc(nm.charAt(0).toUpperCase())}</div><span><b>${esc(nm)}</b>${who.e ? ` <span class="sub">${esc(who.e)}</span>` : ""}<br><span class="sub">${isP ? U.otherWillP : U.otherWillS}</span></span></div>
    ${ui.modal.err ? `<p class="msg err">${esc(ui.modal.err)}</p>` : ""}
    <div class="mbtns c"><button class="btn ghost" type="button" data-act="invno">${U.notNow}</button><button class="btn" type="button" data-act="invyes">${U.yesConnect}</button></div>
    <button class="link-btn mlink" type="button" data-act="invswitch">${esc(U.signOutAs(i.email))}</button>`;
  }
  if (ui.modal.type === "invrole")
    h = `<h2>${U.invGoneTitle}</h2><p>${esc(ui.modal.gone ? U.invGone : U.roleMismatch(ui.modal.isP))}</p><div class="mbtns c"><button class="btn" type="button" data-act="mclose">${U.ok}</button></div>`;
  if (ui.modal.type === "unl") {
    const p = ui.modal.p;
    h = `<h2>${U.unlinkT}</h2><p>${esc(U.unlinkText(p.name || U.noName, p.email))}</p>${ui.modal.err ? `<p class="msg err">${esc(ui.modal.err)}</p>` : ""}<div class="mbtns c"><button class="btn ghost" type="button" data-act="mclose">${U.cancel}</button><button class="btn" type="button" data-act="unlgo">${U.unlinkBtn}</button></div>`;
  }
  if (ui.modal.type === "d1")
    h = `<p class="step">${U.step(1, 3)}</p><h2>${esc(ui.modal.sid ? U.del1Kid(ui.modal.name) : U.del1Q)}</h2><div class="mbtns c"><button class="btn ghost" type="button" data-act="mclose">${U.no}</button><button class="btn" type="button" data-act="d2">${U.yesNext}</button></div>`;
  if (ui.modal.type === "d2")
    h = `<p class="step">${U.step(2, 3)}</p><h2>${U.delWhat}</h2><ul class="dlist">${delList(
      ui.modal,
    )
      .map(x => `<li>${esc(x)}</li>`)
      .join(
        "",
      )}</ul><p class="sub">${U.d30}</p>${ui.modal.err ? `<p class="msg err">${esc(ui.modal.err)}</p>` : ""}<div class="mbtns c"><button class="btn ghost" type="button" data-act="mclose">${U.cancel}</button><button class="btn danger" type="button" data-act="dgo">${U.confirm}</button></div>`;
  if (ui.modal.type === "d3")
    h = `<p class="step">${U.step(3, 3)}</p><h2>${U.del3T}</h2><p>${esc(U.del3Text(ui.modal.email))}</p><p class="sub">${U.del3Kid}</p><div class="mbtns c"><button class="btn" type="button" data-act="mclose">${U.ok}</button></div>`;
  if (ui.modal.type === "ask")
    h = `<h2>${U.askTitle}</h2><p>${esc(U.askText(ui.modal.p.name, ui.modal.p.email))}</p><div class="mbtns"><button class="btn ghost" type="button" data-act="askno">${U.no}</button><button class="btn" type="button" data-act="askyes">${U.yes}</button></div>`;
  if (ui.modal.type === "role1")
    h = `<h2>${U.changeRole}</h2><p>${esc(U.roleAsk(other))}</p><div class="mbtns"><button class="btn ghost" type="button" data-act="mclose">${U.no}</button><button class="btn" type="button" data-act="role2">${U.yes}</button></div>`;
  if (ui.modal.type === "role2") {
    const ph = U.phraseRole;
    h = `<h2>${U.changeRole}</h2><p>${esc(U.roleWarn(other))}</p>
      <label class="ctrl"><span>${esc(U.typePhrase(ph))}</span><input class="txt" id="f-phrase" autocomplete="off" autocapitalize="off" spellcheck="false" data-phrase="${esc(ph)}"></label>
      ${ui.modal.err ? `<p class="msg err">${esc(ui.modal.err)}</p>` : ""}
      <div class="mbtns"><button class="btn ghost" type="button" data-act="mclose">${U.cancel}</button><button class="btn danger" type="button" id="m-go" data-act="rolego" disabled>${U.doChange}</button></div>`;
  }
  const fresh = !el.firstChild;
  el.innerHTML = `<div class="dialog" role="dialog" aria-modal="true">${h}</div>`;
  if (fresh && !reduced()) {
    el.classList.remove("in");
    el.getBoundingClientRect();
    el.classList.add("in");
  }
  const f = document.getElementById("f-phrase");
  if (f) {
    f.focus();
    f.addEventListener("paste", e => e.preventDefault());
    f.addEventListener("drop", e => e.preventDefault());
  }
}

// что удалится: для своего аккаунта или для ученика (главный родитель)
function delList(m) {
  if (m.sid)
    return [U.dWorks(family.kidHist.length), U.dProgress, U.dLater].concat(
      family.kidParents.length
        ? [U.dParents(family.kidParents.map(p => p.name || p.email).join(", "))]
        : [],
    );
  if (session.profile.role === "student") {
    const ps = family.parents.filter(p => p.status === "active");
    return [U.dWorks(st.history.length), U.dProgress, U.dLater].concat(
      ps.length ? [U.dParents(ps.map(p => p.name || p.email).join(", "))] : [],
    );
  }
  const ks = family.kids.filter(k => k.status === "active");
  return (ks.length ? [U.dKids(ks.map(k => k.name || k.email).join(", "))] : []).concat(
    family.myInvites.length ? [U.dInvites] : [],
  );
}

export function delCtx() {
  G.setLang(st.lang);
  const topics = {};
  allTopics().forEach(t => {
    topics[t.id] = { n: G.tr(t.name), c: HEX[TCOL[t.id] || t.col || "sky"] };
  });
  return {
    topics,
    olyTotal: GEN.grades()
      .map(n => genFor(n))
      .reduce((s, g) => s + g.OLY.length, 0),
  };
}
