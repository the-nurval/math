// 8 класс, тема «Алгебраические дроби»: шаблоны заданий.
import { FR, MINUS, O, P, Q, numAns, numHtml, q, qh, t3 } from "../../../core/index.js";
import { halves, pl, setAns } from "../helpers.js";

export default {
  /* --- Алгебраические дроби (прогрессивная программа) --- */
  afrRed: {
    topic: "g8afr",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O(
      "Сократи дробь и найди её значение",
      "Taanda murd ja leia selle väärtus",
      "Simplify the fraction and evaluate",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["dsq", "com", "undef"] : ["sq", "dsq", "undef2"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        const x0 =
          lvl === "n"
            ? R.pick([new Q(2), new Q(-4), new Q(1, 2), new Q(5)])
            : R.pick([new Q(-3, 4), new Q(5, 2), new Q(-6, 5), new Q(7, 3)]);
        if (k === "dsq") {
          const a = R.int(1, 7);
          let X = x0;
          if (X.eq(q(a)) || X.n === 0 || X.eq(q(-a))) X = X.add(1);
          const v = X.sub(a).div(X);
          items.push(
            numAns(v, {
              q: `${FR("x² " + MINUS + " " + a * a, "x² + " + a + "x")}, x = ${qh(X)}`,
              exp:
                P(
                  `${FR("(x " + MINUS + " " + a + ")(x + " + a + ")", "x(x + " + a + ")")} = ${FR("x " + MINUS + " " + a, "x")}`,
                ) + P(`${FR(qh(X) + " " + MINUS + " " + a, qh(X))} = ${numHtml(v, "frac")}`),
            }),
          );
        } else if (k === "com") {
          const a = R.int(2, 6),
            b = R.int(1, 9),
            c = R.int(2, 5);
          let X = x0;
          if (X.n === 0) X = q(1);
          const v = X.mul(a).sub(b).div(c);
          items.push(
            numAns(v, {
              q: `${FR(a * c + "x² " + MINUS + " " + b * c + "x", c * c + "x")}, x = ${qh(X)}`,
              exp:
                P(
                  `${FR(c + "x(" + a + "x " + MINUS + " " + b + ")", c * c + "x")} = ${FR(a + "x " + MINUS + " " + b, c)}`,
                ) + P(`= ${numHtml(v, "frac")}`),
            }),
          );
        } else if (k === "sq") {
          const a = R.int(1, 6);
          let X = x0;
          if (X.eq(q(-a)) || X.eq(q(a))) X = X.add(1);
          const v = X.sub(a).div(X.add(a));
          items.push(
            numAns(v, {
              q: `${FR("x² " + MINUS + " " + 2 * a + "x + " + a * a, "x² " + MINUS + " " + a * a)}, x = ${qh(X)}`,
              exp:
                P(
                  `${FR("(x " + MINUS + " " + a + ")²", "(x " + MINUS + " " + a + ")(x + " + a + ")")} = ${FR("x " + MINUS + " " + a, "x + " + a)}`,
                ) + P(`= ${numHtml(v, "frac")}`),
            }),
          );
        } else if (k === "undef") {
          const a = R.int(1, 9),
            b = R.int(1, 9);
          items.push(
            setAns([new Q(-a), new Q(a)], {
              q: t3(
                `При каких x дробь ${FR("x + " + b, "x² " + MINUS + " " + a * a)} не имеет смысла?`,
                `Milliste x korral murd ${FR("x + " + b, "x² " + MINUS + " " + a * a)} ei ole määratud?`,
                `For which x is ${FR("x + " + b, "x² " + MINUS + " " + a * a)} not defined?`,
              ),
              exp: P(
                t3(
                  "Знаменатель не может быть равен нулю:",
                  "Nimetaja ei tohi olla null:",
                  "The denominator cannot be zero:",
                ) + ` x² = ${a * a}, x = ±${a}`,
              ),
            }),
          );
        } else {
          const a = R.int(2, 5),
            b = R.nz(-9, 9);
          const r = new Q(b, a);
          items.push(
            setAns(r.n === 0 ? [q(0)] : [q(0), r], {
              q: t3(
                `При каких x дробь ${FR(
                  "x + 1",
                  pl([
                    [a, "x²"],
                    [-b, "x"],
                  ]),
                )} не имеет смысла?`,
                `Milliste x korral murd ${FR(
                  "x + 1",
                  pl([
                    [a, "x²"],
                    [-b, "x"],
                  ]),
                )} ei ole määratud?`,
                `For which x is ${FR(
                  "x + 1",
                  pl([
                    [a, "x²"],
                    [-b, "x"],
                  ]),
                )} not defined?`,
              ),
              exp: P(
                `x(${pl([
                  [a, "x"],
                  [-b, ""],
                ])}) = 0; x = 0, x = ${qh(r)}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },

  afrOps: {
    topic: "g8afr",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O(
      "Выполни действия и найди значение",
      "Soorita tehted ja leia väärtus",
      "Simplify and evaluate",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = R.shuffle(["sub", "mul", "div"]);
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        if (k === "sub") {
          const a = R.int(1, 5);
          let x0;
          do {
            x0 = lvl === "n" ? q(R.int(-6, 6)) : halves(R, -4, 4);
          } while (Math.abs(x0.v()) === a);
          const v = q(2 * a).div(x0.mul(x0).sub(a * a));
          items.push(
            numAns(v, {
              q: `${FR(1, "x " + MINUS + " " + a)} ${MINUS} ${FR(1, "x + " + a)}, x = ${qh(x0)}`,
              exp:
                P(
                  `${FR("x + " + a + " " + MINUS + " x + " + a, "(x " + MINUS + " " + a + ")(x + " + a + ")")} = ${FR(2 * a, "x² " + MINUS + " " + a * a)}`,
                ) + P(`= ${numHtml(v, "frac")}`),
            }),
          );
        } else if (k === "mul") {
          const a = R.int(1, 6),
            c = R.int(2, 4);
          let x0;
          do {
            x0 = lvl === "n" ? q(R.int(-5, 7)) : R.pick([q(0.4), q(-1.5), q(2.25), new Q(1, 3)]);
          } while (x0.eq(q(-a)) || x0.n === 0);
          const v = x0.sub(a).mul(c);
          items.push(
            numAns(v, {
              q: `${FR("x² " + MINUS + " " + a * a, "x")} · ${FR(c + "x", "x + " + a)}, x = ${qh(x0)}`,
              exp:
                P(
                  `${FR("(x " + MINUS + " " + a + ")(x + " + a + ") · " + c + "x", "x(x + " + a + ")")} = ${c}(x ${MINUS} ${a})`,
                ) + P(`= ${numHtml(v, "frac")}`),
            }),
          );
        } else {
          const a = lvl === "n" ? R.int(2, 9) : q(R.pick([1.5, 2.5, -0.5, 4])),
            A = q(a);
          let b;
          do {
            b = R.int(1, 6);
          } while (A.eq(q(b)));
          const v = A.add(b).div(A);
          items.push(
            numAns(v, {
              q: `${FR("a² " + MINUS + " b²", "ab")} : ${FR("a " + MINUS + " b", "b")}, a = ${qh(A)}, b = ${b}`,
              exp:
                P(
                  `${FR("(a " + MINUS + " b)(a + b)", "ab")} · ${FR("b", "a " + MINUS + " b")} = ${FR("a + b", "a")}`,
                ) + P(`= ${numHtml(v, "frac")}`),
            }),
          );
        }
      }
      return { items };
    },
  },
};
