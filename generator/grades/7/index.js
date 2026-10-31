/* Math Check: задания 7 класса. */
import { TOPICS } from "./topics.js";
import { OLY } from "./olympiad.js";
import { PROOFS } from "./proofs.js";
import summaries from "./summaries/index.js";
import rat from "./tasks/rat.js";
import ratEquations from "./tasks/rat-equations.js";
import dist from "./tasks/dist.js";
import pow from "./tasks/pow.js";
import std from "./tasks/std.js";
import pct from "./tasks/pct.js";
import eq from "./tasks/eq.js";
import word from "./tasks/word.js";
import func from "./tasks/func.js";
import poly from "./tasks/poly.js";
import prism from "./tasks/prism.js";
import stat from "./tasks/stat.js";
import r6 from "./tasks/r6.js";

// шаблоны заданий всех тем класса: { id: { topic, pts, cnt, title, gen } }
const TPL = {
  ...rat,
  ...ratEquations,
  ...dist,
  ...pow,
  ...std,
  ...pct,
  ...eq,
  ...word,
  ...func,
  ...poly,
  ...prism,
  ...stat,
  ...r6,
};

export default { TOPICS, TPL, OLY, PROOFS, summaries };
