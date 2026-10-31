// 8 класс, тема «Окружность: касательная, центральный и вписанный углы»: шаблоны заданий.
import { FR, MINUS, O, P, ansHtml, cm, numAns, q, qh, t3 } from "../../../core/index.js";
import { TRIP, deg, sqrtAns, sqrtShow } from "../helpers.js";
import { D_, G_, T_, sk } from "../sketches.js";

// окружность: центральный угол AOB и вписанный ACB
function svgCirc(lc, li) {
  return sk(
    130,
    `<circle cx="110" cy="66" r="54" fill="none" stroke="currentColor" stroke-width="2"/>` +
      G_(
        `<polyline points="64,94 110,66 156,94" stroke-width="1.5"/><polyline points="64,94 110,12 156,94" stroke-width="1.5"/>`,
      ) +
      `<circle cx="110" cy="66" r="2.5" fill="currentColor"/>` +
      T_(114, 82, "O") +
      T_(52, 104, "A") +
      T_(160, 104, "B") +
      T_(106, 9, "C") +
      T_(110, 62, lc, "middle") +
      T_(110, 40, li, "middle"),
  );
}

// касательные из точки P
function svgTan() {
  return sk(
    120,
    `<circle cx="70" cy="60" r="42" fill="none" stroke="currentColor" stroke-width="2"/>` +
      G_(`<polyline points="82,19.8 200,60 82,100.2" stroke-width="1.5"/>`) +
      D_(70, 60, 82, 19.8) +
      D_(70, 60, 82, 100.2) +
      `<circle cx="70" cy="60" r="2.5" fill="currentColor"/>` +
      T_(56, 64, "O") +
      T_(80, 14, "A") +
      T_(80, 116, "B") +
      T_(204, 64, "P"),
  );
}

