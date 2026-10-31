// Экран «Программа»: темы класса по неделям и выбор тем для тренировки.
import { U } from "../i18n/index.js";
import { esc } from "../lib/format.js";
import { st } from "../state.js";
import { seg, subhead } from "../ui/controls.js";
import { G, GRADES, genFor, posInfo, progDefaultPick, progTopicsFor, tc } from "../work/grades.js";

export function viewProg() {
  const g = st.progGrade || Number(st.grade) || 7;
  const P = posInfo();
  const cur = new Set(
    genFor(g)
      .currentTopics(P.pos)
      .map(t => t.id),
  );
  if (!st.progPick || st.progPick.g !== g) st.progPick = { g, pick: progDefaultPick(g) };
  const ts = progTopicsFor(g);
  const per = w => G.PERIODS.find(p => w >= p.w0 && w < p.w0 + p.weeks);
  const own = g === Number(st.grade);
  let h = `<div class="screen">${subhead(U.prog, st.progBack || "main")}
  <div class="group" style="margin-top:12px"><div class="srow"><span class="k">${U.progGrade}</span>${seg("progGrade", GRADES.map(String), String(g), Object.fromEntries(GRADES.map(n => [String(n), n === Number(st.grade) ? `${n} · ${U.mine}` : String(n)])), "sm")}</div>
  <div class="srow"><span class="sub">${own ? U.progMine : U.progOther(g)}</span></div></div>`;
  if (!ts.length)
    return (
      h +
      `<div class="group" style="margin-top:16px"><div class="srow"><span class="sub">${U.noTopicsGrade}</span></div></div></div>`
    );
  h += `<div class="sec sec-row"><span>${U.progTopics}</span><span class="sub">${esc(P.txt)}</span></div><div class="group"><ul class="prog">${ts
    .map(t => {
      const done = t.start < P.pos.weeks,
        now = own && cur.has(t.id),
        p = per(t.start);
      const on = !!st.progPick.pick[t.id];
      return `<li class="${tc(t.id)}"><label class="pick"><input type="checkbox" data-pick="${t.id}"${on ? " checked" : ""}><span class="wk">${t.start + 1} ${U.wk}${p ? " · " + p.name : ""}</span><span>${esc(G.tr(t.name))}</span></label><span class="st ${now ? "now" : own && done ? "done" : ""}">${now ? U.stNow : own && done ? U.stDone : U.stNext}</span></li>`;
    })
    .join("")}</ul></div></div>`;
  return h;
}
