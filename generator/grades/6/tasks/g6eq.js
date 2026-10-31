// 6 класс, тема «Уравнения: скобки, подобные слагаемые, задачи»: шаблоны заданий.
import { MINUS, O, P, Q, numAns, q, qh, rFrac, stepList, t3 } from "../../../core/index.js";
import { fh } from "../helpers.js";

export default {
  /* ===== Уравнения ===== */
  brackets: {
    topic: "g6eq",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O(
      "Упрости выражение и найди его значение",
      "Lihtsusta avaldis ja leia selle väärtus",
      "Simplify and evaluate",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        const a = R.nz(-6, 6),
          b = R.nz(-9, 9),
          c = R.nz(-6, 6),
          d = R.nz(-9, 9);
        if (a + c === 0) {
          i--;
          continue;
        }
        const x = lvl === "n" ? new Q(R.nz(-10, 10)) : rFrac(R, [2, 3, 4, 5], 0);
        const k = a + c,
          m = a * b + c * d;
        const term = (co, sgnFirst) =>
          `${co < 0 ? MINUS + " " : sgnFirst ? "" : "+ "}${Math.abs(co) === 1 ? "" : Math.abs(co)}`;
        const brk = (co, bb, first) =>
          `${co < 0 ? (first ? MINUS : MINUS + " ") : first ? "" : "+ "}${Math.abs(co)}(x ${bb < 0 ? MINUS : "+"} ${Math.abs(bb)})`;
        const expr = `${brk(a, b, true)} ${brk(c, d, false)}`;
        const simp = `${k === 1 ? "" : k === -1 ? MINUS : k}x ${m < 0 ? MINUS : "+"} ${Math.abs(m)}`;
        const val = x.mul(k).add(m);
        items.push(
          numAns(val, {
            q: t3(
              `${expr} при x = ${fh(x)}`,
              `${expr}, kui x = ${fh(x)}`,
              `${expr} when x = ${fh(x)}`,
            ),
            exp:
              P(
                t3(
                  "Раскрываем скобки и приводим подобные слагаемые:",
                  "Avame sulud ja koondame sarnased liikmed:",
                  "Expand the brackets and collect like terms:",
                ),
              ) +
              P(`${expr} = ${simp}`) +
              P(
                `${k < 0 ? MINUS + Math.abs(k) : k} · ${x.sgn() < 0 ? "(" + fh(x) + ")" : fh(x)} ${m < 0 ? MINUS : "+"} ${Math.abs(m)} = ${fh(val)}`,
              ),
          }),
        );
      }
      return { items };
    },
  },

  eqLin: {
    topic: "g6eq",
    pts: 3,
    cnt: { n: 3, a: 4 },
    title: O("Реши уравнение", "Lahenda võrrand", "Solve the equation"),
    gen(R, lvl, cnt) {
      const items = [];
      const forms = R.shuffle(["ax+b=c", "a(x+b)=c", "ax+b=cx+d", "a(x+b)=c(x+d)"]);
      for (let i = 0; i < cnt; i++) {
        const f = forms[i % 4];
        const x = lvl === "n" ? new Q(R.nz(-12, 12)) : rFrac(R, [2, 3, 4, 5], 2);
        let qq, steps;
        const co = v => (v === 1 ? "" : v === -1 ? MINUS : v < 0 ? MINUS + Math.abs(v) : String(v));
        const dv = v => (v < 0 ? `(${MINUS}${Math.abs(v)})` : String(v));
        const sg = v => (v < 0 ? `${MINUS} ${Math.abs(v)}` : `+ ${v}`);
        if (f === "ax+b=c") {
          const a = R.nz(-9, 9),
            b = R.nz(-20, 20);
          const c = x.mul(a).add(b);
          qq = `${co(a)}x ${sg(b)} = ${fh(c)}`;
          steps = [
            `${co(a)}x = ${fh(c)} ${b < 0 ? "+" : MINUS} ${Math.abs(b)} = ${fh(c.sub(b))}`,
            `x = ${fh(c.sub(b))} : ${dv(a)} = ${fh(x)}`,
          ];
        } else if (f === "a(x+b)=c") {
          const a = R.nz(-7, 7),
            b = R.nz(-9, 9);
          const c = x.add(b).mul(a);
          qq = `${co(a)}(x ${sg(b)}) = ${fh(c)}`;
          steps = [`x ${sg(b)} = ${fh(c)} : ${dv(a)} = ${fh(c.div(a))}`, `x = ${fh(x)}`];
        } else if (f === "ax+b=cx+d") {
          let a, c;
          do {
            a = R.nz(-9, 9);
            c = R.nz(-9, 9);
          } while (a === c);
          const b = R.nz(-15, 15);
          const d = x.mul(a - c).add(b);
          qq = `${co(a)}x ${sg(b)} = ${co(c)}x ${d.sgn() < 0 ? MINUS : "+"} ${fh(d.abs())}`;
          steps = [
            `${co(a)}x ${c < 0 ? "+" : MINUS} ${Math.abs(c)}x = ${fh(d)} ${b < 0 ? "+" : MINUS} ${Math.abs(b)}`,
            `${co(a - c)}x = ${fh(d.sub(b))}`,
            `x = ${fh(x)}`,
          ];
        } else {
          let a, c;
          do {
            a = R.nz(-6, 6);
            c = R.nz(-6, 6);
          } while (a === c);
          const b = R.nz(-8, 8);
          const d0 = x.add(b).mul(a).sub(x.mul(c)).div(c);
          if (!d0.isInt() && lvl === "n") {
            i--;
            continue;
          }
          qq = `${co(a)}(x ${sg(b)}) = ${co(c)}(x ${d0.sgn() < 0 ? MINUS : "+"} ${fh(d0.abs())})`;
          steps = [
            t3(
              "Раскрываем скобки, переносим x влево, числа вправо.",
              "Avame sulud, viime x-id vasakule, arvud paremale.",
              "Expand, move x terms left, numbers right.",
            ),
            `x = ${fh(x)}`,
          ];
        }
        items.push(
          numAns(x, {
            q: qq,
            pre: "x =",
            exp:
              stepList(steps) +
              P(
                t3(
                  "Проверка: подставь корень в уравнение.",
                  "Kontroll: aseta lahend võrrandisse.",
                  "Check: substitute the root.",
                ),
              ),
          }),
        );
      }
      return { items };
    },
  },

  eqWord: {
    topic: "g6eq",
    pts: 4,
    cnt: { n: 1, a: 2 },
    title: O(
      "Реши задачу с помощью уравнения",
      "Lahenda ülesanne võrrandi abil",
      "Solve with an equation",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const kinds = R.shuffle(lvl === "n" ? ["sum", "times"] : ["sum", "times", "move", "age"]);
      for (let i = 0; i < cnt; i++) {
        const k = kinds[i % kinds.length];
        if (k === "sum") {
          const x = R.int(12, 60),
            d = R.int(4, 25);
          items.push(
            numAns(x, {
              q: t3(
                `Сумма двух чисел ${2 * x + d}, одно больше другого на ${d}. Найди меньшее число.`,
                `Kahe arvu summa on ${2 * x + d}, üks on teisest ${d} võrra suurem. Leia väiksem arv.`,
                `Two numbers add up to ${2 * x + d}; one is ${d} more than the other. Find the smaller.`,
              ),
              exp: P(`x + (x + ${d}) = ${2 * x + d}; 2x = ${2 * x}; x = ${x}`),
            }),
          );
        } else if (k === "times") {
          const x = R.int(6, 30),
            m = R.int(2, 5);
          items.push(
            numAns(x, {
              q: t3(
                `В двух корзинах ${x * (m + 1)} яблок, в первой в ${m} раза больше, чем во второй. Сколько яблок во второй корзине?`,
                `Kahes korvis on ${x * (m + 1)} õuna, esimeses ${m} korda rohkem kui teises. Mitu õuna on teises korvis?`,
                `Two baskets hold ${x * (m + 1)} apples; the first has ${m} times as many as the second. How many are in the second?`,
              ),
              exp: P(`x + ${m}x = ${x * (m + 1)}; ${m + 1}x = ${x * (m + 1)}; x = ${x}`),
            }),
          );
        } else if (k === "move") {
          const v1 = R.int(10, 18),
            v2 = v1 + R.int(2, 6),
            t = R.pick([2, 3, new Q(3, 2), new Q(5, 2)]);
          const s = q(t).mul(v1 + v2);
          items.push(
            numAns(q(t), {
              unit: t3("ч", "h", "h"),
              q: t3(
                `Из двух сёл, расстояние между которыми ${qh(s)} км, навстречу друг другу выехали два велосипедиста со скоростями ${v1} км/ч и ${v2} км/ч. Через сколько часов они встретятся?`,
                `Kahest külast, mille vahemaa on ${qh(s)} km, sõitsid teineteisele vastu kaks jalgratturit kiirustega ${v1} km/h ja ${v2} km/h. Mitme tunni pärast nad kohtuvad?`,
                `Two cyclists ride towards each other from villages ${qh(s)} km apart at ${v1} km/h and ${v2} km/h. After how many hours do they meet?`,
              ),
              exp: P(`(${v1} + ${v2}) · t = ${qh(s)}; t = ${qh(s)} : ${v1 + v2} = ${qh(q(t))}`),
            }),
          );
        } else {
          const son = R.int(6, 14),
            diff = R.int(22, 32);
          const y = R.int(2, 8);
          /* через y лет отец старше в m раз — подбираем */ let m = null;
          for (const mm of [2, 3, 4]) {
            if ((son + y) * mm === son + diff + y) {
              m = mm;
            }
          }
          if (!m) {
            const s2 = R.int(4, 12),
              mm = 3;
            const dd = 2 * (s2 + 4);
            items.push(
              numAns(s2, {
                q: t3(
                  `Отец старше сына на ${dd} лет. Через 4 года он будет старше сына в ${mm} раза. Сколько лет сыну сейчас?`,
                  `Isa on pojast ${dd} aastat vanem. 4 aasta pärast on ta pojast ${mm} korda vanem. Kui vana on poeg praegu?`,
                  `A father is ${dd} years older than his son. In 4 years he will be ${mm} times as old. How old is the son now?`,
                ),
                exp: P(
                  `${mm}(x + 4) = x + ${dd} + 4; ${mm}x + ${mm * 4} = x + ${dd + 4}; ${mm - 1}x = ${dd + 4 - mm * 4}; x = ${s2}`,
                ),
              }),
            );
          } else
            items.push(
              numAns(son, {
                q: t3(
                  `Отец старше сына на ${diff} лет. Через ${y} года он будет старше сына в ${m} раза. Сколько лет сыну сейчас?`,
                  `Isa on pojast ${diff} aastat vanem. ${y} aasta pärast on ta pojast ${m} korda vanem. Kui vana on poeg praegu?`,
                  `A father is ${diff} years older than his son. In ${y} years he will be ${m} times as old. How old is the son now?`,
                ),
                exp: P(`${m}(x + ${y}) = x + ${diff} + ${y}; x = ${son}`),
              }),
            );
        }
      }
      return { items };
    },
  },
};
