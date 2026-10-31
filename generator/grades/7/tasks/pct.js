// 7 класс, тема «Проценты, промилле, процентный пункт»: шаблоны заданий.
import { MINUS, P, Q, numAns, q, qh, tr } from "../../../core/index.js";

export default {
  /* --- 12. Проценты: базовые --- */
  pctBasic: {
    topic: "pct",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: { ru: "Проценты", et: "Protsendid", en: "Percentages" },
    gen(R, lvl, cnt) {
      const items = [];
      const kinds = R.shuffle(["part", "whole", "ratio", "mille"]);
      for (let i = 0; i < cnt; i++) {
        const k = kinds[i % 4];
        if (k === "part") {
          const p =
            lvl === "n" ? R.pick([12, 15, 17, 24, 35, 45, 64, 85]) : new Q(R.int(25, 195), 10);
          const Nn = new Q(R.int(120, 980));
          const r = q(p).mul(Nn).div(100);
          items.push(
            numAns(r, {
              q: tr({
                ru: `Найди ${qh(q(p))}% от ${qh(Nn)}.`,
                et: `Leia ${qh(q(p))}% arvust ${qh(Nn)}.`,
                en: `Find ${qh(q(p))}% of ${qh(Nn)}.`,
              }),
              exp:
                P(`${qh(Nn)} · ${qh(q(p).div(100))} = ${qh(r)}`) +
                P(
                  tr({
                    ru: "Процент переводим в десятичную дробь и умножаем.",
                    et: "Protsendi teisendame kümnendmurruks ja korrutame.",
                    en: "Convert the percent to a decimal and multiply.",
                  }),
                ),
            }),
          );
        } else if (k === "whole") {
          const p = R.pick([8, 12, 15, 24, 35, 40, 65]);
          const W = new Q(R.int(150, 960), lvl === "n" ? 1 : 10);
          const part = W.mul(p).div(100);
          items.push(
            numAns(W, {
              q: tr({
                ru: `${p}% числа равны ${qh(part)}. Найди это число.`,
                et: `${p}% arvust on ${qh(part)}. Leia see arv.`,
                en: `${p}% of a number is ${qh(part)}. Find the number.`,
              }),
              exp: P(`${qh(part)} : ${qh(new Q(p, 100))} = ${qh(W)}`),
            }),
          );
        } else if (k === "ratio") {
          const b = new Q(R.pick([40, 80, 120, 160, 250, 320, 400, 500]));
          const p = new Q(R.int(3, 97) * (lvl === "n" ? 1 : 1), 1).add(
            R.chance(0.5) ? new Q(1, 2) : new Q(0),
          );
          const a = b.mul(p).div(100);
          items.push(
            numAns(p, {
              unit: "%",
              q: tr({
                ru: `Сколько процентов составляет ${qh(a)} от ${qh(b)}?`,
                et: `Mitu protsenti moodustab ${qh(a)} arvust ${qh(b)}?`,
                en: `What percent of ${qh(b)} is ${qh(a)}?`,
              }),
              exp: P(`${qh(a)} : ${qh(b)} · 100% = ${qh(p)}%`),
            }),
          );
        } else {
          const m = R.int(3, 48),
            Nn = new Q(R.int(1200, 9800));
          const r = Nn.mul(m).div(1000);
          items.push(
            numAns(r, {
              q: tr({
                ru: `Найди ${m}‰ (промилле) от ${qh(Nn)}.`,
                et: `Leia ${m}‰ (promilli) arvust ${qh(Nn)}.`,
                en: `Find ${m}‰ (per mille) of ${qh(Nn)}.`,
              }),
              exp:
                P(
                  tr({
                    ru: "1‰ — это одна тысячная.",
                    et: "1‰ on üks tuhandik.",
                    en: "1‰ is one thousandth.",
                  }),
                ) + P(`${qh(Nn)} · ${m} : 1000 = ${qh(r)}`),
            }),
          );
        }
      }
      return { items };
    },
  },

  /* --- 13. Изменение величины, процентный пункт --- */
  pctChange: {
    topic: "pct",
    pts: 3,
    cnt: { n: 2, a: 3 },
    title: { ru: "Изменение в процентах", et: "Muutumine protsentides", en: "Percentage change" },
    gen(R, lvl, cnt) {
      const items = [];
      const kinds = R.shuffle(["twostep", "pp", "find"]);
      for (let i = 0; i < cnt; i++) {
        const k = kinds[i % 3];
        if (k === "twostep") {
          const P0 = new Q(R.int(1990, 9990), 100),
            a = R.pick([10, 15, 20, 25, 30]),
            b = R.pick([10, 15, 20, 25]);
          const r = P0.mul(100 + a)
            .div(100)
            .mul(100 - b)
            .div(100);
          const rr = new Q(Math.round(r.v() * 100), 100);
          items.push(
            numAns(rr, {
              unit: "€",
              tol: 0.011,
              q: tr({
                ru: `Товар стоил ${qh(P0)} €. Цену подняли на ${a}%, а затем снизили на ${b}%. Сколько стоит товар теперь? (Округли до центов.)`,
                et: `Kaup maksis ${qh(P0)} €. Hinda tõsteti ${a}% ja seejärel langetati ${b}%. Kui palju kaup nüüd maksab? (Ümarda sendini.)`,
                en: `An item cost ${qh(P0)} €. The price was raised by ${a}%, then lowered by ${b}%. What does it cost now? (Round to cents.)`,
              }),
              exp: P(
                `${qh(P0)} · ${qh(new Q(100 + a, 100))} · ${qh(new Q(100 - b, 100))} ≈ ${qh(rr)} €`,
              ),
              alt: P(
                tr({
                  ru: `Другой способ: общий коэффициент ${qh(new Q(100 + a, 100))} · ${qh(new Q(100 - b, 100))} = ${qh(new Q((100 + a) * (100 - b), 10000))}, т.е. итоговое изменение ${qh(new Q((100 + a) * (100 - b), 100).sub(100))}%.`,
                  et: `Teine võimalus: koondkordaja ${qh(new Q(100 + a, 100))} · ${qh(new Q(100 - b, 100))} = ${qh(new Q((100 + a) * (100 - b), 10000))}, st kogumuutus ${qh(new Q((100 + a) * (100 - b), 100).sub(100))}%.`,
                  en: `Another way: total multiplier ${qh(new Q(100 + a, 100))} · ${qh(new Q(100 - b, 100))} = ${qh(new Q((100 + a) * (100 - b), 10000))}, i.e. a total change of ${qh(new Q((100 + a) * (100 - b), 100).sub(100))}%.`,
                }),
              ),
            }),
          );
        } else if (k === "pp") {
          const r1 = new Q(R.int(15, 60), 10),
            r2 = r1.add(new Q(R.int(3, 25), 10));
          const pp = r2.sub(r1),
            pc = pp.div(r1).mul(100);
          const pcr = new Q(Math.round(pc.v() * 10), 10);
          const intro = tr({
            ru: `Ставка по кредиту выросла с ${qh(r1)}% до ${qh(r2)}%.`,
            et: `Laenu intress tõusis ${qh(r1)}%-lt ${qh(r2)}%-le.`,
            en: `A loan rate went up from ${qh(r1)}% to ${qh(r2)}%.`,
          });
          items.push(
            numAns(pp, {
              q:
                intro +
                " " +
                tr({
                  ru: "На сколько процентных пунктов?",
                  et: "Mitu protsendipunkti?",
                  en: "By how many percentage points?",
                }),
              unit: tr({ ru: "п.п.", et: "pp", en: "pp" }),
              exp:
                P(`${qh(r2)} ${MINUS} ${qh(r1)} = ${qh(pp)}`) +
                P(
                  tr({
                    ru: "Процентный пункт — простая разность процентов.",
                    et: "Protsendipunkt on protsentide lihtne vahe.",
                    en: "A percentage point is the plain difference of percentages.",
                  }),
                ),
            }),
          );
          if (lvl !== "n")
            items.push(
              numAns(pcr, {
                tol: 0.051,
                unit: "%",
                q:
                  intro +
                  " " +
                  tr({
                    ru: "На сколько процентов выросла ставка? (Округли до десятых.)",
                    et: "Mitu protsenti intress tõusis? (Ümarda kümnendikeni.)",
                    en: "By what percent did the rate rise? (Round to tenths.)",
                  }),
                exp: P(`${qh(pp)} : ${qh(r1)} · 100% ≈ ${qh(pcr)}%`),
              }),
            );
        } else {
          const P1 = new Q(R.int(2000, 9000), 100),
            d = R.pick([15, 20, 25, 30, 35, 40]);
          const P0 = P1.mul(100).div(100 - d);
          const r = new Q(Math.round(P0.v() * 100), 100);
          items.push(
            numAns(r, {
              unit: "€",
              tol: 0.011,
              q: tr({
                ru: `После скидки ${d}% куртка стоит ${qh(P1)} €. Сколько она стоила до скидки? (Округли до центов.)`,
                et: `Pärast ${d}% allahindlust maksab jope ${qh(P1)} €. Kui palju maksis see enne allahindlust? (Ümarda sendini.)`,
                en: `After a ${d}% discount a jacket costs ${qh(P1)} €. What did it cost before? (Round to cents.)`,
              }),
              exp:
                P(
                  tr({
                    ru: `Новая цена — это ${100 - d}% старой:`,
                    et: `Uus hind on ${100 - d}% vanast:`,
                    en: `The new price is ${100 - d}% of the old one:`,
                  }),
                ) + P(`${qh(P1)} : ${qh(new Q(100 - d, 100))} ≈ ${qh(r)} €`),
            }),
          );
        }
      }
      return { items: items.slice(0, Math.max(cnt, items.length)) };
    },
  },
};
