// 7 класс, тема «Степени»: шаблоны заданий.
import { MINUS, P, Q, ansHtml, decPlaces, numAns, numHtml, qh, tr } from "../../../core/index.js";

export default {
  /* --- 8. Степени --- */
  pow: {
    topic: "pow",
    pts: 1,
    cnt: { n: 6, a: 6 },
    title: { ru: "Вычисли степени", et: "Arvuta astmed", en: "Evaluate the powers" },
    gen(R, lvl, cnt) {
      const items = [];
      const poolN = [
        () => [new Q(R.pick([-2, -3, 2, 3])), R.int(3, 5)],
        () => [new Q(R.pick([-4, -5, 4, 5, -6])), R.int(2, 3)],
        () => [new Q(R.pick([-1])), R.int(5, 12)],
        () => [new Q(R.pick([-3, 3, -2, 2, -5, 5]), 10), R.int(2, 3)],
        () => [new Q(R.pick([-1, 1, -2, 2]), R.pick([3, 5])), R.int(2, 3)],
        () => [new Q(R.pick([-10, 10])), R.int(3, 6)],
      ];
      const poolA = [
        () => [new Q(R.pick([-12, -15, 11, 13]), 10), 2],
        () => [new Q(R.pick([-2, -3, 2]), R.pick([3, 5, 7])), R.int(3, 4)],
        () => [new Q(R.pick([-1, 1]), 2), R.int(4, 6)],
        () => [new Q(R.pick([-2, -3])), R.int(4, 6)],
        "trick",
        "combo",
      ];
      const sh = R.shuffle(lvl === "n" ? poolN : poolA);
      for (let i = 0; i < cnt; i++) {
        const g = sh[i % sh.length];
        if (g === "trick") {
          const b = R.int(2, 4),
            e = R.pick([2, 4]);
          const v = new Q(b).pow(e).neg();
          items.push(
            numAns(v, {
              q: `${MINUS}${b}<sup>${e}</sup>`,
              exp: P(
                tr({
                  ru: `Степень относится только к ${b}, минус стоит перед ней: ${MINUS}(${b}<sup>${e}</sup>) = ${qh(v)}. Сравни: (${MINUS}${b})<sup>${e}</sup> = ${qh(v.neg())}.`,
                  et: `Aste kehtib ainult arvule ${b}, miinus on selle ees: ${MINUS}(${b}<sup>${e}</sup>) = ${qh(v)}. Võrdle: (${MINUS}${b})<sup>${e}</sup> = ${qh(v.neg())}.`,
                  en: `The power applies only to ${b}; the minus is in front: ${MINUS}(${b}<sup>${e}</sup>) = ${qh(v)}. Compare: (${MINUS}${b})<sup>${e}</sup> = ${qh(v.neg())}.`,
                }),
              ),
            }),
          );
          continue;
        }
        if (g === "combo") {
          const a = R.int(2, 3),
            e1 = R.int(3, 4),
            e2 = R.int(3, 7);
          const v = new Q(a)
            .pow(e1)
            .mul(new Q(-1).pow(e2))
            .sub(new Q(a + 1).pow(2));
          items.push(
            numAns(v, {
              q: `${a}<sup>${e1}</sup> · (${MINUS}1)<sup>${e2}</sup> ${MINUS} ${a + 1}<sup>2</sup>`,
              exp: P(
                `${new Q(a).pow(e1).n} · (${qh(new Q(-1).pow(e2))}) ${MINUS} ${(a + 1) * (a + 1)} = ${qh(v)}`,
              ),
            }),
          );
          continue;
        }
        const [b, e] = g();
        const v = b.pow(e);
        const bh =
          b.isInt() && b.sgn() > 0
            ? qh(b)
            : `(${numHtml(b, decPlaces(b) >= 0 && !b.isInt() && b.d === 10 ? "dec" : "auto")})`;
        items.push(
          numAns(v, {
            q: `${bh}<sup>${e}</sup>`,
            exp:
              P(
                b.sgn() < 0
                  ? tr({
                      ru: `Основание отрицательное, показатель ${e} — ${e % 2 === 0 ? "чётный, результат положительный" : "нечётный, результат отрицательный"}.`,
                      et: `Alus on negatiivne, astendaja ${e} on ${e % 2 === 0 ? "paaris, tulemus on positiivne" : "paaritu, tulemus on negatiivne"}.`,
                      en: `The base is negative and the exponent ${e} is ${e % 2 === 0 ? "even, so the result is positive" : "odd, so the result is negative"}.`,
                    })
                  : "",
              ) + P(`${bh}<sup>${e}</sup> = ${ansHtml(v)}`),
          }),
        );
      }
      return { items };
    },
  },

  /* --- 9. Свойства степеней --- */
  powRules: {
    topic: "pow",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: { ru: "Найди показатель n", et: "Leia astendaja n", en: "Find the exponent n" },
    gen(R, lvl, cnt) {
      const items = [];
      const kinds = R.shuffle(
        lvl === "n" ? ["mul", "div", "pow", "mul"] : ["base4", "base9", "mix", "pow"],
      );
      for (let i = 0; i < cnt; i++) {
        const k = kinds[i % kinds.length];
        const a = R.pick([2, 3, 5, 7, "a"]);
        const A = a === "a" ? "<i>a</i>" : String(a);
        let qq, n, ex;
        if (k === "mul") {
          const p = R.int(2, 9),
            s = p + R.int(2, 9);
          n = s - p;
          qq = `${A}<sup>${p}</sup> · ${A}<sup>n</sup> = ${A}<sup>${s}</sup>`;
          ex = tr({
            ru: `При умножении показатели складываются: ${p} + n = ${s}, n = ${n}.`,
            et: `Korrutamisel astendajad liidetakse: ${p} + n = ${s}, n = ${n}.`,
            en: `When multiplying, add exponents: ${p} + n = ${s}, n = ${n}.`,
          });
        } else if (k === "div") {
          const s = R.int(2, 8),
            p = s + R.int(2, 9);
          n = p - s;
          qq = `${A}<sup>${p}</sup> : ${A}<sup>n</sup> = ${A}<sup>${s}</sup>`;
          ex = tr({
            ru: `При делении показатели вычитаются: ${p} ${MINUS} n = ${s}, n = ${n}.`,
            et: `Jagamisel astendajad lahutatakse: ${p} ${MINUS} n = ${s}, n = ${n}.`,
            en: `When dividing, subtract exponents: ${p} ${MINUS} n = ${s}, n = ${n}.`,
          });
        } else if (k === "pow") {
          const p = R.int(2, 5);
          n = R.int(2, 6);
          const s = p * n;
          qq = `(${A}<sup>${p}</sup>)<sup>n</sup> = ${A}<sup>${s}</sup>`;
          ex = tr({
            ru: `При возведении степени в степень показатели перемножаются: ${p} · n = ${s}, n = ${n}.`,
            et: `Astme astendamisel astendajad korrutatakse: ${p} · n = ${s}, n = ${n}.`,
            en: `Power of a power: multiply exponents: ${p} · n = ${s}, n = ${n}.`,
          });
        } else if (k === "base4") {
          const x = R.int(2, 5),
            y = R.int(2, 4);
          n = 2 * x + 3 * y;
          qq = `4<sup>${x}</sup> · 8<sup>${y}</sup> = 2<sup>n</sup>`;
          ex = `4<sup>${x}</sup> · 8<sup>${y}</sup> = 2<sup>${2 * x}</sup> · 2<sup>${3 * y}</sup> = 2<sup>${n}</sup>`;
        } else if (k === "base9") {
          const x = R.int(2, 6),
            y = R.int(1, 4);
          n = 2 * x - 3 * y;
          qq = `9<sup>${x}</sup> : 27<sup>${y}</sup> = 3<sup>n</sup>`;
          ex = `9<sup>${x}</sup> : 27<sup>${y}</sup> = 3<sup>${2 * x}</sup> : 3<sup>${3 * y}</sup> = 3<sup>${n}</sup>`;
        } else {
          const x = R.int(2, 5),
            y = R.int(2, 5),
            z = R.int(1, 4);
          n = x + 3 * y - 2 * z;
          qq = `2<sup>${x}</sup> · 8<sup>${y}</sup> : 4<sup>${z}</sup> = 2<sup>n</sup>`;
          ex = `2<sup>${x}</sup> · 2<sup>${3 * y}</sup> : 2<sup>${2 * z}</sup> = 2<sup>${x}+${3 * y}${MINUS}${2 * z}</sup> = 2<sup>${n}</sup>`;
        }
        items.push(numAns(new Q(n), { q: qq, pre: "n =", exp: P(ex) }));
      }
      return { items };
    },
  },
};
