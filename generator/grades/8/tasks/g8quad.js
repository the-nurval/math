// 8 класс, тема «Параллелограмм и трапеция»: шаблоны заданий.
import { MINUS, O, P, ansHtml, cm, gcd, numAns, q, qh, t3 } from "../../../core/index.js";
import { deg } from "../helpers.js";
import { svgTrap } from "../sketches.js";

export default {
  /* --- Параллелограмм и трапеция --- */
  paraAng: {
    topic: "g8quad",
    pts: 1,
    cnt: { n: 3, a: 3 },
    title: O("Параллелограмм и трапеция", "Rööpkülik ja trapets", "Parallelograms and trapezia"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["opp", "diff", "iso"] : ["bis", "ratio", "diag"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        if (k === "opp") {
          const a = R.int(32, 148);
          items.push(
            numAns(180 - a, {
              unit: "°",
              q: t3(
                `Один из углов параллелограмма ${a}°. Найди соседний с ним угол.`,
                `Rööpküliku üks nurk on ${a}°. Leia sellega külgnev nurk.`,
                `One angle of a parallelogram is ${a}°. Find the adjacent angle.`,
              ),
              exp: P(
                t3(
                  "Сумма углов, прилежащих к одной стороне, 180°:",
                  "Ühe küljega külgnevate nurkade summa on 180°:",
                  "Angles on the same side add up to 180°:",
                ) + ` ${180 - a}°`,
              ),
            }),
          );
        } else if (k === "diff") {
          const d = R.int(12, 110);
          const v = q(180 + d).div(2);
          items.push(
            numAns(v, {
              unit: "°",
              q: t3(
                `Один угол параллелограмма на ${d}° больше другого. Найди больший угол.`,
                `Rööpküliku üks nurk on teisest ${d}° suurem. Leia suurem nurk.`,
                `One angle of a parallelogram is ${d}° larger than another. Find the larger.`,
              ),
              exp: P(`x + x + ${d}° = 180°; x + ${d}° = ${deg(v)}`),
            }),
          );
        } else if (k === "iso") {
          const a = R.int(35, 85);
          items.push(
            numAns(180 - a, {
              unit: "°",
              q: t3(
                `Угол при большем основании равнобедренной трапеции ${a}°. Найди тупой угол трапеции.`,
                `Võrdhaarse trapetsi nurk suurema aluse juures on ${a}°. Leia trapetsi nürinurk.`,
                `A base angle at the longer base of an isosceles trapezium is ${a}°. Find its obtuse angle.`,
              ),
              exp: P(
                t3(
                  "Углы, прилежащие к боковой стороне, в сумме 180°:",
                  "Haaraga külgnevate nurkade summa on 180°:",
                  "Angles along a leg add up to 180°:",
                ) + ` 180° ${MINUS} ${a}° = ${180 - a}°`,
              ),
            }),
          );
        } else if (k === "bis") {
          const m = q(R.int(30, 120)).div(10),
            n = q(R.int(15, 90)).div(10);
          const p = m.mul(4).add(n.mul(2));
          items.push(
            numAns(p, {
              unit: cm(),
              q: t3(
                `Биссектриса угла A параллелограмма ABCD пересекает сторону BC в точке K, BK = ${qh(m)} см, KC = ${qh(n)} см. Найди периметр параллелограмма.`,
                `Rööpküliku ABCD nurga A poolitaja lõikab külge BC punktis K, BK = ${qh(m)} cm, KC = ${qh(n)} cm. Leia rööpküliku ümbermõõt.`,
                `The bisector of angle A of parallelogram ABCD meets BC at K, BK = ${qh(m)} cm, KC = ${qh(n)} cm. Find the perimeter.`,
              ),
              exp:
                P(
                  t3(
                    "∠BKA = ∠KAD = ∠BAK, поэтому треугольник ABK равнобедренный: AB = BK.",
                    "∠BKA = ∠KAD = ∠BAK, seega kolmnurk ABK on võrdhaarne: AB = BK.",
                    "∠BKA = ∠KAD = ∠BAK, so triangle ABK is isosceles: AB = BK.",
                  ),
                ) + P(`P = 2(${qh(m)} + ${qh(m.add(n))}) = ${qh(p)}`),
            }),
          );
        } else if (k === "ratio") {
          let m, n;
          do {
            m = R.int(1, 5);
            n = R.int(2, 9);
          } while (m >= n || gcd(m, n) > 1);
          const v = q(180 * m).div(m + n);
          items.push(
            numAns(v, {
              unit: "°",
              q: t3(
                `Два угла параллелограмма относятся как ${m} : ${n}. Найди острый угол.`,
                `Rööpküliku kaks nurka suhtuvad nagu ${m} : ${n}. Leia teravnurk.`,
                `Two angles of a parallelogram are in the ratio ${m} : ${n}. Find the acute angle.`,
              ),
              exp: P(`${m}x + ${n}x = 180°; ${m}x = ${ansHtml(v)}°`),
            }),
          );
        } else {
          const a = R.int(5, 15),
            d1 = 2 * R.int(5, 14),
            d2 = 2 * R.int(4, 12);
          items.push(
            numAns(a + d1 / 2 + d2 / 2, {
              unit: cm(),
              q: t3(
                `Диагонали параллелограмма ABCD ${d1} см и ${d2} см пересекаются в точке O, AB = ${a} см. Найди периметр треугольника AOB.`,
                `Rööpküliku ABCD diagonaalid ${d1} cm ja ${d2} cm lõikuvad punktis O, AB = ${a} cm. Leia kolmnurga AOB ümbermõõt.`,
                `The diagonals of parallelogram ABCD, ${d1} cm and ${d2} cm, meet at O; AB = ${a} cm. Find the perimeter of triangle AOB.`,
              ),
              exp: P(
                t3(
                  "Диагонали делятся точкой пересечения пополам:",
                  "Diagonaalid poolitavad teineteist:",
                  "The diagonals bisect each other:",
                ) + ` ${a} + ${d1 / 2} + ${d2 / 2} = ${a + d1 / 2 + d2 / 2}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },

  trapMid: {
    topic: "g8quad",
    pts: 1,
    cnt: { n: 2, a: 3 },
    title: O("Средняя линия трапеции", "Trapetsi kesklõik", "Midsegment of a trapezium"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["mid", "base"] : ["base", "diag", "ratio"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % ks.length];
        if (k === "mid") {
          const a = q(R.int(20, 90)).div(10),
            b = q(R.int(60, 180)).div(10);
          const m = a.add(b).div(2);
          items.push(
            numAns(m, {
              unit: cm(),
              q:
                svgTrap("b = " + qh(b), "a = " + qh(a), "") +
                t3(
                  `Основания трапеции ${qh(a)} см и ${qh(b)} см. Найди среднюю линию.`,
                  `Trapetsi alused on ${qh(a)} cm ja ${qh(b)} cm. Leia kesklõik.`,
                  `The bases of a trapezium are ${qh(a)} cm and ${qh(b)} cm. Find the midsegment.`,
                ),
              exp: P(`(${qh(a)} + ${qh(b)}) : 2 = ${qh(m)}`),
            }),
          );
        } else if (k === "base") {
          const m = q(R.int(50, 150)).div(10),
            a = q(R.int(20, Math.floor(m.v() * 10) - 5)).div(10);
          const b = m.mul(2).sub(a);
          items.push(
            numAns(b, {
              unit: cm(),
              q: t3(
                `Средняя линия трапеции ${qh(m)} см, меньшее основание ${qh(a)} см. Найди большее основание.`,
                `Trapetsi kesklõik on ${qh(m)} cm, lühem alus ${qh(a)} cm. Leia pikem alus.`,
                `The midsegment of a trapezium is ${qh(m)} cm and the shorter base is ${qh(a)} cm. Find the longer base.`,
              ),
              exp: P(`2 · ${qh(m)} ${MINUS} ${qh(a)} = ${qh(b)}`),
            }),
          );
        } else if (k === "diag") {
          const p = R.int(3, 9),
            s = p + R.int(1, 7);
          items.push(
            numAns(2 * s, {
              unit: cm(),
              q: t3(
                `Диагональ трапеции делит среднюю линию на отрезки ${p} см и ${s} см. Найди большее основание.`,
                `Trapetsi diagonaal jaotab kesklõigu lõikudeks ${p} cm ja ${s} cm. Leia pikem alus.`,
                `A diagonal divides the midsegment into ${p} cm and ${s} cm. Find the longer base.`,
              ),
              exp: P(
                t3(
                  "Каждый отрезок — средняя линия треугольника, он равен половине основания:",
                  "Kumbki lõik on kolmnurga kesklõik ja võrdub poolega alusest:",
                  "Each piece is a midsegment of a triangle, half a base:",
                ) + ` 2 · ${s} = ${2 * s}`,
              ),
            }),
          );
        } else {
          let m, n;
          do {
            m = R.int(1, 4);
            n = R.int(2, 7);
          } while (m >= n || gcd(m, n) > 1);
          const L = R.int(6, 30);
          const b = q(2 * L * n).div(m + n);
          items.push(
            numAns(b, {
              unit: cm(),
              q: t3(
                `Основания трапеции относятся как ${m} : ${n}, средняя линия ${L} см. Найди большее основание.`,
                `Trapetsi alused suhtuvad nagu ${m} : ${n}, kesklõik on ${L} cm. Leia pikem alus.`,
                `The bases are in the ratio ${m} : ${n} and the midsegment is ${L} cm. Find the longer base.`,
              ),
              exp: P(
                `${m}x + ${n}x = 2 · ${L}; x = ${ansHtml(q(2 * L).div(m + n))}; ${n}x = ${ansHtml(b)}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },
};
