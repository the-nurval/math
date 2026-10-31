// Готовые фразы для заданий и ответ-число.
import { ansHtml, numHtml, plainOf, qh } from "./format.js";
import { MINUS, tr } from "./lang.js";
import { decPlaces, lcm, q } from "./rational.js";

export const T_ANS = { ru: "Ответ", et: "Vastus", en: "Answer" };

export function P(s) {
  return `<p>${s}</p>`;
}

export function expAddSub(a, op, b, mode) {
  const out = [];
  const B = op === "-" ? b.neg() : b;
  if (op === "-") {
    out.push(
      tr({
        ru: `Вычитание заменяем сложением с противоположным числом: ${numHtml(a, mode)} ${MINUS} ${qh(b, true)} = ${numHtml(a, mode)} + ${qh(B, true)}.`,
        et: `Lahutamise asendame vastandarvu liitmisega: ${numHtml(a, mode)} ${MINUS} ${qh(b, true)} = ${numHtml(a, mode)} + ${qh(B, true)}.`,
        en: `Replace subtraction with adding the opposite: ${numHtml(a, mode)} ${MINUS} ${qh(b, true)} = ${numHtml(a, mode)} + ${qh(B, true)}.`,
      }),
    );
  }
  if (
    !a.isInt() &&
    !B.isInt() &&
    mode !== "dec" &&
    (decPlaces(a) < 0 || decPlaces(B) < 0 || mode === "frac" || mode === "mixed")
  ) {
    const cd = lcm(a.d, B.d);
    out.push(
      tr({
        ru: `Общий знаменатель ${cd}.`,
        et: `Ühine nimetaja on ${cd}.`,
        en: `Common denominator: ${cd}.`,
      }),
    );
  }
  const s = a.add(B);
  const A1 = a.abs(),
    B1 = B.abs();
  if (a.sgn() * B.sgn() > 0) {
    out.push(
      tr({
        ru: `Знаки одинаковые: складываем модули ${numHtml(A1, mode)} + ${numHtml(B1, mode)} = ${numHtml(s.abs(), mode)} и ставим общий знак «${s.sgn() < 0 ? MINUS : "+"}».`,
        et: `Märgid on samad: liidame absoluutväärtused ${numHtml(A1, mode)} + ${numHtml(B1, mode)} = ${numHtml(s.abs(), mode)} ja paneme ühise märgi «${s.sgn() < 0 ? MINUS : "+"}».`,
        en: `Same signs: add the absolute values ${numHtml(A1, mode)} + ${numHtml(B1, mode)} = ${numHtml(s.abs(), mode)} and keep the common sign «${s.sgn() < 0 ? MINUS : "+"}».`,
      }),
    );
  } else {
    const big = A1.v() >= B1.v() ? A1 : B1,
      small = A1.v() >= B1.v() ? B1 : A1;
    out.push(
      tr({
        ru: `Знаки разные: из большего модуля вычитаем меньший: ${numHtml(big, mode)} ${MINUS} ${numHtml(small, mode)} = ${numHtml(s.abs(), mode)}. Знак берём у числа с большим модулем.`,
        et: `Märgid on erinevad: suuremast absoluutväärtusest lahutame väiksema: ${numHtml(big, mode)} ${MINUS} ${numHtml(small, mode)} = ${numHtml(s.abs(), mode)}. Märgi võtame suurema absoluutväärtusega arvult.`,
        en: `Different signs: subtract the smaller absolute value from the larger: ${numHtml(big, mode)} ${MINUS} ${numHtml(small, mode)} = ${numHtml(s.abs(), mode)}. Take the sign of the number with the larger absolute value.`,
      }),
    );
  }
  out.push(`${tr(T_ANS)}: ${numHtml(s, mode)}.`);
  return out.map(P).join("");
}

export function numAns(v, extra) {
  v = q(v);
  const o = Object.assign(
    {
      ans: { type: "num", v: v.v(), round: decPlaces(v) < 0 },
      show: ansHtml(v),
      plain: plainOf(v),
    },
    extra || {},
  );
  if (o.tol) {
    o.ans.tol = o.tol;
    delete o.tol;
  }
  return o;
}
