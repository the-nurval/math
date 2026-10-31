// 6 класс, тема «Треугольники: углы, виды, равенство»: шаблоны заданий.
import { MINUS, O, P, YN, choiceAns, numAns, q, qh, t3 } from "../../../core/index.js";

export default {
  /* ===== Треугольники ===== */
  triAngles: {
    topic: "g6tri",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O("Углы треугольника", "Kolmnurga nurgad", "Angles of a triangle"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["third", "iso", "right"] : ["ratio", "ext", "iso2"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        if (k === "third") {
          const a = R.int(25, 80),
            b = R.int(20, 180 - a - 15);
          items.push(
            numAns(180 - a - b, {
              unit: "°",
              q: t3(
                `Два угла треугольника ${a}° и ${b}°. Найди третий угол.`,
                `Kolmnurga kaks nurka on ${a}° ja ${b}°. Leia kolmas nurk.`,
                `Two angles of a triangle are ${a}° and ${b}°. Find the third.`,
              ),
              exp: P(`180° ${MINUS} ${a}° ${MINUS} ${b}° = ${180 - a - b}°`),
            }),
          );
        } else if (k === "iso") {
          const base = R.int(31, 84);
          items.push(
            numAns(180 - 2 * base, {
              unit: "°",
              q: t3(
                `Угол при основании равнобедренного треугольника ${base}°. Найди угол при вершине.`,
                `Võrdhaarse kolmnurga alusnurk on ${base}°. Leia tipunurk.`,
                `A base angle of an isosceles triangle is ${base}°. Find the vertex angle.`,
              ),
              exp:
                P(
                  t3(
                    "Углы при основании равны.",
                    "Alusnurgad on võrdsed.",
                    "Base angles are equal.",
                  ),
                ) + P(`180° ${MINUS} 2 · ${base}° = ${180 - 2 * base}°`),
            }),
          );
        } else if (k === "right") {
          const a = R.int(15, 75);
          items.push(
            numAns(90 - a, {
              unit: "°",
              q: t3(
                `Один острый угол прямоугольного треугольника ${a}°. Найди другой острый угол.`,
                `Täisnurkse kolmnurga üks teravnurk on ${a}°. Leia teine teravnurk.`,
                `One acute angle of a right triangle is ${a}°. Find the other.`,
              ),
              exp:
                P(
                  t3(
                    "Сумма острых углов прямоугольного треугольника 90°.",
                    "Täisnurkse kolmnurga teravnurkade summa on 90°.",
                    "The acute angles of a right triangle add up to 90°.",
                  ),
                ) + P(`90° ${MINUS} ${a}° = ${90 - a}°`),
            }),
          );
        } else if (k === "ratio") {
          let r;
          do {
            r = [R.int(1, 5), R.int(1, 6), R.int(2, 7)];
          } while (180 % (r[0] + r[1] + r[2]) !== 0 || new Set(r).size < 3);
          const u = 180 / (r[0] + r[1] + r[2]);
          const mx = Math.max(...r) * u;
          items.push(
            numAns(mx, {
              unit: "°",
              q: t3(
                `Углы треугольника относятся как ${r.join(" : ")}. Найди наибольший угол.`,
                `Kolmnurga nurgad suhtuvad nagu ${r.join(" : ")}. Leia suurim nurk.`,
                `The angles of a triangle are in the ratio ${r.join(" : ")}. Find the largest.`,
              ),
              exp:
                P(`${r.join("x + ")}x = 180°; ${r[0] + r[1] + r[2]}x = 180°; x = ${u}°`) +
                P(`${Math.max(...r)} · ${u}° = ${mx}°`),
            }),
          );
        } else if (k === "ext") {
          const a = R.int(25, 70),
            b = R.int(30, 80);
          items.push(
            numAns(a + b, {
              unit: "°",
              q: t3(
                `Два угла треугольника ${a}° и ${b}°. Найди внешний угол при третьей вершине.`,
                `Kolmnurga kaks nurka on ${a}° ja ${b}°. Leia kolmanda tipu välisnurk.`,
                `Two angles of a triangle are ${a}° and ${b}°. Find the exterior angle at the third vertex.`,
              ),
              exp:
                P(
                  t3(
                    "Внешний угол равен сумме двух углов треугольника, не смежных с ним.",
                    "Välisnurk võrdub kahe temaga mitte kõrvuti asuva sisenurga summaga.",
                    "An exterior angle equals the sum of the two non-adjacent interior angles.",
                  ),
                ) + P(`${a}° + ${b}° = ${a + b}°`),
            }),
          );
        } else {
          const top = R.int(20, 140);
          const base = (180 - top) / 2;
          items.push(
            numAns(q(base), {
              unit: "°",
              q: t3(
                `Угол при вершине равнобедренного треугольника ${top}°. Найди угол при основании.`,
                `Võrdhaarse kolmnurga tipunurk on ${top}°. Leia alusnurk.`,
                `The vertex angle of an isosceles triangle is ${top}°. Find a base angle.`,
              ),
              exp: P(`(180° ${MINUS} ${top}°) : 2 = ${qh(q(base))}°`),
            }),
          );
        }
      }
      return { items };
    },
  },

  adjVert: {
    topic: "g6tri",
    pts: 1,
    cnt: { n: 2, a: 3 },
    title: O(
      "Смежные и вертикальные углы",
      "Kõrvunurgad ja tippnurgad",
      "Adjacent and vertical angles",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const a = R.int(20, 160);
        if (i === 0)
          items.push(
            numAns(180 - a, {
              unit: "°",
              q: t3(
                `Один из смежных углов ${a}°. Найди другой.`,
                `Üks kõrvunurkadest on ${a}°. Leia teine.`,
                `One of two adjacent angles is ${a}°. Find the other.`,
              ),
              exp:
                P(
                  t3(
                    "Сумма смежных углов 180°.",
                    "Kõrvunurkade summa on 180°.",
                    "Adjacent angles add up to 180°.",
                  ),
                ) + P(`180° ${MINUS} ${a}° = ${180 - a}°`),
            }),
          );
        else if (i === 1) {
          const s = 2 * R.int(15, 80);
          items.push(
            numAns(180 - s / 2, {
              unit: "°",
              q: t3(
                `Две прямые пересекаются. Сумма двух вертикальных углов ${s}°. Найди тупой (или прямой) угол между прямыми.`,
                `Kaks sirget lõikuvad. Kahe tippnurga summa on ${s}°. Leia sirgete vaheline nürinurk (või täisnurk).`,
                `Two lines cross. Two vertical angles add up to ${s}°. Find the larger angle between the lines.`,
              ),
              exp: P(
                t3(
                  `Вертикальные углы равны: каждый ${s / 2}°. Смежный с ним: 180° ${MINUS} ${s / 2}° = ${180 - s / 2}°.`,
                  `Tippnurgad on võrdsed: kumbki ${s / 2}°. Kõrvunurk: 180° ${MINUS} ${s / 2}° = ${180 - s / 2}°.`,
                  `Vertical angles are equal: ${s / 2}° each. The adjacent one: 180° ${MINUS} ${s / 2}° = ${180 - s / 2}°.`,
                ),
              ),
            }),
          );
        } else {
          const d = 2 * R.int(5, 40);
          const x = (180 - d) / 2;
          items.push(
            numAns(x + d, {
              unit: "°",
              q: t3(
                `Один из смежных углов на ${d}° больше другого. Найди больший угол.`,
                `Üks kõrvunurk on teisest ${d}° võrra suurem. Leia suurem nurk.`,
                `One adjacent angle is ${d}° larger than the other. Find the larger.`,
              ),
              exp: P(`x + (x + ${d}°) = 180°; x = ${x}°; x + ${d}° = ${x + d}°`),
            }),
          );
        }
      }
      return { items };
    },
  },

  triKind: {
    topic: "g6tri",
    pts: 1,
    cnt: { n: 2, a: 3 },
    title: O("Вид треугольника", "Kolmnurga liik", "Type of triangle"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        if (i === 0) {
          const kind = R.pick(["ac", "rt", "ob"]);
          let a, b, c;
          do {
            a = R.int(20, 100);
            b = R.int(15, 100);
            c = 180 - a - b;
          } while (
            c < 10 ||
            (kind === "rt"
              ? false
              : kind === "ac"
                ? Math.max(a, b, c) >= 90
                : Math.max(a, b, c) <= 90)
          );
          if (kind === "rt") {
            a = R.int(20, 70);
            b = 90 - a;
            c = 90;
          }
          const v = Math.max(a, b, c) > 90 ? "ob" : Math.max(a, b, c) === 90 ? "rt" : "ac";
          const opts = [
            ["ac", t3("остроугольный", "teravnurkne", "acute")],
            ["rt", t3("прямоугольный", "täisnurkne", "right")],
            ["ob", t3("тупоугольный", "nürinurkne", "obtuse")],
          ];
          items.push(
            choiceAns(v, opts, {
              q: t3(
                `Два угла треугольника ${a}° и ${b}°. Какой это треугольник?`,
                `Kolmnurga kaks nurka on ${a}° ja ${b}°. Milline kolmnurk see on?`,
                `Two angles of a triangle are ${a}° and ${b}°. What type is it?`,
              ),
              exp: P(
                t3(`Третий угол ${c}°.`, `Kolmas nurk on ${c}°.`, `The third angle is ${c}°.`),
              ),
            }),
          );
        } else {
          const a = R.int(2, 12),
            b = R.int(2, 12);
          const yes = R.chance(0.5);
          const c = yes ? R.int(Math.abs(a - b) + 1, a + b - 1) : a + b + R.int(0, 3);
          items.push(
            choiceAns(yes ? "y" : "n", YN(), {
              q: t3(
                `Существует ли треугольник со сторонами ${a} см, ${b} см и ${c} см?`,
                `Kas leidub kolmnurk külgedega ${a} cm, ${b} cm ja ${c} cm?`,
                `Is there a triangle with sides ${a} cm, ${b} cm and ${c} cm?`,
              ),
              exp:
                P(
                  t3(
                    "Каждая сторона должна быть меньше суммы двух других.",
                    "Iga külg peab olema väiksem kahe ülejäänud külje summast.",
                    "Each side must be shorter than the sum of the other two.",
                  ),
                ) + P(`${Math.max(a, b, c)} ${yes ? "<" : "≥"} ${a + b + c - Math.max(a, b, c)}`),
            }),
          );
        }
      }
      return { items };
    },
  },
};
