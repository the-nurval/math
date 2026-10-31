// 6 класс: олимпиадные задачи (фиксированные, не генерируются).
import { O } from "../../core/index.js";

/* ===== Олимпиадные задачи и доказательства ===== */
export const OLY = [
  {
    id: "6o1",
    topic: "g6div",
    a: 61,
    q: O(
      "Найди наименьшее натуральное число больше 1, которое при делении на 2, 3, 4, 5 и 6 даёт остаток 1.",
      "Leia vähim ühest suurem naturaalarv, mis annab jagamisel arvudega 2, 3, 4, 5 ja 6 jäägi 1.",
      "Find the least natural number greater than 1 that leaves remainder 1 when divided by 2, 3, 4, 5 and 6.",
    ),
    s: O(
      "Число на 1 больше общего кратного: НОК(2, 3, 4, 5, 6) = 60, значит 61.",
      "Arv on ühe võrra suurem ühiskordsest: VÜK(2, 3, 4, 5, 6) = 60, seega 61.",
      "It is 1 more than a common multiple: LCM(2, 3, 4, 5, 6) = 60, so 61.",
    ),
  },
  {
    id: "6o2",
    topic: "g6div",
    a: 128,
    q: O(
      "Сколько трёхзначных чисел делятся на 7?",
      "Mitu kolmekohalist arvu jagub 7-ga?",
      "How many three-digit numbers are divisible by 7?",
    ),
    s: O(
      "До 999 кратных 7: 142, до 99: 14. 142 − 14 = 128.",
      "Kuni 999-ni on 7 kordseid 142, kuni 99-ni 14. 142 − 14 = 128.",
      "Multiples of 7 up to 999: 142; up to 99: 14. 142 − 14 = 128.",
    ),
  },
  {
    id: "6o3",
    topic: "g6div",
    a: 4,
    q: O(
      "Какой цифрой оканчивается произведение 2 · 2 · 2 · … · 2 из 2026 двоек?",
      "Millise numbriga lõpeb korrutis 2 · 2 · 2 · … · 2, milles on 2026 kahte?",
      "What is the last digit of 2 · 2 · … · 2 with 2026 twos?",
    ),
    s: O(
      "Последние цифры повторяются: 2, 4, 8, 6, 2, … с периодом 4. 2026 = 4 · 506 + 2, значит вторая цифра цикла — 4.",
      "Viimased numbrid korduvad: 2, 4, 8, 6, 2, … perioodiga 4. 2026 = 4 · 506 + 2, seega tsükli teine number — 4.",
      "Last digits cycle 2, 4, 8, 6 with period 4. 2026 = 4 · 506 + 2, so it is the second: 4.",
    ),
  },
  {
    id: "6o4",
    topic: "g6fadd",
    a: [9, 10],
    q: O(
      "Вычисли: 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(9·10).",
      "Arvuta: 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(9·10).",
      "Calculate 1/(1·2) + 1/(2·3) + … + 1/(9·10).",
    ),
    s: O(
      "1/(n(n+1)) = 1/n − 1/(n+1). Почти всё сокращается: 1 − 1/10 = 9/10.",
      "1/(n(n+1)) = 1/n − 1/(n+1). Peaaegu kõik taandub: 1 − 1/10 = 9/10.",
      "1/(n(n+1)) = 1/n − 1/(n+1); everything cancels except 1 − 1/10 = 9/10.",
    ),
  },
  {
    id: "6o5",
    topic: "g6fmul",
    a: 18,
    unit: O("км", "km", "km"),
    q: O(
      "Турист прошёл 1/3 пути, затем половину оставшегося. Ему осталось пройти 6 км. Какова длина всего пути?",
      "Turist läbis 1/3 teest, siis poole ülejäänust. Jäi läbida 6 km. Kui pikk on kogu tee?",
      "A hiker walked 1/3 of the way, then half of the rest, and has 6 km left. How long is the whole way?",
    ),
    s: O(
      "После первой части осталось 2/3, половина из них — 1/3 пути. Значит 1/3 пути = 6 км, весь путь 18 км.",
      "Pärast esimest osa jäi 2/3, sellest pool on 1/3 teest. Seega 1/3 teest = 6 km, kogu tee 18 km.",
      "After the first part 2/3 remained; half of that is 1/3 of the way = 6 km, so 18 km.",
    ),
  },
  {
    id: "6o6",
    topic: "g6fmul",
    a: 36,
    q: O(
      "Если к числу прибавить его треть, получится 48. Найди число.",
      "Kui arvule liita tema kolmandik, saadakse 48. Leia arv.",
      "A number plus a third of it equals 48. Find the number.",
    ),
    s: O(
      "Число вместе с третью — это 4/3 числа. 48 : 4/3 = 36.",
      "Arv koos kolmandikuga on 4/3 arvust. 48 : 4/3 = 36.",
      "The number plus a third is 4/3 of it: 48 ÷ 4/3 = 36.",
    ),
  },
  {
    id: "6o7",
    topic: "g6div",
    a: 2,
    q: O(
      "Из 9 одинаковых на вид монет одна фальшивая — она легче. За какое наименьшее число взвешиваний на чашечных весах без гирь её можно точно найти?",
      "9 ühesugusest mündist üks on võlts — see on kergem. Mitme kaalumisega kangkaaludel ilma vihtideta saab selle kindlasti leida (vähim arv)?",
      "Of 9 identical-looking coins one fake is lighter. What is the least number of weighings on a balance (no weights) that always finds it?",
    ),
    s: O(
      "Делим на три кучки по 3. Первое взвешивание показывает, в какой кучке фальшивка; второе — какая из трёх монет. Одного взвешивания мало: у него 3 исхода, а монет 9.",
      "Jagame kolmeks hunnikuks 3 kaupa. Esimene kaalumine näitab hunnikut, teine — mündi kolmest. Ühest kaalumisest ei piisa: sellel on 3 tulemust, münte on 9.",
      "Split into three groups of 3: one weighing finds the group, a second finds the coin. One weighing has only 3 outcomes for 9 coins.",
    ),
  },
  {
    id: "6o8",
    topic: "g6ratio",
    a: 1,
    unit: O("л", "l", "l"),
    q: O(
      "В лимонаде сок и вода в отношении 2 : 5. Сколько литров сока в 3,5 л лимонада?",
      "Limonaadis on mahl ja vesi suhtes 2 : 5. Mitu liitrit mahla on 3,5 liitris limonaadis?",
      "Lemonade has juice and water in the ratio 2 : 5. How many litres of juice are in 3.5 l?",
    ),
    s: O(
      "Всего 7 частей, одна часть 0,5 л, сок — 2 части = 1 л.",
      "Kokku 7 osa, üks osa on 0,5 l, mahl on 2 osa = 1 l.",
      "7 parts in total, one part is 0.5 l, juice is 2 parts = 1 l.",
    ),
  },
  {
    id: "6o9",
    topic: "g6pct",
    a: 4,
    unit: O("%", "%", "%"),
    q: O(
      "Цену повысили на 20%, затем снизили на 20%. На сколько процентов новая цена меньше первоначальной?",
      "Hinda tõsteti 20% ja seejärel langetati 20%. Mitme protsendi võrra on uus hind algsest väiksem?",
      "A price rose by 20% and then fell by 20%. By how many percent is it now below the original?",
    ),
    s: O(
      "100 · 1,2 · 0,8 = 96, то есть на 4% меньше.",
      "100 · 1,2 · 0,8 = 96 ehk 4% vähem.",
      "100 · 1.2 · 0.8 = 96, i.e. 4% less.",
    ),
  },
  {
    id: "6o10",
    topic: "g6pct",
    a: 5,
    unit: O("кг", "kg", "kg"),
    q: O(
      "Арбуз весом 10 кг на 99% состоял из воды. Он подсох, и вода стала составлять 98%. Сколько теперь весит арбуз?",
      "10 kg kaaluv arbuus koosnes 99% ulatuses veest. See kuivas ja vett jäi 98%. Kui palju arbuus nüüd kaalub?",
      "A 10 kg watermelon was 99% water. After drying it is 98% water. How much does it weigh now?",
    ),
    s: O(
      "Сухого вещества 1% = 0,1 кг, и оно не меняется. Теперь это 2% массы: 0,1 : 0,02 = 5 кг.",
      "Kuivainet on 1% = 0,1 kg ja see ei muutu. Nüüd on see 2% massist: 0,1 : 0,02 = 5 kg.",
      "Dry matter is 1% = 0.1 kg and stays the same; now it is 2%: 0.1 ÷ 0.02 = 5 kg.",
    ),
  },
  {
    id: "6o11",
    topic: "g6circ",
    a: 9,
    q: O(
      "Длину окружности увеличили в 3 раза. Во сколько раз увеличилась площадь круга?",
      "Ringjoone pikkust suurendati 3 korda. Mitu korda suurenes ringi pindala?",
      "A circumference is tripled. How many times larger is the area?",
    ),
    s: O(
      "Радиус тоже увеличился в 3 раза, а площадь зависит от квадрата радиуса: 3 · 3 = 9.",
      "Raadius suurenes samuti 3 korda, pindala sõltub raadiuse ruudust: 3 · 3 = 9.",
      "The radius triples too; area depends on the radius squared: 3 · 3 = 9.",
    ),
  },
  {
    id: "6o12",
    topic: "g6ratn",
    a: 9,
    q: O(
      "Сколько целых чисел x удовлетворяют условию |x| < 5?",
      "Mitu täisarvu x rahuldab tingimust |x| < 5?",
      "How many integers x satisfy |x| < 5?",
    ),
    s: O(
      "Это −4, −3, …, 3, 4 — всего 9 чисел.",
      "Need on −4, −3, …, 3, 4 — kokku 9 arvu.",
      "They are −4 … 4: 9 numbers.",
    ),
  },
  {
    id: "6o13",
    topic: "g6rops",
    a: 10,
    q: O(
      "Вычисли: (−1) + 2 + (−3) + 4 + … + (−19) + 20.",
      "Arvuta: (−1) + 2 + (−3) + 4 + … + (−19) + 20.",
      "Calculate (−1) + 2 + (−3) + 4 + … + (−19) + 20.",
    ),
    s: O(
      "10 пар, каждая даёт 1: всего 10.",
      "10 paari, iga annab 1: kokku 10.",
      "10 pairs, each equal to 1: total 10.",
    ),
  },
  {
    id: "6o14",
    topic: "g6eq",
    a: 5,
    q: O(
      "Задумали число, умножили на 3, прибавили 7, результат разделили на 2 и получили 11. Какое число задумали?",
      "Mõeldi arv, korrutati 3-ga, liideti 7, tulemus jagati 2-ga ja saadi 11. Mis arv mõeldi?",
      "A number was multiplied by 3, 7 added, the result halved, giving 11. What was the number?",
    ),
    s: O(
      "Идём с конца: 11 · 2 = 22, 22 − 7 = 15, 15 : 3 = 5.",
      "Liigume lõpust: 11 · 2 = 22, 22 − 7 = 15, 15 : 3 = 5.",
      "Work backwards: 11 · 2 = 22, 22 − 7 = 15, 15 ÷ 3 = 5.",
    ),
  },
  {
    id: "6o15",
    topic: "g6eq",
    a: 10,
    q: O(
      "Вася старше Пети на 4 года. Через 3 года сумма их возрастов будет 30 лет. Сколько лет Пете сейчас?",
      "Vasja on Petjast 4 aastat vanem. 3 aasta pärast on nende vanuste summa 30. Kui vana on Petja praegu?",
      "Vasya is 4 years older than Petya. In 3 years their ages will add up to 30. How old is Petya now?",
    ),
    s: O(
      "(x + 3) + (x + 7) = 30, 2x = 20, x = 10.",
      "(x + 3) + (x + 7) = 30, 2x = 20, x = 10.",
      "(x + 3) + (x + 7) = 30, 2x = 20, x = 10.",
    ),
  },
  {
    id: "6o16",
    topic: "g6coord",
    a: 12,
    q: O(
      "Найди площадь треугольника с вершинами A(−2; 1), B(4; 1), C(4; 5).",
      "Leia kolmnurga pindala, mille tipud on A(−2; 1), B(4; 1), C(4; 5).",
      "Find the area of the triangle A(−2; 1), B(4; 1), C(4; 5).",
    ),
    s: O(
      "AB = 6 и параллельна оси x, BC = 4 и параллельна оси y — треугольник прямоугольный: 6 · 4 : 2 = 12.",
      "AB = 6 on x-teljega paralleelne, BC = 4 y-teljega paralleelne — kolmnurk on täisnurkne: 6 · 4 : 2 = 12.",
      "AB = 6 is horizontal, BC = 4 vertical, so it is a right triangle: 6 · 4 ÷ 2 = 12.",
    ),
  },
  {
    id: "6o17",
    topic: "g6sym",
    a: 6,
    q: O(
      "Сколько осей симметрии у правильного шестиугольника?",
      "Mitu sümmeetriatelge on korrapärasel kuusnurgal?",
      "How many lines of symmetry does a regular hexagon have?",
    ),
    s: O(
      "3 оси через противоположные вершины и 3 через середины противоположных сторон: 6.",
      "3 telge läbi vastastippude ja 3 läbi vastaskülgede keskpunktide: 6.",
      "3 through opposite vertices and 3 through midpoints of opposite sides: 6.",
    ),
  },
  {
    id: "6o18",
    topic: "g6tri",
    a: 32,
    unit: O("°", "°", "°"),
    q: O(
      "Один угол треугольника в 2 раза больше другого и на 20° меньше третьего. Найди наименьший угол.",
      "Kolmnurga üks nurk on teisest 2 korda suurem ja kolmandast 20° võrra väiksem. Leia vähim nurk.",
      "One angle is twice another and 20° less than the third. Find the smallest angle.",
    ),
    s: O(
      "x + 2x + (2x + 20) = 180, 5x = 160, x = 32°.",
      "x + 2x + (2x + 20) = 180, 5x = 160, x = 32°.",
      "x + 2x + (2x + 20) = 180, 5x = 160, x = 32°.",
    ),
  },
  {
    id: "6o19",
    topic: "g6tri",
    type: "choice",
    opts: [
      ["y", O("Может", "Võib", "Yes")],
      ["n", O("Не может", "Ei või", "No")],
    ],
    a: "n",
    q: O(
      "Может ли у треугольника быть два тупых угла?",
      "Kas kolmnurgal võib olla kaks nürinurka?",
      "Can a triangle have two obtuse angles?",
    ),
    s: O(
      "Два тупых угла вместе больше 180°, а сумма всех углов треугольника ровно 180°.",
      "Kaks nürinurka on kokku üle 180°, kuid kolmnurga nurkade summa on täpselt 180°.",
      "Two obtuse angles already exceed 180°, but all three add up to exactly 180°.",
    ),
  },
  {
    id: "6o20",
    topic: "g6area",
    a: 12,
    q: O(
      "Куб с ребром 3 см покрасили снаружи и распилили на кубики с ребром 1 см. Сколько кубиков имеют ровно две окрашенные грани?",
      "3 cm servaga kuup värviti väljast ja saeti 1 cm servaga kuubikuteks. Mitmel kuubikul on täpselt kaks värvitud tahku?",
      "A 3 cm cube is painted outside and cut into 1 cm cubes. How many have exactly two painted faces?",
    ),
    s: O(
      "Это кубики в середине каждого ребра: у куба 12 рёбер, на каждом по одному — 12.",
      "Need on iga serva keskmised kuubikud: kuubil on 12 serva, igal üks — 12.",
      "They are the middle cubes of the edges: 12 edges, one each — 12.",
    ),
  },
  {
    id: "6o21",
    topic: "g6area",
    a: 27,
    unit: O("см³", "cm³", "cm³"),
    q: O(
      "Площадь поверхности куба 54 см². Найди его объём.",
      "Kuubi täispindala on 54 cm². Leia selle ruumala.",
      "A cube has surface area 54 cm². Find its volume.",
    ),
    s: O(
      "Одна грань 54 : 6 = 9 см², ребро 3 см, объём 27 см³.",
      "Üks tahk on 54 : 6 = 9 cm², serv 3 cm, ruumala 27 cm³.",
      "One face is 54 ÷ 6 = 9 cm², edge 3 cm, volume 27 cm³.",
    ),
  },
  {
    id: "6o22",
    topic: "g6fdec",
    a: 8,
    q: O(
      "Какая цифра стоит на 2026-м месте после запятой в десятичной записи дроби 1/7?",
      "Milline number on murru 1/7 kümnendkujul 2026. kohal pärast koma?",
      "Which digit is in the 2026th place after the decimal point of 1/7?",
    ),
    s: O(
      "1/7 = 0,(142857), период 6. 2026 = 6 · 337 + 4, четвёртая цифра периода — 8.",
      "1/7 = 0,(142857), periood 6. 2026 = 6 · 337 + 4, perioodi neljas number on 8.",
      "1/7 = 0.(142857), period 6. 2026 = 6 · 337 + 4; the 4th digit is 8.",
    ),
  },
];
