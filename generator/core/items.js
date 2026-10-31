// Олимпиадная задача и доказательство как пункты работы.
import { qh } from "./format.js";
import { tr } from "./lang.js";
import { Q } from "./rational.js";
import { P, numAns } from "./text.js";

export function olyItem(o) {
  const sol = P(tr(o.s));
  if (o.type === "choice")
    return {
      olyId: o.id,
      q: tr(o.q),
      ans: { type: "choice", v: o.a },
      opts: o.opts.map(([k, l]) => [k, tr(l)]),
      show: tr(o.opts.find(x => x[0] === o.a)[1]),
      plain: o.a,
      exp: sol,
    };
  if (o.type === "set")
    return {
      olyId: o.id,
      q: tr(o.q),
      pre: "x =",
      ans: { type: "set", vals: o.a },
      show: o.a.map(v => qh(new Q(v))).join("; "),
      plain: o.a.join("; "),
      exp: sol,
    };
  const v = Array.isArray(o.a) ? new Q(o.a[0], o.a[1]) : new Q(o.a);
  return Object.assign(
    numAns(v, { olyId: o.id, q: tr(o.q), exp: sol }),
    o.unit ? { unit: tr(o.unit) } : {},
  );
}

export function proofItem(o) {
  return { olyId: o.id, q: tr(o.q), ans: { type: "self" }, show: "", plain: "", exp: P(tr(o.s)) };
}
