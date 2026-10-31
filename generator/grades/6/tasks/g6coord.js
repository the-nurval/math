// 6 класс, тема «Координатная плоскость и графики»: шаблоны заданий.
import { MINUS, O, P, numAns, t3 } from "../../../core/index.js";

export default {
  /* ===== Координатная плоскость и графики ===== */
  coordPts: {
    topic: "g6coord",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O("Координатная плоскость", "Koordinaattasand", "Coordinate plane"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const x1 = R.nz(-9, 5),
          x2 = R.int(x1 + 2, 10),
          y1 = R.nz(-8, 4),
          y2 = R.int(y1 + 2, 9);
        if (i % 3 === 0)
          items.push(
            numAns(x2 - x1, {
              q: t3(
                `Длина отрезка AB, если A(${x1}; ${y1}), B(${x2}; ${y1})`,
                `Lõigu AB pikkus, kui A(${x1}; ${y1}), B(${x2}; ${y1})`,
                `Length of AB if A(${x1}; ${y1}), B(${x2}; ${y1})`,
              ),
              exp: P(
                t3(
                  `Ординаты равны, отрезок параллелен оси x: ${x2} ${MINUS} (${x1}) = ${x2 - x1}.`,
                  `Ordinaadid on võrdsed, lõik on x-teljega paralleelne: ${x2} ${MINUS} (${x1}) = ${x2 - x1}.`,
                  `Same y, so AB is parallel to the x-axis: ${x2} ${MINUS} (${x1}) = ${x2 - x1}.`,
                ),
              ),
            }),
          );
        else if (i % 3 === 1)
          items.push(
            numAns((x2 - x1) * (y2 - y1), {
              q: t3(
                `Площадь прямоугольника с противоположными вершинами A(${x1}; ${y1}) и C(${x2}; ${y2}) (стороны параллельны осям)`,
                `Ristküliku pindala, mille vastastipud on A(${x1}; ${y1}) ja C(${x2}; ${y2}) (küljed on telgedega paralleelsed)`,
                `Area of the rectangle with opposite corners A(${x1}; ${y1}) and C(${x2}; ${y2}) (sides parallel to the axes)`,
              ),
              exp: P(`${x2 - x1} · ${y2 - y1} = ${(x2 - x1) * (y2 - y1)}`),
            }),
          );
        else
          items.push(
            numAns(2 * (x2 - x1 + (y2 - y1)), {
              q: t3(
                `Периметр прямоугольника с противоположными вершинами A(${x1}; ${y1}) и C(${x2}; ${y2})`,
                `Ristküliku ümbermõõt, mille vastastipud on A(${x1}; ${y1}) ja C(${x2}; ${y2})`,
                `Perimeter of the rectangle with opposite corners A(${x1}; ${y1}) and C(${x2}; ${y2})`,
              ),
              exp: P(`2 · (${x2 - x1} + ${y2 - y1}) = ${2 * (x2 - x1 + (y2 - y1))}`),
            }),
          );
      }
      return { items };
    },
  },

  graphRead: {
    topic: "g6coord",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O("График движения", "Liikumise graafik", "Motion graph"),
    gen(R, lvl, cnt) {
      const v1 = R.pick([10, 15, 20]),
        t1 = R.int(1, 3),
        stop = R.int(1, 2),
        v2 = R.pick([5, 10, 15]),
        t2 = R.int(1, 2);
      const s1 = v1 * t1,
        s2 = s1 + v2 * t2;
      const T = t1 + stop + t2;
      const S = Math.ceil((s2 + 1) / 10) * 10;
      const pts = [
        [0, 0],
        [t1, s1],
        [t1 + stop, s1],
        [T, s2],
      ];
      const intro =
        t3(
          "Велосипедист выехал из дома. На графике — расстояние от дома в зависимости от времени.",
          "Jalgrattur sõitis kodust välja. Graafikul on kaugus kodust sõltuvalt ajast.",
          "A cyclist left home. The graph shows the distance from home over time.",
        ) + svgMotion(pts, T, S);
      const items = [
        numAns(s1, {
          unit: t3("км", "km", "km"),
          q: t3(
            `Какое расстояние он проехал за первые ${t1} ч?`,
            `Kui pika maa läbis ta esimese ${t1} tunniga?`,
            `How far did he ride in the first ${t1} h?`,
          ),
          exp: P(
            t3(
              `По графику: при t = ${t1} ч расстояние ${s1} км.`,
              `Graafikult: t = ${t1} h korral on kaugus ${s1} km.`,
              `From the graph: at t = ${t1} h the distance is ${s1} km.`,
            ),
          ),
        }),
        numAns(stop, {
          unit: t3("ч", "h", "h"),
          q: t3("Сколько длилась остановка?", "Kui kaua kestis peatus?", "How long was the stop?"),
          exp: P(
            t3(
              "Остановка — горизонтальный участок графика: расстояние не меняется.",
              "Peatus on graafiku horisontaalne lõik: kaugus ei muutu.",
              "The stop is the flat part: distance doesn't change.",
            ),
          ),
        }),
        numAns(lvl === "n" ? v1 : v2, {
          unit: t3("км/ч", "km/h", "km/h"),
          q:
            lvl === "n"
              ? t3(
                  "С какой скоростью он ехал до остановки?",
                  "Millise kiirusega sõitis ta enne peatust?",
                  "How fast did he ride before the stop?",
                )
              : t3(
                  "С какой скоростью он ехал после остановки?",
                  "Millise kiirusega sõitis ta pärast peatust?",
                  "How fast did he ride after the stop?",
                ),
          exp: P(
            lvl === "n"
              ? `v = ${s1} : ${t1} = ${v1}`
              : `v = (${s2} ${MINUS} ${s1}) : ${t2} = ${v2}`,
          ),
        }),
      ];
      return { intro, items: items.slice(0, cnt) };
    },
  },
};

function svgMotion(pts, T, S) {
  // pts: [[t,s],...] часы, км
  const W = 320,
    H = 200,
    l = 40,
    b = 30,
    r = 12,
    tp = 26;
  const X = t => l + ((W - l - r) * t) / T,
    Y = s => H - b - ((H - b - tp) * s) / S;
  let g = `<svg class="sk graph" viewBox="0 0 ${W} ${H}" role="img"><g stroke="currentColor" stroke-opacity=".15">`;
  for (let t = 0; t <= T; t++) g += `<line x1="${X(t)}" y1="${tp}" x2="${X(t)}" y2="${H - b}"/>`;
  for (let s = 0; s <= S; s += 5) g += `<line x1="${l}" y1="${Y(s)}" x2="${W - r}" y2="${Y(s)}"/>`;
  g += `</g><g font-size="11" fill="currentColor">`;
  for (let t = 0; t <= T; t++)
    g += `<text x="${X(t)}" y="${H - b + 16}" text-anchor="middle">${t}</text>`;
  const st = S > 50 ? 10 : 5;
  for (let s = 0; s <= S; s += st)
    g += `<text x="${l - 6}" y="${Y(s) + 4}" text-anchor="end">${s}</text>`;
  g += `<text x="${W - r}" y="${H - 4}" text-anchor="end">t, ${t3("ч", "h", "h")}</text><text x="4" y="12">s, ${t3("км", "km", "km")}</text></g>`;
  g += `<polyline points="${pts.map(p => X(p[0]) + "," + Y(p[1])).join(" ")}" fill="none" stroke="#3b6fe0" stroke-width="3" stroke-linejoin="round"/></svg>`;
  return g;
}
