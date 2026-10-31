// 6 класс, тема «Площадь треугольника, куб и параллелепипед»: шаблоны заданий.
import { O, P, Q, cm, numAns, qh, rDec, t3 } from "../../../core/index.js";

export default {
  /* ===== Площадь треугольника, куб и параллелепипед ===== */
  triArea: {
    topic: "g6area",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O("Площадь треугольника", "Kolmnurga pindala", "Area of a triangle"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const a = lvl === "n" ? new Q(R.int(3, 20)) : rDec(R, 1, 15).abs(),
          h = lvl === "n" ? new Q(R.int(2, 16)) : rDec(R, 1, 12).abs();
        const S = a.mul(h).div(2);
        if (i === 0)
          items.push(
            numAns(S, {
              unit: cm() + "²",
              q: t3(
                `Основание треугольника ${qh(a)} см, высота к нему ${qh(h)} см. Найди площадь.`,
                `Kolmnurga alus on ${qh(a)} cm ja sellele tõmmatud kõrgus ${qh(h)} cm. Leia pindala.`,
                `A triangle has base ${qh(a)} cm and height ${qh(h)} cm. Find its area.`,
              ),
              exp: P(`S = a · h : 2 = ${qh(a)} · ${qh(h)} : 2 = ${qh(S)}`),
            }),
          );
        else if (i === 1)
          items.push(
            numAns(h, {
              unit: cm(),
              q: t3(
                `Площадь треугольника ${qh(S)} см², основание ${qh(a)} см. Найди высоту к этому основанию.`,
                `Kolmnurga pindala on ${qh(S)} cm² ja alus ${qh(a)} cm. Leia sellele alusele tõmmatud kõrgus.`,
                `A triangle has area ${qh(S)} cm² and base ${qh(a)} cm. Find the height to it.`,
              ),
              exp: P(`h = 2S : a = 2 · ${qh(S)} : ${qh(a)} = ${qh(h)}`),
            }),
          );
        else
          items.push(
            numAns(S, {
              unit: cm() + "²",
              q: t3(
                `Катеты прямоугольного треугольника ${qh(a)} см и ${qh(h)} см. Найди площадь.`,
                `Täisnurkse kolmnurga kaatetid on ${qh(a)} cm ja ${qh(h)} cm. Leia pindala.`,
                `A right triangle has legs ${qh(a)} cm and ${qh(h)} cm. Find its area.`,
              ),
              exp:
                P(
                  t3(
                    "Один катет — высота к другому.",
                    "Üks kaatet on teisele tõmmatud kõrgus.",
                    "One leg is the height to the other.",
                  ),
                ) + P(`S = ${qh(a)} · ${qh(h)} : 2 = ${qh(S)}`),
            }),
          );
      }
      return { items };
    },
  },

  boxVol: {
    topic: "g6area",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O("Куб и прямоугольный параллелепипед", "Kuup ja risttahukas", "Cube and cuboid"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        if (i === 0) {
          const a = lvl === "n" ? R.int(2, 12) : R.int(3, 15);
          const kind = R.chance(0.5);
          items.push(
            numAns(kind ? a * a * a : 6 * a * a, {
              unit: kind ? cm() + "³" : cm() + "²",
              q: kind
                ? t3(
                    `Ребро куба ${a} см. Найди объём.`,
                    `Kuubi serv on ${a} cm. Leia ruumala.`,
                    `A cube has edge ${a} cm. Find its volume.`,
                  )
                : t3(
                    `Ребро куба ${a} см. Найди площадь поверхности.`,
                    `Kuubi serv on ${a} cm. Leia täispindala.`,
                    `A cube has edge ${a} cm. Find its surface area.`,
                  ),
              exp: P(
                kind ? `V = a³ = ${a}³ = ${a * a * a}` : `S = 6a² = 6 · ${a * a} = ${6 * a * a}`,
              ),
            }),
          );
        } else if (i === 1) {
          const a = R.int(2, 12),
            b = R.int(2, 10),
            c = R.int(2, 9);
          const kind = R.chance(0.5);
          items.push(
            numAns(kind ? a * b * c : 2 * (a * b + a * c + b * c), {
              unit: kind ? cm() + "³" : cm() + "²",
              q: kind
                ? t3(
                    `Измерения прямоугольного параллелепипеда ${a} см, ${b} см и ${c} см. Найди объём.`,
                    `Risttahuka mõõtmed on ${a} cm, ${b} cm ja ${c} cm. Leia ruumala.`,
                    `A cuboid is ${a} cm × ${b} cm × ${c} cm. Find its volume.`,
                  )
                : t3(
                    `Измерения прямоугольного параллелепипеда ${a} см, ${b} см и ${c} см. Найди площадь поверхности.`,
                    `Risttahuka mõõtmed on ${a} cm, ${b} cm ja ${c} cm. Leia täispindala.`,
                    `A cuboid is ${a} cm × ${b} cm × ${c} cm. Find its surface area.`,
                  ),
              exp: P(
                kind
                  ? `V = ${a} · ${b} · ${c} = ${a * b * c}`
                  : `S = 2(${a * b} + ${a * c} + ${b * c}) = ${2 * (a * b + a * c + b * c)}`,
              ),
            }),
          );
        } else {
          const e = R.pick([2, 3, 4]);
          const a = e * R.int(2, 5),
            b = e * R.int(2, 5),
            c = e * R.int(2, 4);
          const n = (a / e) * (b / e) * (c / e);
          items.push(
            numAns(n, {
              q: t3(
                `Сколько кубиков с ребром ${e} см поместится в коробку ${a} × ${b} × ${c} см?`,
                `Mitu kuubikut servaga ${e} cm mahub karpi mõõtmetega ${a} × ${b} × ${c} cm?`,
                `How many ${e} cm cubes fit into a ${a} × ${b} × ${c} cm box?`,
              ),
              exp: P(
                `(${a} : ${e}) · (${b} : ${e}) · (${c} : ${e}) = ${a / e} · ${b / e} · ${c / e} = ${n}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },
};
