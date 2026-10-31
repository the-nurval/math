// 8 класс, тема «Площади многоугольников»: шаблоны заданий.
import { FR, MINUS, O, P, ansHtml, cm, numAns, q, qh, t3 } from "../../../core/index.js";
import { TRIP, cm2 } from "../helpers.js";
import { D_, G_, T_, sk, svgRT, svgRhomb, svgTrap } from "../sketches.js";

function svgPara(la, lh) {
  return sk(
    110,
    `<polygon points="20,90 160,90 200,25 60,25" fill="none" stroke="currentColor" stroke-width="2"/>` +
      D_(60, 25, 60, 90) +
      T_(90, 106, la) +
      T_(64, 62, lh),
  );
}

function svgTri(la, lh) {
  return sk(
    120,
    G_(`<polygon points="20,100 200,100 70,20"/>`) +
      D_(70, 20, 70, 100) +
      T_(110, 116, la, "middle") +
      T_(74, 66, lh),
  );
}

export default {
  areaA: {
    topic: "g8area",
    pts: 2,
    cnt: { n: 4, a: 4 },
    title: O("Найди площадь", "Leia pindala", "Find the area"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks =
        lvl === "n"
          ? R.shuffle(["para", "tri", "trap", "rhomb"])
          : R.shuffle(["triRt", "trapIso", "para30", "rhombS"]);
      const d = () => q(R.int(25, 140)).div(10);
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 4];
        if (k === "para") {
          const a = d(),
            h = d();
          items.push(
            numAns(a.mul(h), {
              unit: cm2(),
              q:
                svgPara("a = " + qh(a), "h = " + qh(h)) +
                t3(
                  `Сторона параллелограмма ${qh(a)} см, высота к ней ${qh(h)} см.`,
                  `Rööpküliku külg on ${qh(a)} cm, sellele tõmmatud kõrgus ${qh(h)} cm.`,
                  `A parallelogram has side ${qh(a)} cm and height ${qh(h)} cm.`,
                ),
              exp: P(`S = ah = ${qh(a)} · ${qh(h)} = ${qh(a.mul(h))}`),
            }),
          );
        } else if (k === "tri") {
          const a = d(),
            h = q(R.int(2, 15));
          items.push(
            numAns(a.mul(h).div(2), {
              unit: cm2(),
              q:
                svgTri("a = " + qh(a), "h = " + qh(h)) +
                t3(
                  `Сторона треугольника ${qh(a)} см, высота к ней ${qh(h)} см.`,
                  `Kolmnurga külg on ${qh(a)} cm, sellele tõmmatud kõrgus ${qh(h)} cm.`,
                  `A triangle has side ${qh(a)} cm and height ${qh(h)} cm.`,
                ),
              exp: P(
                `S = ${FR("ah", 2)} = ${FR(qh(a) + " · " + qh(h), 2)} = ${qh(a.mul(h).div(2))}`,
              ),
            }),
          );
        } else if (k === "trap") {
          const a = q(R.int(2, 12)),
            b = a.add(R.int(2, 9)),
            h = d();
          const s = a.add(b).mul(h).div(2);
          items.push(
            numAns(s, {
              unit: cm2(),
              q:
                svgTrap("b = " + qh(b), "a = " + qh(a), "h") +
                t3(
                  `Основания трапеции ${qh(a)} см и ${qh(b)} см, высота ${qh(h)} см.`,
                  `Trapetsi alused on ${qh(a)} cm ja ${qh(b)} cm, kõrgus ${qh(h)} cm.`,
                  `A trapezium has bases ${qh(a)} cm and ${qh(b)} cm and height ${qh(h)} cm.`,
                ),
              exp: P(`S = ${FR("a + b", 2)} · h = ${qh(a.add(b).div(2))} · ${qh(h)} = ${qh(s)}`),
            }),
          );
        } else if (k === "rhomb") {
          const d1 = d(),
            d2 = q(R.int(3, 16));
          items.push(
            numAns(d1.mul(d2).div(2), {
              unit: cm2(),
              q:
                svgRhomb("d₁", "d₂") +
                t3(
                  `Диагонали ромба ${qh(d1)} см и ${qh(d2)} см.`,
                  `Rombi diagonaalid on ${qh(d1)} cm ja ${qh(d2)} cm.`,
                  `The diagonals of a rhombus are ${qh(d1)} cm and ${qh(d2)} cm.`,
                ),
              exp: P(`S = ${FR("d₁d₂", 2)} = ${qh(d1.mul(d2).div(2))}`),
            }),
          );
        } else if (k === "triRt") {
          const t = R.pick(TRIP),
            m = R.pick([1, 0.5, 1.5, 2]);
          const a = q(t[0] * m),
            b = q(t[1] * m),
            c = q(t[2] * m);
          items.push(
            numAns(a.mul(b).div(2), {
              unit: cm2(),
              q:
                svgRT("a", "b", "c") +
                t3(
                  `Гипотенуза прямоугольного треугольника ${qh(c)} см, катет ${qh(a)} см.`,
                  `Täisnurkse kolmnurga hüpotenuus on ${qh(c)} cm, kaatet ${qh(a)} cm.`,
                  `A right triangle has hypotenuse ${qh(c)} cm and a leg of ${qh(a)} cm.`,
                ),
              exp:
                P(`b = √(${qh(c)}² ${MINUS} ${qh(a)}²) = ${qh(b)}`) +
                P(`S = ${FR("ab", 2)} = ${qh(a.mul(b).div(2))}`),
            }),
          );
        } else if (k === "trapIso") {
          const t = R.pick(TRIP);
          const x = q(t[0]),
            h = q(t[1]),
            c = q(t[2]);
          const a = q(R.int(3, 12)),
            b = a.add(x.mul(2));
          const s = a.add(b).mul(h).div(2);
          items.push(
            numAns(s, {
              unit: cm2(),
              q:
                svgTrap("b = " + qh(b), "a = " + qh(a), "h") +
                t3(
                  `Основания равнобедренной трапеции ${qh(a)} см и ${qh(b)} см, боковая сторона ${qh(c)} см.`,
                  `Võrdhaarse trapetsi alused on ${qh(a)} cm ja ${qh(b)} cm, haar ${qh(c)} cm.`,
                  `An isosceles trapezium has bases ${qh(a)} cm and ${qh(b)} cm and legs ${qh(c)} cm.`,
                ),
              exp:
                P(
                  `(${qh(b)} ${MINUS} ${qh(a)}) : 2 = ${qh(x)}; h = √(${qh(c)}² ${MINUS} ${qh(x)}²) = ${qh(h)}`,
                ) + P(`S = ${qh(a.add(b).div(2))} · ${qh(h)} = ${qh(s)}`),
            }),
          );
        } else if (k === "para30") {
          const a = d(),
            b = q(R.int(3, 14));
          items.push(
            numAns(a.mul(b).div(2), {
              unit: cm2(),
              q: t3(
                `Стороны параллелограмма ${qh(a)} см и ${qh(b)} см, острый угол 30°.`,
                `Rööpküliku küljed on ${qh(a)} cm ja ${qh(b)} cm, teravnurk on 30°.`,
                `A parallelogram has sides ${qh(a)} cm and ${qh(b)} cm and an acute angle of 30°.`,
              ),
              exp:
                P(
                  t3(
                    "Катет против угла 30° равен половине гипотенузы, поэтому высота",
                    "30° nurga vastas olev kaatet on pool hüpotenuusist, seega kõrgus on",
                    "The leg opposite 30° is half the hypotenuse, so the height is",
                  ) + ` h = ${qh(b)} : 2 = ${qh(b.div(2))}.`,
                ) + P(`S = ${qh(a)} · ${qh(b.div(2))} = ${qh(a.mul(b).div(2))}`),
            }),
          );
        } else {
          const t = R.pick(TRIP.slice(0, 4));
          const p = q(t[0]),
            qq = q(t[1]),
            s = q(t[2]);
          const S = p.mul(qq).mul(2);
          items.push(
            numAns(S, {
              unit: cm2(),
              q:
                svgRhomb("", "") +
                t3(
                  `Сторона ромба ${qh(s)} см, одна из диагоналей ${qh(p.mul(2))} см.`,
                  `Rombi külg on ${qh(s)} cm, üks diagonaal ${qh(p.mul(2))} cm.`,
                  `A rhombus has side ${qh(s)} cm and one diagonal ${qh(p.mul(2))} cm.`,
                ),
              exp:
                P(
                  t3(
                    "Половина второй диагонали:",
                    "Teise diagonaali pool:",
                    "Half of the other diagonal:",
                  ) + ` √(${qh(s)}² ${MINUS} ${qh(p)}²) = ${qh(qq)}; d₂ = ${qh(qq.mul(2))}`,
                ) + P(`S = ${FR(qh(p.mul(2)) + " · " + qh(qq.mul(2)), 2)} = ${qh(S)}`),
            }),
          );
        }
      }
      return { items };
    },
  },

  areaB: {
    topic: "g8area",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O(
      "Найди неизвестный элемент по площади",
      "Leia pindala järgi tundmatu",
      "Use the area to find the missing length",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const ks =
        lvl === "n" ? R.shuffle(["paraH", "triH"]) : R.shuffle(["trapB", "heights", "triH"]);
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % ks.length];
        if (k === "paraH") {
          const S = R.int(20, 150),
            a = R.int(4, 16);
          items.push(
            numAns(q(S).div(a), {
              unit: cm(),
              q: t3(
                `Площадь параллелограмма ${S} см², сторона ${a} см. Найди высоту, проведённую к этой стороне.`,
                `Rööpküliku pindala on ${S} cm², külg ${a} cm. Leia sellele küljele tõmmatud kõrgus.`,
                `A parallelogram has area ${S} cm² and side ${a} cm. Find the height to that side.`,
              ),
              exp: P(`h = S : a = ${S} : ${a} = ${ansHtml(q(S).div(a))}`),
            }),
          );
        } else if (k === "triH") {
          const S = q(R.int(30, 300)).div(2),
            a = R.int(4, 18);
          const h = S.mul(2).div(a);
          items.push(
            numAns(h, {
              unit: cm(),
              q: t3(
                `Площадь треугольника ${qh(S)} см², сторона ${a} см. Найди высоту, проведённую к этой стороне.`,
                `Kolmnurga pindala on ${qh(S)} cm², külg ${a} cm. Leia sellele küljele tõmmatud kõrgus.`,
                `A triangle has area ${qh(S)} cm² and side ${a} cm. Find the height to that side.`,
              ),
              exp: P(`h = 2S : a = ${qh(S.mul(2))} : ${a} = ${ansHtml(h)}`),
            }),
          );
        } else if (k === "trapB") {
          const a = R.int(3, 12),
            b = a + R.int(2, 10),
            h = R.int(3, 12);
          const S = q((a + b) * h).div(2);
          items.push(
            numAns(b, {
              unit: cm(),
              q: t3(
                `Площадь трапеции ${qh(S)} см², высота ${h} см, меньшее основание ${a} см. Найди большее основание.`,
                `Trapetsi pindala on ${qh(S)} cm², kõrgus ${h} cm, lühem alus ${a} cm. Leia pikem alus.`,
                `A trapezium has area ${qh(S)} cm², height ${h} cm and shorter base ${a} cm. Find the longer base.`,
              ),
              exp: P(
                `a + b = 2S : h = ${qh(S.mul(2).div(h))}; b = ${qh(S.mul(2).div(h))} ${MINUS} ${a} = ${b}`,
              ),
            }),
          );
        } else {
          const a = R.int(6, 20),
            b = R.int(4, a - 1),
            ha = R.int(3, 12);
          const hb = q(a * ha).div(b);
          items.push(
            numAns(hb, {
              unit: cm(),
              q: t3(
                `Стороны параллелограмма ${a} см и ${b} см, высота к большей стороне ${ha} см. Найди высоту к меньшей стороне.`,
                `Rööpküliku küljed on ${a} cm ja ${b} cm, pikemale küljele tõmmatud kõrgus ${ha} cm. Leia lühemale küljele tõmmatud kõrgus.`,
                `A parallelogram has sides ${a} cm and ${b} cm; the height to the longer side is ${ha} cm. Find the height to the shorter side.`,
              ),
              exp: P(`S = ${a} · ${ha} = ${a * ha}; h = ${a * ha} : ${b} = ${ansHtml(hb)}`),
            }),
          );
        }
      }
      return { items };
    },
  },
};
