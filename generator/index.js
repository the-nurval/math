/* Math Check: генератор контрольных — публичный вход.
   Общая часть — в core/, задания каждого класса — в grades/N/ (темы, шаблоны по темам, олимпиадные задачи, доказательства, конспекты).
   Без DOM: работает и в браузере, и в node (тесты). */
import { isFilled, parseNum, score } from "./core/answers.js";
import { PERIODS, schoolPos } from "./core/calendar.js";
import { makeGrade } from "./core/grade.js";
import { LANG, setLang, tr } from "./core/lang.js";
import { hashStr, mkR } from "./core/random.js";
import grade6 from "./grades/6/index.js";
import grade7 from "./grades/7/index.js";
import grade8 from "./grades/8/index.js";
import { Q } from "./core/rational.js";

// зарегистрированные классы: REG — школьная программа, REGP — прогрессивная (если у класса есть startP); SUM — конспекты
const REG = {};
const REGP = {};
const SUM = {};

// программа класса: «school» — школьный порядок (start), «prog» — прогрессивный (startP); тема без своего поля в этой программе не входит
function forProgram(list, p) {
  const k = p === "prog" ? "startP" : "start";
  return list
    .filter(t => t[k] != null)
    .map(t => Object.assign({}, t, { start: t[k] }))
    .sort((a, b) => a.start - b.start);
}

export const GEN = {
  register(n, M) {
    if (!M.TOPICS.some(t => t.startP != null)) {
      REG[n] = makeGrade(n, M);
      REG[n].program = "school";
      return REG[n];
    }
    REG[n] = makeGrade(n, Object.assign({}, M, { TOPICS: forProgram(M.TOPICS, "school") }));
    REG[n].program = "school";
    REGP[n] = makeGrade(n, Object.assign({}, M, { TOPICS: forProgram(M.TOPICS, "prog") }));
    REGP[n].program = "prog";
    return REG[n];
  },
  // grade(n, "prog") — прогрессивная программа, если она у класса есть; иначе школьная
  grade(n, p) {
    return (p === "prog" && REGP[n]) || REG[n] || null;
  },
  hasProgram(n) {
    return !!REGP[n];
  },
  grades() {
    return Object.keys(REG)
      .map(Number)
      .sort((a, b) => a - b);
  },
  // конспекты тем: GEN.summaries(n, {topicId: {ru:{t,main,ex,alt,err}, et:…, en:…}})
  summaries(n, S) {
    SUM[n] = Object.assign(SUM[n] || {}, S);
  },
  summary(n, id) {
    const s = SUM[n] && SUM[n][id];
    return s ? s[LANG] || s.ru : null;
  },
  score,
  isFilled,
  parseNum,
  PERIODS,
  schoolPos,
  setLang,
  tr,
  hashStr,
  Q,
  mkR,
};

for (const [n, g] of [
  [6, grade6],
  [7, grade7],
  [8, grade8],
]) {
  GEN.register(n, g);
  GEN.summaries(n, g.summaries);
}
