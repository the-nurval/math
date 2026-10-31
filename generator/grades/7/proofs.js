// 7 класс: задачи на доказательство (фиксированные).
export const PROOFS = [
  {
    id: "p1",
    topic: "rat",
    q: {
      ru: "Докажи, что сумма трёх последовательных целых чисел делится на 3.",
      et: "Tõesta, et kolme järjestikuse täisarvu summa jagub 3-ga.",
      en: "Prove that the sum of three consecutive integers is divisible by 3.",
    },
    s: {
      ru: "Обозначим числа n − 1, n, n + 1. Их сумма 3n — делится на 3.",
      et: "Olgu arvud n − 1, n, n + 1. Summa 3n jagub 3-ga.",
      en: "Call them n − 1, n, n + 1. The sum is 3n, divisible by 3.",
    },
  },
  {
    id: "p2",
    topic: "r6",
    q: {
      ru: "Докажи, что вертикальные углы равны.",
      et: "Tõesta, et tippnurgad on võrdsed.",
      en: "Prove that vertical angles are equal.",
    },
    s: {
      ru: "Пусть α и β — вертикальные углы, γ — угол, смежный с каждым из них. α + γ = 180° и β + γ = 180°, значит α = 180° − γ = β.",
      et: "Olgu α ja β tippnurgad ning γ nende mõlema kõrvunurk. α + γ = 180° ja β + γ = 180°, seega α = β.",
      en: "Let α, β be vertical angles and γ adjacent to both. α + γ = 180° and β + γ = 180°, so α = β.",
    },
  },
  {
    id: "p3",
    topic: "pow",
    q: {
      ru: "Докажи, что 10ⁿ − 1 делится на 9 при любом натуральном n.",
      et: "Tõesta, et 10ⁿ − 1 jagub 9-ga iga naturaalarvu n korral.",
      en: "Prove that 10ⁿ − 1 is divisible by 9 for every natural n.",
    },
    s: {
      ru: "10ⁿ − 1 = 99…9 (n девяток) = 9 · 11…1. Значит, делится на 9.",
      et: "10ⁿ − 1 = 99…9 (n üheksat) = 9 · 11…1, seega jagub 9-ga.",
      en: "10ⁿ − 1 = 99…9 (n nines) = 9 · 11…1, so it is divisible by 9.",
    },
  },
  {
    id: "p4",
    topic: "eq",
    q: {
      ru: "Докажи, что уравнение 2x + 4y = 7 не имеет решений в целых числах.",
      et: "Tõesta, et võrrandil 2x + 4y = 7 pole täisarvulisi lahendeid.",
      en: "Prove that 2x + 4y = 7 has no integer solutions.",
    },
    s: {
      ru: "При целых x и y левая часть 2(x + 2y) чётная, а 7 — нечётное. Равенство невозможно.",
      et: "Täisarvude korral on vasak pool 2(x + 2y) paarisarv, 7 aga paaritu. Võrdus on võimatu.",
      en: "For integers the left side 2(x + 2y) is even while 7 is odd. Impossible.",
    },
  },
  {
    id: "p5",
    topic: "poly",
    q: {
      ru: "Докажи, что сумма внешних углов выпуклого многоугольника (по одному при каждой вершине) равна 360°.",
      et: "Tõesta, et kumera hulknurga välisnurkade summa (üks igas tipus) on 360°.",
      en: "Prove that the exterior angles of a convex polygon (one at each vertex) add up to 360°.",
    },
    s: {
      ru: "У n-угольника при каждой вершине внутренний и внешний углы дают 180°, всего 180n. Сумма внутренних 180(n − 2). Внешние: 180n − 180(n − 2) = 360°.",
      et: "Igas tipus annavad sise- ja välisnurk kokku 180°, kokku 180n. Sisenurkade summa on 180(n − 2). Välisnurgad: 180n − 180(n − 2) = 360°.",
      en: "At each vertex interior + exterior = 180°, total 180n. Interior sum is 180(n − 2), so exterior sum = 360°.",
    },
  },
];
