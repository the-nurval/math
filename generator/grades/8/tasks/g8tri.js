// 8 класс, тема «Треугольник: средняя линия, медианы, высоты, биссектрисы»: шаблоны заданий.
import { FR, MINUS, O, P, ansHtml, cm, numAns, q, qh, t3 } from "../../../core/index.js";
import { deg } from "../helpers.js";
import { G_, T_, sk } from "../sketches.js";

// треугольник с отрезком между серединами сторон (средняя линия) или медианой
function svgTriMid(lBase, lMid) {
  return sk(
    130,
    G_(`<polygon points="20,112 200,112 80,18"/>`) +
      `<line x1="50" y1="65" x2="140" y2="65" stroke="currentColor" stroke-width="2"/>` +
      T_(110, 127, lBase, "middle") +
      T_(95, 58, lMid, "middle") +
      T_(8, 118, "A") +
      T_(204, 118, "C") +
      T_(76, 13, "B"),
  );
}

export default {
  /* --- Треугольник: средняя линия, медианы, высоты, биссектрисы --- */
  midLine: {
    topic: "g8tri",
    pts: 1,
    cnt: { n: 3, a: 3 },
    title: O("Средняя линия и медианы", "Kesklõik ja mediaanid", "Midsegments and medians"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["mid", "per", "hyp"] : ["diff", "cent", "midper"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        if (k === "mid") {
          const a = q(R.int(30, 190)).div(10);
          items.push(
            numAns(a.div(2), {
              unit: cm(),
              q:
                svgTriMid("AC = " + qh(a), "MN") +
                t3(
                  `M и N — середины сторон AB и BC, AC = ${qh(a)} см. Найди MN.`,
                  `M ja N on külgede AB ja BC keskpunktid, AC = ${qh(a)} cm. Leia MN.`,
                  `M and N are the midpoints of AB and BC, AC = ${qh(a)} cm. Find MN.`,
                ),
              exp: P(
                t3(
                  "Средняя линия равна половине параллельной ей стороны:",
                  "Kesklõik on pool temaga paralleelsest küljest:",
                  "A midsegment is half the parallel side:",
                ) + ` ${qh(a)} : 2 = ${qh(a.div(2))}`,
              ),
            }),
          );
        } else if (k === "per") {
          let a, b, c;
          do {
            a = R.int(5, 19);
            b = R.int(5, 19);
            c = R.int(5, 19);
          } while (a + b <= c || a + c <= b || b + c <= a);
          const p = q(a + b + c).div(2);
          items.push(
            numAns(p, {
              unit: cm(),
              q: t3(
                `Стороны треугольника ${a} см, ${b} см и ${c} см. Найди периметр треугольника, вершины которого — середины его сторон.`,
                `Kolmnurga küljed on ${a} cm, ${b} cm ja ${c} cm. Leia kolmnurga ümbermõõt, mille tipud on nende külgede keskpunktid.`,
                `A triangle has sides ${a} cm, ${b} cm and ${c} cm. Find the perimeter of the triangle formed by the midpoints of its sides.`,
              ),
              exp: P(
                t3(
                  "Стороны нового треугольника — средние линии, каждая вдвое меньше стороны:",
                  "Uue kolmnurga küljed on kesklõigud, igaüks pool küljest:",
                  "Its sides are midsegments, each half a side:",
                ) + ` (${a} + ${b} + ${c}) : 2 = ${qh(p)}`,
              ),
            }),
          );
        } else if (k === "hyp") {
          const c = R.int(7, 29);
          items.push(
            numAns(q(c).div(2), {
              unit: cm(),
              q: t3(
                `Гипотенуза прямоугольного треугольника ${c} см. Найди медиану, проведённую к гипотенузе.`,
                `Täisnurkse kolmnurga hüpotenuus on ${c} cm. Leia hüpotenuusile tõmmatud mediaan.`,
                `The hypotenuse of a right triangle is ${c} cm. Find the median to the hypotenuse.`,
              ),
              exp: P(
                t3(
                  "Медиана к гипотенузе равна её половине:",
                  "Hüpotenuusile tõmmatud mediaan on pool hüpotenuusist:",
                  "The median to the hypotenuse is half of it:",
                ) + ` ${c} : 2 = ${qh(q(c).div(2))}`,
              ),
            }),
          );
        } else if (k === "diff") {
          const d = q(R.int(21, 97)).div(10);
          items.push(
            numAns(d.mul(2), {
              unit: cm(),
              q: t3(
                `Средняя линия треугольника на ${qh(d)} см короче стороны, которой она параллельна. Найди эту сторону.`,
                `Kolmnurga kesklõik on ${qh(d)} cm lühem küljest, millega ta on paralleelne. Leia see külg.`,
                `A midsegment is ${qh(d)} cm shorter than the side it is parallel to. Find that side.`,
              ),
              exp: P(`x ${MINUS} ${FR("x", 2)} = ${qh(d)}; x = ${qh(d.mul(2))}`),
            }),
          );
        } else if (k === "cent") {
          const m = R.int(7, 40);
          const v = q(2 * m).div(3);
          items.push(
            numAns(v, {
              unit: cm(),
              q: t3(
                `Медиана AM треугольника ABC равна ${m} см, O — точка пересечения медиан. Найди AO.`,
                `Kolmnurga ABC mediaan AM on ${m} cm, O on mediaanide lõikepunkt. Leia AO.`,
                `Median AM of triangle ABC is ${m} cm; O is where the medians meet. Find AO.`,
              ),
              exp: P(
                t3(
                  "Медианы делятся точкой пересечения в отношении 2 : 1, считая от вершины:",
                  "Mediaanid jaotuvad lõikepunktis suhtes 2 : 1 tipust lugedes:",
                  "Medians are divided 2 : 1 from the vertex:",
                ) + ` ${FR(2, 3)} · ${m} = ${ansHtml(v)}`,
              ),
            }),
          );
        } else {
          const p = q(R.int(95, 310)).div(10);
          items.push(
            numAns(p.mul(2), {
              unit: cm(),
              q: t3(
                `Периметр треугольника, образованного средними линиями, ${qh(p)} см. Найди периметр исходного треугольника.`,
                `Kesklõikudest moodustatud kolmnurga ümbermõõt on ${qh(p)} cm. Leia esialgse kolmnurga ümbermõõt.`,
                `The triangle formed by the midsegments has perimeter ${qh(p)} cm. Find the perimeter of the original triangle.`,
              ),
              exp: P(`${qh(p)} · 2 = ${qh(p.mul(2))}`),
            }),
          );
        }
      }
      return { items };
    },
  },

  bisAlt: {
    topic: "g8tri",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O(
      "Высоты и биссектрисы",
      "Kõrgused ja nurgapoolitajad",
      "Altitudes and angle bisectors",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["bis", "alt"] : ["altbis", "ext", "bis"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % ks.length];
        let a, b;
        do {
          a = R.int(25, 85);
          b = R.int(25, 85);
        } while (a + b >= 160 || a === b);
        const c = 180 - a - b;
        const head = t3(
          `В треугольнике ABC ∠A = ${a}°, ∠B = ${b}°.`,
          `Kolmnurgas ABC on ∠A = ${a}°, ∠B = ${b}°.`,
          `In triangle ABC, ∠A = ${a}°, ∠B = ${b}°.`,
        );
        if (k === "bis") {
          const v = q(180).sub(q(a + b).div(2));
          items.push(
            numAns(v, {
              unit: "°",
              q:
                head +
                " " +
                t3(
                  "Биссектрисы углов A и B пересекаются в точке O. Найди ∠AOB.",
                  "Nurkade A ja B poolitajad lõikuvad punktis O. Leia ∠AOB.",
                  "The bisectors of A and B meet at O. Find ∠AOB.",
                ),
              exp:
                P(`∠OAB = ${deg(q(a).div(2))}, ∠OBA = ${deg(q(b).div(2))}`) +
                P(
                  `∠AOB = 180° ${MINUS} ${deg(q(a).div(2))} ${MINUS} ${deg(q(b).div(2))} = ${deg(v)}`,
                ),
            }),
          );
        } else if (k === "alt") {
          items.push(
            numAns(90 - a, {
              unit: "°",
              q:
                head +
                " " +
                t3(
                  "CH — высота. Найди ∠ACH.",
                  "CH on kõrgus. Leia ∠ACH.",
                  "CH is an altitude. Find ∠ACH.",
                ),
              exp: P(
                t3(
                  "Треугольник ACH прямоугольный:",
                  "Kolmnurk ACH on täisnurkne:",
                  "Triangle ACH is right-angled:",
                ) + ` 90° ${MINUS} ${a}° = ${90 - a}°`,
              ),
            }),
          );
        } else if (k === "altbis") {
          const v = q(Math.abs(a - b)).div(2);
          items.push(
            numAns(v, {
              unit: "°",
              q:
                head +
                " " +
                t3(
                  "Найди угол между высотой и биссектрисой, проведёнными из вершины C.",
                  "Leia tipust C tõmmatud kõrguse ja nurgapoolitaja vaheline nurk.",
                  "Find the angle between the altitude and the bisector from C.",
                ),
              exp:
                P(`∠C = ${c}°; ∠ACH = ${90 - a}°; ∠ACL = ${deg(q(c).div(2))}`) +
                P(`|${deg(q(c).div(2))} ${MINUS} ${90 - a}°| = ${deg(v)}`),
            }),
          );
        } else {
          const v = q(180 - a).sub(q(c).div(2));
          items.push(
            numAns(v, {
              unit: "°",
              q:
                head +
                " " +
                t3(
                  "CD — биссектриса. Найди ∠ADC.",
                  "CD on nurgapoolitaja. Leia ∠ADC.",
                  "CD is the angle bisector. Find ∠ADC.",
                ),
              exp:
                P(`∠C = ${c}°, ∠ACD = ${deg(q(c).div(2))}`) +
                P(`∠ADC = 180° ${MINUS} ${a}° ${MINUS} ${deg(q(c).div(2))} = ${deg(v)}`),
            }),
          );
        }
      }
      return { items };
    },
  },
};
