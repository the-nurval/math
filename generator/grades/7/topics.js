// 7 класс: темы по неделям (start — школьная программа), цвет и шаблоны темы.
export const TOPICS = [
  {
    id: "r6",
    start: -1,
    name: { ru: "Повторение 6 класса", et: "6. klassi kordamine", en: "Grade 6 review" },
    tpl: ["frac6", "circle6", "tri6"],
  },
  {
    id: "rat",
    start: 0,
    name: { ru: "Рациональные числа", et: "Ratsionaalarvud", en: "Rational numbers" },
    tpl: ["addsub", "muldiv", "order", "simpleEq", "signedWord"],
  },
  {
    id: "dist",
    start: 4,
    name: {
      ru: "Модуль, расстояние на числовой оси",
      et: "Absoluutväärtus, kaugus arvteljel",
      en: "Absolute value, distance on the number line",
    },
    tpl: ["dist", "abs"],
  },
  {
    id: "pow",
    start: 8,
    name: { ru: "Степени", et: "Astmed", en: "Powers" },
    tpl: ["pow", "powRules"],
  },
  {
    id: "std",
    start: 11,
    name: {
      ru: "Нулевая и отрицательная степень, стандартный вид",
      et: "Null- ja negatiivne astendaja, standardkuju",
      en: "Zero and negative exponents, scientific notation",
    },
    tpl: ["negExp", "std"],
  },
  {
    id: "pct",
    start: 13,
    name: {
      ru: "Проценты, промилле, процентный пункт",
      et: "Protsent, promill, protsendipunkt",
      en: "Percent, per mille, percentage points",
    },
    tpl: ["pctBasic", "pctChange"],
  },
  {
    id: "eq",
    start: 16,
    name: {
      ru: "Линейные уравнения, пропорция",
      et: "Lineaarvõrrand, võrre",
      en: "Linear equations, proportions",
    },
    tpl: ["linEq", "prop"],
  },
  {
    id: "word",
    start: 19,
    name: {
      ru: "Текстовые задачи на уравнения",
      et: "Tekstülesanded võrrandiga",
      en: "Word problems with equations",
    },
    tpl: ["wordEq"],
  },
  {
    id: "func",
    start: 22,
    name: {
      ru: "Пропорциональность, линейная функция",
      et: "Võrdeline sõltuvus, lineaarfunktsioon",
      en: "Proportionality, linear functions",
    },
    tpl: ["linFunc", "proportion"],
  },
  {
    id: "poly",
    start: 28,
    name: {
      ru: "Многоугольники, параллелограмм, ромб",
      et: "Hulknurgad, rööpkülik, romb",
      en: "Polygons, parallelograms, rhombi",
    },
    tpl: ["polyAngles", "quadArea"],
  },
  {
    id: "prism",
    start: 31,
    name: { ru: "Прямая призма", et: "Püstprisma", en: "Right prisms" },
    tpl: ["prism"],
  },
  {
    id: "stat",
    start: 33,
    name: {
      ru: "Статистика и вероятность",
      et: "Statistika ja tõenäosus",
      en: "Statistics and probability",
    },
    tpl: ["stat", "prob"],
  },
];
