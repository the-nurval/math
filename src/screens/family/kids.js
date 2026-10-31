// Экраны родителя: список учеников и страница ученика.
import { U } from "../../i18n/index.js";
import { esc, fmtD, loc } from "../../lib/format.js";
import { LS } from "../../lib/storage.js";
import { inviteForm, inviteRows, msgHtml, personRow, secBadge } from "./parts.js";
import { viewProfile } from "../profile/index.js";
import { family, session } from "../../state.js";
import { ICON_CHEV } from "../../ui/icons.js";

export function seenTxt(ts) {
  if (!ts) return "";
  const d = new Date(ts),
    now = new Date();
  const diff = (now - d) / 1000;
  if (diff < 180) return U.online;
  const t = d.toLocaleTimeString(loc(), { hour: "2-digit", minute: "2-digit" });
  const day = x => {
    const y = new Date(x);
    y.setHours(0, 0, 0, 0);
    return y.getTime();
  };
  const dd = Math.round((day(now) - day(d)) / 864e5);
  if (dd === 0) return U.seenToday(t);
  if (dd === 1) return U.seenYday(t);
  if (dd < 7) return U.seenDays(dd);
  return U.seenDate(fmtD(d));
}

export function seenKey() {
  return (
    "math7.seen." + (session.user && session.user.id) + "." + (family.kid && family.kid.student_id)
  );
}

export function kidSeen() {
  return LS.get(seenKey()) || { works: 0, help: 0 };
}

export function viewKids() {
  let h = `<div class="screen"><div class="subhead"><h2>${U.kidsTitle}</h2></div><div class="group">`;
  const inv = family.myInvites.filter(i => i.role === "student");
  if (!family.kids.length && !inv.length)
    h += `<div class="srow"><span class="sub">${U.kidsNone}</span></div>`;
  family.kids.forEach(k => {
    h +=
      k.status === "active"
        ? `<button class="srow link" type="button" data-kid="${k.student_id}"><span><b>${esc(k.name || U.noName)}</b>${k.help_open ? ` <span class="badge">${k.help_open}</span>` : ""}<br><span class="sub">${[esc(k.email || ""), seenTxt(k.last_seen)].filter(Boolean).join(" · ")}</span></span>${ICON_CHEV}</button>`
        : `<div class="srow"><span><b>${esc(k.name || U.noName)}</b><br><span class="sub">${esc(k.email || "")} · ${U.waiting}</span></span><button class="btn ghost" type="button" data-act="unlink" data-pid="${session.user.id}" data-sid="${k.student_id}">${U.cancelInv}</button></div>`;
  });
  h +=
    inviteRows(inv) +
    `</div><div class="sec">${U.inviteChild}</div><div class="group">${inviteForm("invchild")}</div>${msgHtml()}</div>`;
  return h;
}

function kidExtra() {
  const amMain = family.kid.kind === "main";
  const sid = family.kid.student_id;
  const seen = kidSeen();
  const newHelp = family.kidHelp.filter(
    x => !x.done && new Date(x.created_at).getTime() > seen.help,
  ).length;
  let h = `${secBadge(U.helpSec, newHelp, "help")}<div class="group">`;
  if (!family.kidHelp.length) h += `<div class="srow"><span class="sub">${U.helpNone}</span></div>`;
  family.kidHelp.forEach(x => {
    h += `<div class="srow"><span>${x.done ? "" : "<b>"}${esc(x.title)}${x.done ? "" : "</b>"}<br><span class="sub">${fmtD(new Date(x.created_at))}${x.done ? " · " + U.helpDoneMark : ""}</span></span><span class="tline"><button class="btn ghost" type="button" data-act="helpopen" data-cid="${esc(x.result_cid)}" data-hk="${esc(x.item_key)}">${U.helpOpen}</button>${x.done ? "" : `<button class="btn ghost" type="button" data-act="helpdone" data-id="${x.id}">${U.helpDone}</button>`}</span></div>`;
  });
  h += `</div><div class="sec">${U.family}</div><div class="group">`;
  h += family.kidParents
    .map(p =>
      personRow(
        p,
        p.parent_id === session.user.id
          ? `<button class="btn ghost" type="button" data-act="unlink" data-pid="${p.parent_id}" data-sid="${sid}">${U.leave}</button>`
          : amMain && p.kind === "second"
            ? `<button class="btn ghost" type="button" data-act="unlink" data-pid="${p.parent_id}" data-sid="${sid}">${U.removeP}</button>`
            : "",
      ),
    )
    .join("");
  h +=
    inviteRows(family.myInvites.filter(i => i.role === "parent" && i.student_id === sid)) +
    `</div>`;
  if (amMain)
    h += `<div class="sec">${U.inviteSecond}</div><div class="group">${inviteForm("invsecond", "", ' data-sid="' + sid + '"')}</div>`;
  h += msgHtml();
  if (amMain)
    h += `<div class="sec">${U.kidAccSec}</div><div class="group"><div class="srow"><span class="sub">${U.kidDelWarn}</span><button class="btn ghost danger" type="button" data-act="d1" data-sid="${sid}">${U.deleteAcc}</button></div></div>`;
  return h;
}

export function viewKid() {
  if (!family.kid) return viewKids();
  const seen = kidSeen();
  return viewProfile({
    hist: family.kidHist.slice().sort((a, b) => b.ts - a.ts),
    newWorks: family.kidHist.filter(r => r.ts > seen.works).length,
    readonly: true,
    level: family.kid.level,
    name: family.kid.name,
    back: "kids",
    title: family.kid.name || U.noName,
    extra: kidExtra(),
  });
}
