// Работа: сборка (в том числе смешанная), подсчёт заполненных, проверка и сохранение результата.
import { parseDate } from "../lib/format.js";
import { saveResult } from "../services/results.js";
import { st } from "../state.js";
import { enter } from "../ui/motion.js";
import { renderAll } from "../ui/render.js";
import { G, availGrades, genFor, gradeOfTopic, mixOn, syncGen } from "./grades.js";

// работа из нескольких классов: блоки по очереди из каждого класса, задания со звёздочкой — одного класса
function buildMixed(meta, lang) {
  const tests = meta.grades.map((n, i) => {
    const g = genFor(n, meta.program || "school");
    g.setLang(lang);
    const t = g.buildTest({
      date: parseDate(meta.date),
      level: meta.level,
      type: meta.type === "train" ? "theme" : meta.type,
      lang,
      seed: (meta.seed + i * 7919) >>> 0,
      seenOly: meta.seen || [],
    });
    t.blocks.forEach(b => (b.grade = n));
    return t;
  });
  const reg = tests.map(t => t.blocks.filter(b => !b.star)),
    stars = tests.map(t => t.blocks.filter(b => b.star));
  const target = meta.level === "o" ? 0 : meta.type === "period" ? 28 : 18;
  const out = [];
  let i = 0,
    n = 0;
  while (n < target && reg.some(r => r.length)) {
    const r = reg[i++ % reg.length];
    if (!r.length) continue;
    const b = r.shift();
    out.push(b);
    n += b.items.length;
  }
  let st2 = stars[meta.seed % stars.length];
  if (meta.level === "o") {
    st2 = [];
    let j = 0;
    while (st2.length < 7 && stars.some(x => x.length)) {
      const x = stars[j++ % stars.length];
      if (x.length) st2.push(x.shift());
    }
  }
  const blocks = out.concat(st2);
  return {
    pos: tests[0].pos,
    cov: [].concat(...tests.map(t => t.cov)),
    cur: [].concat(...tests.map(t => t.cur)),
    blocks,
    minutes: tests[0].minutes,
    max: blocks.reduce((s, b) => s + b.items.length * b.pts, 0),
    olyIds: blocks
      .filter(b => b.tpl === "oly" || b.tpl === "proof")
      .flatMap(b => b.items.map(i => i.olyId)),
  };
}

export function buildFrom(meta, lang) {
  if (meta.grades && meta.grades.length > 1) return buildMixed(meta, lang || st.lang);
  const g = genFor(meta.grade, meta.program || "school");
  g.setLang(lang || st.lang);
  return g.buildTest({
    date: parseDate(meta.date),
    level: meta.level,
    type: meta.type === "train" ? "theme" : meta.type,
    lang: lang || st.lang,
    seed: meta.seed,
    seenOly: meta.seen || [],
    only: meta.only || undefined,
  });
}

export function newTest() {
  const seed = (Math.random() * 4294967295) >>> 0;
  const only = st.train;
  st.train = null;
  st.workCid = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  syncGen();
  const mixG = !only && mixOn() ? availGrades() : null;
  st.meta = {
    seed,
    grade: mixG ? null : (only && gradeOfTopic(only[0])) || G.grade,
    grades: mixG,
    level: st.level,
    type: only ? "train" : st.type,
    date: st.date,
    seen: st.seen.slice(),
    only: only || null,
    program: st.program,
  };
  st.test = buildFrom(st.meta);
  st.answers = {};
  st.checked = false;
  st.open = {};
  st.confirming = false;
  st.elapsed = 0;
  st.blockTime = {};
  st.timeUp = false;
  st.laps = [];
  st.lapStart = 0;
  if (st.timer === "limit" && !st.limitTouched) st.limit = st.test.minutes;
  st.running = st.timer !== "off";
  st.view = "main";
  enter("test");
  renderAll();
  window.scrollTo({ top: 0 });
}

export function totals(test, answers) {
  let got = 0,
    max = 0,
    filled = 0,
    count = 0;
  const per = [],
    topics = {},
    olyOk = [];
  if (!test) return { got, max, filled, count, per, topics, olyOk };
  test.blocks.forEach((b, bi) => {
    let g = 0,
      m = 0;
    b.items.forEach((it, ii) => {
      const k = bi + "-" + ii,
        v = answers[k];
      m += b.pts;
      count++;
      if (G.isFilled(it, v) || (it.ans.type === "self" && String(answers[k + "t"] || "").trim()))
        filled++;
      const s = G.score(it, v, b.pts);
      g += s;
      topics[b.topic] = topics[b.topic] || [0, 0];
      topics[b.topic][0] += s;
      topics[b.topic][1] += b.pts;
      if (it.olyId && s === b.pts) olyOk.push(it.olyId);
    });
    got += g;
    max += m;
    per.push({ g, m });
  });
  return { got, max, filled, count, per, topics, olyOk };
}

export function finish() {
  if (st.laps.length && st.elapsed > st.lapStart) {
    st.laps.push(st.elapsed - st.lapStart);
    st.lapStart = st.elapsed;
  }
  st.checked = true;
  st.confirming = false;
  st.running = false;
  const T = totals(st.test, st.answers);
  saveResult({
    ts: Date.now(),
    grade: st.meta.grade || 7,
    asOf: st.meta.date,
    level: st.meta.level,
    type: st.meta.type,
    lang: st.lang,
    score: T.got,
    max: T.max,
    items: T.count,
    timeSec: st.timer !== "off" ? st.elapsed : 0,
    limitSec: st.timer === "limit" ? st.limit * 60 : 0,
    topics: T.topics,
    oly: st.test.olyIds,
    olyOk: T.olyOk,
    meta: {
      seed: st.meta.seed,
      grade: st.meta.grade || 7,
      grades: st.meta.grades || null,
      date: st.meta.date,
      level: st.meta.level,
      type: st.meta.type,
      seen: st.meta.seen,
      only: st.meta.only || null,
      program: st.meta.program || "school",
    },
    answers: st.answers,
    blockTime: st.blockTime,
    laps: st.laps.slice(),
  });
  enter("score");
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
