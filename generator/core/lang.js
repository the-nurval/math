// Язык генератора: текущий язык и выбор текста из { ru, et, en }.
export let LANG = "ru";

export const MINUS = "−";

export function setLang(l) {
  LANG = l;
}

export function tr(o) {
  return o[LANG] !== undefined ? o[LANG] : o.ru;
}

export function curLang() {
  return LANG;
}
