// 8 класс, тема «Правильные многоугольники»: шаблоны заданий.
import { FR, MINUS, O, P, ansHtml, cm, decStr, numAns, q, qh, t3 } from "../../../core/index.js";
import { approxAns } from "../helpers.js";

export default {
  /* --- Правильные многоугольники --- */
  regPoly: {
    topic: "g8reg",
    pts: 1,
    cnt: { n: 4, a: 4 },
    title: O("Правильный многоугольник", "Korrapärane hulknurk", "Regular polygons"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["int", "ext", "sum", "n"] : ["int", "diag", "nExt", "sum"];
      const nm = n =>
        t3(`правильного ${n}-угольника`, `korrapärase ${n}-nurga`, `a regular ${n}-gon`);
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 4];
        const n = R.pick(
          lvl === "n" ? [5, 6, 8, 9, 10, 12, 15, 18, 20] : [7, 11, 14, 16, 24, 13, 30],
        );
        if (k === "int") {
          const v = q(180 * (n - 2)).div(n);
          items.push(
            numAns(v, {
              unit: "°",
              q: t3(
                `Найди внутренний угол ${nm(n)}.`,
                `Leia ${nm(n)} sisenurk.`,
                `Find an interior angle of ${nm(n)}.`,
              ),
              exp: P(`${FR("180° · (" + n + " " + MINUS + " 2)", n)} = ${ansHtml(v)}°`),
            }),
          );
        } else if (k === "ext") {
          const v = q(360).div(n);
          items.push(
            numAns(v, {
              unit: "°",
              q: t3(
                `Найди внешний угол ${nm(n)}.`,
                `Leia ${nm(n)} välisnurk.`,
                `Find an exterior angle of ${nm(n)}.`,
              ),
              exp: P(
                t3(
                  "Сумма внешних углов 360°:",
                  "Välisnurkade summa on 360°:",
                  "Exterior angles add up to 360°:",
                ) + ` 360° : ${n} = ${ansHtml(v)}°`,
              ),
            }),
          );
        } else if (k === "sum") {
          items.push(
            numAns(180 * (n - 2), {
              unit: "°",
              q: t3(
                `Найди сумму внутренних углов выпуклого ${n}-угольника.`,
                `Leia kumera ${n}-nurga sisenurkade summa.`,
                `Find the sum of the interior angles of a convex ${n}-gon.`,
              ),
              exp: P(`180° · (${n} ${MINUS} 2) = ${180 * (n - 2)}°`),
            }),
          );
        } else if (k === "n") {
          const N = R.pick([5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 36]);
          const a = (180 * (N - 2)) / N;
          items.push(
            numAns(N, {
              q: t3(
                `Внутренний угол правильного многоугольника ${a}°. Сколько у него сторон?`,
                `Korrapärase hulknurga sisenurk on ${a}°. Mitu külge tal on?`,
                `An interior angle of a regular polygon is ${a}°. How many sides does it have?`,
              ),
              exp: P(
                t3("Внешний угол", "Välisnurk", "Exterior angle") +
                  ` 180° ${MINUS} ${a}° = ${180 - a}°; 360° : ${180 - a}° = ${N}`,
              ),
            }),
          );
        } else if (k === "nExt") {
          const N = R.pick([15, 18, 20, 24, 30, 36, 40, 45]);
          items.push(
            numAns(N, {
              q: t3(
                `Внешний угол правильного многоугольника ${360 / N}°. Сколько у него сторон?`,
                `Korrapärase hulknurga välisnurk on ${360 / N}°. Mitu külge tal on?`,
                `An exterior angle of a regular polygon is ${360 / N}°. How many sides does it have?`,
              ),
              exp: P(`360° : ${360 / N}° = ${N}`),
            }),
          );
        } else {
          items.push(
            numAns((n * (n - 3)) / 2, {
              q: t3(
                `Сколько диагоналей у выпуклого ${n}-угольника?`,
                `Mitu diagonaali on kumeral ${n}-nurgal?`,
                `How many diagonals does a convex ${n}-gon have?`,
              ),
              exp: P(
                t3(
                  `Из каждой вершины выходит ${n - 3} диагоналей, каждая посчитана дважды:`,
                  `Igast tipust lähtub ${n - 3} diagonaali, iga on loetud kaks korda:`,
                  `Each vertex has ${n - 3} diagonals, each counted twice:`,
                ) + ` ${FR(n + " · " + (n - 3), 2)} = ${(n * (n - 3)) / 2}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },

  regCirc: {
    topic: "g8reg",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O(
      "Правильные многоугольники и окружность",
      "Korrapärased hulknurgad ja ringjoon",
      "Regular polygons and circles",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["hex", "sqr"] : ["sqR", "triR", "hexr"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % ks.length];
        const r = q(R.int(20, 150)).div(10);
        if (k === "hex") {
          items.push(
            numAns(r.mul(6), {
              unit: cm(),
              q: t3(
                `Правильный шестиугольник вписан в окружность радиуса ${qh(r)} см. Найди его периметр.`,
                `Korrapärane kuusnurk on joonestatud ringjoonde raadiusega ${qh(r)} cm. Leia selle ümbermõõt.`,
                `A regular hexagon is inscribed in a circle of radius ${qh(r)} cm. Find its perimeter.`,
              ),
              exp: P(
                t3(
                  "Сторона правильного шестиугольника равна радиусу описанной окружности:",
                  "Korrapärase kuusnurga külg võrdub ümberringjoone raadiusega:",
                  "The side of a regular hexagon equals the circumradius:",
                ) + ` 6 · ${qh(r)} = ${qh(r.mul(6))}`,
              ),
            }),
          );
        } else if (k === "sqr") {
          items.push(
            numAns(r.div(2), {
              unit: cm(),
              q: t3(
                `Сторона квадрата ${qh(r)} см. Найди радиус вписанной в него окружности.`,
                `Ruudu külg on ${qh(r)} cm. Leia sellesse joonestatud ringjoone raadius.`,
                `A square has side ${qh(r)} cm. Find the radius of its inscribed circle.`,
              ),
              exp: P(`r = ${FR("a", 2)} = ${qh(r.div(2))}`),
            }),
          );
        } else if (k === "sqR") {
          items.push(
            approxAns(r.v() * Math.SQRT2, {
              unit: cm(),
              q: t3(
                `Квадрат вписан в окружность радиуса ${qh(r)} см. Найди сторону квадрата.`,
                `Ruut on joonestatud ringjoonde raadiusega ${qh(r)} cm. Leia ruudu külg.`,
                `A square is inscribed in a circle of radius ${qh(r)} cm. Find its side.`,
              ),
              exp: P(
                t3(
                  "Диагональ квадрата — диаметр:",
                  "Ruudu diagonaal on diameeter:",
                  "The diagonal is a diameter:",
                ) +
                  ` a√2 = ${qh(r.mul(2))}; a = ${qh(r)}√2 ≈ ${decStr(q(Math.round(r.v() * Math.SQRT2 * 100) / 100))}`,
              ),
            }),
          );
        } else if (k === "triR") {
          const a = R.int(3, 18);
          items.push(
            approxAns(a / Math.sqrt(3), {
              unit: cm(),
              q: t3(
                `Сторона правильного треугольника ${a} см. Найди радиус описанной окружности.`,
                `Korrapärase kolmnurga külg on ${a} cm. Leia ümberringjoone raadius.`,
                `An equilateral triangle has side ${a} cm. Find its circumradius.`,
              ),
              exp: P(
                `R = ${FR("a", "√3")} = ${FR(a, "√3")} ≈ ${decStr(q(Math.round((a / Math.sqrt(3)) * 100) / 100))}`,
              ),
            }),
          );
        } else {
          const a = R.int(2, 14);
          items.push(
            approxAns((a * Math.sqrt(3)) / 2, {
              unit: cm(),
              q: t3(
                `Сторона правильного шестиугольника ${a} см. Найди радиус вписанной окружности.`,
                `Korrapärase kuusnurga külg on ${a} cm. Leia siseringjoone raadius.`,
                `A regular hexagon has side ${a} cm. Find the radius of its inscribed circle.`,
              ),
              exp: P(
                t3(
                  "Это высота равностороннего треугольника со стороной a:",
                  "See on võrdkülgse kolmnurga kõrgus küljega a:",
                  "It is the height of an equilateral triangle with side a:",
                ) +
                  ` r = ${FR("a√3", 2)} ≈ ${decStr(q(Math.round(((a * Math.sqrt(3)) / 2) * 100) / 100))}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },
};
