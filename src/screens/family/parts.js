// Части экранов семьи: строки людей, приглашения, просьбы о помощи.
import { U } from "../../i18n/index.js";
import { esc, fmtD } from "../../lib/format.js";
import { seenTxt } from "./kids.js";
import { sortedHist } from "../profile/index.js";
import { hasParent } from "../../services/family.js";
import { family, session } from "../../state.js";
import { ICON_BOOK, ICON_HAND, ICON_OK } from "../../ui/icons.js";
import { topicName } from "../../work/grades.js";

export function personRow(p, right) {
  return `<div class="srow"><span><b>${esc(p.name || U.noName)}</b> <span class="sub">${esc(p.email || "")}</span><br><span class="sub">${[p.kind ? U[p.kind] : "", seenTxt(p.last_seen)].filter(Boolean).join(" · ")}</span></span>${right || "<span></span>"}</div>`;
}

export function inviteRows(list) {
  return list
    .map(
      i =>
        `<div class="srow"><span><span class="k">${esc(i.email)}</span><br><span class="sub">${U.invited}</span></span>${i.invited_by === session.user.id ? `<button class="btn ghost" type="button" data-act="uninvite" data-id="${i.id}">${U.cancelInv}</button>` : "<span></span>"}</div>`,
    )
    .join("");
}

export function inviteForm(act, label, extra) {
  return `<div class="srow"><input class="txt" type="email" id="f-inv-${act}" placeholder="${esc(U.emailPh)}" autocomplete="off"><button class="btn" type="button" data-act="${act}"${extra || ""}>${U.invite}</button></div>`;
}

export function msgHtml() {
  return family.linkMsg
    ? `<p class="msg${family.linkErr ? " err" : ""}" role="status">${esc(family.linkMsg)}</p>`
    : "";
}

function familyHtml() {
  const act = family.parents.filter(p => p.status === "active");
  const inv = family.myInvites.filter(i => i.role === "parent");
  let h = `<div class="sec">${U.family}</div><div class="group">`;
  if (!act.length && !inv.length)
    h += `<div class="srow"><span class="sub">${U.noParents}</span></div>`;
  h +=
    act
      .map(p =>
        personRow(
          p,
          `<button class="btn ghost" type="button" data-act="unl1" data-pid="${p.parent_id}">${U.unlinkBtn}</button>`,
        ),
      )
      .join("") + inviteRows(inv);
  h += `</div><div class="sec">${U.inviteParent}</div><div class="group">${inviteForm("invparent")}</div>${msgHtml()}`;
  return h;
}

export function helpBtn(cid, k, title) {
  if (!session.profile || session.profile.role !== "student") return "";
  const done = family.myHelp.some(x => x.result_cid === cid && x.item_key === k);
  const par = hasParent();
  const lbl = done ? (par ? U.hSent : U.hSaved) : par ? U.hAsk : U.hLater;
  return `<button class="hbtn ${done ? "done" : par ? "par" : "later"}" type="button" data-act="help" data-cid="${esc(cid)}" data-hk="${k}" data-title="${esc(title)}" aria-label="${esc(lbl)}" title="${esc(lbl)}">${done ? ICON_OK : par ? ICON_HAND : ICON_BOOK}</button>`;
}

function laterHtml() {
  const par = hasParent();
  const hs = sortedHist();
  let h = `<div class="sec sec-row"><span>${par ? U.myHelpSec : U.laterSec}</span><span class="sub">${U.ofLimit(family.myHelp.length)}</span></div><div class="group" id="later">`;
  if (!family.myHelp.length) h += `<div class="srow"><span class="sub">${U.laterNone}</span></div>`;
  family.myHelp
    .slice()
    .reverse()
    .forEach(x => {
      const r = hs.find(r => r.cid === x.result_cid);
      const wt = r
        ? Object.keys(r.topics || {})
            .filter(t => t !== "oly" && t !== "proof")
            .map(topicName)[0]
        : "";
      h += `<div class="srow"><span><b>${esc(x.title)}</b><br><span class="sub">${fmtD(new Date(x.created_at))}${wt ? " · " + esc(U.workOf(wt)) : ""}</span></span><span class="tline">${r ? `<button class="btn ghost" type="button" data-act="myhelpopen" data-cid="${esc(x.result_cid)}" data-hk="${esc(x.item_key)}">${U.helpOpen}</button>` : ""}<button class="btn ghost" type="button" data-act="myhelpdel" data-id="${x.id}">${U.removeIt}</button></span></div>`;
    });
  h += `</div>`;
  if (!par) h += `<p class="sub below">${U.laterNote}</p>`;
  return h;
}

export function studentProfileOpts() {
  return { extra: laterHtml() + familyHtml() };
}

export function secBadge(title, n, key) {
  return `<div class="sec sec-row"><span class="sec-t">${title}${n ? ` <span class="badge" aria-label="${esc(U.newN(n))}">${n}</span>` : ""}</span>${n ? `<button class="link-btn" type="button" data-act="seenreset" data-k="${key}">${U.resetNew}</button>` : ""}</div>`;
}
