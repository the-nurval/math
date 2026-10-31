// 6 класс: общие помощники шаблонов заданий.
import { numHtml, q } from "../../core/index.js";

export const fh = v => numHtml(q(v), "mixed");

// дробь для показа: 1 2/3
const fp = v => {
  v = q(v);
  const n = Math.abs(v.n),
    d = v.d,
    s = v.n < 0 ? "-" : "";
  if (d === 1) return s + n;
  return n > d ? `${s}${Math.floor(n / d)} ${n % d}/${d}` : `${s}${n}/${d}`;
};

// несократимая дробь в ответе
export function fracAns(v, extra, mixed) {
  v = q(v);
  return Object.assign(
    {
      ans: { type: "frac", v: v.v(), mixed: !!mixed },
      show: mixed ? fh(v) : numHtml(v, "frac"),
      plain: mixed ? fp(v) : v.d === 1 ? String(v.n) : `${v.n}/${v.d}`,
    },
    extra || {},
  );
}

export const CMP = [
  [">", ">"],
  ["<", "<"],
  ["=", "="],
];

const pos = (R, lo, hi) => R.int(lo, hi);
