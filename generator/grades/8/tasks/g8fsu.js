// 8 класс, тема «Формулы сокращённого умножения»: шаблоны заданий.
import { MINUS, O, P, Q, numAns, numHtml, q, qh, t3 } from "../../../core/index.js";
import { par, pl } from "../helpers.js";

export default {
  /* --- Формулы сокращённого умножения --- */
  fsuCalc: {
    topic: "g8fsu",
    pts: 1,
    cnt: { n: 4, a: 4 },
    title: O("Вычисли удобным способом", "Arvuta mugavalt", "Calculate the smart way"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["sq", "dif", "sq2", "dif"] : ["sqd", "difd", "sum2", "sq2"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 4];
        if (k === "sq") {
          const b = R.pick([20, 30, 40, 50, 60, 70, 80, 100]),
            d = R.pick([1, 2, 3, -1, -2]);
          const n = b + d;
          items.push(
            numAns(n * n, {
              q: `${n}²`,
              exp: P(
                `(${b} ${d < 0 ? MINUS : "+"} ${Math.abs(d)})² = ${b * b} ${d < 0 ? MINUS : "+"} ${2 * b * Math.abs(d)} + ${d * d} = ${n * n}`,
              ),
            }),
          );
        } else if (k === "sq2") {
          const b = R.pick([100, 200, 1000]),
            d = R.pick([-3, -2, -1, 1, 2, 4]);
          const n = b + d;
          items.push(
            numAns(n * n, {
              q: `${n}²`,
              exp: P(
                `(${b} ${d < 0 ? MINUS : "+"} ${Math.abs(d)})² = ${b * b} ${d < 0 ? MINUS : "+"} ${2 * b * Math.abs(d)} + ${d * d} = ${n * n}`,
              ),
            }),
          );
        } else if (k === "dif") {
          const b = R.pick([30, 40, 50, 60, 70, 100]),
            d = R.int(1, 4);
          items.push(
            numAns((b + d) * (b - d), {
              q: `${b + d} · ${b - d}`,
              exp: P(
                `(${b} + ${d})(${b} ${MINUS} ${d}) = ${b}² ${MINUS} ${d}² = ${b * b} ${MINUS} ${d * d} = ${(b + d) * (b - d)}`,
              ),
            }),
          );
        } else if (k === "sqd") {
          const n = q(R.pick([9.9, 10.1, 1.02, 0.98, 19.9, 2.01]));
          const b = q(Math.round(n.v())),
            d = n.sub(b);
          items.push(
            numAns(n.mul(n), {
              q: `${qh(n)}²`,
              exp: P(
                `(${qh(b)} ${d.sgn() < 0 ? MINUS : "+"} ${qh(d.abs())})² = ${qh(b.mul(b))} ${d.sgn() < 0 ? MINUS : "+"} ${qh(b.mul(d.abs()).mul(2))} + ${qh(d.mul(d))} = ${qh(n.mul(n))}`,
              ),
            }),
          );
        } else if (k === "difd") {
          const b = R.pick([4, 5, 8, 10]),
            d = q(R.pick([0.1, 0.2, 0.3]));
          const x = q(b).add(d),
            y = q(b).sub(d);
          items.push(
            numAns(x.mul(y), {
              q: `${qh(x)} · ${qh(y)}`,
              exp: P(
                `(${b} + ${qh(d)})(${b} ${MINUS} ${qh(d)}) = ${b * b} ${MINUS} ${qh(d.mul(d))} = ${qh(x.mul(y))}`,
              ),
            }),
          );
        } else {
          let s, p;
          do {
            s = R.int(-9, 11);
            p = R.nz(-12, 15);
          } while (s === 0);
          const ask = R.pick(["sq", "dif"]);
          const v = ask === "sq" ? s * s - 2 * p : s * s - 4 * p;
          items.push(
            numAns(v, {
              q: t3(
                `a + b = ${qh(s)}, ab = ${qh(p)}. Найди ${ask === "sq" ? "a² + b²" : "(a − b)²"}.`,
                `a + b = ${qh(s)}, ab = ${qh(p)}. Leia ${ask === "sq" ? "a² + b²" : "(a − b)²"}.`,
                `a + b = ${qh(s)}, ab = ${qh(p)}. Find ${ask === "sq" ? "a² + b²" : "(a − b)²"}.`,
              ),
              exp:
                ask === "sq"
                  ? P(`a² + b² = (a + b)² ${MINUS} 2ab = ${s * s} ${MINUS} ${par(2 * p)} = ${v}`)
                  : P(
                      `(a ${MINUS} b)² = (a + b)² ${MINUS} 4ab = ${s * s} ${MINUS} ${par(4 * p)} = ${v}`,
                    ),
            }),
          );
        }
      }
      return { items };
    },
  },

  fsuMiss: {
    topic: "g8fsu",
    pts: 1,
    cnt: { n: 3, a: 3 },
    title: O(
      "Найди число, которое стоит вместо ☐",
      "Leia arv, mis on ☐ asemel",
      "Find the number in place of ☐",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = R.shuffle(["mid", "dif", "last"]);
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        const a = lvl === "n" ? R.int(2, 6) : R.pick([q(0.5), q(1.5), q(3), q(0.2), q(4)]),
          b = lvl === "n" ? R.int(1, 9) : R.pick([q(2), q(5), q(0.3), q(7), q(1.2)]);
        const A = q(a),
          B = q(b);
        const sg = R.pick([1, -1]);
        if (k === "mid") {
          const v = A.mul(B).mul(2);
          items.push(
            numAns(v, {
              pre: "☐ =",
              q: `(${pl([[A, "x"]])} ${sg < 0 ? MINUS : "+"} ${qh(B)})² = ${pl([[A.mul(A), "x²"]])} ${sg < 0 ? MINUS : "+"} ☐x + ${qh(B.mul(B))}`,
              exp: P(
                `(a ${sg < 0 ? MINUS : "+"} b)² = a² ${sg < 0 ? MINUS : "+"} 2ab + b²; 2 · ${qh(A)} · ${qh(B)} = ${qh(v)}`,
              ),
            }),
          );
        } else if (k === "dif") {
          items.push(
            numAns(B, {
              pre: "☐ =",
              q: `(${pl([[A, "x"]])} ${MINUS} ☐)(${pl([[A, "x"]])} + ☐) = ${pl([[A.mul(A), "x²"]])} ${MINUS} ${qh(B.mul(B))}`,
              exp: P(`(a ${MINUS} b)(a + b) = a² ${MINUS} b²; b² = ${qh(B.mul(B))}, b = ${qh(B)}`),
            }),
          );
        } else {
          const v = B.mul(B);
          items.push(
            numAns(v, {
              pre: "☐ =",
              q: `(${pl([[A, "x"]])} ${sg < 0 ? MINUS : "+"} ${qh(B)}y)² = ${pl([[A.mul(A), "x²"]])} ${sg < 0 ? MINUS : "+"} ${qh(A.mul(B).mul(2))}xy + ☐y²`,
              exp: P(`b² = ${qh(B)}² = ${qh(v)}`),
            }),
          );
        }
      }
      return { items };
    },
  },

  fsuSimp: {
    topic: "g8fsu",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O(
      "Упрости выражение и найди его значение",
      "Lihtsusta avaldis ja leia selle väärtus",
      "Simplify and evaluate",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const x0 =
          lvl === "n"
            ? R.pick([new Q(-3), new Q(5), new Q(-1, 2), new Q(3, 2), new Q(-7)])
            : R.pick([new Q(-3, 4), new Q(13, 10), new Q(-12, 5), new Q(2, 3), new Q(-1, 6)]);
        let txt, co, steps;
        if (i % 2 === 0) {
          const a = R.int(1, 8),
            b = R.int(1, 9),
            sa = R.pick([1, -1]);
          co = [0, 2 * a * sa, a * a + b * b];
          txt = `(x ${sa < 0 ? MINUS : "+"} ${a})² ${MINUS} (x ${MINUS} ${b})(x + ${b})`;
          steps = `x² ${sa < 0 ? MINUS : "+"} ${2 * a}x + ${a * a} ${MINUS} x² + ${b * b} = ${pl([
            [co[1], "x"],
            [co[2], ""],
          ])}`;
        } else if (lvl === "n") {
          const a = R.int(2, 4),
            b = R.int(1, 6);
          co = [0, -2 * a * b, 2 * b * b];
          txt = `(${a}x ${MINUS} ${b})² ${MINUS} (${a}x + ${b})(${a}x ${MINUS} ${b})`;
          steps = `${a * a}x² ${MINUS} ${2 * a * b}x + ${b * b} ${MINUS} ${a * a}x² + ${b * b} = ${pl(
            [
              [co[1], "x"],
              [co[2], ""],
            ],
          )}`;
        } else {
          const a = R.int(1, 5),
            b = R.int(1, 5);
          co = [2, 0, 2 * a * a];
          txt = `(x + ${a})² + (x ${MINUS} ${a})²`;
          steps = `x² + ${2 * a}x + ${a * a} + x² ${MINUS} ${2 * a}x + ${a * a} = ${pl([
            [2, "x²"],
            [2 * a * a, ""],
          ])}`;
        }
        const val = x0.mul(x0).mul(co[0]).add(x0.mul(co[1])).add(co[2]);
        items.push(
          numAns(val, {
            q: `${txt}, x = ${qh(x0)}`,
            exp: P(steps) + P(`x = ${qh(x0)}: ${numHtml(val, "frac")}`),
          }),
        );
      }
      return { items };
    },
  },
};
