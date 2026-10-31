// 8 класс, тема «Уравнение с двумя неизвестными, графический способ»: шаблоны заданий.
import {
  MINUS,
  O,
  P,
  Q,
  YN,
  ansHtml,
  choiceAns,
  gcd,
  numAns,
  numHtml,
  q,
  qh,
  t3,
} from "../../../core/index.js";
import { halves, lineEq, par, pl, sysH, xy } from "../helpers.js";
import { T_ } from "../sketches.js";

// графики двух прямых на клетчатой сетке −6…6
function svgLines(lines) {
  const u = 14,
    c = 100,
    X = x => c + x * u,
    Y = y => c - y * u;
  let g = "";
  for (let i = -6; i <= 6; i++)
    g += `<line x1="${X(i)}" y1="${Y(-6.5)}" x2="${X(i)}" y2="${Y(6.5)}"/><line x1="${X(-6.5)}" y1="${Y(i)}" x2="${X(6.5)}" y2="${Y(i)}"/>`;
  let s = `<svg class="sk" viewBox="0 0 200 200" role="img"><g stroke="currentColor" stroke-opacity=".15">${g}</g><g stroke="currentColor" stroke-opacity=".6"><line x1="${X(-7)}" y1="${c}" x2="${X(7)}" y2="${c}"/><line x1="${c}" y1="${Y(-7)}" x2="${c}" y2="${Y(7)}"/></g>`;
  lines.forEach(([k, b], i) => {
    s += `<line x1="${X(-7)}" y1="${Y(k * -7 + b)}" x2="${X(7)}" y2="${Y(k * 7 + b)}" stroke="currentColor" stroke-width="2"${i ? ' stroke-dasharray="6 4"' : ""}/>`;
  });
  return s + T_(X(1) - 3, c + 14, "1") + T_(c + 4, Y(1) + 4, "1") + `</svg>`;
}

