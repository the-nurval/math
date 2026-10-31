// 8 класс, тема «Повторение 7 класса»: шаблоны заданий.
import { FR, MINUS, O, P, Q, ansHtml, numAns, numHtml, qh, t3 } from "../../../core/index.js";
import { par, pl, sup } from "../helpers.js";

export default {
  /* --- Повторение 7 класса --- */
  rev7pow: {
    topic: "g8rev",
    pts: 1,
    cnt: { n: 3, a: 3 },
    title: O(
      "Вычисли, используя свойства степеней",
      "Arvuta astmete omadusi kasutades",
      "Calculate using the laws of exponents",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const b =
          lvl === "n"
            ? new Q(R.pick([2, 3, 5, 10, -2]))
            : R.pick([new Q(1, 2), new Q(-3), new Q(2, 3), new Q(3, 2), new Q(-1, 2)]);
        const r = lvl === "n" ? R.int(1, 4) : R.pick([-2, -1, 2, 3]);
        const m = R.int(3, 8),
          n = R.int(2, 7);
        const k = m + n - r;
        const B = b.isInt() && b.sgn() > 0 ? qh(b) : `(${numHtml(b, "frac")})`;
        items.push(
          numAns(b.pow(r), {
            q: `${B}${sup(m)} · ${B}${sup(n)} : ${B}${sup(k)}`,
            exp:
              P(
                t3(
                  "При умножении показатели складываем, при делении вычитаем:",
                  "Korrutamisel astendajad liidame, jagamisel lahutame:",
                  "Add exponents when multiplying, subtract when dividing:",
                ) + ` ${m} + ${n} ${MINUS} ${k} = ${qh(r)}.`,
              ) + P(`${B}<sup>${qh(r)}</sup> = ${numHtml(b.pow(r), "frac")}`),
          }),
        );
      }
      return { items };
    },
  },

  rev7eq: {
    topic: "g8rev",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O("Реши уравнение", "Lahenda võrrand", "Solve the equation"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        if (lvl === "a" && i === cnt - 1) {
          const m = R.pick([2, 3, 4, 5]);
          let n;
          do {
            n = R.pick([3, 4, 6, 5]);
          } while (n === m);
          const p = R.int(1, 9),
            r = R.int(1, 9),
            s = R.int(1, 5);
          const x = new Q(s * m * n + n * p - m * r, m + n);
          items.push(
            numAns(x, {
              pre: "x =",
              q: `${FR("x " + MINUS + " " + p, m)} + ${FR("x + " + r, n)} = ${s}`,
              exp:
                P(
                  t3(
                    `Умножаем обе части на ${m * n}:`,
                    `Korrutame mõlemad pooled arvuga ${m * n}:`,
                    `Multiply both sides by ${m * n}:`,
                  ) + ` ${n}(x ${MINUS} ${p}) + ${m}(x + ${r}) = ${s * m * n}`,
                ) + P(`${m + n}x = ${s * m * n + n * p - m * r}; x = ${ansHtml(x)}`),
            }),
          );
          continue;
        }
        let a, d, b, c, e, x;
        for (;;) {
          a = R.int(2, 7);
          d = R.int(-5, 6);
          b = R.int(1, 9);
          c = R.int(1, 12);
          e = R.int(-15, 15);
          if (a === d || d === 0) continue;
          x = new Q(a * b + c + e, a - d);
          if (x.d <= (lvl === "n" ? 4 : 8) && x.n !== 0) break;
        }
        items.push(
          numAns(x, {
            pre: "x =",
            q: `${a}(x ${MINUS} ${b}) ${MINUS} ${c} = ${pl([
              [d, "x"],
              [e, ""],
            ])}`,
            exp:
              P(
                t3("Раскрываем скобки:", "Avame sulud:", "Expand the brackets:") +
                  ` ${a}x ${MINUS} ${a * b} ${MINUS} ${c} = ${pl([
                    [d, "x"],
                    [e, ""],
                  ])}`,
              ) + P(`${pl([[a - d, "x"]])} = ${a * b + c + e}; x = ${ansHtml(x)}`),
          }),
        );
      }
      return { items };
    },
  },

  rev7func: {
    topic: "g8rev",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O("Линейная функция", "Lineaarfunktsioon", "Linear function"),
    gen(R, lvl, cnt) {
      let x1, x2, y1, y2;
      do {
        x1 = R.int(-5, 3);
        x2 = x1 + R.int(1, 6);
        y1 = R.int(-8, 8);
        y2 = R.int(-8, 8);
      } while (y1 === y2 || (lvl === "n" && (y2 - y1) % (x2 - x1) !== 0));
      const k = new Q(y2 - y1, x2 - x1),
        b = new Q(y1).sub(k.mul(x1));
      const intro = t3(
        `График функции y = kx + b проходит через точки A(${qh(x1)}; ${qh(y1)}) и B(${qh(x2)}; ${qh(y2)}).`,
        `Funktsiooni y = kx + b graafik läbib punkte A(${qh(x1)}; ${qh(y1)}) ja B(${qh(x2)}; ${qh(y2)}).`,
        `The graph of y = kx + b passes through A(${qh(x1)}; ${qh(y1)}) and B(${qh(x2)}; ${qh(y2)}).`,
      );
      const items = [
        numAns(k, {
          q: t3("Угловой коэффициент", "Tõus", "Slope"),
          pre: "k =",
          exp: P(
            `k = (${qh(y2)} ${MINUS} ${par(y1)}) : (${qh(x2)} ${MINUS} ${par(x1)}) = ${numHtml(k, "frac")}`,
          ),
        }),
        numAns(b, {
          q: t3("Свободный член", "Vabaliige", "Intercept"),
          pre: "b =",
          exp: P(`b = ${qh(y1)} ${MINUS} ${par(k)} · ${par(x1)} = ${numHtml(b, "frac")}`),
        }),
      ];
      if (cnt > 2 && k.n !== 0) {
        const x0 = b.neg().div(k);
        items.push(
          numAns(x0, {
            q: t3(
              "Точка пересечения графика с осью x",
              "Graafiku ja x-telje lõikepunkt",
              "Where the graph crosses the x-axis",
            ),
            pre: "x =",
            exp: P(`0 = ${numHtml(k, "frac")}x + ${par(b)}; x = ${ansHtml(x0)}`),
          }),
        );
      }
      return { intro, items };
    },
  },
};
