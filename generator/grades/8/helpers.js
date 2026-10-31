// 8 класс: общие помощники шаблонов — многочлены, корни, системы, ответы-множества.
import { MINUS, Q, decStr, numAns, plainOf, q, qh, t3 } from "../../core/index.js";

export const m_ = () => t3("м", "m", "m");

// приближённый ответ: можно округлить до сотых
export function approxAns(x, extra) {
  const r = q(Math.round(x * 100) / 100);
  return Object.assign(
    { ans: { type: "num", v: x, tol: 0.006 }, show: "≈ " + decStr(r), plain: plainOf(r) },
    extra || {},
  );
}

// корень: точный, если извлекается, иначе приближённый
export function sqrtQ(v) {
  v = q(v);
  if (v.n < 0) return null;
  const a = Math.round(Math.sqrt(v.n)),
    b = Math.round(Math.sqrt(v.d));
  return a * a === v.n && b * b === v.d ? new Q(a, b) : null;
}

export function sqrtAns(v, extra) {
  const s = sqrtQ(v);
  return s ? numAns(s, extra) : approxAns(Math.sqrt(q(v).v()), extra);
}

export function sqrtShow(v) {
  const s = sqrtQ(v);
  return s ? qh(s) : "≈ " + decStr(q(Math.round(Math.sqrt(q(v).v()) * 100) / 100));
}

// несколько ответов через «;»
export function setAns(vals, extra) {
  vals = vals
    .filter(
      (v, i) =>
        vals.findIndex(
          w => (typeof w == "number" ? w : w.v()) === (typeof v == "number" ? v : v.v()),
        ) === i,
    )
    .sort((a, b) => (typeof a === "number" ? a : a.v()) - (typeof b === "number" ? b : b.v()));
  const sh = vals.map(v =>
      typeof v === "number" ? "≈ " + decStr(q(Math.round(v * 100) / 100)) : qh(v),
    ),
    pl = vals.map(v =>
      typeof v === "number" ? plainOf(q(Math.round(v * 100) / 100)) : plainOf(v),
    );
  return Object.assign(
    {
      pre: "x =",
      ans: { type: "set", vals: vals.map(v => (typeof v === "number" ? v : v.v())) },
      show: sh.join("; "),
      plain: pl.join("; "),
    },
    extra || {},
  );
}

const SUPD = "⁰¹²³⁴⁵⁶⁷⁸⁹";

export const sup = n =>
  n === 1
    ? ""
    : String(n)
        .split("")
        .map(d => SUPD[+d])
        .join("");

// член многочлена и сумма членов: pl([[3,"x²"],[-5,"x"],[2,""]]) → 3x² − 5x + 2
function term(c, v, first) {
  c = q(c);
  if (c.n === 0) return "";
  const a = c.abs();
  const cs = a.eq(1) && v ? "" : qh(a);
  return (c.sgn() < 0 ? (first ? MINUS : ` ${MINUS} `) : first ? "" : " + ") + cs + v;
}

export function pl(ts) {
  let s = "",
    f = true;
  ts.forEach(([c, v]) => {
    const t = term(c, v, f);
    if (t) {
      s += t;
      f = false;
    }
  });
  return s || "0";
}

export const par = v => (q(v).sgn() < 0 || !q(v).isInt() ? `(${qh(v)})` : qh(v));

// число в скобках, если оно отрицательное или дробное
export const sysH = (a, b) => `<span class="sys"><span>${a}</span><span>${b}</span></span>`;

export const xy = (a, b, c) =>
  `${pl([
    [a, "x"],
    [b, "y"],
  ])} = ${qh(c)}`;

export const lineEq = (k, b) =>
  `y = ${pl([
    [k, "x"],
    [b, ""],
  ])}`;

export const halves = (R, lo, hi) => new Q(R.int(lo * 2, hi * 2), 2);

/* --- Определения и доказательства, параллельные прямые --- */
export const deg = v => `${qh(v)}°`;

/* --- Теорема Пифагора --- */
export const TRIP = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
  [9, 40, 41],
  [6, 8, 10],
];

/* --- Площади многоугольников --- */
export const cm2 = () => t3("см²", "cm²", "cm²");
