// 7 класс, тема «Рациональные числа»: шаблоны заданий.
import {
  DENS_A,
  DENS_N,
  L,
  N,
  P,
  Q,
  T_ANS,
  ansHtml,
  evalE,
  expAddSub,
  numAns,
  numHtml,
  rDec,
  rFrac,
  rInt,
  renderE,
  stepList,
  stepsE,
  tr,
} from "../../../core/index.js";

export default {
  /* --- 1. Сложение и вычитание рациональных чисел --- */
  addsub: {
    topic: "rat",
    pts: 1,
    cnt: { n: 6, a: 6 },
    title: { ru: "Вычисли", et: "Arvuta", en: "Calculate" },
    gen(R, lvl, cnt) {
      const items = [];
      const modesN = ["int", "dec", "dec", "frac", "dec", "frac", "int", "dec"];
      const modesA = ["dec", "mixed", "frac", "dec2", "mixed", "three", "frac", "three"];
      for (let i = 0; i < cnt; i++) {
        const md = (lvl === "n" ? modesN : modesA)[i % 8];
        let a,
          b,
          mode = "auto",
          three = false;
        if (md === "int") {
          a = new Q(rInt(R, 11, 99));
          b = new Q(rInt(R, 11, 99));
        } else if (md === "dec") {
          a = rDec(R, 1, 25);
          b = rDec(R, R.pick([1, 2]), 25);
          mode = "dec";
        } else if (md === "dec2") {
          a = rDec(R, 2, 30);
          b = rDec(R, 3, 10);
          mode = "dec";
        } else if (md === "frac") {
          a = rFrac(R, lvl === "n" ? DENS_N : DENS_A, 0);
          b = rFrac(R, lvl === "n" ? DENS_N : DENS_A, 0);
          mode = "frac";
        } else if (md === "mixed") {
          a = rFrac(R, lvl === "n" ? DENS_N : DENS_A, 5);
          b = rFrac(R, lvl === "n" ? DENS_N : DENS_A, 4);
          mode = "mixed";
        } else {
          three = true;
        }
        if (three) {
          const x = rDec(R, 1, 20),
            y = rFrac(R, [2, 4, 5], 2),
            z = rDec(R, 2, 9);
          const ops = [R.pick(["+", "-"]), R.pick(["+", "-"])];
          const e = N(ops[1], N(ops[0], L(x, "dec"), L(y, "mixed")), L(z, "dec"));
          const r = evalE(e);
          const st = [];
          stepsE(e, "auto", st);
          items.push(
            numAns(r, {
              q: renderE(e),
              exp:
                P(
                  tr({
                    ru: "Десятичные дроби удобно перевести в обыкновенные (или наоборот) и считать по порядку слева направо.",
                    et: "Kümnendmurrud on mugav teisendada harilikeks murdudeks (või vastupidi) ja arvutada järjest vasakult paremale.",
                    en: "Convert decimals to fractions (or the other way round) and work left to right.",
                  }),
                ) + stepList(st),
            }),
          );
          continue;
        }
        if (a.sgn() > 0 && b.sgn() > 0) a = a.neg();
        const op = R.pick(["+", "-"]);
        const r = op === "+" ? a.add(b) : a.sub(b);
        const e = N(
          op,
          L(a, mode === "auto" ? undefined : mode),
          L(b, mode === "auto" ? undefined : mode),
        );
        items.push(
          numAns(r, {
            q: renderE(e),
            exp: expAddSub(a, op, b, mode === "dec" ? "dec" : mode === "int" ? "auto" : mode),
          }),
        );
      }
      return { items };
    },
  },

  /* --- 2. Умножение и деление --- */
  muldiv: {
    topic: "rat",
    pts: 1,
    cnt: { n: 5, a: 5 },
    title: { ru: "Выполни действие", et: "Arvuta", en: "Calculate" },
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const kind =
          lvl === "n"
            ? ["mul", "div", "mul", "div", "mul3", "div"][i % 6]
            : ["muldec", "divfrac", "mul3", "divdec", "mixed", "mul3"][i % 6];
        let e,
          mode = "auto";
        if (kind === "mul") {
          e = N("*", L(rInt(R, 3, 15)), L(rDec(R, 1, 9), "dec"));
        } else if (kind === "div") {
          const d = rInt(R, 2, 9),
            qt = rDec(R, 1, 12);
          e = N(":", L(qt.mul(d), "dec"), L(d));
        } else if (kind === "mul3") {
          e = N(
            "*",
            N("*", L(rInt(R, 2, 6)), L(lvl === "n" ? rInt(R, 2, 5) : rDec(R, 1, 3), "dec")),
            L(lvl === "n" ? rInt(R, 2, 9) : rFrac(R, [3, 4, 5], 0)),
          );
        } else if (kind === "muldec") {
          e = N("*", L(rDec(R, 2, 9), "dec"), L(rDec(R, 1, 9), "dec"));
        } else if (kind === "divfrac") {
          e = N(":", L(rFrac(R, DENS_A, 3), "mixed"), L(rFrac(R, DENS_A, 0), "frac"));
          mode = "frac";
        } else if (kind === "divdec") {
          const d = rDec(R, 1, 5),
            qt = rDec(R, 2, 9);
          e = N(":", L(qt.mul(d), "dec"), L(d, "dec"));
        } else {
          e = N("*", L(rFrac(R, [2, 3, 4, 5, 6], 2), "mixed"), L(rDec(R, 1, 4), "dec"));
        }
        const r = evalE(e);
        // правило знаков
        const lits = [];
        (function walk(x) {
          if (x.v) lits.push(x.v.q);
          else {
            walk(x.a);
            walk(x.b);
          }
        })(e);
        const neg = lits.filter(x => x.sgn() < 0).length;
        const ex =
          P(
            tr({
              ru: `Отрицательных множителей (делителей): ${neg}. ${neg % 2 === 0 ? "Чётное количество — результат положительный." : "Нечётное количество — результат отрицательный."}`,
              et: `Negatiivseid arve on ${neg}. ${neg % 2 === 0 ? "Paarisarv — tulemus on positiivne." : "Paaritu arv — tulemus on negatiivne."}`,
              en: `Negative factors: ${neg}. ${neg % 2 === 0 ? "An even number, so the result is positive." : "An odd number, so the result is negative."}`,
            }),
          ) +
          P(
            tr({
              ru: "Модуль результата:",
              et: "Tulemuse absoluutväärtus:",
              en: "Absolute value of the result:",
            }) + ` ${numHtml(r.abs())}.`,
          ) +
          P(`${tr(T_ANS)}: ${ansHtml(r)}.`);
        items.push(numAns(r, { q: renderE(e), exp: ex }));
      }
      return { items };
    },
  },

  /* --- 3. Порядок действий --- */
  order: {
    topic: "rat",
    pts: 3,
    cnt: { n: 3, a: 3 },
    title: {
      ru: "Найди значение выражения",
      et: "Leia avaldise väärtus",
      en: "Evaluate the expression",
    },
    gen(R, lvl, cnt) {
      const items = [];
      const shapes = lvl === "n" ? ["B", "A", "C", "D", "E"] : ["Bf", "C", "E", "D", "Ff"];
      const sh = R.shuffle(shapes);
      for (let i = 0; i < cnt; i++) {
        const s = sh[i % sh.length];
        let e;
        const d1 = () => rDec(R, 1, 9);
        if (s === "A") {
          e = N("+", L(d1(), "dec"), N("*", L(rInt(R, 2, 9)), L(d1(), "dec")));
        } else if (s === "B") {
          const c = rInt(R, 2, 6),
            t = rDec(R, 1, 5),
            b = d1();
          e = N(":", N("-", L(t.mul(c).add(b), "dec"), L(b, "dec")), L(c));
        } else if (s === "Bf") {
          const c = rDec(R, 1, 3),
            t = rDec(R, 2, 4),
            b = d1();
          e = N(":", N("-", L(t.mul(c).add(b), "dec"), L(b, "dec")), L(c, "dec"));
        } else if (s === "C") {
          const d = rInt(R, 2, 8),
            t = rDec(R, 1, 6);
          e = N("-", N("*", L(d1(), "dec"), L(rInt(R, 2, 6))), N(":", L(t.mul(d), "dec"), L(d)));
        } else if (s === "D") {
          e = N(
            "*",
            N("+", L(d1(), "dec"), L(rInt(R, 2, 9))),
            N("-", L(rDec(R, 1, 4), "dec"), L(rDec(R, 1, 4), "dec")),
          );
        } else if (s === "E") {
          e = N(
            "-",
            L(rDec(R, 1, 12), "dec"),
            N("*", L(rInt(R, 2, 5)), N("+", L(d1(), "dec"), L(d1(), "dec"))),
          );
        } else {
          e = N(
            "*",
            N("+", L(rFrac(R, [2, 3, 4, 6], 1), "mixed"), L(rFrac(R, [3, 4, 6], 0), "frac")),
            L(rInt(R, 2, 12)),
          );
        }
        const st = [];
        const r = stepsE(e, "auto", st);
        items.push(
          numAns(r, {
            q: renderE(e),
            exp:
              P(
                tr({
                  ru: "Сначала действия в скобках, затем умножение и деление, потом сложение и вычитание.",
                  et: "Kõigepealt sulgudes olevad tehted, siis korrutamine ja jagamine, lõpuks liitmine ja lahutamine.",
                  en: "Brackets first, then multiplication and division, then addition and subtraction.",
                }),
              ) + stepList(st),
          }),
        );
      }
      return { items };
    },
  },
};