export default {
  /* --- Уравнение с двумя неизвестными, графический способ --- */
  lin2Pt: {
    topic: "g8lin2",
    pts: 1,
    cnt: { n: 3, a: 3 },
    title: O(
      "Линейное уравнение с двумя неизвестными",
      "Lineaarvõrrand kahe tundmatuga",
      "Linear equation in two unknowns",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["on", "y", "on"] : ["y", "coef", "on"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        let a, b, c;
        do {
          a = R.nz(-6, 6);
          b = R.nz(-7, 7);
          c = R.int(-12, 12);
        } while (gcd(gcd(a, b), c || 1) > 1 && c !== 0);
        if (k === "on") {
          const x = R.int(-4, 5);
          const yes = R.chance(0.5);
          let y;
          if (yes && (c - a * x) % b === 0) y = (c - a * x) / b;
          else {
            y = R.int(-6, 6);
            if (a * x + b * y === c) y++;
          }
          const on = a * x + b * y === c;
          items.push(
            choiceAns(on ? "y" : "n", YN(), {
              q: t3(
                `Принадлежит ли точка (${qh(x)}; ${qh(y)}) графику уравнения ${xy(a, b, c)}?`,
                `Kas punkt (${qh(x)}; ${qh(y)}) asub võrrandi ${xy(a, b, c)} graafikul?`,
                `Does the point (${qh(x)}; ${qh(y)}) lie on the graph of ${xy(a, b, c)}?`,
              ),
              exp: P(
                `${qh(a)} · ${par(x)} ${b < 0 ? MINUS : "+"} ${Math.abs(b)} · ${par(y)} = ${qh(a * x + b * y)} ${on ? "=" : "≠"} ${qh(c)}`,
              ),
            }),
          );
        } else if (k === "y") {
          const x = lvl === "n" ? R.int(-5, 5) : halves(R, -3, 3);
          const y = q(c).sub(q(x).mul(a)).div(b);
          items.push(
            numAns(y, {
              pre: "y =",
              q: t3(
                `${xy(a, b, c)}, x = ${qh(x)}. Найди y.`,
                `${xy(a, b, c)}, x = ${qh(x)}. Leia y.`,
                `${xy(a, b, c)}, x = ${qh(x)}. Find y.`,
              ),
              exp: P(
                `${pl([[b, "y"]])} = ${qh(c)} ${MINUS} ${par(q(x).mul(a))}; y = ${ansHtml(y)}`,
              ),
            }),
          );
        } else {
          const x = R.nz(-5, 5),
            y = R.int(-6, 6),
            b2 = R.nz(-5, 5),
            c2 = R.int(-10, 14);
          const A = new Q(c2 - b2 * y, x);
          items.push(
            numAns(A, {
              pre: "a =",
              q: t3(
                `При каком a точка (${qh(x)}; ${qh(y)}) лежит на графике уравнения ax ${b2 < 0 ? MINUS : "+"} ${Math.abs(b2)}y = ${qh(c2)}?`,
                `Millise a korral asub punkt (${qh(x)}; ${qh(y)}) võrrandi ax ${b2 < 0 ? MINUS : "+"} ${Math.abs(b2)}y = ${qh(c2)} graafikul?`,
                `For which a does (${qh(x)}; ${qh(y)}) lie on the graph of ax ${b2 < 0 ? MINUS : "+"} ${Math.abs(b2)}y = ${qh(c2)}?`,
              ),
              exp: P(
                `a · ${par(x)} ${b2 < 0 ? MINUS : "+"} ${Math.abs(b2)} · ${par(y)} = ${qh(c2)}; a = ${ansHtml(A)}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },

  lin2Graph: {
    topic: "g8lin2",
    pts: 2,
    cnt: { n: 2, a: 2 },
    title: O(
      "Реши систему графически",
      "Lahenda süsteem graafiliselt",
      "Solve the system graphically",
    ),
    gen(R, lvl, cnt) {
      let k1, k2, b1, b2, x0, y0;
      do {
        x0 = R.int(-3, 3);
        y0 = R.int(-4, 4);
        k1 = R.pick([1, 2, -1, 3, new Q(1, 2)]);
        k2 = R.pick([-2, -1, 1, new Q(-1, 2), 0]);
        b1 = q(y0).sub(q(k1).mul(x0));
        b2 = q(y0).sub(q(k2).mul(x0));
      } while (
        q(k1).eq(q(k2)) ||
        !b1.isInt() ||
        !b2.isInt() ||
        Math.abs(b1.v()) > 6 ||
        Math.abs(b2.v()) > 6
      );
      const intro =
        t3(
          "Графики уравнений системы построены на рисунке.",
          "Süsteemi võrrandite graafikud on joonisel.",
          "The graphs of the equations are drawn.",
        ) +
        " " +
        sysH(lineEq(k1, b1), lineEq(k2, b2)) +
        svgLines([
          [q(k1).v(), b1.v()],
          [q(k2).v(), b2.v()],
        ]);
      const ex = P(
        t3(
          "Решение — координаты точки пересечения графиков. Проверка подстановкой:",
          "Lahend on graafikute lõikepunkti koordinaadid. Kontroll asendamisega:",
          "The solution is the intersection point. Check by substituting:",
        ) +
          ` ${qh(y0)} = ${numHtml(q(k1), "frac")} · ${par(x0)} ${b1.sgn() < 0 ? MINUS : "+"} ${qh(b1.abs())}`,
      );
      return {
        intro,
        items: [
          numAns(x0, {
            q: t3(
              "Абсцисса точки пересечения",
              "Lõikepunkti abstsiss",
              "x-coordinate of the intersection",
            ),
            pre: "x =",
            exp: ex,
          }),
          numAns(y0, {
            q: t3(
              "Ордината точки пересечения",
              "Lõikepunkti ordinaat",
              "y-coordinate of the intersection",
            ),
            pre: "y =",
            exp: ex,
          }),
        ],
      };
    },
  },
};
