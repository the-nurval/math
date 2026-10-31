// 7 класс, тема «Рациональные числа» (уравнения и текстовые задачи): шаблоны заданий.
import { MINUS, P, Q, numAns, opSym, qh, rDec, rInt, tr } from "../../../core/index.js";

export default {
  /* --- 4. Простые уравнения с рациональными числами --- */
  simpleEq: {
    topic: "rat",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: { ru: "Реши уравнение", et: "Lahenda võrrand", en: "Solve the equation" },
    gen(R, lvl, cnt) {
      const items = [];
      const forms = R.shuffle(["add", "sub", "mul", "div"]);
      for (let i = 0; i < cnt; i++) {
        const f = forms[i % 4];
        let x = lvl === "n" ? rDec(R, 1, 15) : rDec(R, 2, 12),
          qq,
          ex,
          m = "dec";
        if (f === "add") {
          const a = rDec(R, 2, 10),
            b = x.add(a);
          qq = `x + ${qh(a, true)} = ${qh(b)}`;
          ex =
            P(
              tr({
                ru: "Неизвестное слагаемое = сумма − известное слагаемое.",
                et: "Tundmatu liidetav = summa − teadaolev liidetav.",
                en: "Unknown addend = sum − known addend.",
              }),
            ) + P(`x = ${qh(b)} ${MINUS} ${qh(a, true)} = ${qh(x)}`);
        } else if (f === "sub") {
          const a = rDec(R, 1, 15),
            b = a.sub(x);
          qq = `${qh(a)} ${MINUS} x = ${qh(b)}`;
          ex =
            P(
              tr({
                ru: "Неизвестное вычитаемое = уменьшаемое − разность.",
                et: "Tundmatu lahutatav = vähendatav − vahe.",
                en: "Unknown subtrahend = minuend − difference.",
              }),
            ) + P(`x = ${qh(a)} ${MINUS} ${qh(b, true)} = ${qh(x)}`);
        } else if (f === "mul") {
          const k = lvl === "n" ? new Q(rInt(R, 2, 9)) : rDec(R, 1, 4);
          const b = k.mul(x);
          qq = `${qh(k)}x = ${qh(b)}`;
          ex =
            P(
              tr({
                ru: "Неизвестный множитель = произведение : известный множитель.",
                et: "Tundmatu tegur = korrutis : teadaolev tegur.",
                en: "Unknown factor = product ÷ known factor.",
              }),
            ) + P(`x = ${qh(b)} ${opSym(":")} ${qh(k, true)} = ${qh(x)}`);
        } else {
          const k = new Q(rInt(R, 2, 8));
          x = lvl === "n" ? rDec(R, 1, 9).mul(k) : rDec(R, 2, 9).mul(k);
          const b = x.div(k);
          qq = `x ${opSym(":")} ${qh(k, true)} = ${qh(b)}`;
          ex =
            P(
              tr({
                ru: "Неизвестное делимое = частное · делитель.",
                et: "Tundmatu jagatav = jagatis · jagaja.",
                en: "Unknown dividend = quotient × divisor.",
              }),
            ) + P(`x = ${qh(b)} · ${qh(k, true)} = ${qh(x)}`);
        }
        items.push(numAns(x, { q: qq, pre: "x =", exp: ex }));
      }
      return { items };
    },
  },

  /* --- 5. Текстовая задача со знаками --- */
  signedWord: {
    topic: "rat",
    pts: 3,
    cnt: { n: 1, a: 2 },
    title: { ru: "Реши задачу", et: "Lahenda ülesanne", en: "Solve the problem" },
    gen(R, lvl, cnt) {
      const items = [];
      const sc = R.shuffle(["temp", "sub", "acct"]);
      for (let i = 0; i < cnt; i++) {
        const s = sc[i % 3];
        if (s === "temp") {
          const t0 = rDec(R, 1, 9).abs().neg(),
            u = new Q(R.int(31, 95), 10),
            d = new Q(R.int(21, 99), 10);
          const r = t0.add(u).sub(d);
          items.push(
            numAns(r, {
              unit: "°C",
              q: tr({
                ru: `Утром температура была ${qh(t0)} °C. К полудню она поднялась на ${qh(u)} °C, а к ночи опустилась на ${qh(d)} °C. Какой стала температура ночью?`,
                et: `Hommikul oli temperatuur ${qh(t0)} °C. Keskpäevaks tõusis see ${qh(u)} °C ja ööks langes ${qh(d)} °C. Milline oli temperatuur öösel?`,
                en: `In the morning the temperature was ${qh(t0)} °C. By noon it rose by ${qh(u)} °C, and by night it fell by ${qh(d)} °C. What was the temperature at night?`,
              }),
              exp: P(`${qh(t0)} + ${qh(u)} ${MINUS} ${qh(d)} = ${qh(r)} °C`),
            }),
          );
        } else if (s === "sub") {
          const h0 = new Q(-R.int(800, 2400), 10),
            up = new Q(R.int(150, 700), 10),
            dn = new Q(R.int(205, 995), 100);
          const r = h0.add(up).sub(dn);
          items.push(
            numAns(r, {
              unit: tr({ ru: "м", et: "m", en: "m" }),
              q: tr({
                ru: `Батискаф находился на высоте ${qh(h0)} м (ниже уровня моря). Он поднялся на ${qh(up)} м, затем опустился на ${qh(dn)} м. На какой высоте он оказался? (Ответ со знаком.)`,
                et: `Batüskaaf oli kõrgusel ${qh(h0)} m (allpool merepinda). See tõusis ${qh(up)} m ja laskus siis ${qh(dn)} m. Millisel kõrgusel ta lõpuks oli? (Vastus märgiga.)`,
                en: `A submersible was at an altitude of ${qh(h0)} m (below sea level). It rose ${qh(up)} m, then sank ${qh(dn)} m. At what altitude did it end up? (Give the sign.)`,
              }),
              exp: P(`${qh(h0)} + ${qh(up)} ${MINUS} ${qh(dn)} = ${qh(r)} m`),
            }),
          );
        } else {
          const b0 = new Q(-R.int(1500, 9000), 100),
            inc = new Q(R.int(50, 250) * 100, 100),
            p1 = new Q(R.int(1205, 4999), 100),
            p2 = new Q(R.int(505, 2999), 100);
          const r = b0.add(inc).sub(p1).sub(p2);
          items.push(
            numAns(r, {
              unit: "€",
              q: tr({
                ru: `На счёте было ${qh(b0)} €. Пришла зарплата ${qh(inc)} €, затем оплатили покупки на ${qh(p1)} € и ${qh(p2)} €. Сколько денег стало на счёте?`,
                et: `Kontol oli ${qh(b0)} €. Laekus palk ${qh(inc)} €, seejärel maksti ostude eest ${qh(p1)} € ja ${qh(p2)} €. Kui palju raha jäi kontole?`,
                en: `An account had ${qh(b0)} €. A salary of ${qh(inc)} € came in, then purchases of ${qh(p1)} € and ${qh(p2)} € were paid. What is the balance now?`,
              }),
              exp: P(`${qh(b0)} + ${qh(inc)} ${MINUS} ${qh(p1)} ${MINUS} ${qh(p2)} = ${qh(r)} €`),
            }),
          );
        }
      }
      return { items };
    },
  },
};
