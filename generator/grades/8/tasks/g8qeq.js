// 8 класс, тема «Квадратные уравнения, теорема Виета»: шаблоны заданий.
import { FR, MINUS, O, P, Q, numAns, numHtml, q, qh, t3 } from "../../../core/index.js";
import { par, pl, setAns, sqrtQ } from "../helpers.js";

export default {
  /* --- Квадратные уравнения, теорема Виета (прогрессивная программа) --- */
  qeqSolve: {
    topic: "g8qeq",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O("Реши квадратное уравнение", "Lahenda ruutvõrrand", "Solve the quadratic equation"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["int", "int", "rat"] : ["rat", "irr", "cnt"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        if (k === "int" || k === "rat") {
          let a, x1, x2;
          if (k === "int") {
            a = 1;
            x1 = q(R.nz(-9, 9));
            do {
              x2 = q(R.nz(-9, 9));
            } while (x2.eq(x1));
          } else {
            a = R.pick([2, 3, 4, 5]);
            x1 = new Q(R.pick([1, -1, 3, -3, 5]), a);
            x2 = q(R.nz(-6, 6));
          }
          const b = x1.add(x2).mul(-a),
            c = x1.mul(x2).mul(a);
          const D = b.mul(b).sub(c.mul(4 * a));
          items.push(
            setAns([x1, x2], {
              q: `${pl([
                [a, "x²"],
                [b, "x"],
                [c, ""],
              ])} = 0`,
              exp:
                P(`D = ${par(b)}² ${MINUS} 4 · ${a} · ${par(c)} = ${qh(D)}`) +
                P(
                  `x = ${FR(qh(b.neg()) + " ± " + qh(sqrtQ(D)), 2 * a)}; x₁ = ${qh(x1)}, x₂ = ${qh(x2)}`,
                ),
            }),
          );
        } else if (k === "irr") {
          let b, c, D;
          do {
            b = R.nz(-7, 7);
            c = R.nz(-9, 6);
            D = b * b - 4 * c;
          } while (D <= 0 || sqrtQ(q(D)));
          const r1 = (-b - Math.sqrt(D)) / 2,
            r2 = (-b + Math.sqrt(D)) / 2;
          items.push(
            setAns([r1, r2], {
              q: t3(
                `${pl([
                  [1, "x²"],
                  [b, "x"],
                  [c, ""],
                ])} = 0 (корни округли до сотых)`,
                `${pl([
                  [1, "x²"],
                  [b, "x"],
                  [c, ""],
                ])} = 0 (ümarda lahendid sajandikeni)`,
                `${pl([
                  [1, "x²"],
                  [b, "x"],
                  [c, ""],
                ])} = 0 (round to hundredths)`,
              ),
              exp: P(`D = ${D}; x = ${FR(qh(-b) + " ± √" + D, 2)}`),
            }),
          );
        } else {
          const ok = R.pick([0, 1, 2]);
          let b, c;
          if (ok === 1) {
            b = 2 * R.nz(-6, 6);
            c = (b * b) / 4;
          } else {
            do {
              b = R.nz(-8, 8);
              c = R.nz(-9, 12);
            } while ((b * b - 4 * c > 0 ? 2 : b * b - 4 * c === 0 ? 1 : 0) !== ok);
          }
          items.push(
            numAns(ok, {
              q: t3(
                `Сколько корней у уравнения ${pl([
                  [1, "x²"],
                  [b, "x"],
                  [c, ""],
                ])} = 0?`,
                `Mitu lahendit on võrrandil ${pl([
                  [1, "x²"],
                  [b, "x"],
                  [c, ""],
                ])} = 0?`,
                `How many roots does ${pl([
                  [1, "x²"],
                  [b, "x"],
                  [c, ""],
                ])} = 0 have?`,
              ),
              exp: P(`D = ${b * b - 4 * c}` + (ok === 2 ? " > 0" : ok === 1 ? " = 0" : " < 0")),
            }),
          );
        }
      }
      return { items };
    },
  },

  vieta: {
    topic: "g8qeq",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O("Теорема Виета", "Viète'i teoreem", "Vieta's formulas"),
    gen(R, lvl, cnt) {
      let p, qq;
      do {
        p = R.nz(-9, 9);
        qq = R.nz(-15, 12);
      } while (p * p - 4 * qq <= 0);
      const s = -p,
        pr = qq;
      const intro = t3(
        `x₁ и x₂ — корни уравнения ${pl([
          [1, "x²"],
          [p, "x"],
          [qq, ""],
        ])} = 0. Не решая уравнения, найди:`,
        `x₁ ja x₂ on võrrandi ${pl([
          [1, "x²"],
          [p, "x"],
          [qq, ""],
        ])} = 0 lahendid. Võrrandit lahendamata leia:`,
        `x₁ and x₂ are the roots of ${pl([
          [1, "x²"],
          [p, "x"],
          [qq, ""],
        ])} = 0. Without solving, find:`,
      );
      const ex = P(`x₁ + x₂ = ${qh(s)}, x₁x₂ = ${qh(pr)}`);
      const items = [numAns(s, { q: "x₁ + x₂", exp: ex }), numAns(pr, { q: "x₁ · x₂", exp: ex })];
      if (cnt > 2)
        items.push(
          R.chance(0.5)
            ? numAns(s * s - 2 * pr, {
                q: "x₁² + x₂²",
                exp:
                  ex +
                  P(
                    `(x₁ + x₂)² ${MINUS} 2x₁x₂ = ${s * s} ${MINUS} ${par(2 * pr)} = ${s * s - 2 * pr}`,
                  ),
              })
            : numAns(new Q(s, pr), {
                q: `${FR(1, "x₁")} + ${FR(1, "x₂")}`,
                exp: ex + P(`${FR("x₁ + x₂", "x₁x₂")} = ${numHtml(new Q(s, pr), "frac")}`),
              }),
        );
      return { intro, items };
    },
  },

  vietaRoot: {
    topic: "g8qeq",
    pts: 2,
    cnt: { n: 2, a: 2 },
    title: O(
      "Найди второй корень и коэффициент",
      "Leia teine lahend ja kordaja",
      "Find the other root and the coefficient",
    ),
    gen(R, lvl, cnt) {
      const x1 = lvl === "n" ? R.nz(-7, 7) : R.pick([-1.5, 2.5, 0.5, -0.5, 4]);
      let x2;
      do {
        x2 = R.nz(-8, 8);
      } while (x2 === x1);
      const X1 = q(x1);
      const p = X1.add(x2).neg(),
        c = X1.mul(x2);
      const intro = t3(
        `Один из корней уравнения ${pl([
          [1, "x²"],
          [p, "x"],
        ])} + c = 0 равен ${qh(X1)}.`,
        `Võrrandi ${pl([
          [1, "x²"],
          [p, "x"],
        ])} + c = 0 üks lahend on ${qh(X1)}.`,
        `One root of ${pl([
          [1, "x²"],
          [p, "x"],
        ])} + c = 0 is ${qh(X1)}.`,
      );
      const ex =
        P(`x₁ + x₂ = ${qh(p.neg())} → x₂ = ${qh(p.neg())} ${MINUS} ${par(X1)} = ${qh(x2)}`) +
        P(`c = x₁x₂ = ${par(X1)} · ${par(x2)} = ${qh(c)}`);
      return {
        intro,
        items: [
          numAns(x2, {
            q: t3("Второй корень", "Teine lahend", "The other root"),
            pre: "x₂ =",
            exp: ex,
          }),
          numAns(c, { q: t3("Коэффициент c", "Kordaja c", "Coefficient c"), pre: "c =", exp: ex }),
        ],
      };
    },
  },
};
