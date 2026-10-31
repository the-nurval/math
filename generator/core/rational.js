// Рациональные числа (точные дроби Q), НОД и НОК.
export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a || 1;
}

export function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

export class Q {
  constructor(n, d = 1) {
    if (d === 0) throw new Error("div0");
    if (d < 0) {
      n = -n;
      d = -d;
    }
    const g = gcd(n, d);
    this.n = n / g;
    this.d = d / g;
  }
  add(o) {
    o = q(o);
    return new Q(this.n * o.d + o.n * this.d, this.d * o.d);
  }
  sub(o) {
    o = q(o);
    return new Q(this.n * o.d - o.n * this.d, this.d * o.d);
  }
  mul(o) {
    o = q(o);
    return new Q(this.n * o.n, this.d * o.d);
  }
  div(o) {
    o = q(o);
    return new Q(this.n * o.d, this.d * o.n);
  }
  neg() {
    return new Q(-this.n, this.d);
  }
  abs() {
    return new Q(Math.abs(this.n), this.d);
  }
  v() {
    return this.n / this.d;
  }
  sgn() {
    return Math.sign(this.n);
  }
  isInt() {
    return this.d === 1;
  }
  eq(o) {
    o = q(o);
    return this.n === o.n && this.d === o.d;
  }
  pow(k) {
    let r = new Q(1);
    if (k >= 0) {
      for (let i = 0; i < k; i++) r = r.mul(this);
    } else {
      for (let i = 0; i < -k; i++) r = r.div(this);
    }
    return r;
  }
}

export function q(x) {
  if (x instanceof Q) return x;
  if (Number.isInteger(x)) return new Q(x, 1);
  const s = String(x);
  const p = (s.split(".")[1] || "").length;
  const m = Math.pow(10, p);
  return new Q(Math.round(x * m), m);
}

export function decPlaces(v) {
  v = q(v);
  let d = v.d,
    k = 0;
  while (d % 2 === 0) {
    d /= 2;
  }
  while (d % 5 === 0) {
    d /= 5;
  }
  if (d !== 1) return -1;
  let t = v.d;
  while (true) {
    if (Math.pow(10, k) % t === 0) return k;
    k++;
    if (k > 12) return -1;
  }
}
