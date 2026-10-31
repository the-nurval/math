// 8 класс, тема «Системы уравнений: подстановка и сложение»: шаблоны заданий.
import { MINUS, O, P, numAns, q, qh, t3 } from "../../../core/index.js";
import { halves, lineEq, par, pl, sysH, xy } from "../helpers.js";

/* --- Системы уравнений --- */
function sysGen(R, lvl, way) {
  let a1, b1, a2, b2, x0, y0;
  if (way === "sub") {
    x0 = lvl === "n" ? q(R.int(-6, 6)) : halves(R, -4, 4);
    y0 = lvl === "n" ? q(R.int(-6, 6)) : q(R.int(-5, 5));
    a1 = R.nz(-4, 4);
    b1 = R.pick([1, -1]);
    a2 = R.nz(-5, 5);
    do {
      b2 = R.nz(-5, 5);
    } while (a1 * b2 === a2 * b1);
  } else {
    x0 = lvl === "n" ? q(R.int(-6, 6)) : halves(R, -4, 4);
    y0 = lvl === "n" ? q(R.int(-6, 6)) : halves(R, -3, 3);
    if (lvl === "n") {
      a1 = R.nz(-5, 5);
      b1 = R.int(1, 6);
      a2 = R.nz(-5, 5);
      b2 = -b1;
      if (a1 + a2 === 0) a2 += a2 > 0 ? 1 : -1;
    } else {
      do {
        a1 = R.nz(-6, 6);
        b1 = R.nz(-5, 5);
        a2 = R.nz(-6, 6);
        b2 = R.nz(-5, 5);
      } while (
        a1 * b2 === a2 * b1 ||
        Math.abs(b1) === Math.abs(b2) ||
        Math.abs(a1) === Math.abs(a2)
      );
    }
  }
  const c1 = x0.mul(a1).add(y0.mul(b1)),
    c2 = x0.mul(a2).add(y0.mul(b2));
  return { a1, b1, a2, b2, c1, c2, x0, y0 };
}

export default {
  sysSub: {
    topic: "g8sys",
    pts: 2,
    cnt: { n: 2, a: 2 },
    title: O(
      "Реши систему способом подстановки",
      "Lahenda süsteem asendusvõttega",
      "Solve by substitution",
    ),
    gen(R, lvl, cnt) {
      const s = sysGen(R, lvl, "sub");
      const { a1, b1, a2, b2, c1, c2, x0, y0 } = s;
      // из первого уравнения выражаем y
      const e1 = xy(a1, b1, c1);
      const yx = b1 === 1 ? lineEq(-a1, c1) : lineEq(a1, c1.neg());
      const intro =
        t3("Реши систему.", "Lahenda süsteem.", "Solve the system.") +
        " " +
        sysH(e1, xy(a2, b2, c2));
      const ex =
        P(
          t3("Из первого уравнения:", "Esimesest võrrandist:", "From the first equation:") +
            ` ${yx}.`,
        ) +
        P(
          t3("Подставляем во второе:", "Asendame teise:", "Substitute into the second:") +
            ` ${pl([[a2, "x"]])} ${b2 < 0 ? MINUS : "+"} ${Math.abs(b2)}(${yx.slice(4)}) = ${qh(c2)}; x = ${qh(x0)}.`,
        ) +
        P(`y = ${qh(y0)}`);
      return {
        intro,
        items: [
          numAns(x0, { q: "x", pre: "x =", exp: ex }),
          numAns(y0, { q: "y", pre: "y =", exp: ex }),
        ],
      };
    },
  },

  sysAdd: {
    topic: "g8sys",
    pts: 2,
    cnt: { n: 2, a: 2 },
    title: O(
      "Реши систему способом сложения",
      "Lahenda süsteem liitmisvõttega",
      "Solve by elimination",
    ),
    gen(R, lvl, cnt) {
      const s = sysGen(R, lvl, "add");
      const { a1, b1, a2, b2, c1, c2, x0, y0 } = s;
      const intro =
        t3("Реши систему.", "Lahenda süsteem.", "Solve the system.") +
        " " +
        sysH(xy(a1, b1, c1), xy(a2, b2, c2));
      let ex;
      if (b1 + b2 === 0)
        ex =
          P(
            t3(
              "Коэффициенты при y противоположны — складываем уравнения:",
              "y kordajad on vastandarvud — liidame võrrandid:",
              "The y-coefficients are opposite, so add the equations:",
            ) + ` ${pl([[a1 + a2, "x"]])} = ${qh(c1.add(c2))}; x = ${qh(x0)}.`,
          ) + P(`y = ${qh(y0)}`);
      else {
        const m1 = Math.abs(b2),
          m2 = Math.abs(b1) * (Math.sign(b1) === Math.sign(b2) ? -1 : 1);
        ex =
          P(
            t3(
              `Умножаем первое уравнение на ${m1}, второе на ${par(m2)}, чтобы коэффициенты при y стали противоположными, и складываем:`,
              `Korrutame esimese võrrandi arvuga ${m1} ja teise arvuga ${par(m2)}, et y kordajad oleksid vastandarvud, ning liidame:`,
              `Multiply the first equation by ${m1} and the second by ${par(m2)} so the y-coefficients are opposite, then add:`,
            ) +
              ` ${pl([[a1 * m1 + a2 * m2, "x"]])} = ${qh(c1.mul(m1).add(c2.mul(m2)))}; x = ${qh(x0)}.`,
          ) +
          P(
            t3(
              "Подставляем x в первое уравнение:",
              "Asendame x esimesse võrrandisse:",
              "Substitute x into the first equation:",
            ) + ` y = ${qh(y0)}.`,
          );
      }
      return {
        intro,
        items: [
          numAns(x0, { q: "x", pre: "x =", exp: ex }),
          numAns(y0, { q: "y", pre: "y =", exp: ex }),
        ],
      };
    },
  },
};
