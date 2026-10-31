// 6 класс, тема «Рациональные числа: ось, модуль, сравнение»: шаблоны заданий.
import { MINUS, O, P, Q, choiceAns, numAns, plainOf, qh, rDec, t3 } from "../../../core/index.js";
import { CMP } from "../helpers.js";

export default {
  /* ===== Рациональные числа: ось, модуль, сравнение ===== */
  axis: {
    topic: "g6ratn",
    pts: 1,
    cnt: { n: 4, a: 4 },
    title: O(
      "Числовая ось и модуль",
      "Arvtelg ja absoluutväärtus",
      "Number line and absolute value",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = ["opp", "abs", "dist", "dist"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 4];
        const x = lvl === "n" ? new Q(R.nz(-30, 30)) : rDec(R, 1, 15);
        if (k === "opp")
          items.push(
            numAns(x.neg(), {
              q: t3(
                `Число, противоположное числу ${qh(x)}`,
                `Arvu ${qh(x)} vastandarv`,
                `The opposite of ${qh(x)}`,
              ),
              exp: P(
                t3(
                  "Противоположное число отличается только знаком.",
                  "Vastandarv erineb ainult märgi poolest.",
                  "The opposite differs only in sign.",
                ),
              ),
            }),
          );
        else if (k === "abs")
          items.push(
            numAns(x.abs(), {
              q: `|${qh(x)}| =`,
              exp: P(
                t3(
                  "Модуль — расстояние от числа до нуля, он не бывает отрицательным.",
                  "Absoluutväärtus on kaugus nullist, see ei ole negatiivne.",
                  "Absolute value is the distance to zero, never negative.",
                ),
              ),
            }),
          );
        else {
          const a = lvl === "n" ? new Q(R.nz(-20, 0)) : rDec(R, 1, 9).abs().neg(),
            b = lvl === "n" ? new Q(R.int(1, 20)) : rDec(R, 1, 9);
          const d = b.sub(a).abs();
          items.push(
            numAns(d, {
              q: t3(
                `Расстояние между точками A(${qh(a)}) и B(${qh(b)})`,
                `Punktide A(${qh(a)}) ja B(${qh(b)}) vaheline kaugus`,
                `Distance between A(${qh(a)}) and B(${qh(b)})`,
              ),
              exp: P(`|${qh(b)} ${MINUS} ${qh(a, true)}| = ${qh(d)}`),
            }),
          );
        }
      }
      return { items };
    },
  },

  absCmp: {
    topic: "g6ratn",
    pts: 1,
    cnt: { n: 3, a: 4 },
    title: O("Сравни числа (>, < или =)", "Võrdle arve (>, < või =)", "Compare (>, < or =)"),
    gen(R, lvl, cnt) {
      const items = [];
      for (let i = 0; i < cnt; i++) {
        if (lvl === "a" && i === 3) {
          const a = rDec(R, 1, 9).abs();
          items.push({
            ans: { type: "set", vals: [a.v(), -a.v()] },
            show: `${qh(a)}; ${qh(a.neg())}`,
            plain: `${plainOf(a)}; ${plainOf(a.neg())}`,
            q: `|x| = ${qh(a)}`,
            pre: "x =",
            hint: t3(
              "два ответа через «;»",
              "kaks vastust, eralda «;»",
              "two answers separated by «;»",
            ),
            exp: P(
              t3(
                `На расстоянии ${qh(a)} от нуля две точки.`,
                `Nullist kaugusel ${qh(a)} on kaks punkti.`,
                `Two points are ${qh(a)} away from zero.`,
              ),
            ),
          });
          continue;
        }
        let a = lvl === "n" ? new Q(R.nz(-40, 20)) : rDec(R, 2, 9),
          b = lvl === "n" ? new Q(R.nz(-40, 20)) : rDec(R, 2, 9);
        let A = a,
          B = b,
          qa = qh(a),
          qb = qh(b);
        if (lvl === "a" && i === 2) {
          A = a.abs();
          qa = `|${qh(a)}|`;
        }
        const v = A.v() > B.v() ? ">" : A.v() < B.v() ? "<" : "=";
        items.push(
          choiceAns(v, CMP, {
            q: `${qa} ☐ ${qb}`,
            exp:
              P(
                t3(
                  "Из двух чисел больше то, что правее на числовой оси; из двух отрицательных больше то, у которого модуль меньше.",
                  "Kahest arvust on suurem see, mis asub arvteljel paremal; kahest negatiivsest on suurem see, mille absoluutväärtus on väiksem.",
                  "The larger number lies further right; of two negatives, the one with the smaller absolute value is larger.",
                ),
              ) + P(`${qa} ${v} ${qb}`),
          }),
        );
      }
      return { items };
    },
  },
};
