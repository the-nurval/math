// Классы и темы: генератор нужного класса и программы, позиция в учебном году, цвета тем.
import { GEN } from "../../generator/index.js";
import { U } from "../i18n/index.js";
import { parseDate } from "../lib/format.js";
import { st } from "../state.js";

// генератор выбранного класса; работы хранят свой класс в meta.grade (старые работы — 7 класс)
// программа (settings.program): «school» по умолчанию или «prog»; работа хранит свою в meta.program
export function genFor(n, p) {
  return GEN.grade(Number(n) || 7, p || st.program) || GEN.grade(7);
}

export let G = genFor(7);

export const HEX = {
  coral: "#f46b57",
  yellow: "#f5c84c",
  teal: "#5ec2b7",
  lilac: "#9b97f2",
  sky: "#6fa8f5",
  green: "#7ccb8e",
};

// классы, по которым уже есть задания, из отмеченных в меню
export function availGrades() {
  const has = GEN.grades();
  const a = st.grades.map(Number).filter(n => has.includes(n));
  return a.length ? a : [has.includes(Number(st.grade)) ? Number(st.grade) : has[0]];
}

export function workGrade() {
  const a = availGrades();
  const w = Number(st.workGrade);
  return a.includes(w) ? w : a.includes(Number(st.grade)) ? Number(st.grade) : a[0];
}

export function mixOn() {
  return !!st.mix && availGrades().length > 1;
}

export function syncGen() {
  G = genFor(mixOn() ? availGrades()[0] : workGrade());
}

export function posInfo() {
  const pos = G.schoolPos(parseDate(st.date));
  let txt;
  if (pos.before) txt = U.before;
  else if (pos.after && pos.weeks >= 35) txt = U.after;
  else
    txt = `${U.week} ${Math.min(35, pos.weeks + (pos.inBreak ? 0 : 1))} ${U.of} 35 · ${G.PERIODS[pos.period].name} ${U.period}${pos.inBreak ? " · " + U.brk : ""}`;
  return {
    pos,
    txt,
    cur: G.currentTopics(pos).map(t => G.tr(t.name)),
    curIds: G.currentTopics(pos).map(t => t.id),
  };
}

export const TCOL = {
  rat: "coral",
  dist: "teal",
  pow: "yellow",
  std: "lilac",
  pct: "sky",
  eq: "green",
  word: "coral",
  func: "teal",
  poly: "yellow",
  prism: "lilac",
  stat: "sky",
  r6: "green",
  oly: "lilac",
  proof: "sky",
};

export function allTopics() {
  const seen = new Set();
  return GEN.grades()
    .flatMap(n => [genFor(n, "school"), genFor(n, "prog")])
    .flatMap(g => g.TOPICS.map(t => Object.assign({ grade: g.grade }, t)))
    .filter(t => !seen.has(t.id) && seen.add(t.id));
}

export function gradeOfTopic(id) {
  const t = allTopics().find(x => x.id === id);
  return t ? t.grade : null;
}

export function tc(id) {
  if (TCOL[id]) return "t-" + TCOL[id];
  const t = allTopics().find(x => x.id === id);
  return "t-" + ((t && t.col) || "sky");
}

export const GRADES = [5, 6, 7, 8, 9];

export function gradesTitle() {
  const p = GRADES.filter(n => st.grades.includes(n));
  if (!p.length) return U.subj;
  if (p.length === 1) return U.gradeOne(p[0]);
  const runs = [];
  p.forEach(n => {
    const r = runs[runs.length - 1];
    if (r && n === r[1] + 1) r[1] = n;
    else runs.push([n, n]);
  });
  const parts = [];
  runs.forEach(r => {
    if (r[1] - r[0] >= 2) parts.push(r[0] + "–" + r[1]);
    else for (let k = r[0]; k <= r[1]; k++) parts.push(String(k));
  });
  return U.subj + " " + parts.join(", ");
}

export function progTopicsFor(g) {
  const gen = GEN.grade(g) && genFor(g);
  return gen ? gen.TOPICS.filter(t => t.start >= 0) : [];
}

export function progDefaultPick(g) {
  const P = posInfo();
  const ts = progTopicsFor(g);
  const own = g === Number(st.grade);
  const gen = genFor(g);
  const o = {};
  ts.forEach(t => {
    o[t.id] = own
      ? t.start < P.pos.weeks || gen.currentTopics(P.pos).some(c => c.id === t.id)
      : true;
  });
  return o;
}

export function topicName(id) {
  const t = allTopics().find(x => x.id === id);
  if (t) return G.tr(t.name);
  if (id === "oly") return U.oly;
  if (id === "proof") return U.proofs;
  return id;
}
