// 6 класс, тема «Действия с рациональными числами»: шаблоны заданий.
import {
  L,
  N,
  O,
  P,
  Q,
  T_ANS,
  ansHtml,
  evalE,
  expAddSub,
  numAns,
  rDec,
  rFrac,
  renderE,
  stepList,
  stepsE,
  t3,
  tr,
} from "../../../core/index.js";

export default {
  /* ===== Действия с рациональными числами ===== */
  ratAdd: {
    topic: "g6rops",
    pts: 1,
    cnt: { n: 6, a: 6 },
    title: O("Вычисли", "Arvuta", "Calculate"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const op = i % 2 ? "-" : "+";
        const mode = lvl === "n" ? "int" : i % 3 === 0 ? "frac" : "dec";
        const a =
            mode === "int"
              ? new Q(R.nz(-60, 60))
              : mode === "frac"
                ? rFrac(R, [2, 3, 4, 5, 6, 8], 2)
                : rDec(R, 1, 20),
          b =
            mode === "int"
              ? new Q(R.nz(-60, 60))
              : mode === "frac"
                ? rFrac(R, [2, 3, 4, 6], 1)
                : rDec(R, 1, 20);
        const e = N(
          op,
          L(a, mode === "frac" ? "mixed" : "auto"),
          L(b, mode === "frac" ? "mixed" : "auto"),
        );
        const r = evalE(e);
        items.push(
          numAns(r, {
            q: renderE(e),
            exp: expAddSub(a, op, b, mode === "frac" ? "mixed" : "auto"),
          }),
        );
      }
      return { items };
    },
  },

  ratMul: {
    topic: "g6rops",
    pts: 1,
    cnt: { n: 5, a: 5 },
    title: O("Выполни действие", "Arvuta", "Calculate"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        let e;
        if (lvl === "n") {
          if (i % 2) {
            const d = R.nz(-12, 12),
              qt = R.nz(-15, 15);
            e = N(":", L(new Q(d * qt)), L(new Q(d)));
          } else e = N("*", L(new Q(R.nz(-15, 15))), L(new Q(R.nz(-12, 12))));
        } else {
          if (i % 2)
            e = N(":", L(rFrac(R, [3, 4, 5, 6], 1), "mixed"), L(rFrac(R, [2, 3, 4], 0), "frac"));
          else e = N("*", L(rDec(R, 1, 9), "dec"), L(rDec(R, 1, 6), "dec"));
        }
        const r = evalE(e);
        const lits = [e.a.v.q, e.b.v.q];
        const neg = lits.filter(x => x.sgn() < 0).length;
        items.push(
          numAns(r, {
            q: renderE(e),
            exp:
              P(
                t3(
                  neg === 1
                    ? "Знаки разные — результат отрицательный."
                    : "Знаки одинаковые — результат положительный.",
                  neg === 1
                    ? "Märgid on erinevad — tulemus on negatiivne."
                    : "Märgid on samad — tulemus on positiivne.",
                  neg === 1
                    ? "Different signs — the result is negative."
                    : "Same signs — the result is positive.",
                ),
              ) + P(`${tr(T_ANS)}: ${ansHtml(r)}`),
          }),
        );
      }
      return { items };
    },
  },

  ratExpr: {
    topic: "g6rops",
    pts: 3,
    cnt: { n: 2, a: 3 },
    title: O("Найди значение выражения", "Leia avaldise väärtus", "Evaluate"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const n = () => (lvl === "n" ? new Q(R.nz(-12, 12)) : rDec(R, 1, 9));
        const s = R.pick(["A", "B", "C"]);
        let e;
        if (s === "A") {
          const dd = R.nz(-6, 6);
          e = N("-", N("*", L(n()), L(n())), N(":", L(new Q(R.nz(-9, 9) * dd)), L(new Q(dd))));
        } else if (s === "B")
          e = N("*", N("+", L(n()), L(n())), N("-", L(n()), L(new Q(R.nz(-9, 9)))));
        else e = N("+", L(n()), N("*", L(new Q(R.nz(-5, 5))), N("-", L(n()), L(n()))));
        try {
          const st = [];
          const r = stepsE(e, "auto", st);
          items.push(
            numAns(r, {
              q: renderE(e),
              exp:
                P(
                  t3(
                    "Порядок: скобки, умножение и деление, сложение и вычитание. Следи за знаками.",
                    "Järjekord: sulud, korrutamine ja jagamine, liitmine ja lahutamine. Jälgi märke.",
                    "Order: brackets, × and ÷, + and −. Watch the signs.",
                  ),
                ) + stepList(st),
            }),
          );
        } catch (err) {
          i--;
        }
      }
      return { items };
    },
  },
};
