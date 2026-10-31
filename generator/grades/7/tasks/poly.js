// 7 класс, тема «Многоугольники, параллелограмм, ромб»: шаблоны заданий.
import { MINUS, P, Q, ansHtml, numAns, qh, tr } from "../../../core/index.js";

export default {
  /* --- 19. Многоугольники: углы --- */
  polyAngles: {
    topic: "poly",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: { ru: "Углы многоугольников", et: "Hulknurkade nurgad", en: "Angles of polygons" },
    gen(R, lvl, cnt) {
      const items = [];
      const kinds = R.shuffle(
        lvl === "n" ? ["sum", "reg", "para"] : ["reg", "nfrom", "para", "sum"],
      );
      for (let i = 0; i < cnt; i++) {
        const k = kinds[i % kinds.length];
        if (k === "sum") {
          const n = R.int(5, 14);
          const s = 180 * (n - 2);
          items.push(
            numAns(new Q(s), {
              unit: "°",
              q: tr({
                ru: `Найди сумму внутренних углов выпуклого ${n}-угольника.`,
                et: `Leia kumera ${n}-nurga sisenurkade summa.`,
                en: `Find the sum of the interior angles of a convex ${n}-gon.`,
              }),
              exp: P(`180° · (${n} ${MINUS} 2) = ${s}°`),
            }),
          );
        } else if (k === "reg") {
          const n = R.pick([5, 6, 8, 9, 10, 12, 15, 18, 20, 24]);
          const a = new Q(180 * (n - 2), n);
          items.push(
            numAns(a, {
              unit: "°",
              q: tr({
                ru: `Найди внутренний угол правильного ${n}-угольника.`,
                et: `Leia korrapärase ${n}-nurga sisenurk.`,
                en: `Find an interior angle of a regular ${n}-gon.`,
              }),
              exp: P(`180° · (${n} ${MINUS} 2) : ${n} = ${qh(a)}°`),
              alt: P(
                tr({
                  ru: `Другой способ: внешний угол 360° : ${n} = ${qh(new Q(360, n))}°, внутренний 180° ${MINUS} ${qh(new Q(360, n))}° = ${qh(a)}°.`,
                  et: `Teine võimalus: välisnurk 360° : ${n} = ${qh(new Q(360, n))}°, sisenurk 180° ${MINUS} ${qh(new Q(360, n))}° = ${qh(a)}°.`,
                  en: `Another way: exterior angle 360° ÷ ${n} = ${qh(new Q(360, n))}°, interior 180° ${MINUS} ${qh(new Q(360, n))}° = ${qh(a)}°.`,
                }),
              ),
            }),
          );
        } else if (k === "nfrom") {
          const n = R.pick([8, 9, 10, 12, 15, 18, 20, 30, 36]);
          const a = new Q(180 * (n - 2), n);
          items.push(
            numAns(new Q(n), {
              q: tr({
                ru: `Внутренний угол правильного многоугольника равен ${qh(a)}°. Сколько у него сторон?`,
                et: `Korrapärase hulknurga sisenurk on ${qh(a)}°. Mitu külge sellel on?`,
                en: `An interior angle of a regular polygon is ${qh(a)}°. How many sides does it have?`,
              }),
              pre: "n =",
              exp: P(
                `${tr({ ru: "Внешний угол", et: "Välisnurk", en: "Exterior angle" })} 180° ${MINUS} ${qh(a)}° = ${qh(new Q(180).sub(a))}°; n = 360 : ${qh(new Q(180).sub(a))} = ${n}`,
              ),
            }),
          );
        } else {
          const a = new Q(R.int(350, 890), 10);
          const b = new Q(180).sub(a);
          items.push(
            numAns(b, {
              unit: "°",
              q: tr({
                ru: `Один угол параллелограмма равен ${qh(a)}°. Найди соседний с ним угол.`,
                et: `Rööpküliku üks nurk on ${qh(a)}°. Leia selle naabernurk.`,
                en: `One angle of a parallelogram is ${qh(a)}°. Find the adjacent angle.`,
              }),
              exp: P(
                tr({
                  ru: "Соседние углы параллелограмма в сумме дают 180°:",
                  et: "Rööpküliku naabernurkade summa on 180°:",
                  en: "Adjacent angles of a parallelogram add up to 180°:",
                }) + ` 180° ${MINUS} ${qh(a)}° = ${qh(b)}°`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },

  quadArea: {
    topic: "poly",
    pts: 3,
    cnt: { n: 2, a: 2 },
    title: { ru: "Площадь", et: "Pindala", en: "Area" },
    gen(R, lvl, cnt) {
      const items = [];
      const kinds = R.shuffle(lvl === "n" ? ["para", "rhomb"] : ["height2", "rhomb", "para"]);
      const cm = tr({ ru: "см", et: "cm", en: "cm" });
      for (let i = 0; i < cnt; i++) {
        const k = kinds[i % kinds.length];
        if (k === "para") {
          const a = new Q(R.int(35, 145), 10),
            h = new Q(R.int(18, 95), 10);
          const S = a.mul(h);
          items.push(
            numAns(S, {
              unit: cm + "²",
              q:
                svgPara(a, h, `a = ${qh(a)} ${cm}`, `h = ${qh(h)}`) +
                tr({
                  ru: `Найди площадь параллелограмма со стороной ${qh(a)} см и высотой ${qh(h)} см, проведённой к ней.`,
                  et: `Leia rööpküliku pindala, kui külg on ${qh(a)} cm ja sellele tõmmatud kõrgus ${qh(h)} cm.`,
                  en: `Find the area of a parallelogram with side ${qh(a)} cm and height ${qh(h)} cm to that side.`,
                }),
              exp: P(`S = a · h = ${qh(a)} · ${qh(h)} = ${qh(S)} ${cm}²`),
            }),
          );
        } else if (k === "rhomb") {
          const d1 = new Q(R.int(30, 140), 10),
            d2 = new Q(R.int(20, 90), 10);
          const S = d1.mul(d2).div(2);
          items.push(
            numAns(S, {
              unit: cm + "²",
              q:
                svgRhomb(`d₁ = ${qh(d1)}`, `d₂ = ${qh(d2)}`) +
                tr({
                  ru: `Диагонали ромба ${qh(d1)} см и ${qh(d2)} см. Найди его площадь.`,
                  et: `Rombi diagonaalid on ${qh(d1)} cm ja ${qh(d2)} cm. Leia selle pindala.`,
                  en: `The diagonals of a rhombus are ${qh(d1)} cm and ${qh(d2)} cm. Find its area.`,
                }),
              exp: P(`S = d₁ · d₂ : 2 = ${qh(d1)} · ${qh(d2)} : 2 = ${qh(S)} ${cm}²`),
            }),
          );
        } else {
          const a = new Q(R.int(8, 16)),
            b = new Q(R.int(5, 7)),
            ha = new Q(R.int(30, 48), 10);
          const S = a.mul(ha);
          const hb = S.div(b);
          items.push(
            numAns(hb, {
              unit: cm,
              q:
                svgPara(a, ha, `a = ${qh(a)}`, `h = ${qh(ha)}`) +
                tr({
                  ru: `Стороны параллелограмма ${qh(a)} см и ${qh(b)} см, высота к большей стороне ${qh(ha)} см. Найди высоту к меньшей стороне.`,
                  et: `Rööpküliku küljed on ${qh(a)} cm ja ${qh(b)} cm, pikemale küljele tõmmatud kõrgus on ${qh(ha)} cm. Leia lühemale küljele tõmmatud kõrgus.`,
                  en: `A parallelogram has sides ${qh(a)} cm and ${qh(b)} cm; the height to the longer side is ${qh(ha)} cm. Find the height to the shorter side.`,
                }),
              exp: P(
                `S = ${qh(a)} · ${qh(ha)} = ${qh(S)}; h = ${qh(S)} : ${qh(b)} = ${ansHtml(hb)} ${cm}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },
};

/* --- 20. Площади параллелограмма и ромба (с эскизом) --- */
function svgPara(a, h, la, lh) {
  return `<svg class="sk" viewBox="0 0 220 110" role="img"><polygon points="20,90 160,90 200,25 60,25" fill="none" stroke="currentColor" stroke-width="2"/><line x1="60" y1="25" x2="60" y2="90" stroke="currentColor" stroke-dasharray="4 3"/><text x="90" y="106" font-size="12" fill="currentColor">${la}</text><text x="64" y="62" font-size="12" fill="currentColor">${lh}</text></svg>`;
}

function svgRhomb(l1, l2) {
  return `<svg class="sk" viewBox="0 0 220 120" role="img"><polygon points="110,10 190,60 110,110 30,60" fill="none" stroke="currentColor" stroke-width="2"/><line x1="30" y1="60" x2="190" y2="60" stroke="currentColor" stroke-dasharray="4 3"/><line x1="110" y1="10" x2="110" y2="110" stroke="currentColor" stroke-dasharray="4 3"/><text x="140" y="55" font-size="12" fill="currentColor">${l1}</text><text x="114" y="90" font-size="12" fill="currentColor">${l2}</text></svg>`;
}
