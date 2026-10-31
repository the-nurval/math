// 6 класс, тема «Проценты, круговая диаграмма»: шаблоны заданий.
import { O, P, Q, numAns, q, qh, t3, tr } from "../../../core/index.js";

export default {
  /* ===== Проценты, круговая диаграмма ===== */
  pct6: {
    topic: "g6pct",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O("Проценты", "Protsendid", "Percentages"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = R.shuffle(["of", "by", "what"]);
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        const p =
          lvl === "n"
            ? R.pick([10, 20, 25, 50, 5, 15, 30, 75])
            : R.pick([12.5, 35, 45, 120, 8, 62.5, 150]);
        const pq = q(p);
        if (k === "of") {
          const a = new Q(R.int(2, 40) * (lvl === "n" ? 20 : 40));
          const r = a.mul(pq).div(100);
          items.push(
            numAns(r, {
              q: t3(
                `${qh(pq)}% от ${qh(a)}`,
                `${qh(pq)}% arvust ${qh(a)}`,
                `${qh(pq)}% of ${qh(a)}`,
              ),
              exp: P(`${qh(a)} · ${qh(pq.div(100))} = ${qh(r)}`),
            }),
          );
        } else if (k === "by") {
          const n = new Q(R.int(2, 30) * (lvl === "n" ? 20 : 40));
          const part = n.mul(pq).div(100);
          items.push(
            numAns(n, {
              q: t3(
                `${qh(pq)}% числа равны ${qh(part)}. Найди число.`,
                `${qh(pq)}% arvust on ${qh(part)}. Leia arv.`,
                `${qh(pq)}% of a number is ${qh(part)}. Find the number.`,
              ),
              exp: P(`${qh(part)} : ${qh(pq.div(100))} = ${qh(n)}`),
            }),
          );
        } else {
          const b = new Q(R.int(2, 25) * 20);
          const a = b.mul(pq).div(100);
          items.push(
            numAns(pq, {
              unit: "%",
              q: t3(
                `Сколько процентов составляет ${qh(a)} от ${qh(b)}?`,
                `Mitu protsenti moodustab ${qh(a)} arvust ${qh(b)}?`,
                `What percentage of ${qh(b)} is ${qh(a)}?`,
              ),
              exp: P(`${qh(a)} : ${qh(b)} · 100% = ${qh(pq)}%`),
            }),
          );
        }
      }
      return { items };
    },
  },

  pie: {
    topic: "g6pct",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O("Круговая диаграмма", "Sektordiagramm", "Pie chart"),
    gen(R, lvl, cnt) {
      const k = R.int(3, 4);
      let parts;
      do {
        parts = [];
        let left = 100;
        for (let j = 0; j < k - 1; j++) {
          const p = R.int(2, Math.min(9, left / 5 - (k - 1 - j) * 2)) * 5;
          parts.push(p);
          left -= p;
        }
        parts.push(left);
      } while (parts.some(p => p < 5) || new Set(parts).size < k);
      const names = R.shuffle(PIE_NAMES).slice(0, k).map(tr);
      const total = R.int(2, 12) * 20;
      const intro =
        t3(
          `${total} учеников выбрали любимый вид спорта. Результаты — на диаграмме.`,
          `${total} õpilast valisid oma lemmikspordiala. Tulemused on diagrammil.`,
          `${total} students chose their favourite sport. The results are in the chart.`,
        ) + svgPie(parts, names);
      const items = [];
      const i1 = R.int(0, k - 1);
      const c1 = (total * parts[i1]) / 100;
      items.push(
        numAns(c1, {
          q: t3(
            `Сколько учеников выбрали «${names[i1]}»?`,
            `Mitu õpilast valis «${names[i1]}»?`,
            `How many chose “${names[i1]}”?`,
          ),
          exp: P(`${total} · ${parts[i1]}% = ${qh(q(c1))}`),
        }),
      );
      let i2;
      do {
        i2 = R.int(0, k - 1);
      } while (i2 === i1);
      const diff = (Math.abs(parts[i1] - parts[i2]) * total) / 100;
      items.push(
        numAns(q(diff), {
          q: t3(
            `На сколько учеников больше выбрали «${parts[i1] > parts[i2] ? names[i1] : names[i2]}», чем «${parts[i1] > parts[i2] ? names[i2] : names[i1]}»?`,
            `Mitu õpilast rohkem valis «${parts[i1] > parts[i2] ? names[i1] : names[i2]}» kui «${parts[i1] > parts[i2] ? names[i2] : names[i1]}»?`,
            `How many more chose “${parts[i1] > parts[i2] ? names[i1] : names[i2]}” than “${parts[i1] > parts[i2] ? names[i2] : names[i1]}”?`,
          ),
          exp: P(`${Math.abs(parts[i1] - parts[i2])}% · ${total} = ${qh(q(diff))}`),
        }),
      );
      if (lvl === "a") {
        const i3 = R.int(0, k - 1);
        const deg = q(parts[i3]).mul(360).div(100);
        items.push(
          numAns(deg, {
            unit: "°",
            q: t3(
              `Сколько градусов составляет сектор «${names[i3]}»?`,
              `Mitu kraadi on sektor «${names[i3]}»?`,
              `How many degrees is the “${names[i3]}” sector?`,
            ),
            exp: P(`360° · ${parts[i3]}% = ${qh(deg)}°`),
          }),
        );
      }
      return { intro, items: items.slice(0, cnt) };
    },
  },
};

const PIE_NAMES = [
  O("Футбол", "Jalgpall", "Football"),
  O("Плавание", "Ujumine", "Swimming"),
  O("Шахматы", "Male", "Chess"),
  O("Танцы", "Tantsimine", "Dance"),
  O("Баскетбол", "Korvpall", "Basketball"),
];

const PIE_COL = ["#f46b57", "#5ec2b7", "#f5c84c", "#9b97f2", "#6fa8f5"];

function svgPie(parts, names) {
  let a0 = -Math.PI / 2,
    s = `<svg class="sk pie" viewBox="0 0 320 170" role="img">`;
  parts.forEach((p, i) => {
    const a1 = a0 + (p / 100) * 2 * Math.PI;
    const x0 = 85 + 75 * Math.cos(a0),
      y0 = 85 + 75 * Math.sin(a0),
      x1 = 85 + 75 * Math.cos(a1),
      y1 = 85 + 75 * Math.sin(a1);
    s += `<path d="M85 85 L${x0.toFixed(1)} ${y0.toFixed(1)} A75 75 0 ${p > 50 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${PIE_COL[i]}" stroke="#fff" stroke-width="2"/>`;
    s += `<rect x="180" y="${22 + i * 28}" width="14" height="14" rx="4" fill="${PIE_COL[i]}"/><text x="202" y="${34 + i * 28}" font-size="14" fill="currentColor">${names[i]} — ${p}%</text>`;
    a0 = a1;
  });
  return s + `</svg>`;
}
