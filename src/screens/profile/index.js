// Профиль ученика и разбор сохранённой работы.
import { LV, U } from "../../i18n/index.js";
import { dayKey, esc, fmtD, fmtTime } from "../../lib/format.js";
import { viewKid } from "../family/kids.js";
import { studentProfileOpts } from "../family/parts.js";
import { sheetHtml } from "../main/sheet.js";
import { heatSvg, trendSvg } from "./charts.js";
import { family, session, st } from "../../state.js";
import { pick, subhead } from "../../ui/controls.js";
import { ICON_CHEV, ICON_EXIT } from "../../ui/icons.js";
import { GRADES, availGrades, genFor, tc, topicName } from "../../work/grades.js";
import { buildFrom } from "../../work/test.js";

const cap = t => t.charAt(0).toUpperCase() + t.slice(1);

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
  const email = (session.user && session.user.email) || "";
  const msg = t => `<div class="srow"><span class="sub" style="margin:0">${t}</span></div>`;
  const grp = inner => `<div class="group">${inner}</div>`;
  const kv = (k, v) => `<div class="srow"><span>${k}</span><b>${v}</b></div>`;
  const total = availGrades().reduce((s, g) => s + genFor(g).OLY.length, 0);
  // разделы профиля: в корне — строки-ссылки, внутри — содержимое (заголовок экрана = название)
  const secs = [
    {
      k: "sum",
      g: U.grpProgress,
      t: U.sumSec,
      v: n,
      html: grp(
        kv(cap(U.kWorks), n) +
          kv(cap(U.kAvg), n ? avg + "%" : "—") +
          kv(cap(U.kStreak), streak) +
          kv(cap(U.kTime), avgTime ? fmtTime(avgTime) : "—"),
      ),
    },
    {
      k: "act",
      g: U.grpProgress,
      t: U.act,
      html: grp(`<div class="chartbox">${heatSvg(hist)}</div>`),
    },
    {
      k: "trend",
      g: U.grpProgress,
      t: U.trend,
      html: grp(`<div class="chartbox">${trendSvg(hist)}</div>`),
    },
  ];
  if (rows.length)
    secs.push({
      k: "topics",
      g: U.grpProgress,
      t: U.topics,
      v: weak.length || "",
      html: grp(
        rows
          .map(
            r =>
              `<div class="trow ${tc(r.id)}${r.p < 70 ? " weak" : ""}"><span>${esc(topicName(r.id))}${r.p < 70 ? `<span class="tag-weak">${U.weak}</span>` : ""}</span><div class="meter"><i style="width:${r.p}%"></i></div><span class="pc">${r.p}%</span><span class="arrow ${r.arr}" title="${esc(U.cmp)}">${r.sym}</span></div>`,
          )
          .join("") +
          (weak.length && !ro
            ? `<div class="srow trainrow"><span class="sub" style="margin:0">${esc(weak.map(topicName).join(", "))}</span><button class="btn sm" type="button" data-act="train" data-only="${weak.join(",")}">${U.trainBtn}</button></div>`
            : ""),
      ),
    });
  secs.push(
    {
      k: "time",
      g: U.grpProgress,
      t: U.timeT,
      html: grp(
        timed.length
          ? kv(U.kTime, fmtTime(avgTime)) +
              kv(U.tPerTask, fmtTime(perTask)) +
              (limShare != null ? kv(U.tLimit, limShare + "%") : "")
          : msg(U.tNone),
      ),
    },
    {
      k: "oly",
      g: U.grpProgress,
      t: U.oly,
      v: `${olyDone.size} ${U.of} ${total}`,
      html: grp(kv(U.oly, U.olySolved(olyDone.size, total))),
    },
    {
      k: "hist",
      g: U.grpTasks,
      t: U.hist,
      v: n,
      badge: ro ? o.newWorks : 0,
      html:
        (ro && o.newWorks
          ? `<p class="sub below"><button class="link-btn" type="button" data-act="seenreset" data-k="works">${U.resetNew}</button></p>`
          : "") +
        grp(
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
            : msg(U.histNone),
        ),
    },
    ...(o.sections || []),
  );
  const cur = secs.find(x => x.k === st.psec);
  const me = !ro && st.psec === "me";
  if (cur || me) {
    const back = `${o.back === "kids" ? "kid" : "profile"}`;
    return `<div class="screen">${subhead(me ? nm || U.noName : cur.t, back)}<div class="psec">${
      me
        ? `<div class="group"><div class="pcard col"><div class="ava lg" id="ava">${esc(initial)}</div><span class="sub">${esc(email)}</span></div></div>
    <div class="group"><label class="srow"><span>${U.name}</span><input class="txt inl" id="f-name" value="${esc(st.name)}" placeholder="${esc(U.namePh)}" autocomplete="off"></label>
    ${pick(U.yearLbl, 'id="f-year"', ["2026/27", "2027/28"], st.year)}${pick(U.gradeLbl, 'id="f-grade"', GRADES, st.grade)}</div>`
        : cur.html
    }</div></div>`;
  }
  const link = x =>
    `<button class="srow link" type="button" data-act="psec" data-s="${x.k}"><span>${x.t}${x.badge ? ` <span class="badge" aria-label="${esc(U.newN(x.badge))}">${x.badge}</span>` : ""}</span><span class="pv">${x.v ?? ""}${ICON_CHEV}</span></button>`;
  const groups = [...new Set(secs.map(x => x.g))];
  const head = ro
    ? `<div class="pcard"><div class="ava">${esc(initial)}</div><div class="pid"><b>${esc(nm || U.noName)}</b><span class="sub">${U.title}${o.level && LV[o.level] ? " · " + LV[o.level] : ""} · ${U.year} ${y0}</span></div><button class="btn ghost" type="button" data-go="prog">${U.prog}</button></div>`
    : `<button class="pcard link" type="button" data-act="psec" data-s="me"><div class="ava">${esc(initial)}</div><div class="pid"><b>${esc(nm || U.noName)}</b><span class="sub">${U.gradeN(st.grade)} · ${esc(st.year)}</span></div>${ICON_CHEV}</button>`;
  return `<div class="screen">${subhead(o.title || U.profile, o.back || "main")}
   <div class="group" style="margin-top:12px">${head}</div>
   ${ro || session.sync === "ok" ? "" : `<p class="sub below">${U.offline}</p>`}
   ${groups
     .map(
       g =>
         `<div class="sec">${g}</div>${grp(
           secs
             .filter(x => x.g === g)
             .map(link)
             .join(""),
         )}`,
     )
     .join("")}
   ${ro ? "" : `<div class="group" style="margin-top:24px"><button class="srow link" type="button" data-act="logout"><span class="ico-l">${ICON_EXIT}${U.logout}</span></button></div>`}
  </div>`;
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
  return `<div class="screen">${subhead(`${U.review} ${fmtD(new Date(r.ts))}`, fromKid ? "kid" : "profile", st.psec)}${sheetHtml({ helpCid: !fromKid && r.cid ? r.cid : null, focus: st.rv.focus, test, meta: r.meta, answers: r.answers || {}, checked: true, open: st.rv.open || {}, blockTime: r.blockTime || {}, timeSec: r.timeSec || 0, laps: r.laps || [], readonly: true })}</div>`;
}
