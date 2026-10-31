// 6 класс, тема «Повторение 5 класса»: шаблоны заданий.
import { L, N, O, P, Q, evalE, numAns, qh, rDec, renderE, t3 } from "../../../core/index.js";

export default {
  /* ===== Повторение 5 класса ===== */
  dec5: {
    topic: "g6r5",
    pts: 1,
    cnt: { n: 4, a: 4 },
    title: O("Вычисли", "Arvuta", "Calculate"),
    gen(R, lvl, cnt) {
      const items = [];
      const ops = R.shuffle(["+", "-", "*", ":"]);
      for (let i = 0; i < cnt; i++) {
        const op = ops[i % 4];
        let a, b;
        if (op === ":") {
          const qt = rDec(R, 1, lvl === "n" ? 9 : 30).abs();
          b = lvl === "n" ? new Q(R.int(2, 9)) : rDec(R, 1, 4).abs();
          a = qt.mul(b);
        } else if (op === "*") {
          a = rDec(R, lvl === "n" ? 1 : 2, lvl === "n" ? 9 : 20).abs();
          b = lvl === "n" ? new Q(R.int(2, 9)) : rDec(R, 1, 9).abs();
        } else {
          a = rDec(R, lvl === "n" ? 1 : 2, lvl === "n" ? 30 : 80).abs();
          b = rDec(R, lvl === "n" ? 2 : 3, lvl === "n" ? 20 : 40).abs();
          if (op === "-" && a.v() < b.v()) [a, b] = [b, a];
        }
        const e = N(op, L(a, "dec"), L(b, "dec"));
        const r = evalE(e);
        const tip =
          op === ":"
            ? t3(
                "При делении на десятичную дробь переносим запятую в делимом и делителе на одинаковое число знаков вправо.",
                "Kümnendmurruga jagamisel nihutame jagatavas ja jagajas koma sama arvu kohtade võrra paremale.",
                "When dividing by a decimal, move the point in both numbers the same number of places to the right.",
              )
            : op === "*"
              ? t3(
                  "Умножаем как целые числа, затем отделяем столько знаков после запятой, сколько их в обоих множителях вместе.",
                  "Korrutame nagu täisarve ja eraldame komaga nii mitu kohta, kui palju on mõlemas teguris kokku.",
                  "Multiply as whole numbers, then count the decimal places of both factors together.",
                )
              : t3(
                  "Записываем числа запятая под запятой и считаем поразрядно.",
                  "Kirjutame arvud koma koma alla ja arvutame järkude kaupa.",
                  "Line up the decimal points and work place by place.",
                );
        items.push(numAns(r, { q: renderE(e), exp: P(tip) + P(`${renderE(e)} = ${qh(r)}`) }));
      }
      return { items };
    },
  },
};
