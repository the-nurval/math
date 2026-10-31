// Профиль ученика и разбор сохранённой работы.
import { LV, U } from "../../i18n/index.js";
import { dayKey, esc, fmtD, fmtTime } from "../../lib/format.js";
import { viewKid } from "../family/kids.js";
import { secBadge, studentProfileOpts } from "../family/parts.js";
import { sheetHtml } from "../main/sheet.js";
import { heatSvg, trendSvg } from "./charts.js";
import { family, session, st } from "../../state.js";
import { selectHtml, subhead } from "../../ui/controls.js";
import { ICON_CHEV, ICON_EXIT } from "../../ui/icons.js";
import { GRADES, availGrades, genFor, tc, topicName } from "../../work/grades.js";
import { buildFrom } from "../../work/test.js";

export function sortedHist() {
  return st.history.slice().sort((a, b) => b.ts - a.ts);
}

export function viewProfile(o) {
  o = o || {};
  const ro = !!o.readonly;
  const hist = o.hist || sortedHist();
  const n = hist.length;
  const avg = n
    ? Math.round((hist.reduce((s, r) => s + (r.max ? r.score / r.max : 0), 0) / n) * 100)
    : 0;
  const days = new Set(hist.map(r => dayKey(new Date(r.ts))));
  let streak = 0;
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (days.has(dayKey(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  const timed = hist.filter(r => r.timeSec > 0);
  const avgTime = timed.length ? timed.reduce((s, r) => s + r.timeSec, 0) / timed.length : 0;
  const perTask = timed.length
    ? timed.reduce((s, r) => s + r.timeSec, 0) /
      Math.max(
        1,
        timed.reduce((s, r) => s + (r.items || 0), 0),
      )
    : 0;
  const lim = hist.filter(r => r.limitSec > 0);
  const limShare = lim.length
    ? Math.round((lim.reduce((s, r) => s + r.timeSec / r.limitSec, 0) / lim.length) * 100)
    : null;
  const now = Date.now(),
    MONTH = 30 * 864e5;
  const agg = {},
    recent = {},
    older = {};
  hist.forEach(r =>
    Object.entries(r.topics || {}).forEach(([tp, v]) => {
      const g = v[0],
        m = v[1];
      if (!m) return;
      [agg, r.ts > now - MONTH ? recent : older].forEach(o => {
        o[tp] = o[tp] || [0, 0];
        o[tp][0] += g;
        o[tp][1] += m;
      });
    }),
  );
  const rows = Object.keys(agg)
    .filter(id => id !== "oly" && id !== "proof")
    .map(id => {
      const p = Math.round((agg[id][0] / agg[id][1]) * 100);
      let arr = "flat",
        sym = "–";
      if (recent[id] && older[id]) {
        const a = recent[id][0] / recent[id][1],
          b2 = older[id][0] / older[id][1];
        if (a - b2 > 0.05) {
          arr = "up";
          sym = "▲";
        } else if (b2 - a > 0.05) {
          arr = "down";
          sym = "▼";
        }
      }
      return { id, p, arr, sym };
    })
    .sort((a, b) => a.p - b.p);
  const weak = rows.filter(r => r.p < 70).map(r => r.id);
  const olyDone = new Set();
  hist.forEach(r => (r.olyOk || []).forEach(i => olyDone.add(i)));
  const y0 = (() => {
    const t = new Date();
    const y = t.getMonth() >= 8 ? t.getFullYear() : t.getFullYear() - 1;
    return `${y}/${String(y + 1).slice(2)}`;
  })();
  const nm = ro ? o.name || "" : st.name;
  const initial = (nm || "").trim().charAt(0).toUpperCase() || "?";
  let h = `<div class="screen">${subhead(o.title || U.profile, o.back || "main")}
   <div class="group" style="margin-top:12px">
    <div class="pcard${ro ? " ro" : ""}"><div class="ava" id="ava">${esc(initial)}</div>
      ${
        ro
          ? `<div><b style="font-size:1.1rem">${esc(nm || U.noName)}</b><br><span class="sub">${U.title}${o.level && LV[o.level] ? " · " + LV[o.level] : ""} · ${U.year} ${y0}</span></div><div class="out"><button class="btn ghost" type="button" data-go="prog">${U.prog}</button></div>`
          : `<div class="pfields"><label class="fld"><span>${U.name}</span><input class="txt" id="f-name" value="${esc(st.name)}" placeholder="${esc(U.namePh)}" autocomplete="off"></label>
        <div class="pfrow">${selectHtml("f-year", ["2026/27", "2027/28"], st.year, U.yearLbl)}${selectHtml("f-grade", GRADES, st.grade, U.gradeLbl)}</div></div>
        <div class="out out-col"><span class="sub" title="${esc((session.user && session.user.email) || "")}">${esc((session.user && session.user.email) || "")}</span><button class="btn exit" type="button" data-act="logout">${ICON_EXIT}<span>${U.logout}</span></button></div>`
      }</div>
    <div class="kpis"><div class="kpi"><b>${n}</b><span>${U.kWorks}</span></div><div class="kpi"><b>${n ? avg + "%" : "—"}</b><span>${U.kAvg}</span></div><div class="kpi"><b>${streak}</b><span>${U.kStreak}</span></div><div class="kpi"><b>${avgTime ? fmtTime(avgTime) : "—"}</b><span>${U.kTime}</span></div></div>
   </div>
   ${ro || session.sync === "ok" ? "" : `<p class="sub below">${U.offline}</p>`}
   <div class="sec">${U.act}</div><div class="group"><div class="chartbox">${heatSvg(hist)}</div></div>
   <div class="sec">${U.trend}</div><div class="group"><div class="chartbox">${trendSvg(hist)}</div></div>`;
  if (rows.length) {
    h += `<div class="sec">${U.topics}</div><div class="group">${rows.map(r => `<div class="trow ${tc(r.id)}${r.p < 70 ? " weak" : ""}"><span>${esc(topicName(r.id))}${r.p < 70 ? `<span class="tag-weak">${U.weak}</span>` : ""}</span><div class="meter"><i style="width:${r.p}%"></i></div><span class="pc">${r.p}%</span><span class="arrow ${r.arr}" title="${esc(U.cmp)}">${r.sym}</span></div>`).join("")}
      ${weak.length && !ro ? `<div class="srow trainrow" style="border-top:1px solid var(--line)"><span class="sub" style="margin:0">${esc(weak.map(topicName).join(", "))}</span><button class="btn sm" type="button" data-act="train" data-only="${weak.join(",")}">${U.trainBtn}</button></div>` : ""}</div>`;
  }
  h += `<div class="sec">${U.timeT}</div><div class="group">${timed.length ? `<div class="srow"><span class="k">${U.kTime}</span><b>${fmtTime(avgTime)}</b></div><div class="srow"><span class="k">${U.tPerTask}</span><b>${fmtTime(perTask)}</b></div>${limShare != null ? `<div class="srow"><span class="k">${U.tLimit}</span><b>${limShare}%</b></div>` : ""}` : `<div class="srow"><span class="sub" style="margin:0">${U.tNone}</span></div>`}</div>
   <div class="sec">${U.oly}</div><div class="group"><div class="srow"><span class="k">${U.oly}</span><b>${U.olySolved(
     olyDone.size,
     availGrades().reduce((s, g) => s + genFor(g).OLY.length, 0),
   )}</b></div></div>
   ${secBadge(U.hist, ro ? o.newWorks : 0, "works")}<div class="group">${
     n
       ? hist
           .map(
             (r, i) =>
               `<button class="hsrow" type="button" data-review="${i}" data-src="${ro ? "kid" : "me"}"><span><span>${fmtD(new Date(r.ts))} · ${esc(U.ty[r.type] || "")} · ${LV[r.level] || ""}</span><br><span class="m">${esc(
                 Object.keys(r.topics || {})
                   .filter(x => x !== "oly" && x !== "proof")
                   .map(topicName)
                   .join(", "),
               )}</span></span><span class="s">${r.score}/${r.max}</span>${r.meta ? ICON_CHEV : "<span></span>"}</button>`,
           )
           .join("")
       : `<div class="srow"><span class="sub" style="margin:0">${U.histNone}</span></div>`
   }</div>
  ${o.extra || ""}</div>`;
  return h;
}

export function viewReview() {
  const fromKid = st.rv && st.rv.src === "kid";
  const r = (fromKid ? family.kidHist.slice().sort((a, b) => b.ts - a.ts) : sortedHist())[
    st.rv ? st.rv.i : -1
  ];
  if (!r || !r.meta) {
    st.view = fromKid ? "kid" : "profile";
    return fromKid ? viewKid() : viewProfile(studentProfileOpts());
  }
  const test = buildFrom(r.meta);
  return `<div class="screen">${subhead(`${U.review} ${fmtD(new Date(r.ts))}`, fromKid ? "kid" : "profile")}${sheetHtml({ helpCid: !fromKid && r.cid ? r.cid : null, focus: st.rv.focus, test, meta: r.meta, answers: r.answers || {}, checked: true, open: st.rv.open || {}, blockTime: r.blockTime || {}, timeSec: r.timeSec || 0, laps: r.laps || [], readonly: true })}</div>`;
}
