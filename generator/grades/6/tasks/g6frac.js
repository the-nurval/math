// 6 класс, тема «Основное свойство дроби, сравнение дробей»: шаблоны заданий.
import { FR, O, P, Q, choiceAns, gcd, lcm, t3 } from "../../../core/index.js";
import { CMP, fracAns } from "../helpers.js";

export default {
  /* ===== Основное свойство дроби ===== */
  fracReduce: {
    topic: "g6frac",
    pts: 1,
    cnt: { n: 4, a: 4 },
    title: O("Сократи дробь", "Taanda murd", "Simplify the fraction"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        let a, b;
        do {
          b = R.int(2, lvl === "n" ? 9 : 15);
          a = R.int(1, b - 1);
        } while (gcd(a, b) !== 1);
        const k = R.int(2, lvl === "n" ? 8 : 16);
        const n = a * k,
          d = b * k;
        items.push(
          fracAns(new Q(a, b), {
            q: FR(n, d) + " =",
            exp:
              P(
                t3(
                  `НОД(${n}; ${d}) = ${k}. Делим числитель и знаменатель на ${k}.`,
                  `SÜT(${n}; ${d}) = ${k}. Jagame lugeja ja nimetaja ${k}-ga.`,
                  `GCD(${n}, ${d}) = ${k}. Divide top and bottom by ${k}.`,
                ),
              ) + P(`${FR(n, d)} = ${FR(a, b)}`),
            hint: t3(
              "ответ — несократимая дробь",
              "vastus — taandumatu murd",
              "answer as a fraction in lowest terms",
            ),
          }),
        );
      }
      return { items };
    },
  },

  fracCompare: {
    topic: "g6frac",
    pts: 1,
    cnt: { n: 3, a: 4 },
    title: O("Сравни дроби (>, < или =)", "Võrdle murde (>, < või =)", "Compare (>, < or =)"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        let a, b, c, d;
        do {
          b = R.int(3, lvl === "n" ? 10 : 16);
          d = R.int(3, lvl === "n" ? 10 : 16);
          a = R.int(1, b - 1);
          c = R.int(1, d - 1);
        } while (b === d || (lvl === "a" && Math.abs(a / b - c / d) > 0.12));
        if (R.chance(0.12)) {
          const k = R.int(2, 4);
          c = a * k;
          d = b * k;
        }
        const L2 = lcm(b, d),
          A = (a * L2) / b,
          C = (c * L2) / d;
        const v = A > C ? ">" : A < C ? "<" : "=";
        items.push(
          choiceAns(v, CMP, {
            q: `${FR(a, b)} ☐ ${FR(c, d)}`,
            exp:
              P(
                t3(
                  `Общий знаменатель ${L2}: ${FR(A, L2)} и ${FR(C, L2)}.`,
                  `Ühine nimetaja ${L2}: ${FR(A, L2)} ja ${FR(C, L2)}.`,
                  `Common denominator ${L2}: ${FR(A, L2)} and ${FR(C, L2)}.`,
                ),
              ) + P(`${FR(a, b)} ${v} ${FR(c, d)}`),
          }),
        );
      }
      return { items };
    },
  },
};
