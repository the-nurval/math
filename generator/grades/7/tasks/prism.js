// 7 класс, тема «Прямая призма»: шаблоны заданий.
import { P, Q, numAns, qh, tr } from "../../../core/index.js";

/* --- 21. Прямая призма --- */
function svgBox(la, lb, lc) {
  return `<svg class="sk" viewBox="0 0 220 130" role="img"><g fill="none" stroke="currentColor" stroke-width="2"><rect x="20" y="45" width="130" height="70"/><polyline points="20,45 60,15 190,15 150,45"/><polyline points="190,15 190,85 150,115"/></g><line x1="20" y1="115" x2="60" y2="85" stroke="currentColor" stroke-dasharray="4 3"/><line x1="60" y1="85" x2="190" y2="85" stroke="currentColor" stroke-dasharray="4 3"/><line x1="60" y1="15" x2="60" y2="85" stroke="currentColor" stroke-dasharray="4 3"/><text x="70" y="128" font-size="12" fill="currentColor">${la}</text><text x="160" y="110" font-size="12" fill="currentColor">${lb}</text><text x="2" y="85" font-size="12" fill="currentColor">${lc}</text></svg>`;
}

function svgTriPrism(lh) {
  return `<svg class="sk" viewBox="0 0 220 130" role="img"><g fill="none" stroke="currentColor" stroke-width="2"><polygon points="20,110 120,110 60,80"/><polygon points="20,40 120,40 60,10"/><line x1="20" y1="110" x2="20" y2="40"/><line x1="120" y1="110" x2="120" y2="40"/></g><line x1="60" y1="80" x2="60" y2="10" stroke="currentColor" stroke-dasharray="4 3"/><text x="126" y="80" font-size="12" fill="currentColor">${lh}</text></svg>`;
}

export default {
  prism: {
    topic: "prism",
    pts: 3,
    cnt: { n: 2, a: 3 },
    title: { ru: "Прямая призма", et: "Püstprisma", en: "Right prism" },
    gen(R, lvl, cnt) {
      const items = [];
      const cm = tr({ ru: "см", et: "cm", en: "cm" });
      const a = new Q(R.int(30, 120), 10),
        b = new Q(R.int(20, 90), 10),
        c = new Q(R.int(25, 80), 10);
      const intro =
        svgBox(`a = ${qh(a)}`, `b = ${qh(b)}`, `c = ${qh(c)}`) +
        tr({
          ru: `Прямоугольный параллелепипед имеет измерения ${qh(a)} см, ${qh(b)} см и ${qh(c)} см.`,
          et: `Risttahuka mõõtmed on ${qh(a)} cm, ${qh(b)} cm ja ${qh(c)} cm.`,
          en: `A cuboid measures ${qh(a)} cm × ${qh(b)} cm × ${qh(c)} cm.`,
        });
      const Vv = a.mul(b).mul(c),
        S = a.mul(b).add(a.mul(c)).add(b.mul(c)).mul(2);
      items.push(
        numAns(Vv, {
          unit: cm + "³",
          q: tr({ ru: "Найди объём.", et: "Leia ruumala.", en: "Find the volume." }),
          pre: "V =",
          exp: P(`V = ${qh(a)} · ${qh(b)} · ${qh(c)} = ${qh(Vv)} ${cm}³`),
        }),
      );
      if (cnt > 1)
        items.push(
          numAns(S, {
            unit: cm + "²",
            q: tr({
              ru: "Найди площадь полной поверхности.",
              et: "Leia täispindala.",
              en: "Find the total surface area.",
            }),
            pre: "S =",
            exp: P(
              `S = 2(ab + ac + bc) = 2(${qh(a.mul(b))} + ${qh(a.mul(c))} + ${qh(b.mul(c))}) = ${qh(S)} ${cm}²`,
            ),
          }),
        );
      if (cnt > 2) {
        const tri = R.pick([
          [5, 6, 7, new Q(147, 10)],
          [6, 8, 10, new Q(24)],
          [5, 5, 6, new Q(12)],
          [9, 10, 17, new Q(36)],
        ]);
        const H = new Q(R.int(40, 120), 10);
        const Vt = tri[3].mul(H);
        items.push(
          numAns(Vt, {
            unit: cm + "³",
            q:
              svgTriPrism(`H = ${qh(H)}`) +
              tr({
                ru: `Основание прямой призмы — треугольник со сторонами ${tri[0]}, ${tri[1]} и ${tri[2]} см и площадью ${qh(tri[3])} см². Высота призмы ${qh(H)} см. Найди объём.`,
                et: `Püstprisma põhi on kolmnurk külgedega ${tri[0]}, ${tri[1]} ja ${tri[2]} cm ning pindalaga ${qh(tri[3])} cm². Prisma kõrgus on ${qh(H)} cm. Leia ruumala.`,
                en: `A right prism has a triangular base with sides ${tri[0]}, ${tri[1]}, ${tri[2]} cm and area ${qh(tri[3])} cm². Its height is ${qh(H)} cm. Find the volume.`,
              }),
            pre: "V =",
            exp: P(
              `V = S<sub>${tr({ ru: "осн", et: "p", en: "base" })}</sub> · H = ${qh(tri[3])} · ${qh(H)} = ${qh(Vt)} ${cm}³`,
            ),
          }),
        );
      }
      return { intro, items };
    },
  },
};
