/* Math Check: задания 8 класса. Программа — согласованная (docs/program-8.md): максимум глубины из Эстонии (8 кл.), РФ (Макарычев, Атанасян, 8 кл.) и СССР.
   У темы два срока: start — школьная программа (по умолчанию), startP — прогрессивная; темы только прогрессивной программы — без start.
   Темы с префиксом g8. */
import { TOPICS } from "./topics.js";
import { OLY } from "./olympiad.js";
import { PROOFS } from "./proofs.js";
import summaries from "./summaries/index.js";
import g8rev from "./tasks/g8rev.js";
import g8poly from "./tasks/g8poly.js";
import g8fsu from "./tasks/g8fsu.js";
import g8fact from "./tasks/g8fact.js";
import g8lin2 from "./tasks/g8lin2.js";
import g8sys from "./tasks/g8sys.js";
import g8sysw from "./tasks/g8sysw.js";
import g8afr from "./tasks/g8afr.js";
import g8sqrt from "./tasks/g8sqrt.js";
import g8qeq from "./tasks/g8qeq.js";
import g8proof from "./tasks/g8proof.js";
import g8tri from "./tasks/g8tri.js";
import g8pyth from "./tasks/g8pyth.js";
import g8quad from "./tasks/g8quad.js";
import g8area from "./tasks/g8area.js";
import g8circ from "./tasks/g8circ.js";
import g8reg from "./tasks/g8reg.js";
import g8sim from "./tasks/g8sim.js";
import g8ind from "./tasks/g8ind.js";

// шаблоны заданий всех тем класса: { id: { topic, pts, cnt, title, gen } }
const TPL = {
  ...g8rev,
  ...g8poly,
  ...g8fsu,
  ...g8fact,
  ...g8lin2,
  ...g8sys,
  ...g8sysw,
  ...g8afr,
  ...g8sqrt,
  ...g8qeq,
  ...g8proof,
  ...g8tri,
  ...g8pyth,
  ...g8quad,
  ...g8area,
  ...g8circ,
  ...g8reg,
  ...g8sim,
  ...g8ind,
};

export default { TOPICS, TPL, OLY, PROOFS, summaries };
