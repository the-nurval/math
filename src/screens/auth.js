// Экраны входа, приглашения, выбора роли, удаления и восстановления аккаунта.
import { U } from "../i18n/index.js";
import { esc, fmtD, isGmail, plus30 } from "../lib/format.js";
import { session } from "../state.js";
import { ICON_CHEV, ICON_G, ICON_G_MONO } from "../ui/icons.js";

export function viewAuth() {
  return `<div class="screen"><div class="group authcard">
    <h2>${U.signTitle}</h2><p class="sub">${U.signLead}</p>
    <button class="btn ghost wide" type="button" data-act="google">${ICON_G}<span>${U.google}</span></button>
    <div class="or">${U.or}</div>
    <label class="ctrl"><span>${U.email}</span><input class="txt" type="email" id="f-email" autocomplete="email" inputmode="email"></label>
    <button class="btn wide" type="button" data-act="magic">${U.sendLink}</button>
    ${session.authMsg ? `<p class="msg${session.authErr ? " err" : ""}" role="status">${esc(session.authMsg)}</p>` : ""}
  </div></div>`;
}

export function viewInvite() {
  const i = session.invInfo;
  const isP = i.role === "parent";
  const w = (i.from_name || "").trim() || i.from_email;
  const g = isGmail(i.email);
  const gBtn = `<button class="btn wide${g ? "" : " ghost"}" type="button" data-act="google">${g ? ICON_G_MONO : ICON_G}<span>${U.google}</span></button>`;
  const mBtn = `<button class="btn wide${g ? " ghost" : ""}" type="button" data-act="magic">${U.sendLink}</button>`;
  return `<div class="screen"><div class="group authcard invite">
    <div class="inviter"><div class="ava sm">${esc(w.trim().charAt(0).toUpperCase())}</div><span><b>${esc(w)}</b><br><span class="sub">${esc(i.from_email || "")}</span></span></div>
    <h2>${esc(U.invTitle(w, isP))}</h2><p class="sub">${esc(U.invLead(w, isP, isP && i.from_role === "parent" ? i.student_name : ""))}</p>
    <label class="ctrl"><span>${U.invEmail}</span><input class="txt" type="email" id="f-email" value="${esc(i.email)}" autocomplete="email" inputmode="email"></label>
    ${g ? gBtn + mBtn : mBtn + gBtn}
    ${session.authMsg ? `<p class="msg${session.authErr ? " err" : ""}" role="status">${esc(session.authMsg)}</p>` : ""}
    <p class="sub small">${esc(U.invOther(isP))}</p>
  </div></div>`;
}

export function viewBye() {
  if (session.bye.err)
    return `<div class="screen"><div class="group authcard"><h2>${esc(U.deleteAcc)}</h2><p class="sub">${U.linkExpired}</p><button class="btn wide" type="button" data-act="byeok">${U.toHome}</button></div></div>`;
  const until = fmtD(new Date(session.bye.until));
  const isP = session.bye.role === "parent";
  const nm = session.bye.name || session.bye.email;
  const mine = session.profile && session.profile.role === "parent" && !session.bye.self;
  if (!session.bye.self)
    return `<div class="screen"><div class="group authcard"><h2>${esc(U.byeKidT(nm))}</h2><p class="sub">${U.byeKidText}</p><div class="mnote">${esc(U.byeKidUntil(nm, until))}</div><div class="mbtns c"><button class="btn" type="button" data-act="byeok">${mine ? U.toKids : U.toHome}</button></div></div></div>`;
  return `<div class="screen"><div class="group authcard"><h2>${U.byeT(isP)}</h2><p class="sub">${esc(U.byeText(session.bye.email, isP))}</p><div class="mnote">${U.byeUntil(until, isP)}</div><div class="mbtns c"><button class="btn" type="button" data-act="byeok">${U.toHome}</button></div></div></div>`;
}

export function viewRestore() {
  const d = session.deleted;
  const isP = d.role === "parent";
  return `<div class="screen"><div class="group authcard"><h2>${U.restT}</h2><p class="sub">${esc(U.restText(fmtD(new Date(d.deleted_at)), fmtD(plus30(d.deleted_at)), isP))}</p>
    ${session.authMsg ? `<p class="msg err" role="status">${esc(session.authMsg)}</p>` : ""}
    <div class="mbtns c"><button class="btn ghost" type="button" data-act="logout">${U.logout}</button><button class="btn" type="button" data-act="restore">${U.restore}</button></div></div></div>`;
}

export function viewRole() {
  const meta = (session.user && session.user.user_metadata) || {};
  return `<div class="screen"><div class="authcard group">
    <h2>${U.roleTitle}</h2><p class="sub">${U.roleLead}</p>
    <label class="ctrl"><span>${U.yourName}</span><input class="txt" id="f-rname" value="${esc(meta.full_name || meta.name || "")}" autocomplete="name"></label>
    <div class="group roles"><button class="srow link" type="button" data-act="role" data-role="student"><span><b>${U.student}</b><br><span class="sub">${U.studentHint}</span></span>${ICON_CHEV}</button>
    <button class="srow link" type="button" data-act="role" data-role="parent"><span><b>${U.parent}</b><br><span class="sub">${U.parentHint}</span></span>${ICON_CHEV}</button></div>
    ${session.authMsg ? `<p class="msg${session.authErr ? " err" : ""}">${esc(session.authMsg)}</p>` : ""}
  </div></div>`;
}
