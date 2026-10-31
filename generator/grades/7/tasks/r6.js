// 7 класс, тема «Повторение 6 класса»: шаблоны заданий.
import {
  L,
  MINUS,
  N,
  P,
  Q,
  T_ANS,
  curLang,
  decPlaces,
  decStr,
  evalE,
  lcm,
  numAns,
  numHtml,
  qh,
  rFrac,
  renderE,
  tr,
} from "../../../core/index.js";

export default {
  /* --- Повторение 6 класса --- */
  frac6: {
    topic: "r6",
    pts: 1,
    cnt: { n: 4, a: 4 },
    title: {
      ru: "Действия с обыкновенными дробями",
      et: "Tehted harilike murdudega",
      en: "Operations with fractions",
    },
    gen(R, lvl, cnt) {
      const items = [];
      const ops = R.shuffle(["+", "-", "*", ":"]);
      for (let i = 0; i < cnt; i++) {
        const op = ops[i % 4];
        const D = lvl === "n" ? [2, 3, 4, 5, 6, 8, 9, 10, 12] : [6, 7, 8, 9, 12, 14, 15];
        let a = rFrac(R, D, op === "*" || op === ":" ? 2 : 4).abs(),
          b = rFrac(R, D, op === "*" || op === ":" ? 1 : 3).abs();
        if (op === "-" && a.v() < b.v()) [a, b] = [b, a];
        const e = N(op, L(a, "mixed"), L(b, b.v() > 1 ? "mixed" : "frac"));
        const r = evalE(e);
        const ex =
          op === "+" || op === "-"
            ? P(
                tr({
                  ru: `Приводим к общему знаменателю ${lcm(a.d, b.d)} и ${op === "+" ? "складываем" : "вычитаем"}.`,
                  et: `Viime ühisele nimetajale ${lcm(a.d, b.d)} ja ${op === "+" ? "liidame" : "lahutame"}.`,
                  en: `Use the common denominator ${lcm(a.d, b.d)} and ${op === "+" ? "add" : "subtract"}.`,
                }),
              )
            : op === "*"
              ? P(
                  tr({
                    ru: "Смешанные числа переводим в неправильные дроби и перемножаем числители и знаменатели.",
                    et: "Segaarvud teisendame liigmurdudeks ja korrutame lugejad ja nimetajad.",
                    en: "Turn mixed numbers into improper fractions, multiply numerators and denominators.",
                  }),
                )
              : P(
                  tr({
                    ru: "Деление заменяем умножением на обратное число.",
                    et: "Jagamise asendame pöördarvuga korrutamisega.",
                    en: "Replace division with multiplication by the reciprocal.",
                  }),
                );
        items.push(
          numAns(r, {
            q: renderE(e),
            exp:
              ex +
              P(
                `${tr(T_ANS)}: ${numHtml(r, "mixed")}${decPlaces(r) >= 0 && !r.isInt() ? " = " + decStr(r) : ""}`,
              ),
          }),
        );
      }
      return { items };
    },
  },

  circle6: {
    topic: "r6",
    pts: 2,
    cnt: { n: 2, a: 2 },
    title: {
      ru: "Окружность и круг (π ≈ 3,14)",
      et: "Ringjoon ja ring (π ≈ 3,14)",
      en: "Circles (π ≈ 3.14)",
    },
    gen(R, lvl, cnt) {
      const r = new Q(R.int(15, 95), 10);
      const pi = new Q(314, 100);
      const cm = tr({ ru: "см", et: "cm", en: "cm" });
      const C = pi.mul(r).mul(2),
        S = pi.mul(r).mul(r);
      const Sr = new Q(Math.round(S.v() * 100), 100);
      const intro = tr({
        ru: `Радиус круга ${qh(r)} см.`,
        et: `Ringi raadius on ${qh(r)} cm.`,
        en: `The radius of a circle is ${qh(r)} cm.`,
      });
      const items = [
        numAns(C, {
          tol: 0.05,
          unit: cm,
          q: tr({ ru: "Длина окружности", et: "Ringjoone pikkus", en: "Circumference" }),
          pre: "C =",
          exp: P(
            `C = 2πr = 2 · 3,14 · ${qh(r)} = ${qh(C)} ${cm}`.replace(
              "3,14",
              curLang() === "en" ? "3.14" : "3,14",
            ),
          ),
        }),
        numAns(Sr, {
          tol: 0.06,
          unit: cm + "²",
          q: tr({
            ru: "Площадь круга (округли до сотых)",
            et: "Ringi pindala (ümarda sajandikeni)",
            en: "Area (round to hundredths)",
          }),
          pre: "S =",
          exp: P(
            `S = πr² = 3,14 · ${qh(r)}² ≈ ${qh(Sr)} ${cm}²`.replace(
              "3,14",
              curLang() === "en" ? "3.14" : "3,14",
            ),
          ),
        }),
      ];
      return { intro, items: items.slice(0, cnt) };
    },
  },

  tri6: {
    topic: "r6",
    pts: 1,
    cnt: { n: 2, a: 2 },
    title: { ru: "Углы треугольника", et: "Kolmnurga nurgad", en: "Angles of a triangle" },
    gen(R, lvl, cnt) {
      const items = [];
      const a = new Q(R.int(250, 800), 10),
        b = new Q(R.int(200, 700), 10);
      const c = new Q(180).sub(a).sub(b);
      items.push(
        numAns(c, {
          unit: "°",
          q: tr({
            ru: `Два угла треугольника ${qh(a)}° и ${qh(b)}°. Найди третий угол.`,
            et: `Kolmnurga kaks nurka on ${qh(a)}° ja ${qh(b)}°. Leia kolmas nurk.`,
            en: `Two angles of a triangle are ${qh(a)}° and ${qh(b)}°. Find the third.`,
          }),
          exp: P(`180° ${MINUS} ${qh(a)}° ${MINUS} ${qh(b)}° = ${qh(c)}°`),
        }),
      );
      if (cnt > 1) {
        const base = new Q(R.int(305, 845), 10);
        const top = new Q(180).sub(base.mul(2));
        items.push(
          numAns(top, {
            unit: "°",
            q: tr({
              ru: `Угол при основании равнобедренного треугольника ${qh(base)}°. Найди угол при вершине.`,
              et: `Võrdhaarse kolmnurga alusnurk on ${qh(base)}°. Leia tipunurk.`,
              en: `A base angle of an isosceles triangle is ${qh(base)}°. Find the apex angle.`,
            }),
            exp: P(`180° ${MINUS} 2 · ${qh(base)}° = ${qh(top)}°`),
          }),
        );
      }
      return { items };
    },
  },
};
