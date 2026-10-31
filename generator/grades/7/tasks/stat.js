// 7 класс, тема «Статистика и вероятность»: шаблоны заданий.
import { MINUS, P, Q, ansHtml, decPlaces, numAns, q, qh, tr } from "../../../core/index.js";

export default {
  /* --- 22. Статистика --- */
  stat: {
    topic: "stat",
    pts: 2,
    cnt: { n: 4, a: 4 },
    title: { ru: "Статистика", et: "Statistika", en: "Statistics" },
    gen(R, lvl, cnt) {
      const n = R.pick([7, 8, 9, 10, 11]);
      let data;
      do {
        data = [];
        for (let i = 0; i < n; i++) data.push(lvl === "n" ? R.int(2, 20) : R.int(110, 190) / 10);
        const cntMap = {};
        data.forEach(x => (cntMap[x] = (cntMap[x] || 0) + 1));
        const mx = Math.max(...Object.values(cntMap));
        var modes = Object.keys(cntMap).filter(k => cntMap[k] === mx);
        if (mx < 2) {
          const j = R.int(0, n - 2);
          data[n - 1] = data[j];
          continue;
        }
        if (modes.length === 1) break;
      } while (true);
      const fmt = x => qh(q(x));
      const intro = tr({
        ru: `Результаты измерений: ${data.map(fmt).join("; ")}.`,
        et: `Mõõtmistulemused: ${data.map(fmt).join("; ")}.`,
        en: `Measurements: ${data.map(fmt).join("; ")}.`,
      });
      const sum = data.reduce((s, x) => s.add(q(x)), new Q(0));
      const mean = sum.div(n);
      const sorted = data.slice().sort((a, b) => a - b);
      const med =
        n % 2
          ? q(sorted[(n - 1) / 2])
          : q(sorted[n / 2 - 1])
              .add(q(sorted[n / 2]))
              .div(2);
      const range = q(sorted[n - 1]).sub(q(sorted[0]));
      const cntMap = {};
      data.forEach(x => (cntMap[x] = (cntMap[x] || 0) + 1));
      const mx = Math.max(...Object.values(cntMap));
      const mode = q(Number(Object.keys(cntMap).find(k => cntMap[k] === mx)));
      const items = [
        numAns(mean, {
          tol: decPlaces(mean) >= 0 && decPlaces(mean) <= 2 ? undefined : 0.0051,
          q: tr({
            ru: "Среднее арифметическое (если нужно, округли до сотых)",
            et: "Aritmeetiline keskmine (vajadusel ümarda sajandikeni)",
            en: "Mean (round to hundredths if needed)",
          }),
          exp: P(`(${data.map(fmt).join(" + ")}) : ${n} = ${qh(sum)} : ${n} = ${ansHtml(mean)}`),
        }),
        numAns(med, {
          q: tr({ ru: "Медиана", et: "Mediaan", en: "Median" }),
          exp:
            P(
              tr({ ru: "Упорядочим:", et: "Järjestame:", en: "Sorted:" }) +
                " " +
                sorted.map(fmt).join("; "),
            ) +
            P(
              n % 2
                ? tr({
                    ru: "Число значений нечётное — медиана в середине:",
                    et: "Väärtusi on paaritu arv — mediaan on keskel:",
                    en: "An odd count — the median is the middle value:",
                  }) +
                    " " +
                    qh(med)
                : tr({
                    ru: "Число значений чётное — среднее двух средних:",
                    et: "Väärtusi on paarisarv — kahe keskmise väärtuse keskmine:",
                    en: "An even count — the mean of the two middle values:",
                  }) +
                    " " +
                    qh(med),
            ),
        }),
        numAns(mode, {
          q: tr({ ru: "Мода", et: "Mood", en: "Mode" }),
          exp: P(
            tr({
              ru: `Чаще всего (${mx} раза) встречается ${qh(mode)}.`,
              et: `Kõige sagedamini (${mx} korda) esineb ${qh(mode)}.`,
              en: `${qh(mode)} occurs most often (${mx} times).`,
            }),
          ),
        }),
        numAns(range, {
          q: tr({ ru: "Размах", et: "Haare", en: "Range" }),
          exp: P(`${fmt(sorted[n - 1])} ${MINUS} ${fmt(sorted[0])} = ${qh(range)}`),
        }),
      ];
      return { intro, items: items.slice(0, cnt) };
    },
  },

  /* --- 23. Вероятность и круговая диаграмма --- */
  prob: {
    topic: "stat",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: { ru: "Вероятность", et: "Tõenäosus", en: "Probability" },
    gen(R, lvl, cnt) {
      const items = [];
      const kinds = R.shuffle(lvl === "n" ? ["bag", "die", "pie"] : ["bag", "twodice", "pie"]);
      for (let i = 0; i < cnt; i++) {
        const k = kinds[i % kinds.length];
        if (k === "bag") {
          const r = R.int(2, 9),
            b = R.int(2, 9),
            g = R.int(1, 7);
          const p = new Q(r, r + b + g);
          items.push(
            numAns(p, {
              q: tr({
                ru: `В мешке ${r} красных, ${b} синих и ${g} зелёных шаров. Какова вероятность наугад вынуть красный? (Дробью или десятичной.)`,
                et: `Kotis on ${r} punast, ${b} sinist ja ${g} rohelist palli. Kui suur on tõenäosus võtta huupi punane pall? (Murru või kümnendmurruna.)`,
                en: `A bag has ${r} red, ${b} blue and ${g} green balls. What is the probability of drawing a red one at random? (Fraction or decimal.)`,
              }),
              pre: "P =",
              exp: P(`P = ${r} : ${r + b + g} = ${ansHtml(p)}`),
            }),
          );
        } else if (k === "die") {
          const t = R.int(2, 5);
          const p = new Q(6 - t, 6);
          items.push(
            numAns(p, {
              q: tr({
                ru: `Бросают игральный кубик. Какова вероятность, что выпадет больше ${t}?`,
                et: `Visatakse täringut. Kui suur on tõenäosus, et tuleb rohkem kui ${t}?`,
                en: `A die is rolled. What is the probability of getting more than ${t}?`,
              }),
              pre: "P =",
              exp: P(
                tr({
                  ru: `Подходят ${6 - t} исхода из 6:`,
                  et: `Sobib ${6 - t} tulemust kuuest:`,
                  en: `${6 - t} outcomes out of 6:`,
                }) +
                  " " +
                  ansHtml(p),
              ),
            }),
          );
        } else if (k === "twodice") {
          const s = R.int(4, 10);
          const c = [1, 2, 3, 4, 5, 6].reduce(
            (acc, x) => acc + ([1, 2, 3, 4, 5, 6].includes(s - x) ? 1 : 0),
            0,
          );
          const p = new Q(c, 36);
          items.push(
            numAns(p, {
              q: tr({
                ru: `Бросают два кубика. Какова вероятность, что сумма очков равна ${s}?`,
                et: `Visatakse kahte täringut. Kui suur on tõenäosus, et silmade summa on ${s}?`,
                en: `Two dice are rolled. What is the probability the total is ${s}?`,
              }),
              pre: "P =",
              exp: P(
                tr({
                  ru: `Всего 36 исходов, подходящих ${c}:`,
                  et: `Kokku on 36 tulemust, sobivaid ${c}:`,
                  en: `36 outcomes in total, ${c} favourable:`,
                }) + ` ${c}/36 = ${ansHtml(p)}`,
              ),
            }),
          );
        } else {
          const pp = new Q(R.int(5, 45));
          const ang = pp.mul(new Q(36, 10));
          items.push(
            numAns(ang, {
              unit: "°",
              q: tr({
                ru: `На круговой диаграмме сектор показывает ${qh(pp)}% учеников. Какой у него центральный угол?`,
                et: `Sektordiagrammil näitab sektor ${qh(pp)}% õpilastest. Kui suur on selle kesknurk?`,
                en: `On a pie chart a sector shows ${qh(pp)}% of students. What is its central angle?`,
              }),
              exp: P(`360° · ${qh(pp.div(100))} = ${qh(ang)}°`),
            }),
          );
        }
      }
      return { items };
    },
  },
};
