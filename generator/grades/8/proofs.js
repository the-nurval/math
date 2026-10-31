// 8 класс: задачи на доказательство (фиксированные).
import { O } from "../../core/index.js";

export const PROOFS = [
  {
    id: "8p1",
    topic: "g8poly",
    q: O(
      "Докажи, что разность квадратов двух последовательных нечётных чисел делится на 8.",
      "Tõesta, et kahe järjestikuse paaritu arvu ruutude vahe jagub 8-ga.",
      "Prove that the difference of the squares of two consecutive odd numbers is divisible by 8.",
    ),
    s: O(
      "(2k + 1)² − (2k − 1)² = 4k² + 4k + 1 − 4k² + 4k − 1 = 8k.",
      "(2k + 1)² − (2k − 1)² = 4k² + 4k + 1 − 4k² + 4k − 1 = 8k.",
      "(2k + 1)² − (2k − 1)² = 8k.",
    ),
  },
  {
    id: "8p2",
    topic: "g8fsu",
    q: O(
      "Докажи, что a² + b² ≥ 2ab при любых a и b.",
      "Tõesta, et a² + b² ≥ 2ab mis tahes a ja b korral.",
      "Prove that a² + b² ≥ 2ab for all a and b.",
    ),
    s: O(
      "a² + b² − 2ab = (a − b)² ≥ 0, так как квадрат числа неотрицателен. Равенство — при a = b.",
      "a² + b² − 2ab = (a − b)² ≥ 0, sest arvu ruut ei ole negatiivne. Võrdus kehtib, kui a = b.",
      "a² + b² − 2ab = (a − b)² ≥ 0 because a square is never negative; equality when a = b.",
    ),
  },
  {
    id: "8p3",
    topic: "g8fact",
    q: O(
      "Докажи, что n³ − n делится на 6 при любом натуральном n.",
      "Tõesta, et n³ − n jagub 6-ga iga naturaalarvu n korral.",
      "Prove that n³ − n is divisible by 6 for every natural n.",
    ),
    s: O(
      "n³ − n = (n − 1)n(n + 1) — произведение трёх последовательных чисел. Среди них есть чётное и есть кратное 3, значит произведение делится на 6.",
      "n³ − n = (n − 1)n(n + 1) on kolme järjestikuse arvu korrutis. Nende hulgas on paarisarv ja 3 kordne, seega korrutis jagub 6-ga.",
      "n³ − n = (n − 1)n(n + 1), three consecutive numbers: one is even and one is a multiple of 3, so 6 divides the product.",
    ),
  },
  {
    id: "8p4",
    topic: "g8proof",
    q: O(
      "Докажи, что сумма углов треугольника равна 180°.",
      "Tõesta, et kolmnurga nurkade summa on 180°.",
      "Prove that the angles of a triangle add up to 180°.",
    ),
    s: O(
      "Через вершину B проведём прямую, параллельную AC. Углы при B, накрест лежащие с ∠A и ∠C, равны им. Вместе с ∠B они образуют развёрнутый угол 180°.",
      "Tõmbame tipu B kaudu sirge, mis on paralleelne AC-ga. Nurgad B juures, mis on põiknurgad nurkadega A ja C, on nendega võrdsed. Koos nurgaga B moodustavad nad sirgnurga 180°.",
      "Draw a line through B parallel to AC. The alternate angles at B equal ∠A and ∠C, and with ∠B they form a straight angle, 180°.",
    ),
  },
  {
    id: "8p5",
    topic: "g8tri",
    q: O(
      "Докажи, что медиана прямоугольного треугольника, проведённая к гипотенузе, равна половине гипотенузы.",
      "Tõesta, et täisnurkse kolmnurga hüpotenuusile tõmmatud mediaan on pool hüpotenuusist.",
      "Prove that the median to the hypotenuse of a right triangle is half the hypotenuse.",
    ),
    s: O(
      "Достроим треугольник ABC (∠C = 90°) до прямоугольника ACBD. Его диагонали равны и делятся точкой пересечения M пополам, поэтому CM = AB : 2.",
      "Täiendame kolmnurga ABC (∠C = 90°) ristkülikuks ACBD. Selle diagonaalid on võrdsed ja poolitavad teineteist lõikepunktis M, seega CM = AB : 2.",
      "Complete triangle ABC (∠C = 90°) to rectangle ACBD. Its diagonals are equal and bisect each other at M, so CM = AB ÷ 2.",
    ),
  },
  {
    id: "8p6",
    topic: "g8pyth",
    q: O("Докажи теорему Пифагора.", "Tõesta Pythagorase teoreem.", "Prove Pythagoras' theorem."),
    s: O(
      "Квадрат со стороной a + b разрежем на четыре треугольника с катетами a, b и квадрат со стороной c. Площади: (a + b)² = 4 · ab/2 + c², отсюда a² + b² = c².",
      "Ruudu küljega a + b jaotame neljaks kolmnurgaks kaatetitega a, b ja ruuduks küljega c. Pindalad: (a + b)² = 4 · ab/2 + c², millest a² + b² = c².",
      "Split a square of side a + b into four right triangles with legs a, b and a square of side c: (a + b)² = 4 · ab/2 + c², so a² + b² = c².",
    ),
  },
  {
    id: "8p7",
    topic: "g8quad",
    q: O(
      "Докажи, что диагонали параллелограмма точкой пересечения делятся пополам.",
      "Tõesta, et rööpküliku diagonaalid poolitavad teineteist.",
      "Prove that the diagonals of a parallelogram bisect each other.",
    ),
    s: O(
      "Треугольники AOB и COD равны: AB = CD, ∠OAB = ∠OCD и ∠OBA = ∠ODC как накрест лежащие. Значит AO = OC и BO = OD.",
      "Kolmnurgad AOB ja COD on võrdsed: AB = CD, ∠OAB = ∠OCD ja ∠OBA = ∠ODC põiknurkadena. Seega AO = OC ja BO = OD.",
      "Triangles AOB and COD are congruent: AB = CD and the alternate angles are equal, so AO = OC and BO = OD.",
    ),
  },
  {
    id: "8p8",
    topic: "g8circ",
    q: O(
      "Докажи, что вписанный угол, одна сторона которого проходит через центр окружности, равен половине центрального угла, опирающегося на ту же дугу.",
      "Tõesta, et piirdenurk, mille üks haar läbib ringjoone keskpunkti, on pool samale kaarele toetuvast kesknurgast.",
      "Prove that an inscribed angle with one side through the centre is half the central angle on the same arc.",
    ),
    s: O(
      "Пусть BC — диаметр, A на окружности. Треугольник OAC равнобедренный (OA = OC), его углы при A и C равны. Внешний угол AOB равен их сумме, то есть 2∠ACB.",
      "Olgu BC diameeter ja A punkt ringjoonel. Kolmnurk OAC on võrdhaarne (OA = OC), nurgad A ja C juures on võrdsed. Välisnurk AOB võrdub nende summaga, st 2∠ACB.",
      "Let BC be a diameter and A on the circle. OAC is isosceles, so its angles at A and C are equal; the exterior angle AOB is their sum, 2∠ACB.",
    ),
  },
  {
    id: "8p9",
    topic: "g8sim",
    q: O(
      "Докажи, что средняя линия треугольника параллельна стороне и равна её половине.",
      "Tõesta, et kolmnurga kesklõik on paralleelne küljega ja võrdub poolega sellest.",
      "Prove that a midsegment of a triangle is parallel to a side and half its length.",
    ),
    s: O(
      "M, N — середины AB и BC. Треугольники MBN и ABC подобны по двум сторонам и углу между ними (BM : BA = BN : BC = 1/2, угол B общий). Поэтому MN = AC/2 и ∠BMN = ∠BAC — соответственные углы равны, MN ∥ AC.",
      "M ja N on AB ja BC keskpunktid. Kolmnurgad MBN ja ABC on sarnased kahe külje ja nendevahelise nurga järgi (BM : BA = BN : BC = 1/2, nurk B on ühine). Seega MN = AC/2 ja ∠BMN = ∠BAC — kaasnurgad on võrdsed, MN ∥ AC.",
      "With M, N the midpoints of AB and BC, triangles MBN and ABC are similar (SAS, ratio 1/2, common angle B), so MN = AC/2 and the corresponding angles are equal, giving MN ∥ AC.",
    ),
  },
];
