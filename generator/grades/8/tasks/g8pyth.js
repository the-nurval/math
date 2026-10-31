// 8 класс, тема «Теорема Пифагора»: шаблоны заданий.
import { MINUS, O, P, YN, choiceAns, cm, q, qh, t3 } from "../../../core/index.js";
import { TRIP, m_, sqrtAns, sqrtQ, sqrtShow } from "../helpers.js";
import { svgRT, svgRhomb } from "../sketches.js";

export default {
  pyth: {
    topic: "g8pyth",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O("Теорема Пифагора", "Pythagorase teoreem", "Pythagoras' theorem"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["hyp", "leg", "rect"] : ["iso", "rhomb", "coord"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        if (k === "hyp") {
          let a, b;
          if (R.chance(0.5)) {
            const t = R.pick(TRIP),
              m = R.pick([1, 2, 0.5]);
            a = q(t[0] * m);
            b = q(t[1] * m);
          } else {
            a = q(R.int(2, 12));
            b = q(R.int(3, 14));
          }
          const c2 = a.mul(a).add(b.mul(b));
          items.push(
            sqrtAns(c2, {
              unit: cm(),
              q:
                svgRT("a", "b", "c") +
                t3(
                  `Катеты прямоугольного треугольника a = ${qh(a)} см, b = ${qh(b)} см. Найди гипотенузу c.`,
                  `Täisnurkse kolmnurga kaatetid on a = ${qh(a)} cm ja b = ${qh(b)} cm. Leia hüpotenuus c.`,
                  `The legs of a right triangle are a = ${qh(a)} cm and b = ${qh(b)} cm. Find the hypotenuse c.`,
                ),
              exp: P(
                `c = √(${qh(a)}² + ${qh(b)}²) = √${qh(c2)} ${sqrtQ(c2) ? "=" : ""} ${sqrtShow(c2)}`,
              ),
            }),
          );
        } else if (k === "leg") {
          let a, c;
          if (R.chance(0.6)) {
            const t = R.pick(TRIP);
            a = q(t[0]);
            c = q(t[2]);
          } else {
            c = q(R.int(9, 20));
            a = q(R.int(3, c.v() - 2));
          }
          const b2 = c.mul(c).sub(a.mul(a));
          items.push(
            sqrtAns(b2, {
              unit: cm(),
              q: t3(
                `Гипотенуза прямоугольного треугольника ${qh(c)} см, один катет ${qh(a)} см. Найди другой катет.`,
                `Täisnurkse kolmnurga hüpotenuus on ${qh(c)} cm ja üks kaatet ${qh(a)} cm. Leia teine kaatet.`,
                `A right triangle has hypotenuse ${qh(c)} cm and one leg ${qh(a)} cm. Find the other leg.`,
              ),
              exp: P(
                `√(${qh(c)}² ${MINUS} ${qh(a)}²) = √${qh(b2)} ${sqrtQ(b2) ? "=" : ""} ${sqrtShow(b2)}`,
              ),
            }),
          );
        } else if (k === "rect") {
          const a = q(R.int(30, 120)).div(10),
            b = q(R.int(20, 90)).div(10);
          const d2 = a.mul(a).add(b.mul(b));
          items.push(
            sqrtAns(d2, {
              unit: m_(),
              q: t3(
                `Стороны прямоугольной комнаты ${qh(a)} м и ${qh(b)} м. Найди длину диагонали пола.`,
                `Ristkülikukujulise toa küljed on ${qh(a)} m ja ${qh(b)} m. Leia põranda diagonaali pikkus.`,
                `A rectangular room is ${qh(a)} m by ${qh(b)} m. Find the diagonal of the floor.`,
              ),
              exp: P(
                `√(${qh(a)}² + ${qh(b)}²) = √${qh(d2)} ${sqrtQ(d2) ? "=" : ""} ${sqrtShow(d2)}`,
              ),
            }),
          );
        } else if (k === "iso") {
          const t = R.pick(TRIP.concat([[4, 7.5, 8.5]]));
          const half = q(t[0]),
            s = q(t[2]);
          const h2 = s.mul(s).sub(half.mul(half));
          items.push(
            sqrtAns(h2, {
              unit: cm(),
              q: t3(
                `Основание равнобедренного треугольника ${qh(half.mul(2))} см, боковая сторона ${qh(s)} см. Найди высоту, проведённую к основанию.`,
                `Võrdhaarse kolmnurga alus on ${qh(half.mul(2))} cm ja haar ${qh(s)} cm. Leia alusele tõmmatud kõrgus.`,
                `An isosceles triangle has base ${qh(half.mul(2))} cm and legs ${qh(s)} cm. Find the altitude to the base.`,
              ),
              exp: P(
                t3(
                  "Высота делит основание пополам:",
                  "Kõrgus poolitab aluse:",
                  "The altitude bisects the base:",
                ) + ` h = √(${qh(s)}² ${MINUS} ${qh(half)}²) = ${sqrtShow(h2)}`,
              ),
            }),
          );
        } else if (k === "rhomb") {
          const d1 = 2 * R.int(3, 12),
            d2 = 2 * R.int(2, 10);
          const s2 = q(d1 * d1 + d2 * d2).div(4);
          items.push(
            sqrtAns(s2, {
              unit: cm(),
              q: svgRhomb("", ""),
              exp: P(
                t3(
                  "Диагонали ромба перпендикулярны и делятся пополам:",
                  "Rombi diagonaalid on risti ja poolitavad teineteist:",
                  "The diagonals of a rhombus are perpendicular and bisect each other:",
                ) + ` √(${d1 / 2}² + ${d2 / 2}²) = ${sqrtShow(s2)}`,
              ),
            }),
          );
          items[items.length - 1].q += t3(
            `Диагонали ромба ${d1} см и ${d2} см. Найди сторону ромба.`,
            `Rombi diagonaalid on ${d1} cm ja ${d2} cm. Leia rombi külg.`,
            `The diagonals of a rhombus are ${d1} cm and ${d2} cm. Find its side.`,
          );
        } else {
          const x1 = R.int(-6, 4),
            y1 = R.int(-5, 5),
            x2 = x1 + R.nz(-5, 8),
            y2 = y1 + R.nz(-6, 6);
          const d2 = q((x2 - x1) ** 2 + (y2 - y1) ** 2);
          items.push(
            sqrtAns(d2, {
              q: t3(
                `Найди расстояние между точками A(${qh(x1)}; ${qh(y1)}) и B(${qh(x2)}; ${qh(y2)}).`,
                `Leia punktide A(${qh(x1)}; ${qh(y1)}) ja B(${qh(x2)}; ${qh(y2)}) vaheline kaugus.`,
                `Find the distance between A(${qh(x1)}; ${qh(y1)}) and B(${qh(x2)}; ${qh(y2)}).`,
              ),
              exp: P(`AB = √(${(x2 - x1) ** 2} + ${(y2 - y1) ** 2}) = ${sqrtShow(d2)}`),
            }),
          );
        }
      }
      return { items };
    },
  },

  pythConv: {
    topic: "g8pyth",
    pts: 1,
    cnt: { n: 2, a: 2 },
    title: O(
      "Прямоугольный ли треугольник?",
      "Kas kolmnurk on täisnurkne?",
      "Is the triangle right-angled?",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const yes = R.chance(0.5);
        const t = R.pick(TRIP);
        const m = lvl === "n" ? R.pick([1, 2, 3]) : R.pick([0.1, 0.5, 1.5, 0.3]);
        let s = t.map(x => q(x * m));
        if (!yes) s[R.int(0, 1)] = s[0].add(q(m));
        s = s.sort((x, y) => x.v() - y.v());
        const ok = s[0].mul(s[0]).add(s[1].mul(s[1])).eq(s[2].mul(s[2]));
        items.push(
          choiceAns(ok ? "y" : "n", YN(), {
            q: t3(
              `Стороны треугольника ${s.map(qh).join(", ")}. Прямоугольный ли он?`,
              `Kolmnurga küljed on ${s.map(qh).join(", ")}. Kas ta on täisnurkne?`,
              `A triangle has sides ${s.map(qh).join(", ")}. Is it right-angled?`,
            ),
            exp:
              P(
                `${qh(s[0])}² + ${qh(s[1])}² = ${qh(s[0].mul(s[0]).add(s[1].mul(s[1])))}; ${qh(s[2])}² = ${qh(s[2].mul(s[2]))}`,
              ) +
              P(
                t3(
                  ok
                    ? "Равны — по обратной теореме Пифагора треугольник прямоугольный."
                    : "Не равны — треугольник не прямоугольный.",
                  ok
                    ? "Võrdsed — Pythagorase pöördteoreemi järgi on kolmnurk täisnurkne."
                    : "Ei ole võrdsed — kolmnurk ei ole täisnurkne.",
                  ok
                    ? "Equal, so by the converse of Pythagoras the triangle is right-angled."
                    : "Not equal, so it is not right-angled.",
                ),
              ),
          }),
        );
      }
      return { items };
    },
  },
};
