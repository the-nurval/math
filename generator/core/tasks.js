// Помощники для шаблонов заданий: текст на трёх языках, ответ-выбор, единицы.
import { tr } from "./lang.js";
import { fracHtml } from "./format.js";

// O("…ru", "…et", "…en") — объект перевода (для названий тем и заданий); t3 — сразу текст на текущем языке
export const O = (ru, et, en) => ({ ru, et, en });

export const t3 = (ru, et, en) => tr({ ru, et, en });

export const FR = (n, d) => fracHtml(n, d);

export function choiceAns(v, opts, extra) {
  const o = opts.find(x => x[0] === v);
  return Object.assign({ ans: { type: "choice", v }, opts, show: o[1], plain: v }, extra || {});
}

export const YN = () => [
  ["y", t3("Да", "Jah", "Yes")],
  ["n", t3("Нет", "Ei", "No")],
];

export const cm = () => t3("см", "cm", "cm");
