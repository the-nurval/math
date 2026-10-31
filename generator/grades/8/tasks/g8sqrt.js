// 8 класс, тема «Квадратные корни»: шаблоны заданий.
import {
  FR,
  MINUS,
  O,
  P,
  Q,
  choiceAns,
  decStr,
  numAns,
  numHtml,
  q,
  qh,
  t3,
} from "../../../core/index.js";
import { approxAns, sup } from "../helpers.js";

export default {
  /* --- Квадратные корни (прогрессивная программа) --- */
  sqrtCalc: {
    topic: "g8sqrt",
    pts: 1,
    cnt: { n: 4, a: 4 },
    title: O("Вычисли", "Arvuta", "Calculate"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["dec", "prod", "mul", "pow"] : ["mix", "diff", "py", "conj"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 4];
        if (k === "dec") {
          const a = R.pick([0.36, 0.49, 1.21, 0.04, 1.44, 0.81]),
            b = R.pick([0.25, 0.09, 1.69, 0.64]);
          const v = q(Math.sqrt(a)).add(q(Math.sqrt(b)));
          items.push(
            numAns(v, {
              q: `√${qh(a)} + √${qh(b)}`,
              exp: P(`${qh(Math.sqrt(a))} + ${qh(Math.sqrt(b))} = ${qh(v)}`),
            }),
          );
        } else if (k === "prod") {
          const a = R.pick([2, 3]),
            b = R.pick([3, 5, 7]);
          const ea = R.pick([2, 4, 6]),
            eb = 2;
          const v = Math.pow(a, ea / 2) * b;
          items.push(
            numAns(v, {
              q: `√(${a}${sup(ea)} · ${b}²)`,
              exp: P(`${a}${sup(ea / 2)} · ${b} = ${v}`),
            }),
          );
        } else if (k === "mul") {
          const [x, y] = R.pick([
            [18, 2],
            [50, 2],
            [12, 3],
            [27, 3],
            [8, 32],
            [20, 5],
            [45, 5],
          ]);
          const v = Math.sqrt(x * y);
          if (R.chance(0.5))
            items.push(
              numAns(v, { q: `√${x} · √${y}`, exp: P(`√(${x} · ${y}) = √${x * y} = ${v}`) }),
            );
          else
            items.push(
              numAns(v, {
                q: FR("√" + v * v * y, "√" + y),
                exp: P(`√(${v * v * y} : ${y}) = √${v * v} = ${v}`),
              }),
            );
        } else if (k === "pow") {
          const a = R.int(2, 5),
            b = R.pick([2, 3, 5, 7]);
          items.push(
            numAns(a * a * b, {
              q: `(${a}√${b})²`,
              exp: P(`${a}² · (√${b})² = ${a * a} · ${b} = ${a * a * b}`),
            }),
          );
        } else if (k === "mix") {
          const [n, d] = R.pick([
            [25, 16],
            [49, 36],
            [169, 144],
            [121, 100],
            [289, 64],
          ]);
          const w = Math.floor(n / d),
            r = n % d;
          const v = new Q(Math.round(Math.sqrt(n)), Math.round(Math.sqrt(d)));
          items.push(
            numAns(v, { q: `√(${w}${FR(r, d)})`, exp: P(`√${FR(n, d)} = ${numHtml(v, "frac")}`) }),
          );
        } else if (k === "diff") {
          const [a, b] = R.pick([
            [13, 12],
            [17, 15],
            [25, 24],
            [6.5, 2.5],
            [41, 40],
          ]);
          const v = Math.sqrt(a * a - b * b);
          items.push(
            numAns(q(v), {
              q: `√(${qh(a)}² ${MINUS} ${qh(b)}²)`,
              exp: P(
                `√((${qh(a)} ${MINUS} ${qh(b)})(${qh(a)} + ${qh(b)})) = √(${qh(a - b)} · ${qh(a + b)}) = ${qh(v)}`,
              ),
            }),
          );
        } else if (k === "py") {
          const a = R.pick([2, 5, 6, 13]),
            b = R.pick([3, 7, 10, 11]);
          items.push(
            numAns(a - b, {
              q: `(√${a} ${MINUS} √${b})(√${a} + √${b})`,
              exp: P(`(√${a})² ${MINUS} (√${b})² = ${a} ${MINUS} ${b} = ${a - b}`),
            }),
          );
        } else {
          const a = R.int(2, 5);
          const b = R.pick([2, 3, 5]);
          items.push(
            numAns(a * a * b - b, {
              q: `(${a}√${b})² ${MINUS} (√${b})²`,
              exp: P(`${a * a * b} ${MINUS} ${b} = ${a * a * b - b}`),
            }),
          );
        }
      }
      return { items };
    },
  },

  sqrtOut: {
    topic: "g8sqrt",
    pts: 1,
    cnt: { n: 3, a: 3 },
    title: O("Преобразуй корень", "Teisenda ruutjuur", "Work with square roots"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["out", "cmp", "apx"] : ["sum", "cmp", "apx"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        if (k === "out") {
          const b = R.pick([2, 3, 5, 6, 7]),
            a = R.int(2, 6);
          items.push(
            numAns(a, {
              pre: "a =",
              q: `√${a * a * b} = a√${b}`,
              exp: P(`√${a * a * b} = √(${a * a} · ${b}) = ${a}√${b}`),
            }),
          );
        } else if (k === "sum") {
          const b = R.pick([2, 3, 5]);
          const [x, y, z] = [R.int(2, 5), R.int(2, 4), R.int(1, 3)];
          const v = x + y - z;
          items.push(
            numAns(v, {
              pre: "a =",
              q: `√${x * x * b} + √${y * y * b} ${MINUS} √${z * z * b} = a√${b}`,
              exp: P(`${x}√${b} + ${y}√${b} ${MINUS} ${z === 1 ? "" : z}√${b} = ${v}√${b}`),
            }),
          );
        } else if (k === "cmp") {
          let a, b, c, d;
          do {
            a = R.int(2, 6);
            b = R.pick([2, 3, 5, 6, 7]);
            c = R.int(2, 6);
            d = R.pick([2, 3, 5, 6, 7, 10, 11]);
          } while (a * a * b === c * c * d || (a === c && b === d));
          const L1 = a * a * b,
            L2 = c * c * d;
          items.push(
            choiceAns(
              L1 > L2 ? "a" : "b",
              [
                ["a", `${a}√${b}`],
                ["b", `${c}√${d}`],
              ],
              {
                q: t3(
                  `Что больше: ${a}√${b} или ${c}√${d}?`,
                  `Kumb on suurem: ${a}√${b} või ${c}√${d}?`,
                  `Which is greater: ${a}√${b} or ${c}√${d}?`,
                ),
                exp: P(`${a}√${b} = √${L1}; ${c}√${d} = √${L2}`),
              },
            ),
          );
        } else {
          const n = R.pick([2, 3, 5, 7, 10, 11, 13, 20, 30, 0.5]);
          items.push(
            approxAns(Math.sqrt(n), {
              q: t3(
                `√${qh(n)} с точностью до сотых`,
                `√${qh(n)} sajandiku täpsusega`,
                `√${qh(n)} to two decimal places`,
              ),
              exp: P(`√${qh(n)} ≈ ${decStr(q(Math.round(Math.sqrt(n) * 1e4) / 1e4))}`),
            }),
          );
        }
      }
      return { items };
    },
  },
};
