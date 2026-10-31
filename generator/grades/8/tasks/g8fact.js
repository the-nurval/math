// 8 класс, тема «Разложение на множители»: шаблоны заданий.
import { MINUS, O, P, Q, choiceAns, gcd, numAns, q, qh, t3 } from "../../../core/index.js";
import { pl, setAns } from "../helpers.js";

export default {
  /* --- Разложение на множители --- */
  factCalc: {
    topic: "g8fact",
    pts: 1,
    cnt: { n: 3, a: 3 },
    title: O("Вычисли, разложив на множители", "Arvuta tegurdades", "Calculate by factoring"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["dsq", "com", "dsq"] : ["dsqd", "sqs", "comd"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        if (k === "dsq") {
          const s = R.pick([100, 200, 50, 80, 150]);
          const a = R.int(s / 2 + 3, s - 5),
            b = s - a;
          items.push(
            numAns(a * a - b * b, {
              q: `${a}² ${MINUS} ${b}²`,
              exp: P(`(${a} ${MINUS} ${b})(${a} + ${b}) = ${a - b} · ${a + b} = ${a * a - b * b}`),
            }),
          );
        } else if (k === "com") {
          const m = R.pick([12, 15, 25, 37, 48]),
            a = R.int(11, 69),
            b = R.pick([100, 50, 200]) - a;
          items.push(
            numAns(m * (a + b), {
              q: `${m} · ${a} + ${m} · ${b}`,
              exp: P(`${m} · (${a} + ${b}) = ${m} · ${a + b} = ${m * (a + b)}`),
            }),
          );
        } else if (k === "dsqd") {
          const s = q(R.pick([5, 10, 1, 2]));
          const a = q(R.pick([0.73, 3.7, 6.3, 1.35, 7.4]));
          const b = s.sub(a).abs();
          const x = a.v() > b.v() ? a : b,
            y = a.v() > b.v() ? b : a;
          items.push(
            numAns(x.mul(x).sub(y.mul(y)), {
              q: `${qh(x)}² ${MINUS} ${qh(y)}²`,
              exp: P(
                `(${qh(x)} ${MINUS} ${qh(y)})(${qh(x)} + ${qh(y)}) = ${qh(x.sub(y))} · ${qh(x.add(y))} = ${qh(x.mul(x).sub(y.mul(y)))}`,
              ),
            }),
          );
        } else if (k === "sqs") {
          const a = q(R.pick([7.5, 6.2, 3.4, 8.7, 2.65])),
            s = q(R.pick([10, 9, 12]));
          const B = s.sub(a);
          items.push(
            numAns(s.mul(s), {
              q: `${qh(a)}² + 2 · ${qh(a)} · ${qh(B)} + ${qh(B)}²`,
              exp: P(`(${qh(a)} + ${qh(B)})² = ${qh(s)}² = ${qh(s.mul(s))}`),
            }),
          );
        } else {
          const m = q(R.pick([4.5, 0.36, 1.25, 2.8])),
            a = R.int(13, 87),
            b = 100 - a;
          items.push(
            numAns(m.mul(100), {
              q: `${a} · ${qh(m)} + ${qh(m)} · ${b}`,
              exp: P(`${qh(m)} · (${a} + ${b}) = ${qh(m)} · 100 = ${qh(m.mul(100))}`),
            }),
          );
        }
      }
      return { items };
    },
  },

  factPick: {
    topic: "g8fact",
    pts: 1,
    cnt: { n: 2, a: 3 },
    title: O(
      "Выбери верное разложение на множители",
      "Vali õige tegurdus",
      "Choose the correct factorisation",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = R.shuffle(lvl === "n" ? ["dsq", "sq", "com"] : ["grp", "sq2", "cube", "dsq"]);
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % ks.length];
        const a = R.int(2, 5);
        let b;
        do {
          b = R.int(2, 9);
        } while (gcd(a, b) > 1);
        let txt, ok, bad;
        if (k === "dsq") {
          txt = `${a * a}x² ${MINUS} ${b * b}`;
          ok = `(${a}x ${MINUS} ${b})(${a}x + ${b})`;
          bad = [`(${a}x ${MINUS} ${b})²`, `(${a * a}x ${MINUS} ${b})(x + ${b})`];
        } else if (k === "sq") {
          txt = `x² ${MINUS} ${2 * b}x + ${b * b}`;
          ok = `(x ${MINUS} ${b})²`;
          bad = [`(x ${MINUS} ${b})(x + ${b})`, `(x + ${b})²`];
        } else if (k === "com") {
          txt = `${a * b}ab ${MINUS} ${a * a}b`;
          ok = `${a}b(${b}a ${MINUS} ${a})`;
          bad = [`${a}b(${b}a ${MINUS} ${a}b)`, `${a}(${b}ab ${MINUS} ${a})`];
        } else if (k === "grp") {
          txt = `ax ${MINUS} ay + ${b}x ${MINUS} ${b}y`;
          ok = `(x ${MINUS} y)(a + ${b})`;
          bad = [`(x + y)(a ${MINUS} ${b})`, `(x ${MINUS} y)(a ${MINUS} ${b})`];
        } else if (k === "sq2") {
          txt = `${a * a}a² ${MINUS} ${2 * a * b}ab + ${b * b}b²`;
          ok = `(${a}a ${MINUS} ${b}b)²`;
          bad = [`(${a}a ${MINUS} ${b}b)(${a}a + ${b}b)`, `(${a * a}a ${MINUS} ${b}b)²`];
        } else {
          txt = `x³ ${MINUS} ${b * b}x`;
          ok = `x(x ${MINUS} ${b})(x + ${b})`;
          bad = [`x(x ${MINUS} ${b})²`, `(x² ${MINUS} ${b})(x + ${b})`];
        }
        const opts = R.shuffle([ok].concat(bad)).map((s, j) => ["abc"[j], s]);
        const v = opts.find(o => o[1] === ok)[0];
        items.push(
          choiceAns(v, opts, {
            q: txt,
            exp: P(
              t3(
                "Проверка: раскрой скобки в верном ответе — получится исходное выражение.",
                "Kontroll: ava õige vastuse sulud — saad esialgse avaldise.",
                "Check: expanding the correct answer gives the original expression.",
              ) + ` ${txt} = ${ok}`,
            ),
          }),
        );
      }
      return { items };
    },
  },

  factEq: {
    topic: "g8fact",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O(
      "Реши уравнение разложением на множители",
      "Lahenda võrrand tegurdades",
      "Solve by factoring",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const ks =
        lvl === "n" ? R.shuffle(["kx", "prod", "dsq"]) : R.shuffle(["cube", "sqm", "full", "kx"]);
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % ks.length];
        if (k === "kx") {
          const a = R.int(1, 4),
            b = R.nz(-15, 15);
          const r = new Q(b, a);
          items.push(
            setAns([new Q(0), r], {
              q: `${pl([
                [a, "x²"],
                [-b, "x"],
              ])} = 0`,
              exp:
                P(
                  `x(${pl([
                    [a, "x"],
                    [-b, ""],
                  ])}) = 0`,
                ) +
                P(
                  t3(
                    "Произведение равно нулю, если хотя бы один множитель равен нулю.",
                    "Korrutis on null, kui vähemalt üks tegur on null.",
                    "A product is zero when at least one factor is zero.",
                  ) + ` x = 0; x = ${qh(r)}`,
                ),
            }),
          );
        } else if (k === "prod") {
          const p = R.int(1, 4),
            r = R.nz(-9, 9),
            s = R.nz(-8, 8);
          const x1 = new Q(-r, p),
            x2 = new Q(-s);
          items.push(
            setAns(x1.eq(x2) ? [x1] : [x1, x2], {
              q: `(${pl([
                [p, "x"],
                [r, ""],
              ])})(${pl([
                [1, "x"],
                [s, ""],
              ])}) = 0`,
              exp: P(
                `${pl([
                  [p, "x"],
                  [r, ""],
                ])} = 0 → x = ${qh(x1)}; ${pl([
                  [1, "x"],
                  [s, ""],
                ])} = 0 → x = ${qh(x2)}`,
              ),
            }),
          );
        } else if (k === "dsq") {
          const a = R.int(1, 5),
            b = R.int(1, 9);
          const r = new Q(b, a);
          items.push(
            setAns([r.neg(), r], {
              q: `${a * a}x² ${MINUS} ${b * b} = 0`,
              exp: P(`(${a}x ${MINUS} ${b})(${a}x + ${b}) = 0; x = ±${qh(r)}`),
            }),
          );
        } else if (k === "cube") {
          const m = R.int(2, 9);
          items.push(
            setAns([new Q(-m), new Q(0), new Q(m)], {
              q: `x³ ${MINUS} ${m * m}x = 0`,
              exp: P(`x(x ${MINUS} ${m})(x + ${m}) = 0; x = 0, x = ±${m}`),
            }),
          );
        } else if (k === "sqm") {
          const a = R.int(2, 3),
            b = R.nz(-7, 7),
            c = R.int(2, 9);
          const x1 = new Q(c - b, a),
            x2 = new Q(-c - b, a);
          items.push(
            setAns([x1, x2], {
              q: `(${pl([
                [a, "x"],
                [b, ""],
              ])})² ${MINUS} ${c * c} = 0`,
              exp:
                P(
                  `${pl([
                    [a, "x"],
                    [b, ""],
                  ])} = ${c}` +
                    t3(" или ", " või ", " or ") +
                    `${pl([
                      [a, "x"],
                      [b, ""],
                    ])} = ${MINUS}${c}`,
                ) + P(`x = ${qh(x1)}; x = ${qh(x2)}`),
            }),
          );
        } else {
          const b = R.nz(-9, 9);
          items.push(
            setAns([new Q(-b)], {
              q: `${pl([
                [1, "x²"],
                [2 * b, "x"],
                [b * b, ""],
              ])} = 0`,
              exp: P(
                `(${pl([
                  [1, "x"],
                  [b, ""],
                ])})² = 0; x = ${qh(-b)}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },
};
