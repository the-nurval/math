/* Math Check: задания 6 класса. Программа — максимум из Эстонии (6 кл.), РФ (Виленкин, 6 кл.) и СССР (6 кл. десятилетки, по глубине).
   Темы с префиксом g6, чтобы не пересекаться с другими классами. */
import { TOPICS } from "./topics.js";
import { OLY } from "./olympiad.js";
import { PROOFS } from "./proofs.js";
import summaries from "./summaries/index.js";
import g6r5 from "./tasks/g6r5.js";
import g6div from "./tasks/g6div.js";
import g6frac from "./tasks/g6frac.js";
import g6fadd from "./tasks/g6fadd.js";
import g6fmul from "./tasks/g6fmul.js";
import g6fdec from "./tasks/g6fdec.js";
import g6ratio from "./tasks/g6ratio.js";
import g6propr from "./tasks/g6propr.js";
import g6pct from "./tasks/g6pct.js";
import g6circ from "./tasks/g6circ.js";
import g6ratn from "./tasks/g6ratn.js";
import g6rops from "./tasks/g6rops.js";
import g6eq from "./tasks/g6eq.js";
import g6coord from "./tasks/g6coord.js";
import g6sym from "./tasks/g6sym.js";
import g6tri from "./tasks/g6tri.js";
import g6area from "./tasks/g6area.js";

// шаблоны заданий всех тем класса: { id: { topic, pts, cnt, title, gen } }
const TPL = {
  ...g6r5,
  ...g6div,
  ...g6frac,
  ...g6fadd,
  ...g6fmul,
  ...g6fdec,
  ...g6ratio,
  ...g6propr,
  ...g6pct,
  ...g6circ,
  ...g6ratn,
  ...g6rops,
  ...g6eq,
  ...g6coord,
  ...g6sym,
  ...g6tri,
  ...g6area,
};

export default { TOPICS, TPL, OLY, PROOFS, summaries };
