// 6 класс: темы по неделям (start — школьная программа), цвет и шаблоны темы.
import { O } from "../../core/index.js";

export const TOPICS = [
  {
    id: "g6r5",
    start: -1,
    col: "green",
    name: O("Повторение 5 класса", "5. klassi kordamine", "Grade 5 review"),
    tpl: ["dec5"],
  },
  {
    id: "g6div",
    start: 0,
    col: "coral",
    name: O("Делимость, НОД и НОК", "Jaguvus, SÜT ja VÜK", "Divisibility, GCD and LCM"),
    tpl: ["divRules", "primeFact", "gcdLcm", "gcdWord"],
  },
  {
    id: "g6frac",
    start: 3,
    col: "yellow",
    name: O(
      "Основное свойство дроби, сравнение дробей",
      "Murru põhiomadus, murdude võrdlemine",
      "Equivalent fractions, comparing fractions",
    ),
    tpl: ["fracReduce", "fracCompare"],
  },
  {
    id: "g6fadd",
    start: 5,
    col: "teal",
    name: O(
      "Сложение и вычитание дробей",
      "Murdude liitmine ja lahutamine",
      "Adding and subtracting fractions",
    ),
    tpl: ["fracAddSub", "fracAddWord"],
  },
  {
    id: "g6fmul",
    start: 8,
    col: "lilac",
    name: O(
      "Умножение и деление дробей",
      "Murdude korrutamine ja jagamine",
      "Multiplying and dividing fractions",
    ),
    tpl: ["fracMulDiv", "fracOf", "fracExpr"],
  },
  {
    id: "g6fdec",
    start: 12,
    col: "sky",
    name: O(
      "Обыкновенные и десятичные дроби",
      "Harilikud ja kümnendmurrud",
      "Fractions and decimals",
    ),
    tpl: ["fracToDec", "fdMixed"],
  },
  {
    id: "g6ratio",
    start: 14,
    col: "green",
    name: O("Отношения, пропорции, масштаб", "Suhe, võrre, mõõtkava", "Ratios, proportions, scale"),
    tpl: ["ratio", "propEq", "scale"],
  },
  {
    id: "g6propr",
    start: 15,
    col: "coral",
    name: O(
      "Прямая и обратная пропорциональность",
      "Võrdeline ja pöördvõrdeline sõltuvus",
      "Direct and inverse proportion",
    ),
    tpl: ["dirInv"],
  },
  {
    id: "g6pct",
    start: 16,
    col: "sky",
    name: O("Проценты, круговая диаграмма", "Protsent, sektordiagramm", "Percentages, pie charts"),
    tpl: ["pct6", "pie"],
  },
  {
    id: "g6circ",
    start: 18,
    col: "teal",
    name: O("Окружность и круг", "Ringjoon ja ring", "Circles"),
    tpl: ["circle", "circleBack"],
  },
  {
    id: "g6ratn",
    start: 20,
    col: "coral",
    name: O(
      "Рациональные числа: ось, модуль, сравнение",
      "Ratsionaalarvud: arvtelg, absoluutväärtus, võrdlemine",
      "Rational numbers: number line, absolute value, comparing",
    ),
    tpl: ["axis", "absCmp"],
  },
  {
    id: "g6rops",
    start: 22,
    col: "yellow",
    name: O(
      "Действия с рациональными числами",
      "Tehted ratsionaalarvudega",
      "Operations with rational numbers",
    ),
    tpl: ["ratAdd", "ratMul", "ratExpr"],
  },
  {
    id: "g6eq",
    start: 25,
    col: "green",
    name: O(
      "Уравнения: скобки, подобные слагаемые, задачи",
      "Võrrandid: sulud, sarnased liikmed, ülesanded",
      "Equations: brackets, like terms, word problems",
    ),
    tpl: ["brackets", "eqLin", "eqWord"],
  },
  {
    id: "g6coord",
    start: 28,
    col: "lilac",
    name: O(
      "Координатная плоскость и графики",
      "Koordinaattasand ja graafikud",
      "Coordinate plane and graphs",
    ),
    tpl: ["coordPts", "graphRead"],
  },
  {
    id: "g6sym",
    start: 30,
    col: "sky",
    name: O(
      "Осевая и центральная симметрия",
      "Telg- ja tsentraalsümmeetria",
      "Line and point symmetry",
    ),
    tpl: ["symPt"],
  },
  {
    id: "g6tri",
    start: 31,
    col: "yellow",
    name: O(
      "Треугольники: углы, виды, равенство",
      "Kolmnurgad: nurgad, liigid, võrdsus",
      "Triangles: angles, types, congruence",
    ),
    tpl: ["triAngles", "adjVert", "triKind"],
  },
  {
    id: "g6area",
    start: 33,
    col: "lilac",
    name: O(
      "Площадь треугольника, куб и параллелепипед",
      "Kolmnurga pindala, kuup ja risttahukas",
      "Triangle area, cubes and cuboids",
    ),
    tpl: ["triArea", "boxVol"],
  },
];
