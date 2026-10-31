// 7 класс, тема «Пропорциональность, линейная функция»: шаблоны заданий.
import { MINUS, P, Q, ansHtml, numAns, qh, rDec, rInt, tr } from "../../../core/index.js";

export default {
  /* --- 17. Линейная функция --- */
  linFunc: {
    topic: "func",
    pts: 2,
    cnt: { n: 4, a: 4 },
    title: { ru: "Линейная функция", et: "Lineaarfunktsioon", en: "Linear function" },
    gen(R, lvl, cnt) {
      const items = [];
      const k =
          lvl === "n"
            ? new Q(rInt(R, 1, 5)).mul(R.chance(0.3) ? new Q(1, 2) : new Q(1))
            : rDec(R, 1, 4),
        b = lvl === "n" ? new Q(rInt(R, 1, 9)) : rDec(R, 1, 6);
      const fy = x => k.mul(x).add(b);
      const fstr = `y = ${qh(k)}x ${b.sgn() < 0 ? MINUS : "+"} ${qh(b.abs())}`;
      const intro = tr({
        ru: `Функция задана формулой ${fstr}.`,
        et: `Funktsioon on antud valemiga ${fstr}.`,
        en: `The function is given by ${fstr}.`,
      });
      const kinds =
        lvl === "n" ? ["y", "x", "zero", "point"] : ["y", "x", "zero", "point", "twopts"];
      for (let i = 0; i < cnt; i++) {
        const kk = kinds[i % kinds.length];
        if (kk === "y") {
          const x = rDec(R, 1, 6);
          const y = fy(x);
          items.push(
            numAns(y, {
              q: tr({
                ru: `Найди y при x = ${qh(x)}.`,
                et: `Leia y, kui x = ${qh(x)}.`,
                en: `Find y when x = ${qh(x)}.`,
              }),
              pre: "y =",
              exp: P(
                `y = ${qh(k)} · ${qh(x, true)} ${b.sgn() < 0 ? MINUS : "+"} ${qh(b.abs())} = ${qh(y)}`,
              ),
            }),
          );
        } else if (kk === "x") {
          const x = lvl === "n" ? new Q(rInt(R, 1, 9)) : rDec(R, 1, 6);
          const y = fy(x);
          items.push(
            numAns(x, {
              q: tr({
                ru: `При каком x значение y равно ${qh(y)}?`,
                et: `Millise x korral on y = ${qh(y)}?`,
                en: `For which x is y = ${qh(y)}?`,
              }),
              pre: "x =",
              exp: P(
                `${qh(k)}x ${b.sgn() < 0 ? MINUS : "+"} ${qh(b.abs())} = ${qh(y)} → x = (${qh(y)} ${MINUS} ${qh(b, true)}) : ${qh(k, true)} = ${ansHtml(x)}`,
              ),
            }),
          );
        } else if (kk === "zero") {
          const x = b.neg().div(k);
          items.push(
            numAns(x, {
              q: tr({
                ru: "Найди точку пересечения графика с осью x (значение x).",
                et: "Leia graafiku ja x-telje lõikepunkt (x väärtus).",
                en: "Find where the graph crosses the x-axis (the x value).",
              }),
              pre: "x =",
              exp: P(
                `y = 0: ${qh(k)}x ${b.sgn() < 0 ? MINUS : "+"} ${qh(b.abs())} = 0 → x = ${ansHtml(x)}`,
              ),
            }),
          );
        } else if (kk === "point") {
          const x = new Q(rInt(R, 1, 6));
          const yes = R.chance(0.5);
          const y = yes ? fy(x) : fy(x).add(new Q(rInt(R, 1, 3)));
          const Y = tr({ ru: "да", et: "jah", en: "yes" }),
            Nn = tr({ ru: "нет", et: "ei", en: "no" });
          items.push({
            ans: { type: "choice", v: yes ? "y" : "n" },
            opts: [
              ["y", Y],
              ["n", Nn],
            ],
            show: yes ? Y : Nn,
            plain: yes ? "y" : "n",
            q: tr({
              ru: `Лежит ли точка (${qh(x)}; ${qh(y)}) на графике?`,
              et: `Kas punkt (${qh(x)}; ${qh(y)}) asub graafikul?`,
              en: `Does the point (${qh(x)}; ${qh(y)}) lie on the graph?`,
            }),
            exp: P(`y(${qh(x)}) = ${qh(fy(x))} ${yes ? "=" : "≠"} ${qh(y)}`),
          });
        } else {
          const x1 = new Q(rInt(R, 1, 4)),
            x2 = x1.add(R.int(2, 5));
          const k2 = rDec(R, 1, 4),
            b2 = new Q(rInt(R, 1, 8));
          const y1 = k2.mul(x1).add(b2),
            y2 = k2.mul(x2).add(b2);
          items.push(
            numAns(k2, {
              q: tr({
                ru: `Прямая y = kx + b проходит через точки (${qh(x1)}; ${qh(y1)}) и (${qh(x2)}; ${qh(y2)}). Найди k.`,
                et: `Sirge y = kx + b läbib punkte (${qh(x1)}; ${qh(y1)}) ja (${qh(x2)}; ${qh(y2)}). Leia k.`,
                en: `The line y = kx + b passes through (${qh(x1)}; ${qh(y1)}) and (${qh(x2)}; ${qh(y2)}). Find k.`,
              }),
              pre: "k =",
              exp: P(
                `k = (${qh(y2)} ${MINUS} ${qh(y1, true)}) : (${qh(x2)} ${MINUS} ${qh(x1, true)}) = ${qh(k2)}`,
              ),
            }),
          );
        }
      }
      return { intro, items };
    },
  },

  /* --- 18. Прямая и обратная пропорциональность --- */
  proportion: {
    topic: "func",
    pts: 3,
    cnt: { n: 2, a: 2 },
    title: {
      ru: "Пропорциональные величины",
      et: "Võrdelised suurused",
      en: "Proportional quantities",
    },
    gen(R, lvl, cnt) {
      const items = [];
      const kinds = R.shuffle(["direct", "inverse"]);
      for (let i = 0; i < cnt; i++) {
        if (kinds[i % 2] === "direct") {
          const m1 = new Q(R.int(15, 45), 10),
            price = new Q(R.int(129, 489), 100),
            m2 = new Q(R.int(10, 80), 10);
          const c1 = m1.mul(price),
            c2 = m2.mul(price);
          const r = new Q(Math.round(c2.v() * 100), 100);
          items.push(
            numAns(r, {
              unit: "€",
              tol: 0.011,
              q: tr({
                ru: `${qh(m1)} кг яблок стоят ${qh(c1)} €. Сколько стоят ${qh(m2)} кг? (Округли до центов.)`,
                et: `${qh(m1)} kg õunu maksab ${qh(c1)} €. Kui palju maksab ${qh(m2)} kg? (Ümarda sendini.)`,
                en: `${qh(m1)} kg of apples cost ${qh(c1)} €. How much do ${qh(m2)} kg cost? (Round to cents.)`,
              }),
              exp:
                P(
                  tr({
                    ru: "Прямая пропорциональность: цена 1 кг одинакова.",
                    et: "Võrdeline seos: 1 kg hind on sama.",
                    en: "Direct proportion: the price per kg is the same.",
                  }),
                ) +
                P(`${qh(c1)} : ${qh(m1)} = ${qh(price)} €; ${qh(price)} · ${qh(m2)} ≈ ${qh(r)} €`),
            }),
          );
        } else {
          const w1 = R.int(3, 8),
            d1 = R.int(6, 18),
            w2 = R.int(3, 12);
          if (w2 === w1) {
          }
          const d2 = new Q(w1 * d1, w2 === w1 ? w1 + 2 : w2);
          const ww2 = w2 === w1 ? w1 + 2 : w2;
          items.push(
            numAns(d2, {
              unit: tr({ ru: "дн.", et: "päeva", en: "days" }),
              q: tr({
                ru: `${w1} мастеров выполняют работу за ${d1} дней. За сколько дней выполнят её ${ww2} мастеров при той же производительности?`,
                et: `${w1} meistrit teevad töö ${d1} päevaga. Mitme päevaga teevad selle ${ww2} meistrit sama tootlikkusega?`,
                en: `${w1} workers finish a job in ${d1} days. How many days will ${ww2} workers need at the same rate?`,
              }),
              exp:
                P(
                  tr({
                    ru: "Обратная пропорциональность: произведение «люди × дни» постоянно.",
                    et: "Pöördvõrdeline seos: korrutis «inimesed × päevad» on konstantne.",
                    en: "Inverse proportion: workers × days stays constant.",
                  }),
                ) + P(`${w1} · ${d1} = ${w1 * d1}; ${w1 * d1} : ${ww2} = ${ansHtml(d2)}`),
            }),
          );
        }
      }
      return { items };
    },
  },
};
