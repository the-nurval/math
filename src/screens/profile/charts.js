// Графики профиля: календарь занятий и динамика результатов.
import { LV, U } from "../../i18n/index.js";
import { dayKey, esc, fmtD, loc } from "../../lib/format.js";
import { st } from "../../state.js";

export function heatSvg(hist) {
  const counts = {};
  hist.forEach(r => {
    const k = dayKey(new Date(r.ts));
    counts[k] = (counts[k] || 0) + 1;
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dow = (today.getDay() + 6) % 7;
  const start = new Date(today);
  start.setDate(today.getDate() - dow - 7 * 11);
  const cell = 18,
    gap = 4,
    left = 26,
    top = 16,
    W = left + 12 * (cell + gap),
    H = top + 7 * (cell + gap);
  let s = `<svg class="heat" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(U.act)}">`;
  const dn =
    st.lang === "en"
      ? ["Mon", "", "Wed", "", "Fri", "", ""]
      : st.lang === "et"
        ? ["E", "", "K", "", "R", "", ""]
        : ["Пн", "", "Ср", "", "Пт", "", ""];
  dn.forEach((t, i) => {
    if (t) s += `<text x="0" y="${top + i * (cell + gap) + 13}">${t}</text>`;
  });
  for (let w = 0; w < 12; w++) {
    for (let d = 0; d < 7; d++) {
      const day = new Date(start);
      day.setDate(start.getDate() + w * 7 + d);
      if (day > today) continue;
      const c = counts[dayKey(day)] || 0;
      const fill =
        c === 0 ? "var(--h0)" : c === 1 ? "var(--h1)" : c === 2 ? "var(--h2)" : "var(--h3)";
      s += `<rect x="${left + w * (cell + gap)}" y="${top + d * (cell + gap)}" width="${cell}" height="${cell}" rx="3" fill="${fill}"><title>${fmtD(day)}: ${c}</title></rect>`;
    }
    const first = new Date(start);
    first.setDate(start.getDate() + w * 7);
    if (first.getDate() <= 7)
      s += `<text x="${left + w * (cell + gap)}" y="9">${first.toLocaleDateString(loc(), { month: "short" })}</text>`;
  }
  return (
    s +
    `</svg><div class="legend"><span>${U.less}</span><i style="background:var(--h0)"></i><i style="background:var(--h1)"></i><i style="background:var(--h2)"></i><i style="background:var(--h3)"></i><span>${U.more}</span></div><p class="sub heat-x">${U.heatExplain}</p>`
  );
}

export function trendSvg(hist) {
  const pts = hist.slice(0, 30).reverse();
  if (pts.length < 2) return `<p class="sub" style="margin:0">${U.trendNone}</p>`;
  const W = 560,
    H = 180,
    l = 34,
    r = 10,
    t = 10,
    b = 24;
  const iw = W - l - r,
    ih = H - t - b;
  const x = i => l + (i * iw) / (pts.length - 1),
    y = p => t + ih * (1 - p / 100);
  let s = `<svg class="trend" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(U.trend)}">`;
  [0, 50, 100].forEach(v => {
    s += `<line x1="${l}" x2="${W - r}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="1"/><text x="${l - 6}" y="${y(v) + 3}" text-anchor="end">${v}</text>`;
  });
  const P = pts.map((p, i) => [x(i), y(p.max ? (p.score / p.max) * 100 : 0)]);
  s += `<polyline points="${P.map(p => p.join(",")).join(" ")}" fill="none" stroke="var(--pen)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
  pts.forEach((p, i) => {
    const pc = p.max ? Math.round((p.score / p.max) * 100) : 0;
    s += `<circle cx="${P[i][0]}" cy="${P[i][1]}" r="5" fill="var(--pen)" stroke="var(--panel)" stroke-width="2"><title>${fmtD(new Date(p.ts))} · ${U.ty[p.type] || ""} · ${LV[p.level] || ""} · ${p.score}/${p.max} (${pc}%)</title></circle>`;
  });
  s += `<text x="${l}" y="${H - 6}">${fmtD(new Date(pts[0].ts))}</text><text x="${W - r}" y="${H - 6}" text-anchor="end">${fmtD(new Date(pts[pts.length - 1].ts))}</text>`;
  return s + `</svg>`;
}
