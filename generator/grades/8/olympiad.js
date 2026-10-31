// 8 класс: олимпиадные задачи (фиксированные, не генерируются).
import { O } from "../../core/index.js";

/* ============================================================
   ОЛИМПИАДНЫЕ ЗАДАЧИ И ДОКАЗАТЕЛЬСТВА (фиксированные)
   ============================================================ */
export const OLY = [
  {
    id: "8o1",
    topic: "g8rev",
    a: 9,
    q: O(
      "Найди последнюю цифру числа 7²⁰²⁶.",
      "Leia arvu 7²⁰²⁶ viimane number.",
      "Find the last digit of 7²⁰²⁶.",
    ),
    s: O(
      "Последние цифры степеней 7 повторяются с периодом 4: 7, 9, 3, 1. 2026 при делении на 4 даёт остаток 2, значит последняя цифра 9.",
      "7 astmete viimased numbrid korduvad perioodiga 4: 7, 9, 3, 1. 2026 annab 4-ga jagamisel jäägi 2, seega viimane number on 9.",
      "The last digits of powers of 7 repeat with period 4: 7, 9, 3, 1. 2026 leaves remainder 2 on division by 4, so the last digit is 9.",
    ),
  },
  {
    id: "8o2",
    topic: "g8rev",
    a: 49,
    q: O(
      "Сумма трёх последовательных нечётных чисел равна 141. Найди наибольшее из них.",
      "Kolme järjestikuse paaritu arvu summa on 141. Leia neist suurim.",
      "Three consecutive odd numbers add up to 141. Find the largest.",
    ),
    s: O(
      "Среднее число 141 : 3 = 47, числа 45, 47, 49.",
      "Keskmine arv on 141 : 3 = 47, arvud on 45, 47, 49.",
      "The middle one is 141 ÷ 3 = 47; the numbers are 45, 47, 49.",
    ),
  },
  {
    id: "8o3",
    topic: "g8rev",
    a: 4,
    unit: O("%", "%", "%"),
    q: O(
      "Цену товара повысили на 20 %, а потом снизили на 20 %. На сколько процентов новая цена меньше первоначальной?",
      "Kauba hinda tõsteti 20 % ja seejärel alandati 20 %. Mitu protsenti on uus hind esialgsest väiksem?",
      "A price was raised by 20 % and then cut by 20 %. By what percentage is the new price lower than the original?",
    ),
    s: O(
      "1,2 · 0,8 = 0,96, то есть цена стала на 4 % меньше.",
      "1,2 · 0,8 = 0,96, seega hind on 4 % väiksem.",
      "1.2 · 0.8 = 0.96, so the price is 4 % lower.",
    ),
  },
  {
    id: "8o4",
    topic: "g8rev",
    a: 72,
    unit: O("км/ч", "km/h", "km/h"),
    q: O(
      "Поезд длиной 240 м полностью проезжает мост длиной 360 м за 30 с. Найди скорость поезда в км/ч.",
      "240 m pikkune rong sõidab 360 m pikkusest sillast täielikult üle 30 sekundiga. Leia rongi kiirus km/h.",
      "A 240 m train completely crosses a 360 m bridge in 30 s. Find its speed in km/h.",
    ),
    s: O(
      "Поезд проходит 240 + 360 = 600 м за 30 с: 20 м/с = 72 км/ч.",
      "Rong läbib 240 + 360 = 600 m 30 sekundiga: 20 m/s = 72 km/h.",
      "It covers 240 + 360 = 600 m in 30 s: 20 m/s = 72 km/h.",
    ),
  },
  {
    id: "8o5",
    topic: "g8poly",
    a: 27,
    q: O(
      "Найди сумму коэффициентов многочлена (2x − 1)⁵ · (x + 2)³ после раскрытия скобок.",
      "Leia hulkliikme (2x − 1)⁵ · (x + 2)³ kordajate summa pärast sulgude avamist.",
      "Find the sum of the coefficients of (2x − 1)⁵ · (x + 2)³ after expanding.",
    ),
    s: O(
      "Сумма коэффициентов — значение многочлена при x = 1: 1⁵ · 3³ = 27.",
      "Kordajate summa on hulkliikme väärtus kohal x = 1: 1⁵ · 3³ = 27.",
      "The sum of coefficients is the value at x = 1: 1⁵ · 3³ = 27.",
    ),
  },
  {
    id: "8o6",
    topic: "g8poly",
    a: 720,
    q: O(
      "Чему равен свободный член многочлена (x − 1)(x − 2)(x − 3)(x − 4)(x − 5)(x − 6)?",
      "Millega võrdub hulkliikme (x − 1)(x − 2)(x − 3)(x − 4)(x − 5)(x − 6) vabaliige?",
      "What is the constant term of (x − 1)(x − 2)(x − 3)(x − 4)(x − 5)(x − 6)?",
    ),
    s: O(
      "Это значение при x = 0: (−1)(−2)(−3)(−4)(−5)(−6) = 720.",
      "See on väärtus kohal x = 0: (−1)(−2)(−3)(−4)(−5)(−6) = 720.",
      "It is the value at x = 0: (−1)(−2)(−3)(−4)(−5)(−6) = 720.",
    ),
  },
  {
    id: "8o7",
    topic: "g8poly",
    a: 11,
    q: O(
      "Найди коэффициент при x в произведении (x + 1)(x + 2)(x + 3).",
      "Leia korrutise (x + 1)(x + 2)(x + 3) x-i kordaja.",
      "Find the coefficient of x in (x + 1)(x + 2)(x + 3).",
    ),
    s: O(
      "Члены с x получаются, когда x берём из одной скобки, а числа из двух других: 2 · 3 + 1 · 3 + 1 · 2 = 11.",
      "x-iga liikmed tekivad, kui x võetakse ühest sulust ja arvud kahest teisest: 2 · 3 + 1 · 3 + 1 · 2 = 11.",
      "x comes from one bracket and numbers from the other two: 2 · 3 + 1 · 3 + 1 · 2 = 11.",
    ),
  },
  {
    id: "8o8",
    topic: "g8fsu",
    a: 1,
    q: O(
      "Вычисли 2026² − 2025 · 2027.",
      "Arvuta 2026² − 2025 · 2027.",
      "Calculate 2026² − 2025 · 2027.",
    ),
    s: O(
      "2025 · 2027 = (2026 − 1)(2026 + 1) = 2026² − 1, разность равна 1.",
      "2025 · 2027 = (2026 − 1)(2026 + 1) = 2026² − 1, vahe on 1.",
      "2025 · 2027 = (2026 − 1)(2026 + 1) = 2026² − 1, so the difference is 1.",
    ),
  },
  {
    id: "8o9",
    topic: "g8fsu",
    a: 23,
    q: O(
      "Известно, что a + 1/a = 5. Найди a² + 1/a².",
      "On teada, et a + 1/a = 5. Leia a² + 1/a².",
      "Given a + 1/a = 5, find a² + 1/a².",
    ),
    s: O(
      "(a + 1/a)² = a² + 2 + 1/a² = 25, значит a² + 1/a² = 23.",
      "(a + 1/a)² = a² + 2 + 1/a² = 25, seega a² + 1/a² = 23.",
      "(a + 1/a)² = a² + 2 + 1/a² = 25, so a² + 1/a² = 23.",
    ),
  },
  {
    id: "8o10",
    topic: "g8fsu",
    a: 63,
    q: O(
      "x − y = 3, xy = 4. Найди x³ − y³.",
      "x − y = 3, xy = 4. Leia x³ − y³.",
      "x − y = 3, xy = 4. Find x³ − y³.",
    ),
    s: O(
      "x³ − y³ = (x − y)(x² + xy + y²) = (x − y)((x − y)² + 3xy) = 3 · (9 + 12) = 63.",
      "x³ − y³ = (x − y)(x² + xy + y²) = (x − y)((x − y)² + 3xy) = 3 · (9 + 12) = 63.",
      "x³ − y³ = (x − y)((x − y)² + 3xy) = 3 · (9 + 12) = 63.",
    ),
  },
  {
    id: "8o11",
    topic: "g8fact",
    a: 257,
    q: O(
      "Найди наибольший простой делитель числа 2¹⁶ − 1.",
      "Leia arvu 2¹⁶ − 1 suurim algtegur.",
      "Find the largest prime factor of 2¹⁶ − 1.",
    ),
    s: O(
      "2¹⁶ − 1 = (2⁸ − 1)(2⁸ + 1) = (2⁴ − 1)(2⁴ + 1) · 257 = 3 · 5 · 17 · 257. 257 — простое.",
      "2¹⁶ − 1 = (2⁸ − 1)(2⁸ + 1) = (2⁴ − 1)(2⁴ + 1) · 257 = 3 · 5 · 17 · 257. 257 on algarv.",
      "2¹⁶ − 1 = (2⁸ − 1)(2⁸ + 1) = 3 · 5 · 17 · 257, and 257 is prime.",
    ),
  },
  {
    id: "8o12",
    topic: "g8fact",
    a: 3,
    q: O(
      "Сколько пар натуральных чисел (x; y) удовлетворяют уравнению x² − y² = 45?",
      "Mitu naturaalarvude paari (x; y) rahuldab võrrandit x² − y² = 45?",
      "How many pairs of natural numbers (x; y) satisfy x² − y² = 45?",
    ),
    s: O(
      "(x − y)(x + y) = 45 = 1 · 45 = 3 · 15 = 5 · 9. Получаем (23; 22), (9; 6), (7; 2) — три пары.",
      "(x − y)(x + y) = 45 = 1 · 45 = 3 · 15 = 5 · 9. Saame (23; 22), (9; 6), (7; 2) — kolm paari.",
      "(x − y)(x + y) = 45 = 1 · 45 = 3 · 15 = 5 · 9, giving (23; 22), (9; 6), (7; 2): three pairs.",
    ),
  },
  {
    id: "8o13",
    topic: "g8fact",
    a: 1995,
    q: O("Вычисли 1002 · 998 − 999².", "Arvuta 1002 · 998 − 999².", "Calculate 1002 · 998 − 999²."),
    s: O(
      "1002 · 998 = 1000² − 4, 999² = 1000² − 2000 + 1. Разность: −4 + 2000 − 1 = 1995.",
      "1002 · 998 = 1000² − 4, 999² = 1000² − 2000 + 1. Vahe: −4 + 2000 − 1 = 1995.",
      "1002 · 998 = 1000² − 4 and 999² = 1000² − 2000 + 1, so the difference is 1995.",
    ),
  },
  {
    id: "8o14",
    topic: "g8lin2",
    a: 6,
    q: O(
      "Сколько решений в натуральных числах имеет уравнение 3x + 5y = 100?",
      "Mitu lahendit naturaalarvudes on võrrandil 3x + 5y = 100?",
      "How many solutions in natural numbers does 3x + 5y = 100 have?",
    ),
    s: O(
      "100 − 5y должно делиться на 3 и быть положительным: y = 2, 5, 8, 11, 14, 17 — шесть решений.",
      "100 − 5y peab jaguma 3-ga ja olema positiivne: y = 2, 5, 8, 11, 14, 17 — kuus lahendit.",
      "100 − 5y must be positive and divisible by 3: y = 2, 5, 8, 11, 14, 17, six solutions.",
    ),
  },
  {
    id: "8o15",
    topic: "g8sys",
    a: 12,
    q: O(
      "В клетке фазаны и кролики: всего 35 голов и 94 ноги. Сколько кроликов?",
      "Puuris on faasanid ja küülikud: kokku 35 pead ja 94 jalga. Mitu küülikut on puuris?",
      "A cage holds pheasants and rabbits: 35 heads and 94 legs. How many rabbits?",
    ),
    s: O(
      "x + y = 35, 2x + 4y = 94. Вычитаем удвоенное первое: 2y = 24, y = 12.",
      "x + y = 35, 2x + 4y = 94. Lahutame kahekordse esimese: 2y = 24, y = 12.",
      "x + y = 35, 2x + 4y = 94; subtract twice the first: 2y = 24, y = 12.",
    ),
  },
  {
    id: "8o16",
    topic: "g8sysw",
    a: 47,
    q: O(
      "Сумма цифр двузначного числа 11. Если поменять цифры местами, число увеличится на 27. Найди число.",
      "Kahekohalise arvu numbrite summa on 11. Kui numbrid vahetada, suureneb arv 27 võrra. Leia arv.",
      "The digits of a two-digit number add up to 11. Swapping them increases the number by 27. Find it.",
    ),
    s: O(
      "a + b = 11, (10b + a) − (10a + b) = 27 → b − a = 3. a = 4, b = 7, число 47.",
      "a + b = 11, (10b + a) − (10a + b) = 27 → b − a = 3. a = 4, b = 7, arv on 47.",
      "a + b = 11 and 9(b − a) = 27, so b − a = 3: a = 4, b = 7, the number is 47.",
    ),
  },
  {
    id: "8o17",
    topic: "g8sysw",
    a: 10,
    q: O(
      "Если к числителю и знаменателю дроби прибавить 1, получится 1/2, а если из обоих вычесть 1, получится 1/3. Найди сумму числителя и знаменателя.",
      "Kui murru lugejale ja nimetajale liita 1, saadakse 1/2, kui mõlemast lahutada 1, saadakse 1/3. Leia lugeja ja nimetaja summa.",
      "Adding 1 to the numerator and denominator of a fraction gives 1/2; subtracting 1 from both gives 1/3. Find the sum of the numerator and denominator.",
    ),
    s: O(
      "2(x + 1) = y + 1 и 3(x − 1) = y − 1, то есть y = 2x + 1 и y = 3x − 2. x = 3, y = 7, сумма 10.",
      "2(x + 1) = y + 1 ja 3(x − 1) = y − 1, st y = 2x + 1 ja y = 3x − 2. x = 3, y = 7, summa on 10.",
      "2(x + 1) = y + 1 and 3(x − 1) = y − 1, so y = 2x + 1 = 3x − 2: x = 3, y = 7, sum 10.",
    ),
  },
  {
    id: "8o18",
    topic: "g8proof",
    a: 150,
    unit: O("°", "°", "°"),
    q: O(
      "Углы треугольника относятся как 2 : 3 : 7. Найди наибольший из его внешних углов.",
      "Kolmnurga nurgad suhtuvad nagu 2 : 3 : 7. Leia selle suurim välisnurk.",
      "The angles of a triangle are in the ratio 2 : 3 : 7. Find its largest exterior angle.",
    ),
    s: O(
      "Углы 30°, 45°, 105°. Наибольший внешний угол — при наименьшем внутреннем: 180° − 30° = 150°.",
      "Nurgad on 30°, 45°, 105°. Suurim välisnurk on vähima sisenurga juures: 180° − 30° = 150°.",
      "The angles are 30°, 45°, 105°; the largest exterior angle is at the smallest: 180° − 30° = 150°.",
    ),
  },
  {
    id: "8o19",
    topic: "g8tri",
    a: 3,
    q: O(
      "Сколько существует различных треугольников с целыми сторонами и периметром 12?",
      "Mitu erinevat täisarvuliste külgedega kolmnurka on, mille ümbermõõt on 12?",
      "How many different triangles with whole-number sides have perimeter 12?",
    ),
    s: O(
      "Наибольшая сторона меньше 6. Подходят 2, 5, 5; 3, 4, 5; 4, 4, 4 — три треугольника.",
      "Pikim külg on väiksem kui 6. Sobivad 2, 5, 5; 3, 4, 5; 4, 4, 4 — kolm kolmnurka.",
      "The longest side is less than 6: 2, 5, 5; 3, 4, 5; 4, 4, 4 — three triangles.",
    ),
  },
  {
    id: "8o20",
    topic: "g8pyth",
    a: 30,
    q: O(
      "Медиана, проведённая к гипотенузе прямоугольного треугольника, равна 6,5, один из катетов 5. Найди площадь треугольника.",
      "Täisnurkse kolmnurga hüpotenuusile tõmmatud mediaan on 6,5, üks kaatet on 5. Leia kolmnurga pindala.",
      "The median to the hypotenuse of a right triangle is 6.5 and one leg is 5. Find the area.",
    ),
    s: O(
      "Гипотенуза 13, второй катет √(169 − 25) = 12, площадь 5 · 12 : 2 = 30.",
      "Hüpotenuus on 13, teine kaatet √(169 − 25) = 12, pindala 5 · 12 : 2 = 30.",
      "The hypotenuse is 13, the other leg √(169 − 25) = 12, the area 5 · 12 ÷ 2 = 30.",
    ),
  },
  {
    id: "8o21",
    topic: "g8pyth",
    a: [4, 5],
    unit: O("м", "m", "m"),
    q: O(
      "Лестница длиной 5 м стоит у стены, её нижний конец в 1,4 м от стены. Нижний конец отодвинули ещё на 1,6 м. На сколько метров опустился верхний конец?",
      "5 m pikkune redel toetub seinale, selle alumine ots on seinast 1,4 m kaugusel. Alumist otsa nihutati veel 1,6 m. Mitu meetrit laskus ülemine ots?",
      "A 5 m ladder leans on a wall with its foot 1.4 m from the wall. The foot is moved 1.6 m further out. How far does the top slide down?",
    ),
    s: O(
      "Сначала высота √(25 − 1,96) = 4,8 м, потом √(25 − 9) = 4 м. Разница 0,8 м.",
      "Alguses on kõrgus √(25 − 1,96) = 4,8 m, siis √(25 − 9) = 4 m. Vahe on 0,8 m.",
      "First the height is √(25 − 1.96) = 4.8 m, then √(25 − 9) = 4 m: it drops 0.8 m.",
    ),
  },
  {
    id: "8o22",
    topic: "g8quad",
    a: 4,
    q: O(
      "Основания трапеции 6 и 14. Диагонали делят среднюю линию на три части. Найди длину средней части.",
      "Trapetsi alused on 6 ja 14. Diagonaalid jaotavad kesklõigu kolmeks osaks. Leia keskmise osa pikkus.",
      "A trapezium has bases 6 and 14. The diagonals cut the midsegment into three parts. Find the middle part.",
    ),
    s: O(
      "Средняя линия 10. Крайние части — средние линии треугольников с основанием 6, каждая 3. Средняя часть 10 − 3 − 3 = 4.",
      "Kesklõik on 10. Äärmised osad on kolmnurkade kesklõigud alusega 6, kumbki 3. Keskmine osa on 10 − 3 − 3 = 4.",
      "The midsegment is 10; the outer parts are midsegments of triangles on base 6, each 3; the middle part is 4.",
    ),
  },
  {
    id: "8o23",
    topic: "g8area",
    a: 35,
    q: O(
      "Середины сторон прямоугольника 10 × 7 последовательно соединили. Найди площадь получившегося четырёхугольника.",
      "Ristküliku 10 × 7 külgede keskpunktid ühendati järjest. Leia saadud nelinurga pindala.",
      "The midpoints of the sides of a 10 × 7 rectangle are joined in order. Find the area of the quadrilateral.",
    ),
    s: O(
      "Получился ромб с диагоналями 10 и 7: площадь 10 · 7 : 2 = 35 — половина прямоугольника.",
      "Saadi romb diagonaalidega 10 ja 7: pindala 10 · 7 : 2 = 35 — pool ristkülikust.",
      "It is a rhombus with diagonals 10 and 7: area 35, half the rectangle.",
    ),
  },
  {
    id: "8o24",
    topic: "g8circ",
    a: 36,
    q: O(
      "Площадь квадрата, вписанного в окружность, равна 18. Найди площадь квадрата, описанного около этой окружности.",
      "Ringjoonde joonestatud ruudu pindala on 18. Leia selle ringjoone ümber joonestatud ruudu pindala.",
      "A square inscribed in a circle has area 18. Find the area of the square circumscribed about the circle.",
    ),
    s: O(
      "Площадь вписанного квадрата равна половине квадрата диагонали: d² = 36, d = 6 — диаметр. Сторона описанного квадрата 6, площадь 36.",
      "Siseruudu pindala on pool diagonaali ruudust: d² = 36, d = 6 on diameeter. Välisruudu külg on 6, pindala 36.",
      "The inscribed square's area is d²/2, so d = 6, the diameter; the outer square has side 6 and area 36.",
    ),
  },
  {
    id: "8o25",
    topic: "g8reg",
    a: 170,
    q: O(
      "Сколько диагоналей у выпуклого 20-угольника?",
      "Mitu diagonaali on kumeral 20-nurgal?",
      "How many diagonals does a convex 20-gon have?",
    ),
    s: O("20 · 17 : 2 = 170.", "20 · 17 : 2 = 170.", "20 · 17 ÷ 2 = 170."),
  },
  {
    id: "8o26",
    topic: "g8reg",
    a: 10,
    q: O(
      "Внутренний угол правильного многоугольника в 4 раза больше внешнего. Сколько у него сторон?",
      "Korrapärase hulknurga sisenurk on 4 korda suurem välisnurgast. Mitu külge tal on?",
      "An interior angle of a regular polygon is 4 times its exterior angle. How many sides does it have?",
    ),
    s: O(
      "Внутренний и внешний углы в сумме 180°: внешний 36°, сторон 360 : 36 = 10.",
      "Sise- ja välisnurga summa on 180°: välisnurk on 36°, külgi 360 : 36 = 10.",
      "They add up to 180°, so the exterior angle is 36° and there are 360 ÷ 36 = 10 sides.",
    ),
  },
  {
    id: "8o27",
    topic: "g8sim",
    a: 45,
    q: O(
      "Площадь треугольника 48. Прямая, параллельная стороне, отсекает от него треугольник, подобный данному с коэффициентом 1/4. Найди площадь оставшейся трапеции.",
      "Kolmnurga pindala on 48. Küljega paralleelne sirge lõikab sellest ära kolmnurga, mis on antud kolmnurgaga sarnane teguriga 1/4. Leia järele jäänud trapetsi pindala.",
      "A triangle has area 48. A line parallel to a side cuts off a similar triangle with ratio 1/4. Find the area of the remaining trapezium.",
    ),
    s: O(
      "Площадь малого треугольника 48 · 1/16 = 3, трапеции 48 − 3 = 45.",
      "Väikese kolmnurga pindala on 48 · 1/16 = 3, trapetsi oma 48 − 3 = 45.",
      "The small triangle has area 48 · 1/16 = 3, so the trapezium has 45.",
    ),
  },
  {
    id: "8o28",
    topic: "g8ind",
    a: [3, 2],
    unit: O("га", "ha", "ha"),
    q: O(
      "На плане в масштабе 1 : 2500 участок — прямоугольник 4 см × 6 см. Найди площадь участка в гектарах.",
      "Mõõtkavas 1 : 2500 plaanil on maatükk ristkülik 4 cm × 6 cm. Leia maatüki pindala hektarites.",
      "On a plan at scale 1 : 2500 a plot is a 4 cm × 6 cm rectangle. Find its area in hectares.",
    ),
    s: O(
      "100 м × 150 м = 15 000 м² = 1,5 га.",
      "100 m × 150 m = 15 000 m² = 1,5 ha.",
      "100 m × 150 m = 15 000 m² = 1.5 ha.",
    ),
  },
  {
    id: "8o29",
    topic: "g8afr",
    a: [99, 100],
    q: O(
      "Найди сумму 1/(1 · 2) + 1/(2 · 3) + 1/(3 · 4) + … + 1/(99 · 100).",
      "Leia summa 1/(1 · 2) + 1/(2 · 3) + 1/(3 · 4) + … + 1/(99 · 100).",
      "Find 1/(1 · 2) + 1/(2 · 3) + 1/(3 · 4) + … + 1/(99 · 100).",
    ),
    s: O(
      "1/(n(n + 1)) = 1/n − 1/(n + 1). Почти все слагаемые сокращаются: 1 − 1/100 = 99/100.",
      "1/(n(n + 1)) = 1/n − 1/(n + 1). Peaaegu kõik liikmed taanduvad: 1 − 1/100 = 99/100.",
      "1/(n(n + 1)) = 1/n − 1/(n + 1); almost everything cancels: 1 − 1/100 = 99/100.",
    ),
  },
  {
    id: "8o30",
    topic: "g8sqrt",
    a: 2025,
    q: O(
      "Вычисли √(2026 · 2024 + 1).",
      "Arvuta √(2026 · 2024 + 1).",
      "Calculate √(2026 · 2024 + 1).",
    ),
    s: O(
      "2026 · 2024 = 2025² − 1, под корнем 2025², ответ 2025.",
      "2026 · 2024 = 2025² − 1, juure all on 2025², vastus 2025.",
      "2026 · 2024 = 2025² − 1, so the root is 2025.",
    ),
  },
  {
    id: "8o31",
    topic: "g8qeq",
    a: 80,
    q: O(
      "x₁ и x₂ — корни уравнения x² − 5x + 3 = 0. Найди x₁³ + x₂³.",
      "x₁ ja x₂ on võrrandi x² − 5x + 3 = 0 lahendid. Leia x₁³ + x₂³.",
      "x₁ and x₂ are the roots of x² − 5x + 3 = 0. Find x₁³ + x₂³.",
    ),
    s: O(
      "x₁ + x₂ = 5, x₁x₂ = 3. x₁³ + x₂³ = (x₁ + x₂)³ − 3x₁x₂(x₁ + x₂) = 125 − 45 = 80.",
      "x₁ + x₂ = 5, x₁x₂ = 3. x₁³ + x₂³ = (x₁ + x₂)³ − 3x₁x₂(x₁ + x₂) = 125 − 45 = 80.",
      "x₁ + x₂ = 5, x₁x₂ = 3, so x₁³ + x₂³ = 125 − 45 = 80.",
    ),
  },
  {
    id: "8o32",
    topic: "g8qeq",
    type: "set",
    a: [-3, -2, 2, 3],
    q: O(
      "Реши уравнение x⁴ − 13x² + 36 = 0.",
      "Lahenda võrrand x⁴ − 13x² + 36 = 0.",
      "Solve x⁴ − 13x² + 36 = 0.",
    ),
    s: O(
      "Пусть t = x²: t² − 13t + 36 = 0, t = 4 или t = 9. x = ±2, x = ±3.",
      "Olgu t = x²: t² − 13t + 36 = 0, t = 4 või t = 9. x = ±2, x = ±3.",
      "Let t = x²: t² − 13t + 36 = 0, t = 4 or 9, so x = ±2, ±3.",
    ),
  },
];
