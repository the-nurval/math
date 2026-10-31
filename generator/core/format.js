// Вывод чисел и дробей в задании: HTML, текст ответа, десятичный разделитель по языку.
import { LANG, MINUS } from "./lang.js";
import { decPlaces, q } from "./rational.js";

function decSep() {
  return LANG === "en" ? "." : ",";
}

function grp(intStr) {
  // группировка разрядов для больших чисел
  if (intStr.length <= 4) return intStr;
  return intStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function decStr(v) {
  v = q(v);
  const k = decPlaces(v);
  if (k < 0) return null;
  const neg = v.n < 0;
  const n = Math.abs(v.n);
  const m = Math.pow(10, k) / v.d;
  const scaled = n * m;
  let ip = Math.floor(scaled / Math.pow(10, k)),
    fp = scaled % Math.pow(10, k);
  let s = grp(String(ip));
  if (k > 0) {
    let f = String(fp).padStart(k, "0").replace(/0+$/, "");
    if (f) s += decSep() + f;
  }
  return (neg ? MINUS : "") + s;
}

export function fracHtml(n, d) {
  return `<span class="fr"><span>${n}</span><span>${d}</span></span>`;
}

export function numHtml(v, mode) {
  v = q(v);
  if (v.isInt()) return (v.n < 0 ? MINUS : "") + grp(String(Math.abs(v.n)));
  const k = decPlaces(v);
  if (mode === "dec" && k >= 0) return decStr(v);
  if (mode === undefined || mode === "auto") {
    if (k >= 0 && k <= 3) return decStr(v);
  }
  const neg = v.n < 0,
    n = Math.abs(v.n),
    d = v.d;
  if (mode === "mixed" && n > d) {
    const w = Math.floor(n / d),
      r = n % d;
    return (neg ? MINUS : "") + w + fracHtml(r, d);
  }
  return (neg ? MINUS : "") + fracHtml(n, d);
}

export function plainOf(v) {
  // как ввёл бы ученик
  v = q(v);
  const k = decPlaces(v);
  if (k >= 0 && k <= 4) return decStr(v).replace(MINUS, "-").replace(/ /g, "");
  return (v.n < 0 ? "-" : "") + Math.abs(v.n) + "/" + v.d;
}

export function ansHtml(v) {
  // правильный ответ для показа
  v = q(v);
  const k = decPlaces(v);
  if (k >= 0 && k <= 4) return decStr(v);
  const approx = Math.round(v.v() * 100) / 100;
  return numHtml(v, "frac") + " ≈ " + decStr(q(approx));
}

/* значение с режимом отображения */
export function V(qv, m) {
  return { q: q(qv), m: m || "auto" };
}

export function vh(val, wrap) {
  const s = numHtml(val.q, val.m);
  return wrap && val.q.sgn() < 0 ? `(${s})` : s;
}

export function qh(x, wrap) {
  return vh(V(x), wrap);
}
