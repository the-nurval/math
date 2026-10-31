// 6 класс, тема «Умножение и деление дробей»: шаблоны заданий.
import {
  L,
  MINUS,
  N,
  O,
  P,
  Q,
  T_ANS,
  evalE,
  numAns,
  numHtml,
  qh,
  rFrac,
  renderE,
  stepList,
  stepsE,
  t3,
  tr,
} from "../../../core/index.js";
import { fh } from "../helpers.js";

export default {
  /* ===== Умножение и деление дробей ===== */
  fracMulDiv: {
    topic: "g6fmul",
    pts: 1,
    cnt: { n: 5, a: 5 },
    title: O("Вычисли", "Arvuta", "Calculate"),
    gen(R, lvl, cnt) {
      const items = [];
      const D = lvl === "n" ? [2, 3, 4, 5, 6, 8, 9] : [3, 4, 5, 6, 7, 8, 9, 12];
      for (let i = 0; i < cnt; i++) {
        const op = i % 2 ? ":" : "*";
        let a, b;
        if (lvl === "n" && i === 4) {
          a = rFrac(R, D, 0).abs();
          b = new Q(R.int(2, 12));
        } else {
          a = rFrac(R, D, lvl === "n" ? 0 : 3).abs();
          b = rFrac(R, D, lvl === "n" ? 0 : 2).abs();
        }
        const e = N(op, L(a, "mixed"), L(b, b.isInt() ? "auto" : "mixed"));
        const r = evalE(e);
        const ex =
          op === "*"
            ? t3(
                "Смешанные числа записываем неправильными дробями, перемножаем числители и знаменатели, сокращаем.",
                "Segaarvud kirjutame liigmurdudena, korrutame lugejad ja nimetajad ning taandame.",
                "Write mixed numbers as improper fractions, multiply tops and bottoms, simplify.",
              )
            : t3(
                `Деление заменяем умножением на обратную дробь: ${fh(b)} → ${numHtml(new Q(b.d, b.n), "frac")}.`,
                `Jagamise asendame pöördarvuga korrutamisega: ${fh(b)} → ${numHtml(new Q(b.d, b.n), "frac")}.`,
                `Replace division by multiplying by the reciprocal: ${fh(b)} → ${numHtml(new Q(b.d, b.n), "frac")}.`,
              );
        items.push(numAns(r, { q: renderE(e), exp: P(ex) + P(`${tr(T_ANS)}: ${fh(r)}`) }));
      }
      return { items };
    },
  },

  fracOf: {
    topic: "g6fmul",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O(
      "Дробь от числа и число по дроби",
      "Murd arvust ja arv murru järgi",
      "Fraction of a number",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const kinds = ["of", "by", "rest"];
      for (let i = 0; i < cnt; i++) {
        const k = kinds[i % 3];
        let f;
        do {
          f = rFrac(R, [3, 4, 5, 6, 7, 8, 9], 0).abs();
        } while (f.n === f.d);
        if (k === "of") {
          const n = f.d * R.int(3, lvl === "n" ? 12 : 25);
          const r = f.mul(n);
          items.push(
            numAns(r, {
              q: t3(`${fh(f)} от ${n}`, `${fh(f)} arvust ${n}`, `${fh(f)} of ${n}`),
              exp:
                P(
                  t3(
                    "Чтобы найти дробь от числа, умножаем число на эту дробь.",
                    "Murru leidmiseks arvust korrutame arvu selle murruga.",
                    "To find a fraction of a number, multiply by the fraction.",
                  ),
                ) + P(`${n} · ${fh(f)} = ${qh(r)}`),
            }),
          );
        } else if (k === "by") {
          const n = f.d * R.int(3, lvl === "n" ? 12 : 25);
          const part = f.mul(n);
          items.push(
            numAns(n, {
              q: t3(
                `${fh(f)} числа равны ${qh(part)}. Найди число.`,
                `${fh(f)} arvust on ${qh(part)}. Leia arv.`,
                `${fh(f)} of a number is ${qh(part)}. Find the number.`,
              ),
              exp:
                P(
                  t3(
                    "Чтобы найти число по его дроби, делим на эту дробь.",
                    "Arvu leidmiseks tema murru järgi jagame selle murruga.",
                    "To find a number from its fraction, divide by the fraction.",
                  ),
                ) + P(`${qh(part)} : ${fh(f)} = ${n}`),
            }),
          );
        } else {
          const n = f.d * R.int(3, 8);
          const girls = f.mul(n);
          items.push(
            numAns(new Q(n).sub(girls), {
              q: t3(
                `В классе ${n} учеников, ${fh(f)} из них — девочки. Сколько в классе мальчиков?`,
                `Klassis on ${n} õpilast, neist ${fh(f)} on tüdrukud. Mitu poissi on klassis?`,
                `A class has ${n} students, ${fh(f)} of them are girls. How many boys are there?`,
              ),
              exp: P(
                `${n} · ${fh(f)} = ${qh(girls)}; ${n} ${MINUS} ${qh(girls)} = ${n - girls.v()}`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },

  fracExpr: {
    topic: "g6fmul",
    pts: 3,
    cnt: { n: 2, a: 3 },
    title: O("Найди значение выражения", "Leia avaldise väärtus", "Evaluate"),
    gen(R, lvl, cnt) {
      const items = [];
      const sh = R.shuffle(["A", "B", "C"]);
      for (let i = 0; i < cnt; i++) {
        const D = [2, 3, 4, 5, 6, 8];
        const f = () => rFrac(R, D, lvl === "n" ? 0 : 2).abs();
        let e;
        if (sh[i % 3] === "A")
          e = N("*", N("+", L(f(), "mixed"), L(f(), "mixed")), L(new Q(R.int(2, 12)), "auto"));
        else if (sh[i % 3] === "B") {
          const a = f(),
            b = f();
          e = N("-", N(":", L(a, "mixed"), L(b, "mixed")), L(rFrac(R, [2, 3, 4], 0).abs(), "frac"));
          if (evalE(e).sgn() < 0) e = N("+", e.a, e.b);
        } else e = N(":", N("-", L(new Q(R.int(2, 5)), "auto"), L(f(), "mixed")), L(f(), "mixed"));
        if (evalE(e).sgn() < 0) {
          i--;
          continue;
        }
        const st = [];
        const r = stepsE(e, "mixed", st);
        items.push(
          numAns(r, {
            q: renderE(e),
            exp:
              P(
                t3(
                  "Сначала скобки, затем умножение и деление, потом сложение и вычитание.",
                  "Kõigepealt sulud, siis korrutamine ja jagamine, lõpuks liitmine ja lahutamine.",
                  "Brackets first, then × and ÷, then + and −.",
                ),
              ) + stepList(st),
          }),
        );
      }
      return { items };
    },
  },
};
