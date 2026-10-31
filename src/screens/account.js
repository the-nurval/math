// Экраны «Аккаунт и роль» и профиль родителя.
import { U } from "../i18n/index.js";
import { esc } from "../lib/format.js";
import { session, st } from "../state.js";
import { subhead } from "../ui/controls.js";

export function viewAccount() {
  const isS = session.profile.role === "student";
  const other = isS ? U.roleP : U.roleS;
  return `<div class="screen">${subhead(U.accountSec, "settings")}
    <div class="group" style="margin-top:12px"><div class="srow"><span><span class="k">${esc((session.user && session.user.email) || "")}</span><br><span class="sub">${U.roleNow(session.profile.role)}</span></span><button class="btn ghost" type="button" data-act="logout">${U.logout}</button></div></div>
    <div class="sec">${U.changeRole}</div>
    <div class="group"><div class="srow"><span class="sub">${session.profile.role_changed ? U.roleChangedAlready : U.changeOnce}</span>${session.profile.role_changed ? "" : `<button class="btn ghost" type="button" data-act="role1">${U.changeRole}: ${esc(other)}</button>`}</div></div>
    <div class="sec">${U.deleteAcc}</div>
    <div class="group"><div class="srow"><span class="sub">${U.delWarn}</span><button class="btn ghost danger" type="button" data-act="d1">${U.deleteAcc}</button></div></div>
  </div>`;
}

export function viewMe() {
  return `<div class="screen">${subhead(U.me, "kids")}<div class="group" style="margin-top:12px"><div class="srow"><label style="display:grid;gap:4px"><span class="sub">${U.nameParent}</span><input class="txt" id="f-name" value="${esc(st.name)}" autocomplete="off"></label></div>
    <div class="srow"><span class="k">${esc((session.user && session.user.email) || "")}</span><button class="btn ghost" type="button" data-act="logout">${U.logout}</button></div></div></div>`;
}
