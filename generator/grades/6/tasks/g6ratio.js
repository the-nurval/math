// 6 класс, тема «Отношения, пропорции, масштаб»: шаблоны заданий.
import {
  FR,
  O,
  P,
  Q,
  cm,
  decPlaces,
  gcd,
  numAns,
  numHtml,
  q,
  qh,
  rDec,
  rFrac,
  t3,
} from "../../../core/index.js";
import { fh, fracAns } from "../helpers.js";

export default {
  /* ===== Отношения, пропорции, масштаб ===== */
  ratio: {
    topic: "g6ratio",
    pts: 1,
    cnt: { n: 3, a: 3 },
    title: O("Отношения", "Suhe", "Ratios"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const k = i % 3;
        if (k === 0) {
          const b = R.int(2, lvl === "n" ? 20 : 40),
            m =
              lvl === "n"
                ? R.int(2, 9)
                : R.pick([new Q(5, 2), new Q(3, 2), new Q(15, 4), new Q(12, 5)]);
          const a = q(m).mul(b);
          items.push(
            numAns(q(m), {
              q: t3(
                `Во сколько раз ${qh(a)} больше ${b}?`,
                `Mitu korda on ${qh(a)} suurem kui ${b}?`,
                `How many times greater is ${qh(a)} than ${b}?`,
              ),
              exp: P(`${qh(a)} : ${b} = ${qh(q(m))}`),
            }),
          );
        } else if (k === 1) {
          let a, b;
          do {
            b = R.int(4, lvl === "n" ? 30 : 90);
            a = R.int(1, b - 1);
          } while (gcd(a, b) === 1);
          const v = new Q(a, b);
          items.push(
            fracAns(v, {
              q: t3(
                `Какую часть число ${a} составляет от ${b}?`,
                `Millise osa moodustab ${a} arvust ${b}?`,
                `What part of ${b} is ${a}?`,
              ),
              exp: P(`${FR(a, b)} = ${numHtml(v, "frac")}`),
            }),
          );
        } else {
          const a = R.int(2, 9) * R.int(2, 6),
            b = R.int(2, 9) * R.int(2, 6);
          const v = new Q(a, b);
          items.push(
            fracAns(v, {
              q: t3(
                `Запиши отношение ${a} : ${b} несократимой дробью.`,
                `Kirjuta suhe ${a} : ${b} taandumatu murruna.`,
                `Write the ratio ${a} : ${b} as a fraction in lowest terms.`,
              ),
              exp:
                P(
                  t3(
                    `Делим оба числа на НОД(${a}; ${b}) = ${gcd(a, b)}.`,
                    `Jagame mõlemad arvud SÜT(${a}; ${b}) = ${gcd(a, b)}-ga.`,
                    `Divide both by GCD(${a}, ${b}) = ${gcd(a, b)}.`,
                  ),
                ) + P(`${a} : ${b} = ${numHtml(v, "frac")}`),
            }),
          );
        }
      }
      return { items };
    },
  },

  propEq: {
    topic: "g6ratio",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O(
      "Найди неизвестный член пропорции",
      "Leia võrde tundmatu liige",
      "Solve the proportion",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        let a, b, c, x;
        if (lvl === "n") {
          c = R.int(2, 9);
          x = new Q(R.int(2, 15));
          a = new Q(R.int(2, 12));
          b = x.mul(c).div(a);
          if (!b.isInt()) {
            i--;
            continue;
          }
        } else {
          c = rDec(R, 1, 6).abs();
          x = rDec(R, 1, 9).abs();
          a = rFrac(R, [2, 3, 4, 5], 1).abs();
          b = x.mul(c).div(a);
          if (decPlaces(b) < 0 && b.d > 12) {
            i--;
            continue;
          }
        }
        const form = i % 2;
        const qq = form
          ? `x : ${fh(a)} = ${fh(b)} : ${qh(q(c))}`
          : `${fh(a)} : x = ${qh(q(c))} : ${fh(b)}`;
        const xv = form ? q(a).mul(b).div(c) : q(a).mul(b).div(c);
        items.push(
          numAns(xv, {
            q: qq,
            pre: "x =",
            exp:
              P(
                t3(
                  "Произведение крайних членов равно произведению средних.",
                  "Välisliikmete korrutis võrdub keskliikmete korrutisega.",
                  "The product of the extremes equals the product of the means.",
                ),
              ) + P(`x = ${fh(a)} · ${fh(b)} : ${qh(q(c))} = ${fh(xv)}`),
          }),
        );
      }
      return { items };
    },
  },

  scale: {
    topic: "g6ratio",
    pts: 2,
    cnt: { n: 2, a: 2 },
    title: O("Масштаб", "Mõõtkava", "Scale"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const M =
          lvl === "n"
            ? R.pick([10000, 20000, 50000, 100000])
            : R.pick([250000, 500000, 2000000, 2500000]);
        if (i % 2 === 0) {
          const d = rDec(R, 1, lvl === "n" ? 9 : 14).abs();
          const km = d.mul(M).div(100000);
          items.push(
            numAns(km, {
              unit: t3("км", "km", "km"),
              q: t3(
                `Масштаб карты 1 : ${M.toLocaleString("ru-RU")}. Расстояние на карте ${qh(d)} см. Каково расстояние на местности?`,
                `Kaardi mõõtkava on 1 : ${M.toLocaleString("ru-RU")}. Kaugus kaardil on ${qh(d)} cm. Kui suur on kaugus looduses?`,
                `Map scale 1 : ${M.toLocaleString("en-GB")}. The distance on the map is ${qh(d)} cm. What is the real distance?`,
              ),
              exp: P(
                `${qh(d)} · ${M} = ${qh(d.mul(M))} ${cm()} = ${qh(km)} ${t3("км", "km", "km")}`,
              ),
            }),
          );
        } else {
          const km = new Q((R.int(2, 40) * M) / 100000 / (lvl === "n" ? 2 : 1));
          const d = km.mul(100000).div(M);
          items.push(
            numAns(d, {
              unit: cm(),
              q: t3(
                `Масштаб карты 1 : ${M.toLocaleString("ru-RU")}. Расстояние на местности ${qh(km)} км. Каким будет расстояние на карте?`,
                `Kaardi mõõtkava on 1 : ${M.toLocaleString("ru-RU")}. Kaugus looduses on ${qh(km)} km. Kui suur on see kaardil?`,
                `Map scale 1 : ${M.toLocaleString("en-GB")}. The real distance is ${qh(km)} km. How long is it on the map?`,
              ),
              exp: P(
                `${qh(km)} ${t3("км", "km", "km")} = ${qh(km.mul(100000))} ${cm()}; ${qh(km.mul(100000))} : ${M} = ${qh(d)} ${cm()}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },
};
