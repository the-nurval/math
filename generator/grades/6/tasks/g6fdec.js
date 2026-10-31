// 6 класс, тема «Обыкновенные и десятичные дроби»: шаблоны заданий.
import {
  FR,
  L,
  N,
  O,
  P,
  Q,
  T_ANS,
  curLang,
  decStr,
  evalE,
  gcd,
  numAns,
  rFrac,
  renderE,
  t3,
  tr,
} from "../../../core/index.js";
import { fh } from "../helpers.js";

/* ===== Обыкновенные и десятичные дроби ===== */
const PER = [
  [1, 3],
  [2, 3],
  [1, 6],
  [5, 6],
  [2, 9],
  [7, 9],
  [1, 11],
  [5, 11],
  [7, 12],
  [4, 15],
  [1, 12],
  [8, 33],
];

function perStr(n, d) {
  // 5/11 -> "0,(45)"
  const w = Math.floor(n / d);
  let r = n % d;
  const seen = {},
    digs = [];
  while (r && seen[r] == null) {
    seen[r] = digs.length;
    r *= 10;
    digs.push(Math.floor(r / d));
    r %= d;
  }
  const sep = curLang() === "en" ? "." : ",";
  if (!r) return w + sep + digs.join("");
  const s = seen[r];
  return w + sep + digs.slice(0, s).join("") + "(" + digs.slice(s).join("") + ")";
}

export default {
  fracToDec: {
    topic: "g6fdec",
    pts: 1,
    cnt: { n: 4, a: 4 },
    title: O("Запиши в виде десятичной дроби", "Kirjuta kümnendmurruna", "Write as a decimal"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        if (lvl === "a" && i % 2 === 1) {
          const [n, d] = R.pick(PER);
          const v = new Q(n, d);
          const it = numAns(v, {
            q: FR(n, d) + " =",
            exp:
              P(
                t3(
                  `Делим ${n} на ${d} уголком; остатки начинают повторяться, значит дробь периодическая.`,
                  `Jagame ${n} arvuga ${d}; jäägid hakkavad korduma, seega on murd perioodiline.`,
                  `Long-divide ${n} by ${d}; the remainders repeat, so the decimal recurs.`,
                ),
              ) + P(`${FR(n, d)} = ${perStr(n, d)}`),
            hint: t3(
              "период пиши в скобках: 0,(3)",
              "periood kirjuta sulgudesse: 0,(3)",
              "put the repeating part in brackets: 0.(3)",
            ),
          });
          it.ans.round = false;
          it.show = perStr(n, d);
          it.plain = perStr(n, d);
          items.push(it);
          continue;
        }
        const d = R.pick([2, 4, 5, 8, 20, 25, 40, 50]);
        let n;
        do {
          n = R.int(1, d * (lvl === "n" ? 1 : 3) - 1);
        } while (gcd(n, d) !== 1);
        const v = new Q(n, d);
        const k = Math.max(
          ...[2, 5].map(p => {
            let c = 0,
              x = d;
            while (x % p === 0) {
              x /= p;
              c++;
            }
            return c;
          }),
        );
        const m = Math.pow(10, k) / d;
        items.push(
          numAns(v, {
            q: FR(n, d) + " =",
            exp:
              P(
                t3(
                  `Домножаем знаменатель до ${Math.pow(10, k)}: ${FR(n, d)} = ${FR(n * m, Math.pow(10, k))}.`,
                  `Laiendame nimetaja arvuni ${Math.pow(10, k)}: ${FR(n, d)} = ${FR(n * m, Math.pow(10, k))}.`,
                  `Expand the denominator to ${Math.pow(10, k)}: ${FR(n, d)} = ${FR(n * m, Math.pow(10, k))}.`,
                ),
              ) + P(`= ${decStr(v)}`),
          }),
        );
      }
      return { items };
    },
  },

  fdMixed: {
    topic: "g6fdec",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O(
      "Вычисли (ответ — обыкновенной дробью)",
      "Arvuta (vastus harilikus murrus)",
      "Calculate (answer as a fraction)",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const a = R.pick([
          new Q(1, 4),
          new Q(3, 4),
          new Q(1, 2),
          new Q(2, 5),
          new Q(3, 5),
          new Q(1, 5),
          new Q(5, 4),
          new Q(7, 20),
        ]);
        const b = rFrac(R, [3, 6, 7, 9, 12], 0).abs();
        let e = N(R.pick(["+", "-"]), L(a, "dec"), L(b, "frac"));
        if (evalE(e).sgn() < 0) e = N("+", e.a, e.b);
        if (lvl === "a") e = N("*", e, L(new Q(R.pick([2, 3, 4, 6, 12])), "auto"));
        const r = evalE(e);
        items.push(
          numAns(r, {
            q: renderE(e),
            exp:
              P(
                t3(
                  `${decStr(a)} = ${FR(a.n, a.d)}: переводим десятичную дробь в обыкновенную, потому что ${fh(b)} в конечную десятичную не переводится.`,
                  `${decStr(a)} = ${FR(a.n, a.d)}: kirjutame kümnendmurru harilikuna, sest ${fh(b)} ei ole lõplik kümnendmurd.`,
                  `${decStr(a)} = ${FR(a.n, a.d)}: turn the decimal into a fraction because ${fh(b)} has no finite decimal.`,
                ),
              ) + P(`${tr(T_ANS)}: ${fh(r)}`),
          }),
        );
      }
      return { items };
    },
  },
};
