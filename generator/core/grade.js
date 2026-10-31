// Класс: какие темы пройдены к дате и сборка работы из шаблонов, олимпиадных задач и доказательств.
import { isFilled, parseNum, score } from "./answers.js";
import { PERIODS, schoolPos } from "./calendar.js";
import { olyItem, proofItem } from "./items.js";
import { setLang, tr } from "./lang.js";
import { hashStr, mkR } from "./random.js";
import { Q } from "./rational.js";

export function makeGrade(grade, M) {
  const { TOPICS, TPL, OLY, PROOFS } = M;
  function coveredTopics(weeks) {
    return TOPICS.filter(t => t.start < weeks);
  }
  function currentTopics(pos) {
    const cov = coveredTopics(pos.weeks);
    let pIdx = pos.period;
    if (pIdx < 0) return [TOPICS[0]];
    let pStart = PERIODS[pIdx].w0;
    let cur = cov.filter(t => t.start >= pStart);
    if (cur.length === 0 && pIdx > 0) {
      pStart = PERIODS[pIdx - 1].w0;
      cur = cov.filter(t => t.start >= pStart);
    }
    if (cur.length === 0) cur = [TOPICS[0]];
    return cur;
  }

  /* buildTest(opts): opts={date, level:'n'|'a'|'o', type:'theme'|'period', lang, seed, seenOly:[]} */
  function buildTest(opts) {
    setLang(opts.lang || "ru");
    const R = mkR(opts.seed);
    const pos = schoolPos(opts.date);
    const cov = coveredTopics(pos.weeks);
    const covIds = new Set(cov.map(t => t.id));
    covIds.add(TOPICS[0].id);
    let cur = currentTopics(pos);
    if (Array.isArray(opts.only) && opts.only.length) {
      const o = TOPICS.filter(t => opts.only.includes(t.id));
      if (o.length) cur = o;
    }
    const lvl = opts.level === "o" ? "a" : opts.level;
    const blocks = [];
    const seen = new Set(opts.seenOly || []);
    const pushTpl = (id, cnt) => {
      const t = TPL[id];
      const c = cnt || t.cnt[lvl];
      const b = t.gen(R, lvl, c);
      blocks.push({
        tpl: id,
        topic: t.topic,
        title: tr(t.title),
        pts: t.pts,
        intro: b.intro,
        items: b.items,
      });
    };
    const pickOly = (n, kind) => {
      const pool = (kind === "proof" ? PROOFS : OLY).filter(o => covIds.has(o.topic));
      const fresh = R.shuffle(pool.filter(o => !seen.has(o.id))),
        old = R.shuffle(pool.filter(o => seen.has(o.id)));
      return fresh.concat(old).slice(0, n);
    };
    const olyBlock = (list, pts, title) => {
      if (!list.length) return;
      blocks.push({
        tpl: "oly",
        topic: "oly",
        star: true,
        title,
        pts,
        items: list.map(o => olyItem(o)),
      });
    };
    if (opts.level === "o") {
      olyBlock(
        pickOly(6),
        3,
        tr({ ru: "Олимпиадные задачи", et: "Olümpiaadiülesanded", en: "Olympiad problems" }),
      );
      const pr = pickOly(1, "proof");
      if (pr.length)
        blocks.push({
          tpl: "proof",
          topic: "proof",
          star: true,
          title: tr({ ru: "Докажи", et: "Tõesta", en: "Prove" }),
          pts: 4,
          items: pr.map(proofItem),
        });
      // добавим одну продвинутую текстовую по текущей теме
      const curT = cur[cur.length - 1];
      pushTpl(R.pick(curT.tpl), 2);
      return finish();
    }
    const isPeriod = opts.type === "period";
    // основная часть: шаблоны текущих тем
    let main = [];
    cur.forEach(t => t.tpl.forEach(id => main.push(id)));
    const review = [];
    if (!opts.only)
      cov.filter(t => !cur.includes(t)).forEach(t => t.tpl.forEach(id => review.push(id)));
    if (!opts.only && (cov.length <= 2 || pos.period < 0))
      TOPICS[0].tpl.forEach(id => {
        if (!main.includes(id)) review.push(id);
      });
    const maxBlocks = isPeriod ? 9 : 7;
    const nRev = opts.only ? 0 : isPeriod ? 3 : main.length >= 6 ? 1 : 2;
    if (main.length > maxBlocks - nRev) {
      const firsts = cur.map(t => t.tpl[0]);
      const rest = R.shuffle(main.filter(id => !firsts.includes(id)));
      const keep = new Set(firsts.concat(rest).slice(0, maxBlocks - nRev));
      main = main.filter(id => keep.has(id));
    }
    main.forEach(id => pushTpl(id));
    R.shuffle(Array.from(new Set(review)))
      .slice(0, Math.max(nRev, maxBlocks - main.length > 3 ? 3 : nRev))
      .forEach(id => pushTpl(id, Math.min(TPL[id].cnt[lvl], isPeriod ? 3 : 2)));
    // добираем объём
    const target = isPeriod ? 28 : 18;
    let total = () => blocks.reduce((s, b) => s + b.items.length, 0);
    let guard = 0;
    const used = () => new Set(blocks.map(b => b.tpl));
    while (total() < target && guard++ < 8) {
      const fresh = R.shuffle(Array.from(new Set(review))).filter(id => !used().has(id));
      if (fresh.length && blocks.length < maxBlocks + 1) {
        pushTpl(fresh[0], Math.min(3, TPL[fresh[0]].cnt[lvl]));
        continue;
      }
      // расширяем блок без общего условия
      const ext = R.shuffle(
        blocks.filter(b => !b.intro && !b.star && TPL[b.tpl] && b.items.length <= 4),
      );
      if (!ext.length) {
        if (opts.only) {
          pushTpl(R.pick(main));
          continue;
        }
        break;
      }
      const b = ext[0];
      const extra = TPL[b.tpl].gen(R, lvl, 2).items;
      b.items = b.items.concat(extra);
    }
    // задания со звёздочкой
    if (lvl === "n")
      olyBlock(
        pickOly(1),
        2,
        tr({ ru: "Задание со звёздочкой", et: "Tärnülesanne", en: "Challenge" }),
      );
    else {
      olyBlock(
        pickOly(2),
        3,
        tr({ ru: "Задания со звёздочкой", et: "Tärnülesanded", en: "Challenges" }),
      );
      const pr = pickOly(1, "proof");
      if (pr.length)
        blocks.push({
          tpl: "proof",
          topic: "proof",
          star: true,
          title: tr({ ru: "Докажи", et: "Tõesta", en: "Prove" }),
          pts: 3,
          items: pr.map(proofItem),
        });
    }
    return finish();
    function finish() {
      const minutes = opts.level === "o" ? 60 : isPeriod ? 90 : 45;
      return {
        pos,
        cov: cov.map(t => t.id),
        cur: cur.map(t => t.id),
        blocks,
        minutes,
        max: blocks.reduce((s, b) => s + b.items.length * b.pts, 0),
        olyIds: blocks
          .filter(b => b.tpl === "oly" || b.tpl === "proof")
          .flatMap(b => b.items.map(i => i.olyId)),
      };
    }
  }
  return {
    grade,
    buildTest,
    score,
    isFilled,
    parseNum,
    TOPICS,
    PERIODS,
    schoolPos,
    coveredTopics,
    currentTopics,
    TPL,
    OLY,
    PROOFS,
    setLang,
    tr,
    hashStr,
    Q,
    mkR,
  };
}
