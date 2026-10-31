// 6 класс, тема «Окружность и круг»: шаблоны заданий.
import { FR, MINUS, O, P, Q, cm, curLang, numAns, qh, t3 } from "../../../core/index.js";

const PI = new Q(314, 100);

const piTxt = () => (curLang() === "en" ? "3.14" : "3,14");

export default {
  /* ===== Окружность и круг ===== */
  circle: {
    topic: "g6circ",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O("Окружность и круг (π ≈ 3,14)", "Ringjoon ja ring (π ≈ 3,14)", "Circles (π ≈ 3.14)"),
    gen(R, lvl, cnt) {
      const r = new Q(R.int(lvl === "n" ? 2 : 15, lvl === "n" ? 12 : 95), lvl === "n" ? 1 : 10);
      const C = PI.mul(r).mul(2),
        S = PI.mul(r).mul(r);
      const Sr = new Q(Math.round(S.v() * 100), 100);
      const intro = t3(
        `Радиус круга ${qh(r)} см.`,
        `Ringi raadius on ${qh(r)} cm.`,
        `The radius of a circle is ${qh(r)} cm.`,
      );
      const items = [
        numAns(C, {
          tol: 0.05,
          unit: cm(),
          q: t3("Длина окружности", "Ringjoone pikkus", "Circumference"),
          pre: "C =",
          exp: P(`C = 2πr = 2 · ${piTxt()} · ${qh(r)} = ${qh(C)} ${cm()}`),
        }),
        numAns(Sr, {
          tol: 0.06,
          unit: cm() + "²",
          q: t3(
            "Площадь круга (округли до сотых)",
            "Ringi pindala (ümarda sajandikeni)",
            "Area (round to hundredths)",
          ),
          pre: "S =",
          exp: P(`S = πr² = ${piTxt()} · ${qh(r)}² ≈ ${qh(Sr)} ${cm()}²`),
        }),
      ];
      if (lvl === "a") {
        const ang = R.pick([90, 60, 120, 45, 30]);
        const Ss = S.mul(ang).div(360);
        const Sv = new Q(Math.round(Ss.v() * 100), 100);
        items.push(
          numAns(Sv, {
            tol: 0.06,
            unit: cm() + "²",
            q: t3(
              `Площадь сектора с углом ${ang}° (округли до сотых)`,
              `Sektori pindala, kui kesknurk on ${ang}° (ümarda sajandikeni)`,
              `Area of a ${ang}° sector (round to hundredths)`,
            ),
            pre: "S =",
            exp:
              P(
                t3(
                  `Сектор ${ang}° — это ${FR(ang, 360)} круга.`,
                  `${ang}° sektor on ${FR(ang, 360)} ringist.`,
                  `A ${ang}° sector is ${FR(ang, 360)} of the circle.`,
                ),
              ) + P(`S = ${qh(Sr)} · ${ang} : 360 ≈ ${qh(Sv)} ${cm()}²`),
          }),
        );
      }
      return { intro, items: items.slice(0, cnt) };
    },
  },

  circleBack: {
    topic: "g6circ",
    pts: 2,
    cnt: { n: 1, a: 2 },
    title: O("Найди радиус (π ≈ 3,14)", "Leia raadius (π ≈ 3,14)", "Find the radius (π ≈ 3.14)"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const r = new Q(R.int(2, lvl === "n" ? 20 : 40), lvl === "n" ? 1 : 2);
        if (i === 0) {
          const C = PI.mul(r).mul(2);
          items.push(
            numAns(r, {
              unit: cm(),
              q: t3(
                `Длина окружности ${qh(C)} см. Найди радиус.`,
                `Ringjoone pikkus on ${qh(C)} cm. Leia raadius.`,
                `The circumference is ${qh(C)} cm. Find the radius.`,
              ),
              pre: "r =",
              exp: P(
                `r = C : (2π) = ${qh(C)} : ${curLang() === "en" ? "6.28" : "6,28"} = ${qh(r)} ${cm()}`,
              ),
            }),
          );
        } else {
          const ring = r.add(R.int(1, 4));
          const S = PI.mul(ring.mul(ring).sub(r.mul(r)));
          const Sr = new Q(Math.round(S.v() * 100), 100);
          items.push(
            numAns(Sr, {
              tol: 0.06,
              unit: cm() + "²",
              q: t3(
                `Радиусы двух окружностей с общим центром ${qh(ring)} см и ${qh(r)} см. Найди площадь кольца между ними.`,
                `Kahe samakeskse ringjoone raadiused on ${qh(ring)} cm ja ${qh(r)} cm. Leia nendevahelise rõnga pindala.`,
                `Two circles with a common centre have radii ${qh(ring)} cm and ${qh(r)} cm. Find the area of the ring between them.`,
              ),
              pre: "S =",
              exp: P(
                `S = π(R² ${MINUS} r²) = ${piTxt()} · (${qh(ring.mul(ring))} ${MINUS} ${qh(r.mul(r))}) ≈ ${qh(Sr)} ${cm()}²`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },
};
