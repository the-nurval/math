// 7 класс: олимпиадные задачи (фиксированные, не генерируются).
export const OLY = [
  {
    id: "o1",
    topic: "rat",
    q: {
      ru: "Вычисли: 1 − 2 + 3 − 4 + … + 99 − 100.",
      et: "Arvuta: 1 − 2 + 3 − 4 + … + 99 − 100.",
      en: "Calculate: 1 − 2 + 3 − 4 + … + 99 − 100.",
    },
    a: -50,
    s: {
      ru: "Разобьём на 50 пар: (1 − 2) + (3 − 4) + … + (99 − 100). Каждая пара даёт −1, всего −50.",
      et: "Jagame 50 paariks: (1 − 2) + (3 − 4) + … + (99 − 100). Iga paar annab −1, kokku −50.",
      en: "Group into 50 pairs (1 − 2) + (3 − 4) + … + (99 − 100); each pair is −1, so −50.",
    },
  },
  {
    id: "o2",
    topic: "rat",
    type: "choice",
    opts: [
      ["y", { ru: "Может", et: "Võib", en: "Yes" }],
      ["n", { ru: "Не может", et: "Ei või", en: "No" }],
    ],
    a: "n",
    q: {
      ru: "Произведение 25 целых чисел равно 1. Может ли их сумма быть равна 0?",
      et: "25 täisarvu korrutis on 1. Kas nende summa võib olla 0?",
      en: "The product of 25 integers is 1. Can their sum be 0?",
    },
    s: {
      ru: "Все числа равны 1 или −1. Чтобы сумма была 0, единиц и минус единиц должно быть поровну, но 25 — нечётное число. Значит, не может.",
      et: "Kõik arvud on 1 või −1. Summa 0 jaoks peaks neid olema võrdselt, aga 25 on paaritu arv. Seega ei või.",
      en: "Every number is 1 or −1. A zero sum needs equally many of each, but 25 is odd. So no.",
    },
  },
  {
    id: "o3",
    topic: "r6",
    q: {
      ru: "Сколько натуральных чисел от 1 до 100 не делятся ни на 2, ни на 3?",
      et: "Mitu naturaalarvu vahemikus 1–100 ei jagu ei 2-ga ega 3-ga?",
      en: "How many whole numbers from 1 to 100 are divisible by neither 2 nor 3?",
    },
    a: 33,
    s: {
      ru: "На 2 делятся 50 чисел, на 3 — 33, на 6 — 16 (их посчитали дважды). 100 − 50 − 33 + 16 = 33.",
      et: "2-ga jagub 50 arvu, 3-ga 33, 6-ga 16 (need loeti kaks korda). 100 − 50 − 33 + 16 = 33.",
      en: "50 are divisible by 2, 33 by 3, 16 by 6 (counted twice). 100 − 50 − 33 + 16 = 33.",
    },
  },
  {
    id: "o4",
    topic: "r6",
    q: {
      ru: "За круглым столом сидят 10 человек — рыцари (всегда говорят правду) и лжецы (всегда лгут). Каждый сказал: «Оба моих соседа — лжецы». Какое наибольшее число рыцарей может быть за столом?",
      et: "Ümarlaua taga istub 10 inimest — rüütlid (räägivad alati tõtt) ja valetajad (valetavad alati). Igaüks ütles: «Mõlemad mu naabrid on valetajad». Kui palju võib laua taga kõige rohkem rüütleid olla?",
      en: "10 people sit at a round table: knights (always tell the truth) and liars (always lie). Each said: «Both my neighbours are liars.» What is the greatest possible number of knights?",
    },
    a: 5,
    s: {
      ru: "Два рыцаря не могут сидеть рядом, поэтому рыцарей не больше 5. Пример: рыцари и лжецы чередуются — у лжеца оба соседа рыцари, его слова ложны. Ответ 5.",
      et: "Kaks rüütlit ei saa kõrvuti istuda, seega on rüütleid kõige rohkem 5. Näide: rüütlid ja valetajad vahelduvad. Vastus on 5.",
      en: "No two knights can sit together, so at most 5. Alternating knights and liars works. Answer: 5.",
    },
  },
  {
    id: "o5",
    topic: "rat",
    q: {
      ru: "Вычисли: 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(9·10).",
      et: "Arvuta: 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(9·10).",
      en: "Calculate: 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(9·10).",
    },
    a: [9, 10],
    s: {
      ru: "1/(n(n+1)) = 1/n − 1/(n+1). Сумма «складывается»: 1 − 1/2 + 1/2 − 1/3 + … − 1/10 = 1 − 1/10 = 9/10.",
      et: "1/(n(n+1)) = 1/n − 1/(n+1). Summa lüheneb: 1 − 1/10 = 9/10.",
      en: "1/(n(n+1)) = 1/n − 1/(n+1), so the sum telescopes to 1 − 1/10 = 9/10.",
    },
  },
  {
    id: "o6",
    topic: "pow",
    q: {
      ru: "Какой последней цифрой оканчивается число 7²⁰²⁶?",
      et: "Millise numbriga lõpeb arv 7²⁰²⁶?",
      en: "What is the last digit of 7²⁰²⁶?",
    },
    a: 9,
    s: {
      ru: "Последние цифры степеней 7 повторяются: 7, 9, 3, 1. Период 4, 2026 = 4 · 506 + 2, значит как у 7² — цифра 9.",
      et: "Arvu 7 astmete viimased numbrid korduvad: 7, 9, 3, 1. Periood on 4, 2026 = 4 · 506 + 2, seega nagu 7² — number 9.",
      en: "Last digits of powers of 7 cycle 7, 9, 3, 1. 2026 = 4 · 506 + 2, so like 7²: the digit 9.",
    },
  },
  {
    id: "o7",
    topic: "pow",
    type: "choice",
    opts: [
      ["a", { ru: "2³⁰⁰", et: "2³⁰⁰", en: "2³⁰⁰" }],
      ["b", { ru: "3²⁰⁰", et: "3²⁰⁰", en: "3²⁰⁰" }],
      ["c", { ru: "Они равны", et: "Need on võrdsed", en: "They are equal" }],
    ],
    a: "b",
    q: {
      ru: "Что больше: 2³⁰⁰ или 3²⁰⁰?",
      et: "Kumb on suurem: 2³⁰⁰ või 3²⁰⁰?",
      en: "Which is larger: 2³⁰⁰ or 3²⁰⁰?",
    },
    s: {
      ru: "2³⁰⁰ = (2³)¹⁰⁰ = 8¹⁰⁰, 3²⁰⁰ = (3²)¹⁰⁰ = 9¹⁰⁰. 9¹⁰⁰ больше.",
      et: "2³⁰⁰ = 8¹⁰⁰, 3²⁰⁰ = 9¹⁰⁰. 9¹⁰⁰ on suurem.",
      en: "2³⁰⁰ = 8¹⁰⁰ and 3²⁰⁰ = 9¹⁰⁰, so 3²⁰⁰ is larger.",
    },
  },
  {
    id: "o8",
    topic: "pct",
    q: {
      ru: "Цену товара подняли на 20%, а потом снизили на 20%. На сколько процентов новая цена ниже первоначальной?",
      et: "Kauba hinda tõsteti 20% ja seejärel langetati 20%. Mitme protsendi võrra on uus hind algsest madalam?",
      en: "A price was raised by 20%, then lowered by 20%. By what percent is the new price lower than the original?",
    },
    a: 4,
    unit: { ru: "%", et: "%", en: "%" },
    s: {
      ru: "1,2 · 0,8 = 0,96, то есть цена стала 96% от первоначальной — ниже на 4%.",
      et: "1,2 · 0,8 = 0,96 ehk 96% algsest — 4% madalam.",
      en: "1.2 × 0.8 = 0.96, i.e. 96% of the original — 4% lower.",
    },
  },
  {
    id: "o9",
    topic: "pct",
    q: {
      ru: "Есть 200 г 5%-го раствора соли. Сколько граммов воды нужно выпарить, чтобы раствор стал 8%-м?",
      et: "On 200 g 5% soolalahust. Mitu grammi vett tuleb aurustada, et lahus oleks 8%?",
      en: "There is 200 g of a 5% salt solution. How many grams of water must evaporate to make it 8%?",
    },
    a: 75,
    unit: { ru: "г", et: "g", en: "g" },
    s: {
      ru: "Соли 200 · 0,05 = 10 г, она не испаряется. Новая масса 10 : 0,08 = 125 г. Выпарить 200 − 125 = 75 г.",
      et: "Soola on 10 g. Uus mass 10 : 0,08 = 125 g. Aurustada 200 − 125 = 75 g.",
      en: "Salt: 10 g, which stays. New mass 10 ÷ 0.08 = 125 g, so 200 − 125 = 75 g of water.",
    },
  },
  {
    id: "o10",
    topic: "eq",
    q: {
      ru: "Задумали число, умножили его на 3, прибавили 7, результат разделили на 2 и вычли задуманное число. Получилось 9. Какое число задумали?",
      et: "Mõeldi arv, korrutati see 3-ga, liideti 7, tulemus jagati 2-ga ja lahutati mõeldud arv. Saadi 9. Mis arv mõeldi?",
      en: "A number was multiplied by 3, 7 was added, the result was halved and the original number subtracted. The result is 9. What was the number?",
    },
    a: 11,
    s: {
      ru: "(3x + 7) : 2 − x = 9 → 3x + 7 − 2x = 18 → x = 11.",
      et: "(3x + 7) : 2 − x = 9 → x = 11.",
      en: "(3x + 7)/2 − x = 9 → x = 11.",
    },
  },
  {
    id: "o11",
    topic: "r6",
    q: {
      ru: "Какое наименьшее число учеников должно быть в школе, чтобы наверняка нашлись трое, родившиеся в одном месяце?",
      et: "Kui palju õpilasi peab koolis vähemalt olema, et kindlasti leiduks kolm samas kuus sündinut?",
      en: "What is the smallest number of students that guarantees three born in the same month?",
    },
    a: 25,
    s: {
      ru: "24 ученика могут родиться по двое в каждом месяце. 25-й обязательно станет третьим в каком-то месяце (принцип Дирихле).",
      et: "24 õpilast võivad olla sündinud kaupa kaks igas kuus. 25. on kindlasti kuskil kolmas (Dirichlet' printsiip).",
      en: "24 students can be two per month. The 25th must make three in some month (pigeonhole principle).",
    },
  },
  {
    id: "o12",
    topic: "poly",
    q: {
      ru: "Сколько диагоналей у выпуклого 12-угольника?",
      et: "Mitu diagonaali on kumeral 12-nurgal?",
      en: "How many diagonals does a convex 12-gon have?",
    },
    a: 54,
    s: {
      ru: "Из каждой вершины выходит 12 − 3 = 9 диагоналей, каждая посчитана дважды: 12 · 9 : 2 = 54.",
      et: "Igast tipust läheb 9 diagonaali, igaüht loeti kaks korda: 12 · 9 : 2 = 54.",
      en: "Each vertex has 9 diagonals, each counted twice: 12 · 9 ÷ 2 = 54.",
    },
  },
  {
    id: "o13",
    topic: "r6",
    q: {
      ru: "Какой угол образуют часовая и минутная стрелки в 3:40?",
      et: "Millise nurga moodustavad tunni- ja minutiosuti kell 3:40?",
      en: "What angle do the hour and minute hands make at 3:40?",
    },
    a: 130,
    unit: { ru: "°", et: "°", en: "°" },
    s: {
      ru: "Минутная стрелка на 240°. Часовая: 3 · 30° + 40 · 0,5° = 110°. Разность 130°.",
      et: "Minutiosuti on 240° juures, tunniosuti 3 · 30° + 40 · 0,5° = 110°. Vahe 130°.",
      en: "Minute hand at 240°, hour hand at 3 · 30° + 40 · 0.5° = 110°. Difference 130°.",
    },
  },
  {
    id: "o14",
    topic: "stat",
    q: {
      ru: "Средний возраст 11 игроков команды 22 года. Когда одного игрока удалили, средний возраст остальных стал 21 год. Сколько лет удалённому игроку?",
      et: "Meeskonna 11 mängija keskmine vanus on 22 aastat. Kui üks mängija eemaldati, sai ülejäänute keskmiseks vanuseks 21 aastat. Kui vana oli eemaldatud mängija?",
      en: "The mean age of 11 players is 22. After one is sent off, the mean of the rest is 21. How old is that player?",
    },
    a: 32,
    s: {
      ru: "11 · 22 = 242, 10 · 21 = 210, 242 − 210 = 32.",
      et: "11 · 22 = 242, 10 · 21 = 210, 242 − 210 = 32.",
      en: "11 · 22 = 242, 10 · 21 = 210, 242 − 210 = 32.",
    },
  },
  {
    id: "o15",
    topic: "rat",
    type: "set",
    q: {
      ru: "Найди все целые x, при которых дробь (x + 5)/(x + 1) — целое число. (Через «;».)",
      et: "Leia kõik täisarvud x, mille korral (x + 5)/(x + 1) on täisarv. (Eralda «;».)",
      en: "Find all integers x for which (x + 5)/(x + 1) is an integer. (Separate with «;».)",
    },
    a: [0, -2, 1, -3, 3, -5],
    s: {
      ru: "(x + 5)/(x + 1) = 1 + 4/(x + 1). Значит, x + 1 — делитель 4: ±1, ±2, ±4. x = 0; −2; 1; −3; 3; −5.",
      et: "(x + 5)/(x + 1) = 1 + 4/(x + 1), seega x + 1 jagab 4: ±1, ±2, ±4. x = 0; −2; 1; −3; 3; −5.",
      en: "(x + 5)/(x + 1) = 1 + 4/(x + 1), so x + 1 divides 4: ±1, ±2, ±4. x = 0; −2; 1; −3; 3; −5.",
    },
  },
  {
    id: "o16",
    topic: "prism",
    q: {
      ru: "Деревянный куб 3 × 3 × 3 покрасили снаружи и распилили на 27 одинаковых кубиков. Сколько кубиков окрашено ровно с двух сторон?",
      et: "Puidust kuup 3 × 3 × 3 värviti väljast ja saeti 27 ühesuguseks kuubikuks. Mitu kuubikut on värvitud täpselt kahelt küljelt?",
      en: "A 3 × 3 × 3 wooden cube is painted outside and cut into 27 small cubes. How many have exactly two painted faces?",
    },
    a: 12,
    s: {
      ru: "Это кубики в серединах рёбер: у куба 12 рёбер, на каждом один такой кубик.",
      et: "Need on servade keskmised kuubikud: kuubil on 12 serva, igal üks.",
      en: "They are the middle cubes of the edges: 12 edges, one each.",
    },
  },
  {
    id: "o17",
    topic: "rat",
    q: {
      ru: "Вычисли удобным способом: 2026 · 2024 − 2025².",
      et: "Arvuta mugavalt: 2026 · 2024 − 2025².",
      en: "Calculate cleverly: 2026 · 2024 − 2025².",
    },
    a: -1,
    s: {
      ru: "Пусть a = 2025. Тогда (a + 1)(a − 1) − a² = a² − 1 − a² = −1.",
      et: "Olgu a = 2025. (a + 1)(a − 1) − a² = −1.",
      en: "Let a = 2025: (a + 1)(a − 1) − a² = −1.",
    },
  },
  {
    id: "o18",
    topic: "pct",
    q: {
      ru: "Арбуз весил 10 кг и на 99% состоял из воды. Он подсох, и воды стало 98%. Сколько теперь весит арбуз?",
      et: "Arbuus kaalus 10 kg ja sisaldas 99% vett. See kuivas ja vett jäi 98%. Kui palju arbuus nüüd kaalub?",
      en: "A 10 kg watermelon is 99% water. It dries until it is 98% water. How much does it weigh now?",
    },
    a: 5,
    unit: { ru: "кг", et: "kg", en: "kg" },
    s: {
      ru: "Сухого вещества 1% = 0,1 кг, оно не меняется. Теперь это 2% массы: 0,1 : 0,02 = 5 кг.",
      et: "Kuivainet on 0,1 kg, see ei muutu. Nüüd on see 2%: 0,1 : 0,02 = 5 kg.",
      en: "Dry matter is 0.1 kg and stays the same; now it is 2%: 0.1 ÷ 0.02 = 5 kg.",
    },
  },
  {
    id: "o19",
    topic: "func",
    q: {
      ru: "Улитка ползёт вверх по столбу высотой 10 м: днём поднимается на 5 м, ночью сползает на 4 м. На какой день она впервые окажется на вершине?",
      et: "Tigu roomab 10 m kõrgusel postil üles: päeval tõuseb 5 m, öösel libiseb 4 m alla. Mitmendal päeval jõuab ta esimest korda tippu?",
      en: "A snail climbs a 10 m pole: up 5 m by day, down 4 m by night. On which day does it first reach the top?",
    },
    a: 6,
    s: {
      ru: "За 5 суток она поднимется на 5 м. На 6-й день прибавит 5 м и окажется на 10 м — на вершине.",
      et: "5 ööpäevaga tõuseb ta 5 m. 6. päeval lisandub 5 m ja ta on tipus.",
      en: "After 5 full days it is at 5 m; on day 6 it climbs 5 m and reaches 10 m.",
    },
  },
  {
    id: "o20",
    topic: "eq",
    q: {
      ru: "У Пети и Маши вместе 50 конфет. Если Петя отдаст Маше 7 конфет, у них станет поровну. Сколько конфет у Пети?",
      et: "Petil ja Maarjal on kokku 50 kommi. Kui Peeter annab Maarjale 7 kommi, on neil võrdselt. Mitu kommi on Peetril?",
      en: "Pete and Mary have 50 sweets together. If Pete gives Mary 7, they have the same. How many does Pete have?",
    },
    a: 32,
    s: {
      ru: "После передачи у каждого по 25. Значит, у Пети было 25 + 7 = 32.",
      et: "Pärast andmist on kummalgi 25, seega Peetril oli 32.",
      en: "Afterwards each has 25, so Pete had 25 + 7 = 32.",
    },
  },
];
