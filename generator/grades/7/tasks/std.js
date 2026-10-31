// 7 класс, тема «Нулевая и отрицательная степень, стандартный вид»: шаблоны заданий.
import {
  MINUS,
  P,
  Q,
  T_ANS,
  ansHtml,
  numAns,
  numHtml,
  plainOf,
  qh,
  tr,
} from "../../../core/index.js";

export default {
  /* --- 10. Нулевая и отрицательная степень --- */
  negExp: {
    topic: "std",
    pts: 1,
    cnt: { n: 4, a: 5 },
    title: { ru: "Вычисли", et: "Arvuta", en: "Calculate" },
    gen(R, lvl, cnt) {
      const items = [];
      const g = R.shuffle([
        () => [new Q(R.pick([2, 3, 4, 5])), -R.int(1, 3)],
        () => [new Q(R.pick([2, 3, 4]), R.pick([3, 5, 7])), -R.int(1, 2)],
        () => [new Q(R.pick([-7, 13, -2, 25]), R.pick([1, 10])), 0],
        () => [new Q(10), -R.int(2, 4)],
        () => [new Q(R.pick([5, 2]), 10), -R.int(1, 3)],
        () => [new Q(R.pick([-2, -3])), -R.int(2, 3)],
      ]);
      for (let i = 0; i < cnt; i++) {
        const [b, e] = g[i % g.length]();
        const v = b.pow(e);
        const bh =
          b.isInt() && b.sgn() > 0 ? qh(b) : `(${numHtml(b, b.d === 10 ? "dec" : "frac")})`;
        let ex;
        if (e === 0)
          ex = tr({
            ru: "Любое число (кроме 0) в нулевой степени равно 1.",
            et: "Iga nullist erinev arv astmes 0 võrdub 1-ga.",
            en: "Any nonzero number to the power 0 equals 1.",
          });
        else
          ex = tr({
            ru: `a<sup>${MINUS}n</sup> = 1 : a<sup>n</sup>. Поэтому ${bh}<sup>${e}</sup> = 1 : ${bh}<sup>${-e}</sup> = ${ansHtml(v)}.`,
            et: `a<sup>${MINUS}n</sup> = 1 : a<sup>n</sup>. Seega ${bh}<sup>${e}</sup> = 1 : ${bh}<sup>${-e}</sup> = ${ansHtml(v)}.`,
            en: `a<sup>${MINUS}n</sup> = 1 ÷ a<sup>n</sup>. So ${bh}<sup>${e}</sup> = 1 ÷ ${bh}<sup>${-e}</sup> = ${ansHtml(v)}.`,
          });
        items.push(numAns(v, { q: `${bh}<sup>${e < 0 ? MINUS + -e : e}</sup>`, exp: P(ex) }));
      }
      return { items };
    },
  },

  std: {
    topic: "std",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: {
      ru: "Запиши число в стандартном виде a · 10ⁿ",
      et: "Kirjuta arv standardkujul a · 10ⁿ",
      en: "Write in scientific notation a · 10ⁿ",
    },
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        let v,
          qq,
          ex = "";
        const mant = () => new Q(R.int(101, 999) * (R.chance(0.4) ? 1 : 1), 100);
        if (lvl === "n" || i < cnt - 1) {
          let m = mant();
          if (R.chance(0.3)) m = new Q(R.int(11, 99), 10);
          const e = R.pick([-6, -5, -4, -3, -2, 4, 5, 6, 7, 8]);
          v = m.mul(new Q(10).pow(e));
          qq = numHtml(v, "dec");
          ex = tr({
            ru: `Ставим запятую после первой ненулевой цифры и считаем, на сколько разрядов она сдвинулась.`,
            et: `Paneme koma esimese nullist erineva numbri järele ja loeme, mitu kohta see nihkus.`,
            en: `Put the decimal point after the first nonzero digit and count how many places it moved.`,
          });
        } else {
          const a1 = new Q(R.int(2, 9)),
            e1 = R.int(3, 8),
            a2 = new Q(R.int(2, 9)),
            e2 = -R.int(2, 9);
          v = a1.mul(new Q(10).pow(e1)).mul(a2.mul(new Q(10).pow(e2)));
          qq = `(${a1.n} · 10<sup>${e1}</sup>) · (${a2.n} · 10<sup>${MINUS}${-e2}</sup>)`;
          ex = `${a1.n} · ${a2.n} = ${a1.n * a2.n}; 10<sup>${e1}</sup> · 10<sup>${e2 < 0 ? MINUS + -e2 : e2}</sup> = 10<sup>${e1 + e2 < 0 ? MINUS + -(e1 + e2) : e1 + e2}</sup>.`;
        }
        const [m, e] = stdOf(v);
        items.push({
          q: qq,
          ans: { type: "std", m: m.v(), e },
          show: `${numHtml(m, "dec")} · 10<sup>${e < 0 ? MINUS + -e : e}</sup>`,
          plain: [plainOf(m), String(e)],
          exp:
            P(ex) +
            P(
              `${tr(T_ANS)}: ${numHtml(m, "dec")} · 10<sup>${e < 0 ? MINUS + -e : e}</sup> (1 ≤ a < 10).`,
            ),
        });
      }
      return { items };
    },
  },
};

/* --- 11. Стандартный вид --- */
function stdOf(v) {
  // v>0 Q -> [mantissa Q, exp]
  let e = 0;
  let m = v;
  while (m.v() >= 10) {
    m = m.div(10);
    e++;
  }
  while (m.v() < 1) {
    m = m.mul(10);
    e--;
  }
  return [m, e];
}
