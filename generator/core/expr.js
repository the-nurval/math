// Арифметические выражения: построение, вычисление, вывод и пошаговое решение.
import { V, numHtml, vh } from "./format.js";
import { LANG, MINUS } from "./lang.js";

const OPS = {
  "+": { p: 1, s: "+" },
  "-": { p: 1, s: MINUS },
  "*": { p: 2, s: "·" },
  ":": { p: 2, s: ":" },
};

export function opSym(op) {
  if (op === ":" && LANG === "en") return "÷";
  return OPS[op].s;
}

export function L(v, m) {
  return { v: V(v, m) };
}

export function N(op, a, b) {
  return { op, a, b };
}

export function evalE(e) {
  if (e.v) return e.v.q;
  const a = evalE(e.a),
    b = evalE(e.b);
  switch (e.op) {
    case "+":
      return a.add(b);
    case "-":
      return a.sub(b);
    case "*":
      return a.mul(b);
    case ":":
      return a.div(b);
  }
}

export function renderE(e, lead = true) {
  if (e.v) return vh(e.v, !lead);
  const p = OPS[e.op].p;
  const wa = !e.a.v && OPS[e.a.op].p < p;
  const wb =
    !e.b.v && (OPS[e.b.op].p < p || (OPS[e.b.op].p === p && (e.op === "-" || e.op === ":")));
  const A = wa ? `(${renderE(e.a, true)})` : renderE(e.a, lead);
  const B = wb ? `(${renderE(e.b, true)})` : renderE(e.b, false);
  return `${A} ${opSym(e.op)} ${B}`;
}

export function stepsE(e, mode, out) {
  // пошагово, возвращает значение
  if (e.v) return e.v.q;
  const a = stepsE(e.a, mode, out),
    b = stepsE(e.b, mode, out);
  const r = evalE({ op: e.op, a: { v: V(a) }, b: { v: V(b) } });
  out.push(
    `${numHtml(a, mode)} ${opSym(e.op)} ${a.sgn() >= 0 || true ? "" : ""}${b.sgn() < 0 ? "(" + numHtml(b, mode) + ")" : numHtml(b, mode)} = ${numHtml(r, mode)}`,
  );
  return r;
}

export function stepList(arr) {
  return arr.map((s, i) => `<p>${i + 1}) ${s}</p>`).join("");
}
