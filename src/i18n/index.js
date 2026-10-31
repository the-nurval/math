// Тексты интерфейса на трёх языках: i18n/<язык>/<раздел>.js.
// U — тексты текущего языка; меняются только через useLang (импорт U всегда видит актуальный язык).
import ru from "./ru/index.js";
import et from "./et/index.js";
import en from "./en/index.js";

export const UI = { ru, et, en };
export let U = UI.ru;
export function useLang(lang) {
  U = UI[lang];
}

// подписи уровней и буквы пунктов заданий
export const LV = { n: "Easy", a: "Medium", o: "Hard" };
export const LETTERS = { ru: "абвгдежзиклм", et: "abcdefghijkl", en: "abcdefghijkl" };
