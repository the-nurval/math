// 6 класс, тема «Сложение и вычитание дробей»: шаблоны заданий.
import {
  L,
  MINUS,
  N,
  O,
  P,
  Q,
  T_ANS,
  evalE,
  lcm,
  numAns,
  qh,
  rFrac,
  renderE,
  t3,
  tr,
} from "../../../core/index.js";
import { fh, fracAns } from "../helpers.js";

export default {
  /* ===== Сложение и вычитание дробей ===== */
  fracAddSub: {
    topic: "g6fadd",
    pts: 1,
    cnt: { n: 5, a: 5 },
    title: O("Вычисли", "Arvuta", "Calculate"),
    gen(R, lvl, cnt) {
      const items = [];
      const D = lvl === "n" ? [2, 3, 4, 5, 6, 8, 9, 10, 12] : [4, 6, 8, 9, 10, 12, 14, 15, 18];
      for (let i = 0; i < cnt; i++) {
        const op = i % 2 ? "-" : "+";
        let a = rFrac(R, D, lvl === "n" ? 0 : 5).abs(),
          b = rFrac(R, D, lvl === "n" ? 0 : 3).abs();
        if (a.d === b.d)
          b = rFrac(
            R,
            D.filter(x => x !== a.d),
            lvl === "n" ? 0 : 3,
          ).abs();
        if (op === "-" && a.v() < b.v()) [a, b] = [b, a];
        let e = N(op, L(a, "mixed"), L(b, b.v() > 1 ? "mixed" : "frac"));
        if (lvl === "a" && i === 4) {
          const c = rFrac(R, [2, 3, 4, 6], 0).abs();
          e = N("+", e, L(c, "frac"));
        }
        const r = evalE(e);
        items.push(
          numAns(r, {
            q: renderE(e),
            exp:
              P(
                t3(
                  `Приводим к общему знаменателю ${lcm(a.d, b.d)}${lvl === "a" ? "; у смешанных чисел отдельно считаем целые части, при нехватке занимаем единицу" : ""}.`,
                  `Viime ühisele nimetajale ${lcm(a.d, b.d)}${lvl === "a" ? "; segaarvude täisosad arvutame eraldi, vajadusel laename ühe" : ""}.`,
                  `Use the common denominator ${lcm(a.d, b.d)}${lvl === "a" ? "; for mixed numbers handle whole parts separately and borrow 1 if needed" : ""}.`,
                ),
              ) + P(`${tr(T_ANS)}: ${fh(r)}`),
          }),
        );
      }
      return { items };
    },
  },

  fracAddWord: {
    topic: "g6fadd",
    pts: 3,
    cnt: { n: 1, a: 2 },
    title: O("Реши задачу", "Lahenda ülesanne", "Solve the problem"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        let p1, p2;
        do {
          p1 = rFrac(R, [3, 4, 5, 6, 8], 0).abs();
          p2 = rFrac(R, [3, 4, 5, 6, 10, 12], 0).abs();
        } while (p1.add(p2).v() >= 0.95 || p1.d === p2.d);
        const rest = new Q(1).sub(p1).sub(p2);
        if (lvl === "a" && i === 1) {
          const pages = lcm(p1.d, p2.d) * R.int(4, 10);
          const left = rest.mul(pages);
          items.push(
            numAns(left, {
              q: t3(
                `В книге ${pages} страниц. В первый день прочитали ${fh(p1)} книги, во второй — ${fh(p2)}. Сколько страниц осталось?`,
                `Raamatus on ${pages} lehekülge. Esimesel päeval loeti ${fh(p1)} raamatust, teisel ${fh(p2)}. Mitu lehekülge jäi lugeda?`,
                `A book has ${pages} pages. On day one ${fh(p1)} of it was read, on day two ${fh(p2)}. How many pages are left?`,
              ),
              exp:
                P(`1 ${MINUS} ${fh(p1)} ${MINUS} ${fh(p2)} = ${fh(rest)}`) +
                P(`${fh(rest)} · ${pages} = ${qh(left)}`),
            }),
          );
        } else
          items.push(
            fracAns(rest, {
              q: t3(
                `В первый день прочитали ${fh(p1)} книги, во второй — ${fh(p2)}. Какую часть книги осталось прочитать?`,
                `Esimesel päeval loeti ${fh(p1)} raamatust, teisel ${fh(p2)}. Milline osa raamatust jäi lugeda?`,
                `On day one ${fh(p1)} of a book was read, on day two ${fh(p2)}. What part is left?`,
              ),
              exp:
                P(t3("Вся книга — это 1.", "Kogu raamat on 1.", "The whole book is 1.")) +
                P(`1 ${MINUS} ${fh(p1)} ${MINUS} ${fh(p2)} = ${fh(rest)}`),
            }),
          );
      }
      return { items };
    },
  },
};
