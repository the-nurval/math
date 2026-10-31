// Случайные числа для заданий: целые, десятичные, дроби.
import { Q, gcd } from "./rational.js";

export const DENS_N = [2, 3, 4, 5, 6, 8, 10];

export const DENS_A = [3, 4, 6, 7, 8, 9, 12, 15];

export function rInt(R, lo, hi) {
  return R.sign() * R.int(lo, hi);
}

export function rDec(R, places, maxInt) {
  // ненулевая десятичная с ровно places знаками
  const m = Math.pow(10, places);
  let n;
  do {
    n = R.int(1, maxInt * m);
  } while (n % 10 === 0 && places > 0);
  return new Q(R.sign() * n, m);
}

export function rFrac(R, dens, whole) {
  // правильная дробь (+целая часть)
  const d = R.pick(dens);
  let n;
  do {
    n = R.int(1, d - 1);
  } while (gcd(n, d) !== 1);
  const w = whole ? R.int(1, whole) : 0;
  return new Q(R.sign() * (w * d + n), d);
}
