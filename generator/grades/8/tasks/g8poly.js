// 8 класс, тема «Одночлены и многочлены»: шаблоны заданий.
import { MINUS, O, P, Q, numAns, numHtml, q, qh, t3 } from "../../../core/index.js";
import { pl, sup } from "../helpers.js";

// одночлен: mono(-3,{a:2,b:1}) → −3a²b
function mono(c, pw) {
  return pl([
    [
      c,
      Object.keys(pw)
        .filter(k => pw[k])
        .map(k => k + sup(pw[k]))
        .join(""),
    ],
  ]);
}

export default {
  /* --- Одночлены и многочлены --- */
  monoStd: {
    topic: "g8poly",
    pts: 1,
    cnt: { n: 4, a: 4 },
    title: O(
      "Приведи одночлен к стандартному виду",
      "Vii üksliige normaalkujule",
      "Write the monomial in standard form",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        let txt, c, pw;
        if (lvl === "a" && i % 2 === 1) {
          const c1 = R.pick([-2, -3, 2]),
            p1 = R.int(1, 3),
            q1 = R.int(1, 2),
            k = R.pick([2, 3]);
          const c2 = R.pick([new Q(1, 2), new Q(-1, 4), new Q(3, 2), new Q(5)]);
          const p2 = R.int(1, 2),
            q2 = R.int(0, 3);
          c = new Q(c1).pow(k).mul(c2);
          pw = { a: p1 * k + p2, b: q1 * k + q2 };
          const m2 = numHtml(c2, "frac") + mono(1, { a: p2, b: q2 });
          txt = `(${mono(c1, { a: p1, b: q1 })})${sup(k)} · ${c2.sgn() < 0 ? "(" + m2 + ")" : m2}`;
        } else {
          const c1 = lvl === "n" ? R.nz(-7, 7) : q(R.pick([0.4, -0.6, 1.5, -2.5, 0.8, 1.2])),
            c2 = lvl === "n" ? R.nz(-6, 6) : q(R.pick([-5, 2.5, -0.5, 4, 0.3]));
          const a1 = R.int(1, 4),
            b1 = R.int(0, 3),
            a2 = R.int(0, 3),
            b2 = R.int(1, 4);
          c = q(c1).mul(c2);
          pw = { a: a1 + a2, b: b1 + b2 };
          txt = `${mono(c1, { a: a1, b: b1 })} · ${q(c2).sgn() < 0 ? "(" + mono(c2, { a: a2, b: b2 }) + ")" : mono(c2, { a: a2, b: b2 })}`;
        }
        const deg = pw.a + pw.b,
          std = mono(c, pw);
        const askDeg = i % 2 === 1;
        items.push(
          numAns(askDeg ? new Q(deg) : c, {
            q:
              txt +
              ". " +
              (askDeg
                ? t3("Степень одночлена?", "Üksliikme aste?", "Degree of the monomial?")
                : t3("Коэффициент?", "Kordaja?", "Coefficient?")),
            exp:
              P(t3("Стандартный вид:", "Normaalkuju:", "Standard form:") + ` ${std}.`) +
              P(
                askDeg
                  ? t3(
                      `Степень — сумма показателей: ${pw.a} + ${pw.b} = ${deg}.`,
                      `Aste on astendajate summa: ${pw.a} + ${pw.b} = ${deg}.`,
                      `The degree is the sum of the exponents: ${pw.a} + ${pw.b} = ${deg}.`,
                    )
                  : t3(
                      `Коэффициент ${qh(c)}.`,
                      `Kordaja on ${qh(c)}.`,
                      `The coefficient is ${qh(c)}.`,
                    ),
              ),
          }),
        );
      }
      return { items };
    },
  },

  polyOps: {
    topic: "g8poly",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O(
      "Упрости выражение и найди его значение",
      "Lihtsusta avaldis ja leia selle väärtus",
      "Simplify and evaluate",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = R.shuffle(["sum", "mono", "bin"]);
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        const x0 =
          lvl === "n"
            ? new Q(R.nz(-4, 4))
            : R.pick([new Q(-1, 2), new Q(3, 2), new Q(-5, 2), new Q(1, 4), new Q(6, 5)]);
        let txt, co, ex;
        if (k === "sum") {
          const a1 = R.int(2, 6),
            b1 = R.nz(-9, 9),
            c1 = R.nz(-9, 9),
            a2 = R.int(1, a1 - 1) + 0,
            b2 = R.nz(-9, 9),
            c2 = R.nz(-9, 9);
          co = [a1 - a2, b1 - b2, c1 - c2];
          txt = `(${pl([
            [a1, "x²"],
            [b1, "x"],
            [c1, ""],
          ])}) ${MINUS} (${pl([
            [a2, "x²"],
            [b2, "x"],
            [c2, ""],
          ])})`;
          ex = t3(
            "Раскрываем скобки: перед скобкой минус — знаки меняем.",
            "Avame sulud: miinuse korral muutuvad märgid.",
            "Remove the brackets: a minus in front changes the signs.",
          );
        } else if (k === "mono") {
          const a = R.int(2, 5),
            b = R.nz(-7, 7),
            c = R.int(2, 5),
            d = R.nz(-7, 7);
          let s;
          do {
            s = R.int(1, 4);
          } while (s === c);
          co = [a * s - c * s, a * b - c * d, 0];
          txt = `${a}x(${pl([
            [s, "x"],
            [b, ""],
          ])}) ${MINUS} ${c}x(${pl([
            [s, "x"],
            [d, ""],
          ])})`;
          ex = t3(
            "Умножаем одночлен на каждый член многочлена.",
            "Korrutame üksliikme hulkliikme iga liikmega.",
            "Multiply the monomial by each term.",
          );
        } else {
          const p = R.int(1, 4),
            r = R.nz(-7, 7),
            s = R.int(1, 3),
            t = R.nz(-7, 7),
            c = R.nz(-9, 9);
          co = [p * s, p * t + r * s, r * t + c];
          txt = `(${pl([
            [p, "x"],
            [r, ""],
          ])})(${pl([
            [s, "x"],
            [t, ""],
          ])}) ${c < 0 ? MINUS : "+"} ${Math.abs(c)}`;
          ex = t3(
            "Каждый член первого многочлена умножаем на каждый член второго.",
            "Esimese hulkliikme iga liige korrutatakse teise iga liikmega.",
            "Multiply each term of the first by each term of the second.",
          );
        }
        const simp = pl([
          [co[0], "x²"],
          [co[1], "x"],
          [co[2], ""],
        ]);
        const val = x0.mul(x0).mul(co[0]).add(x0.mul(co[1])).add(co[2]);
        items.push(
          numAns(val, {
            q: `${txt}, x = ${qh(x0)}`,
            exp: P(ex) + P(`${txt} = ${simp}`) + P(`x = ${qh(x0)}: ${numHtml(val, "frac")}`),
          }),
        );
      }
      return { items };
    },
  },
};
