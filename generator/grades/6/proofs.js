// 6 класс: задачи на доказательство (фиксированные).
import { O } from "../../core/index.js";

export const PROOFS = [
  {
    id: "6p1",
    topic: "g6div",
    q: O(
      "Докажи, что сумма двух нечётных чисел — чётное число.",
      "Tõesta, et kahe paaritu arvu summa on paarisarv.",
      "Prove that the sum of two odd numbers is even.",
    ),
    s: O(
      "Нечётные числа: 2k + 1 и 2m + 1. Сумма 2k + 2m + 2 = 2(k + m + 1) делится на 2.",
      "Paaritud arvud: 2k + 1 ja 2m + 1. Summa 2k + 2m + 2 = 2(k + m + 1) jagub 2-ga.",
      "Odd numbers are 2k + 1 and 2m + 1; the sum 2(k + m + 1) is divisible by 2.",
    ),
  },
  {
    id: "6p2",
    topic: "g6div",
    q: O(
      "Докажи признак делимости на 3 для трёхзначного числа.",
      "Tõesta kolmekohalise arvu 3-ga jaguvuse tunnus.",
      "Prove the divisibility test for 3 for a three-digit number.",
    ),
    s: O(
      "Число с цифрами a, b, c равно 100a + 10b + c = 99a + 9b + (a + b + c). 99a + 9b делится на 3, значит всё число делится на 3 тогда и только тогда, когда делится сумма цифр a + b + c.",
      "Arv numbritega a, b, c on 100a + 10b + c = 99a + 9b + (a + b + c). 99a + 9b jagub 3-ga, seega jagub arv 3-ga parajasti siis, kui jagub ristsumma.",
      "100a + 10b + c = 99a + 9b + (a + b + c); 99a + 9b is divisible by 3, so the number is divisible by 3 exactly when a + b + c is.",
    ),
  },
  {
    id: "6p3",
    topic: "g6tri",
    q: O(
      "Докажи, что вертикальные углы равны.",
      "Tõesta, et tippnurgad on võrdsed.",
      "Prove that vertical angles are equal.",
    ),
    s: O(
      "Каждый из двух вертикальных углов смежен с одним и тем же углом β, поэтому каждый равен 180° − β.",
      "Kumbki tippnurk on kõrvunurk ühe ja sama nurgaga β, seega kumbki on 180° − β.",
      "Each vertical angle is adjacent to the same angle β, so each equals 180° − β.",
    ),
  },
  {
    id: "6p4",
    topic: "g6tri",
    q: O(
      "Докажи, что сумма углов выпуклого четырёхугольника равна 360°.",
      "Tõesta, et kumera nelinurga nurkade summa on 360°.",
      "Prove that the angles of a convex quadrilateral add up to 360°.",
    ),
    s: O(
      "Диагональ делит четырёхугольник на два треугольника, их углы вместе составляют углы четырёхугольника: 2 · 180° = 360°.",
      "Diagonaal jaotab nelinurga kaheks kolmnurgaks, mille nurgad moodustavad kokku nelinurga nurgad: 2 · 180° = 360°.",
      "A diagonal splits it into two triangles whose angles make up the quadrilateral's: 2 · 180° = 360°.",
    ),
  },
  {
    id: "6p5",
    topic: "g6fadd",
    q: O(
      "Докажи, что 1/2 + 1/4 + 1/8 + 1/16 + 1/32 < 1.",
      "Tõesta, et 1/2 + 1/4 + 1/8 + 1/16 + 1/32 < 1.",
      "Prove that 1/2 + 1/4 + 1/8 + 1/16 + 1/32 < 1.",
    ),
    s: O(
      "После каждого слагаемого до 1 остаётся ровно последнее слагаемое: 1 − 1/2 = 1/2, 1/2 − 1/4 = 1/4, … В конце не хватает 1/32 > 0.",
      "Pärast iga liidetavat jääb 1-ni puudu täpselt viimane liidetav: 1 − 1/2 = 1/2, 1/2 − 1/4 = 1/4, … Lõpuks jääb puudu 1/32 > 0.",
      "After each term the gap to 1 equals the last term; in the end 1/32 > 0 is still missing.",
    ),
  },
  {
    id: "6p6",
    topic: "g6area",
    q: O(
      "Докажи, что площадь прямоугольного треугольника равна половине произведения катетов.",
      "Tõesta, et täisnurkse kolmnurga pindala on pool kaatetite korrutisest.",
      "Prove that a right triangle's area is half the product of its legs.",
    ),
    s: O(
      "Два таких треугольника складываются в прямоугольник со сторонами a и b. Его площадь ab, значит площадь треугольника ab : 2.",
      "Kaks sellist kolmnurka moodustavad ristküliku külgedega a ja b. Selle pindala on ab, seega kolmnurga pindala on ab : 2.",
      "Two copies form an a × b rectangle of area ab, so one triangle is ab ÷ 2.",
    ),
  },
];