export default {
  /* --- Окружность --- */
  circAng: {
    topic: "g8circ",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O("Углы в окружности", "Nurgad ringjoonel", "Angles in a circle"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["insc", "cent", "diam"] : ["arcs", "chord", "tanch"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        if (k === "insc") {
          const t = R.int(40, 170);
          items.push(
            numAns(q(t).div(2), {
              unit: "°",
              q:
                svgCirc("", "") +
                t3(
                  `Центральный угол AOB равен ${t}°. Найди вписанный угол ACB, опирающийся на ту же дугу.`,
                  `Kesknurk AOB on ${t}°. Leia sama kaarele toetuv piirdenurk ACB.`,
                  `Central angle AOB is ${t}°. Find the inscribed angle ACB on the same arc.`,
                ),
              exp: P(
                t3(
                  "Вписанный угол равен половине центрального:",
                  "Piirdenurk on pool kesknurgast:",
                  "An inscribed angle is half the central angle:",
                ) + ` ${t}° : 2 = ${deg(q(t).div(2))}`,
              ),
            }),
          );
        } else if (k === "cent") {
          const f = R.int(18, 85);
          items.push(
            numAns(2 * f, {
              unit: "°",
              q:
                svgCirc("", "") +
                t3(
                  `Вписанный угол ACB равен ${f}°. Найди центральный угол AOB.`,
                  `Piirdenurk ACB on ${f}°. Leia kesknurk AOB.`,
                  `Inscribed angle ACB is ${f}°. Find central angle AOB.`,
                ),
              exp: P(`2 · ${f}° = ${2 * f}°`),
            }),
          );
        } else if (k === "diam") {
          const a = R.int(15, 75);
          items.push(
            numAns(90 - a, {
              unit: "°",
              q: t3(
                `AB — диаметр окружности, C — точка на окружности, ∠CAB = ${a}°. Найди ∠CBA.`,
                `AB on ringjoone diameeter, C on punkt ringjoonel, ∠CAB = ${a}°. Leia ∠CBA.`,
                `AB is a diameter and C is on the circle, ∠CAB = ${a}°. Find ∠CBA.`,
              ),
              exp:
                P(
                  t3(
                    "Угол, опирающийся на диаметр, прямой: ∠C = 90°.",
                    "Diameetrile toetuv piirdenurk on täisnurk: ∠C = 90°.",
                    "An angle on a diameter is a right angle: ∠C = 90°.",
                  ),
                ) + P(`90° ${MINUS} ${a}° = ${90 - a}°`),
            }),
          );
        } else if (k === "arcs") {
          let r;
          do {
            r = [R.int(1, 5), R.int(2, 7), R.int(3, 9)];
          } while (new Set(r).size < 3);
          const s = r[0] + r[1] + r[2],
            mx = Math.max(...r);
          const v = q(180 * mx).div(s);
          items.push(
            numAns(v, {
              unit: "°",
              q: t3(
                `Вершины треугольника делят описанную окружность на дуги в отношении ${r.join(" : ")}. Найди наибольший угол треугольника.`,
                `Kolmnurga tipud jaotavad ümberringjoone kaarteks suhtes ${r.join(" : ")}. Leia kolmnurga suurim nurk.`,
                `The vertices of a triangle divide its circumcircle into arcs in the ratio ${r.join(" : ")}. Find the largest angle.`,
              ),
              exp:
                P(
                  t3("Наибольшая дуга:", "Suurim kaar:", "The largest arc:") +
                    ` 360° · ${FR(mx, s)} = ${ansHtml(q(360 * mx).div(s))}°`,
                ) +
                P(
                  t3(
                    "Угол равен половине дуги:",
                    "Nurk on pool kaarest:",
                    "The angle is half the arc:",
                  ) + ` ${ansHtml(v)}°`,
                ),
            }),
          );
        } else if (k === "chord") {
          const r = R.int(5, 15),
            dd = R.int(2, r - 1);
          const half2 = q(r * r - dd * dd);
          items.push(
            sqrtAns(half2.mul(4), {
              unit: cm(),
              q: t3(
                `Радиус окружности ${r} см, хорда удалена от центра на ${dd} см. Найди длину хорды.`,
                `Ringjoone raadius on ${r} cm, kõõl on keskpunktist ${dd} cm kaugusel. Leia kõõlu pikkus.`,
                `A circle has radius ${r} cm; a chord is ${dd} cm from the centre. Find the chord.`,
              ),
              exp: P(
                t3(
                  "Перпендикуляр из центра делит хорду пополам:",
                  "Keskpunktist tõmmatud ristlõik poolitab kõõlu:",
                  "The perpendicular from the centre bisects the chord:",
                ) + ` 2√(${r}² ${MINUS} ${dd}²) = 2√${r * r - dd * dd} = ${sqrtShow(half2.mul(4))}`,
              ),
            }),
          );
        } else {
          const t = R.int(40, 170);
          items.push(
            numAns(q(t).div(2), {
              unit: "°",
              q: t3(
                `Хорда AB стягивает дугу ${t}°. Найди угол между хордой AB и касательной в точке A.`,
                `Kõõl AB vastab kaarele ${t}°. Leia nurk kõõlu AB ja punktis A tõmmatud puutuja vahel.`,
                `Chord AB subtends an arc of ${t}°. Find the angle between AB and the tangent at A.`,
              ),
              exp: P(
                t3(
                  "Угол между касательной и хордой равен половине дуги:",
                  "Puutuja ja kõõlu vaheline nurk on pool kaarest:",
                  "The tangent–chord angle is half the arc:",
                ) + ` ${deg(q(t).div(2))}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },

  tangent: {
    topic: "g8circ",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O("Касательные к окружности", "Ringjoone puutujad", "Tangents to a circle"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["len", "ang"] : ["len", "quad", "perim"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % ks.length];
        if (k === "len") {
          let r, d;
          if (R.chance(0.5)) {
            const t = R.pick(TRIP);
            r = t[0];
            d = t[2];
          } else {
            r = R.int(3, 10);
            d = r + R.int(2, 9);
          }
          const l2 = q(d * d - r * r);
          items.push(
            sqrtAns(l2, {
              unit: cm(),
              q:
                (i === 0 ? svgTan() : "") +
                t3(
                  `PA — касательная, A — точка касания, радиус ${r} см, PO = ${d} см. Найди PA.`,
                  `PA on puutuja, A on puutepunkt, raadius on ${r} cm ja PO = ${d} cm. Leia PA.`,
                  `PA is a tangent at A, the radius is ${r} cm and PO = ${d} cm. Find PA.`,
                ),
              exp: P(
                t3(
                  "Радиус, проведённый в точку касания, перпендикулярен касательной:",
                  "Puutepunkti tõmmatud raadius on puutujaga risti:",
                  "The radius to the point of contact is perpendicular to the tangent:",
                ) + ` PA = √(${d}² ${MINUS} ${r}²) = ${sqrtShow(l2)}`,
              ),
            }),
          );
        } else if (k === "ang") {
          const f = R.int(30, 140);
          items.push(
            numAns(180 - f, {
              unit: "°",
              q:
                (i === 0 ? svgTan() : "") +
                t3(
                  `PA и PB — касательные, ∠APB = ${f}°. Найди ∠AOB.`,
                  `PA ja PB on puutujad, ∠APB = ${f}°. Leia ∠AOB.`,
                  `PA and PB are tangents, ∠APB = ${f}°. Find ∠AOB.`,
                ),
              exp: P(
                t3(
                  "В четырёхугольнике PAOB углы A и B прямые:",
                  "Nelinurgas PAOB on nurgad A ja B täisnurgad:",
                  "In PAOB the angles at A and B are right angles:",
                ) + ` 360° ${MINUS} 90° ${MINUS} 90° ${MINUS} ${f}° = ${180 - f}°`,
              ),
            }),
          );
        } else if (k === "quad") {
          const a = q(R.int(40, 130)).div(10),
            b = q(R.int(30, 90)).div(10),
            c = q(R.int(50, 120)).div(10);
          const dd = a.add(c).sub(b);
          items.push(
            numAns(dd, {
              unit: cm(),
              q: t3(
                `В четырёхугольник ABCD вписана окружность, AB = ${qh(a)} см, BC = ${qh(b)} см, CD = ${qh(c)} см. Найди AD.`,
                `Nelinurka ABCD on joonestatud siseringjoon, AB = ${qh(a)} cm, BC = ${qh(b)} cm, CD = ${qh(c)} cm. Leia AD.`,
                `A circle is inscribed in ABCD, AB = ${qh(a)} cm, BC = ${qh(b)} cm, CD = ${qh(c)} cm. Find AD.`,
              ),
              exp: P(
                t3(
                  "Суммы противоположных сторон равны:",
                  "Vastaskülgede summad on võrdsed:",
                  "Opposite sides have equal sums:",
                ) + ` AD = ${qh(a)} + ${qh(c)} ${MINUS} ${qh(b)} = ${qh(dd)}`,
              ),
            }),
          );
        } else {
          const t = q(R.int(25, 140)).div(10);
          items.push(
            numAns(t.mul(2), {
              unit: cm(),
              q: t3(
                `Из точки P проведены касательные PA и PB, PA = ${qh(t)} см. Касательная к меньшей дуге AB пересекает PA и PB в точках M и N. Найди периметр треугольника PMN.`,
                `Punktist P on tõmmatud puutujad PA ja PB, PA = ${qh(t)} cm. Väiksema kaare AB puutuja lõikab PA ja PB punktides M ja N. Leia kolmnurga PMN ümbermõõt.`,
                `Tangents PA and PB are drawn from P, PA = ${qh(t)} cm. A tangent to the minor arc AB meets PA and PB at M and N. Find the perimeter of PMN.`,
              ),
              exp:
                P(
                  t3(
                    "Отрезки касательных из одной точки равны: MK = MA, NK = NB.",
                    "Ühest punktist tõmmatud puutujalõigud on võrdsed: MK = MA, NK = NB.",
                    "Tangent segments from one point are equal: MK = MA, NK = NB.",
                  ),
                ) + P(`P = PA + PB = 2 · ${qh(t)} = ${qh(t.mul(2))}`),
            }),
          );
        }
      }
      return { items };
    },
  },
};
