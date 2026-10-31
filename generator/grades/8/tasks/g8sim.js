// 8 класс, тема «Подобие треугольников»: шаблоны заданий.
import { FR, O, P, ansHtml, cm, numAns, q, qh, t3 } from "../../../core/index.js";
import { cm2, sqrtAns, sqrtShow } from "../helpers.js";
import { G_, T_, sk } from "../sketches.js";

// подобие: треугольник с отрезком, параллельным основанию
function svgSim(lb, lt, l1, l2) {
  return sk(
    130,
    G_(`<polygon points="20,112 200,112 90,16"/><line x1="55" y1="64" x2="146" y2="64"/>`) +
      T_(110, 127, lb, "middle") +
      T_(100, 58, lt, "middle") +
      T_(56, 40, l1, "end") +
      T_(30, 92, l2, "end"),
  );
}

export default {
  /* --- Подобие треугольников --- */
  simTri: {
    topic: "g8sim",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O("Подобные треугольники", "Sarnased kolmnurgad", "Similar triangles"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["side", "per", "area"] : ["par", "hgt", "area"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        if (k === "side") {
          let a, b, c;
          do {
            a = R.int(4, 9);
            b = R.int(5, 12);
            c = R.int(6, 15);
          } while (!(a < b && b < c && a + b > c));
          const a1 = q(R.int(10, 60)).div(10);
          const kk = a1.div(a);
          items.push(
            numAns(kk.mul(c), {
              unit: cm(),
              q: t3(
                `Стороны треугольника ${a} см, ${b} см и ${c} см. Наименьшая сторона подобного ему треугольника ${qh(a1)} см. Найди наибольшую сторону второго треугольника.`,
                `Kolmnurga küljed on ${a} cm, ${b} cm ja ${c} cm. Sellega sarnase kolmnurga lühim külg on ${qh(a1)} cm. Leia teise kolmnurga pikim külg.`,
                `A triangle has sides ${a} cm, ${b} cm and ${c} cm. The shortest side of a similar triangle is ${qh(a1)} cm. Find its longest side.`,
              ),
              exp:
                P(`k = ${qh(a1)} : ${a} = ${ansHtml(kk)}`) + P(`${c} · k = ${ansHtml(kk.mul(c))}`),
            }),
          );
        } else if (k === "per") {
          const a = R.int(3, 12),
            a1 = R.int(2, 15),
            P1 = R.int(20, 60);
          const v = q(P1 * a1).div(a);
          items.push(
            numAns(v, {
              unit: cm(),
              q: t3(
                `Треугольники подобны, сходственные стороны ${a} см и ${a1} см. Периметр первого ${P1} см. Найди периметр второго.`,
                `Kolmnurgad on sarnased, vastavad küljed on ${a} cm ja ${a1} cm. Esimese ümbermõõt on ${P1} cm. Leia teise ümbermõõt.`,
                `Two triangles are similar with corresponding sides ${a} cm and ${a1} cm. The first has perimeter ${P1} cm. Find the second's.`,
              ),
              exp: P(
                t3(
                  "Периметры относятся как сходственные стороны:",
                  "Ümbermõõdud suhtuvad nagu vastavad küljed:",
                  "Perimeters are in the same ratio as sides:",
                ) + ` ${P1} · ${FR(a1, a)} = ${ansHtml(v)}`,
              ),
            }),
          );
        } else if (k === "area") {
          const a = R.int(2, 9);
          let b;
          do {
            b = R.int(2, 12);
          } while (b === a);
          const S = lvl === "n" ? R.int(4, 40) : q(R.int(15, 200)).div(10);
          const v = q(S)
            .mul(b * b)
            .div(a * a);
          items.push(
            numAns(v, {
              unit: cm2(),
              q: t3(
                `Сходственные стороны подобных треугольников ${a} см и ${b} см. Площадь первого ${qh(S)} см². Найди площадь второго.`,
                `Sarnaste kolmnurkade vastavad küljed on ${a} cm ja ${b} cm. Esimese pindala on ${qh(S)} cm². Leia teise pindala.`,
                `Corresponding sides of similar triangles are ${a} cm and ${b} cm. The first has area ${qh(S)} cm². Find the second's.`,
              ),
              exp: P(
                t3(
                  "Площади относятся как квадрат коэффициента подобия:",
                  "Pindalad suhtuvad nagu sarnasusteguri ruut:",
                  "Areas are in the ratio of the square of the scale factor:",
                ) + ` ${qh(S)} · ${FR(b * b, a * a)} = ${ansHtml(v)}`,
              ),
            }),
          );
        } else if (k === "par") {
          const m = R.int(2, 9),
            n = R.int(2, 9),
            c = R.int(6, 20);
          const v = q(c * m).div(m + n);
          items.push(
            numAns(v, {
              unit: cm(),
              q:
                svgSim("AC", "DE", "BD", "DA") +
                t3(
                  `DE ∥ AC, BD = ${m} см, DA = ${n} см, AC = ${c} см. Найди DE.`,
                  `DE ∥ AC, BD = ${m} cm, DA = ${n} cm, AC = ${c} cm. Leia DE.`,
                  `DE ∥ AC, BD = ${m} cm, DA = ${n} cm, AC = ${c} cm. Find DE.`,
                ),
              exp:
                P(
                  t3(
                    "Треугольники DBE и ABC подобны:",
                    "Kolmnurgad DBE ja ABC on sarnased:",
                    "Triangles DBE and ABC are similar:",
                  ) + ` ${FR("DE", "AC")} = ${FR("BD", "BA")} = ${FR(m, m + n)}`,
                ) + P(`DE = ${c} · ${FR(m, m + n)} = ${ansHtml(v)}`),
            }),
          );
        } else {
          const p = R.int(2, 16),
            s = R.int(3, 20);
          items.push(
            sqrtAns(q(p * s), {
              unit: cm(),
              q: t3(
                `Высота прямоугольного треугольника делит гипотенузу на отрезки ${p} см и ${s} см. Найди эту высоту.`,
                `Täisnurkse kolmnurga kõrgus jaotab hüpotenuusi lõikudeks ${p} cm ja ${s} cm. Leia see kõrgus.`,
                `The altitude to the hypotenuse divides it into ${p} cm and ${s} cm. Find the altitude.`,
              ),
              exp: P(
                t3(
                  "Высота — среднее пропорциональное отрезков гипотенузы:",
                  "Kõrgus on hüpotenuusi lõikude geomeetriline keskmine:",
                  "The altitude is the geometric mean of the segments:",
                ) + ` h = √(${p} · ${s}) = ${sqrtShow(q(p * s))}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },
};
