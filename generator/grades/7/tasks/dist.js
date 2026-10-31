// 7 класс, тема «Модуль, расстояние на числовой оси»: шаблоны заданий.
import { MINUS, P, Q, numAns, plainOf, qh, rDec, rInt, tr } from "../../../core/index.js";

export default {
  /* --- 6. Расстояние на числовой оси --- */
  dist: {
    topic: "dist",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: {
      ru: "Точки на числовой оси",
      et: "Punktid arvteljel",
      en: "Points on the number line",
    },
    gen(R, lvl, cnt) {
      const items = [];
      const a = rDec(R, 1, 15).abs().neg(),
        b = rDec(R, 1, 12);
      const intro = tr({
        ru: `Даны точки A(${qh(a)}) и B(${qh(b)}).`,
        et: `On antud punktid A(${qh(a)}) ja B(${qh(b)}).`,
        en: `Points A(${qh(a)}) and B(${qh(b)}) are given.`,
      });
      const d = b.sub(a).abs(),
        mid = a.add(b).div(2);
      items.push(
        numAns(d, {
          q: tr({ ru: "Расстояние AB", et: "Lõigu AB pikkus", en: "Distance AB" }),
          pre: "AB =",
          exp: P(`AB = |${qh(b)} ${MINUS} ${qh(a, true)}| = ${qh(d)}`),
        }),
      );
      if (cnt > 1)
        items.push(
          numAns(mid, {
            q: tr({
              ru: "Координата середины M отрезка AB",
              et: "Lõigu AB keskpunkti M koordinaat",
              en: "Coordinate of the midpoint M of AB",
            }),
            pre: "M =",
            exp:
              P(
                tr({
                  ru: "Середина — среднее арифметическое координат:",
                  et: "Keskpunkt on koordinaatide aritmeetiline keskmine:",
                  en: "The midpoint is the mean of the coordinates:",
                }),
              ) + P(`(${qh(a)} + ${qh(b)}) : 2 = ${qh(mid)}`),
          }),
        );
      if (cnt > 2) {
        const k = rDec(R, 1, 6).abs();
        const c1 = a.add(k),
          c2 = a.sub(k);
        items.push({
          ans: { type: "set", vals: [c1.v(), c2.v()] },
          show: `${qh(c2)}; ${qh(c1)}`,
          plain: `${plainOf(c2)}; ${plainOf(c1)}`,
          q: tr({
            ru: `Точка C удалена от A на ${qh(k)}. Найди все возможные координаты C (через «;»).`,
            et: `Punkt C asub punktist A kaugusel ${qh(k)}. Leia kõik võimalikud C koordinaadid (eralda «;»).`,
            en: `Point C is ${qh(k)} away from A. Find all possible coordinates of C (separate with «;»).`,
          }),
          pre: "C =",
          exp:
            P(`${qh(a)} ${MINUS} ${qh(k)} = ${qh(c2)}; ${qh(a)} + ${qh(k)} = ${qh(c1)}`) +
            P(
              tr({
                ru: "Точек две: слева и справа от A.",
                et: "Punkte on kaks: A-st vasakul ja paremal.",
                en: "There are two points: left and right of A.",
              }),
            ),
        });
      }
      return { intro, items };
    },
  },

  /* --- 7. Модуль --- */
  abs: {
    topic: "dist",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: { ru: "Модуль числа", et: "Arvu absoluutväärtus", en: "Absolute value" },
    gen(R, lvl, cnt) {
      const items = [];
      const kinds = lvl === "n" ? ["eq", "count", "eq2"] : ["shift", "count2", "sum"];
      for (let i = 0; i < cnt; i++) {
        const k = kinds[i % 3];
        if (k === "eq") {
          const a = rDec(R, 1, 9).abs();
          items.push({
            ans: { type: "set", vals: [a.v(), -a.v()] },
            show: `${qh(a)}; ${qh(a.neg())}`,
            plain: `${plainOf(a)}; ${plainOf(a.neg())}`,
            q: `|x| = ${qh(a)}`,
            pre: "x =",
            exp: P(
              tr({
                ru: `Модуль равен ${qh(a)} у двух чисел: ${qh(a)} и ${qh(a.neg())}.`,
                et: `Absoluutväärtus ${qh(a)} on kahel arvul: ${qh(a)} ja ${qh(a.neg())}.`,
                en: `Two numbers have absolute value ${qh(a)}: ${qh(a)} and ${qh(a.neg())}.`,
              }),
            ),
          });
        } else if (k === "eq2") {
          const a = rDec(R, 1, 6).abs(),
            c = rDec(R, 1, 4).abs();
          const m = a.add(c);
          items.push({
            ans: { type: "set", vals: [a.v(), -a.v()] },
            show: `${qh(a)}; ${qh(a.neg())}`,
            plain: `${plainOf(a)}; ${plainOf(a.neg())}`,
            q: `|x| + ${qh(c)} = ${qh(m)}`,
            pre: "x =",
            exp:
              P(`|x| = ${qh(m)} ${MINUS} ${qh(c)} = ${qh(a)}`) +
              P(`x = ${qh(a)}; x = ${qh(a.neg())}`),
          });
        } else if (k === "count" || k === "count2") {
          const a = new Q(R.int(21, 79), 10);
          const strict = k === "count" ? true : R.chance(0.5);
          const n = Math.floor(a.v());
          const cntv = 2 * n + 1;
          items.push(
            numAns(new Q(cntv), {
              q: tr({
                ru: `Сколько целых чисел x удовлетворяют условию |x| ${strict ? "<" : "≤"} ${qh(a)}?`,
                et: `Mitu täisarvu x rahuldavad tingimust |x| ${strict ? "<" : "≤"} ${qh(a)}?`,
                en: `How many integers x satisfy |x| ${strict ? "<" : "≤"} ${qh(a)}?`,
              }),
              exp: P(
                tr({
                  ru: `Подходят целые от ${MINUS}${n} до ${n}, включая 0: 2 · ${n} + 1 = ${cntv}.`,
                  et: `Sobivad täisarvud ${MINUS}${n} kuni ${n}, ka 0: 2 · ${n} + 1 = ${cntv}.`,
                  en: `Integers from ${MINUS}${n} to ${n}, including 0: 2 · ${n} + 1 = ${cntv}.`,
                }),
              ),
            }),
          );
        } else if (k === "shift") {
          const c = rDec(R, 1, 8),
            d = rDec(R, 1, 5).abs();
          const x1 = c.add(d),
            x2 = c.sub(d);
          items.push({
            ans: { type: "set", vals: [x1.v(), x2.v()] },
            show: `${qh(x2)}; ${qh(x1)}`,
            plain: `${plainOf(x2)}; ${plainOf(x1)}`,
            q: `|x ${c.sgn() < 0 ? "+" : MINUS} ${qh(c.abs())}| = ${qh(d)}`,
            pre: "x =",
            exp:
              P(
                tr({
                  ru: `Число x удалено от ${qh(c)} на ${qh(d)}:`,
                  et: `Arv x asub arvust ${qh(c)} kaugusel ${qh(d)}:`,
                  en: `x is ${qh(d)} away from ${qh(c)}:`,
                }),
              ) + P(`x = ${qh(c)} ± ${qh(d)} → ${qh(x2)}; ${qh(x1)}`),
          });
        } else {
          const a = rInt(R, 2, 9),
            b = rDec(R, 1, 9);
          const v = new Q(Math.abs(a)).sub(b.abs()).add(new Q(Math.abs(a)).mul(b).abs());
          items.push(
            numAns(v, {
              q: `|${qh(new Q(a))}| ${MINUS} |${qh(b)}| + |${qh(new Q(a))} · ${qh(b, true)}|`,
              exp: P(
                `${Math.abs(a)} ${MINUS} ${qh(b.abs())} + ${qh(new Q(a).mul(b).abs())} = ${qh(v)}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },
};
