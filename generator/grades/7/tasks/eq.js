// 7 класс, тема «Линейные уравнения, пропорция»: шаблоны заданий.
import {
  MINUS,
  P,
  Q,
  ansHtml,
  fracHtml,
  lcm,
  numAns,
  numHtml,
  qh,
  rDec,
  rFrac,
  rInt,
  tr,
} from "../../../core/index.js";

export default {
  /* --- 14. Линейные уравнения --- */
  linEq: {
    topic: "eq",
    pts: 3,
    cnt: { n: 4, a: 4 },
    title: { ru: "Реши уравнение", et: "Lahenda võrrand", en: "Solve the equation" },
    gen(R, lvl, cnt) {
      const items = [];
      const forms = R.shuffle(
        lvl === "n" ? ["F1", "F2", "F3", "F2", "F1"] : ["F2", "F3", "F4", "F5", "F4"],
      );
      for (let i = 0; i < cnt; i++) {
        const f = forms[i % forms.length];
        let alt;
        const x =
          lvl === "n"
            ? R.chance(0.5)
              ? new Q(rInt(R, 1, 12))
              : rDec(R, R.pick([1, 2]), 8)
            : R.chance(0.5)
              ? rFrac(R, [3, 7, 6, 9], 2)
              : rDec(R, 2, 6);
        let qq, ex;
        const ci = () => new Q(rInt(R, 2, 9));
        if (f === "F1") {
          const a = ci(),
            b = new Q(rInt(R, 3, 40));
          const c = a.mul(x).add(b);
          qq = `${qh(a)}x ${b.sgn() < 0 ? MINUS : "+"} ${qh(b.abs())} = ${qh(c)}`;
          ex =
            P(
              `${qh(a)}x = ${qh(c)} ${b.sgn() < 0 ? "+" : MINUS} ${qh(b.abs())} = ${qh(c.sub(b))}`,
            ) + P(`x = ${qh(c.sub(b))} : ${qh(a, true)} = ${ansHtml(x)}`);
        } else if (f === "F2") {
          let a = ci(),
            c = ci();
          while (a.eq(c)) c = ci();
          const b = new Q(rInt(R, 2, 30));
          const d = a.sub(c).mul(x).add(b);
          qq = `${qh(a)}x ${b.sgn() < 0 ? MINUS : "+"} ${qh(b.abs())} = ${qh(c)}x ${d.sgn() < 0 ? MINUS : "+"} ${qh(d.abs())}`;
          ex =
            P(
              tr({
                ru: "Переносим x влево, числа вправо, меняя знак:",
                et: "Viime x-iga liikmed vasakule ja arvud paremale, muutes märki:",
                en: "Move x terms left and numbers right, changing signs:",
              }),
            ) +
            P(`${qh(a)}x ${MINUS} ${qh(c, true)}x = ${qh(d)} ${MINUS} ${qh(b, true)}`) +
            P(`${qh(a.sub(c))}x = ${qh(d.sub(b))}`) +
            P(`x = ${ansHtml(x)}`);
        } else if (f === "F3") {
          const a = ci(),
            p = new Q(rInt(R, 1, 9));
          const c = a.mul(x.sub(p));
          qq = `${qh(a)}(x ${p.sgn() < 0 ? "+" : MINUS} ${qh(p.abs())}) = ${qh(c)}`;
          ex =
            P(
              `x ${p.sgn() < 0 ? "+" : MINUS} ${qh(p.abs())} = ${qh(c)} : ${qh(a, true)} = ${qh(c.div(a))}`,
            ) + P(`x = ${ansHtml(x)}`);
          alt = P(
            tr({
              ru: "Другой способ: раскрыть скобки",
              et: "Teine võimalus: avada sulud",
              en: "Another way: expand the brackets",
            }) + ` ${qh(a)}x ${MINUS} ${qh(a.mul(p), true)} = ${qh(c)}.`,
          );
        } else if (f === "F4") {
          const a = new Q(R.int(2, 6)),
            b = new Q(R.int(2, 6)),
            p = new Q(R.int(1, 7)),
            s = new Q(R.int(1, 7));
          let aa = a;
          if (a.eq(b)) aa = a.add(1);
          const c = aa.mul(x.add(p)).sub(b.mul(x.sub(s)));
          qq = `${qh(aa)}(x + ${qh(p)}) ${MINUS} ${qh(b)}(x ${MINUS} ${qh(s)}) = ${qh(c)}`;
          ex =
            P(`${qh(aa)}x + ${qh(aa.mul(p))} ${MINUS} ${qh(b)}x + ${qh(b.mul(s))} = ${qh(c)}`) +
            P(`${qh(aa.sub(b))}x = ${qh(c.sub(aa.mul(p)).sub(b.mul(s)))}`) +
            P(`x = ${ansHtml(x)}`);
        } else {
          const a = R.pick([2, 3, 4]),
            b = R.pick([5, 6, 3]);
          const c = x.div(a).add(x.div(b));
          qq = `${fracHtml("x", a)} + ${fracHtml("x", b)} = ${numHtml(c, "frac")}`;
          ex =
            P(
              tr({
                ru: `Умножим обе части на ${lcm(a, b)}:`,
                et: `Korrutame mõlemad pooled arvuga ${lcm(a, b)}:`,
                en: `Multiply both sides by ${lcm(a, b)}:`,
              }),
            ) +
            P(`${lcm(a, b) / a}x + ${lcm(a, b) / b}x = ${qh(c.mul(lcm(a, b)))}`) +
            P(`x = ${ansHtml(x)}`);
        }
        items.push(numAns(x, { q: qq, pre: "x =", exp: ex, alt }));
      }
      return { items };
    },
  },

  /* --- 15. Пропорция --- */
  prop: {
    topic: "eq",
    pts: 2,
    cnt: { n: 2, a: 2 },
    title: { ru: "Реши пропорцию", et: "Lahenda võrre", en: "Solve the proportion" },
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const a = new Q(R.int(2, 15)),
          b = new Q(R.int(2, 15)),
          c = new Q(R.pick([3, 4, 6, 7, 8, 9, 12]));
        if (i === 0 || lvl === "n") {
          const x = a.mul(b).div(c);
          items.push(
            numAns(x, {
              q: `${fracHtml("x", a.n)} = ${fracHtml(b.n, c.n)}`,
              pre: "x =",
              exp:
                P(
                  tr({
                    ru: "Произведение крайних членов равно произведению средних:",
                    et: "Välisliikmete korrutis võrdub sisemiste liikmete korrutisega:",
                    en: "Cross-multiply:",
                  }),
                ) + P(`x · ${c.n} = ${a.n} · ${b.n}, x = ${ansHtml(x)}`),
            }),
          );
        } else {
          const p = new Q(R.int(1, 6));
          const x = a.mul(b).div(c).sub(p);
          items.push(
            numAns(x, {
              q: `${fracHtml("x + " + p.n, a.n)} = ${fracHtml(b.n, c.n)}`,
              pre: "x =",
              exp:
                P(`x + ${p.n} = ${a.n} · ${b.n} : ${c.n} = ${qh(a.mul(b).div(c))}`) +
                P(`x = ${ansHtml(x)}`),
            }),
          );
        }
      }
      return { items };
    },
  },
};
