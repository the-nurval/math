// 6 класс, тема «Делимость, НОД и НОК»: шаблоны заданий.
import { O, P, T_ANS, YN, choiceAns, gcd, numAns, stepList, t3, tr } from "../../../core/index.js";

function factStr(n) {
  const out = [];
  let x = n;
  for (let p = 2; p * p <= x; p++) {
    let k = 0;
    while (x % p === 0) {
      x /= p;
      k++;
    }
    if (k) out.push(k > 1 ? `${p}${["", "", "²", "³", "⁴", "⁵", "⁶"][k] || "^" + k}` : String(p));
  }
  if (x > 1) out.push(String(x));
  return out.join(" · ");
}

function digitSum(n) {
  return String(n)
    .split("")
    .reduce((s, c) => s + +c, 0);
}

/* ===== Делимость ===== */
const RULES = {
  2: O("последняя цифра чётная", "viimane number on paaris", "the last digit is even"),
  3: O("сумма цифр делится на 3", "ristsumma jagub 3-ga", "the digit sum is divisible by 3"),
  5: O("последняя цифра 0 или 5", "viimane number on 0 või 5", "the last digit is 0 or 5"),
  9: O("сумма цифр делится на 9", "ristsumma jagub 9-ga", "the digit sum is divisible by 9"),
  10: O("последняя цифра 0", "viimane number on 0", "the last digit is 0"),
  4: O(
    "число из двух последних цифр делится на 4",
    "kahest viimasest numbrist moodustatud arv jagub 4-ga",
    "the number formed by the last two digits is divisible by 4",
  ),
  25: O(
    "две последние цифры 00, 25, 50 или 75",
    "kaks viimast numbrit on 00, 25, 50 või 75",
    "the last two digits are 00, 25, 50 or 75",
  ),
  6: O("делится и на 2, и на 3", "jagub nii 2-ga kui ka 3-ga", "divisible by both 2 and 3"),
  15: O("делится и на 3, и на 5", "jagub nii 3-ga kui ka 5-ga", "divisible by both 3 and 5"),
  18: O("делится и на 2, и на 9", "jagub nii 2-ga kui ka 9-ga", "divisible by both 2 and 9"),
};

export default {
  divRules: {
    topic: "g6div",
    pts: 1,
    cnt: { n: 4, a: 4 },
    title: O("Делится ли число?", "Kas arv jagub?", "Is it divisible?"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = R.shuffle(lvl === "n" ? [2, 3, 5, 9, 10, 3, 9] : [4, 25, 6, 15, 18, 9, 4]);
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % ks.length];
        const yes = R.chance(0.5);
        let n = k * R.int(lvl === "n" ? 120 : 1100, lvl === "n" ? 999 : 9999);
        if (!yes) n += R.int(1, k - 1);
        const ok = n % k === 0;
        const extra =
          k === 3 || k === 9 || k === 6 || k === 15 || k === 18
            ? t3(
                ` Сумма цифр: ${digitSum(n)}.`,
                ` Ristsumma: ${digitSum(n)}.`,
                ` Digit sum: ${digitSum(n)}.`,
              )
            : "";
        items.push(
          choiceAns(ok ? "y" : "n", YN(), {
            q: t3(
              `Делится ли ${n} на ${k}?`,
              `Kas ${n} jagub arvuga ${k}?`,
              `Is ${n} divisible by ${k}?`,
            ),
            exp:
              P(
                t3(
                  `Признак делимости на ${k}: ${tr(RULES[k])}.`,
                  `Arvuga ${k} jaguvuse tunnus: ${tr(RULES[k])}.`,
                  `Test for ${k}: ${tr(RULES[k])}.`,
                ) + extra,
              ) + P(`${tr(T_ANS)}: ${ok ? t3("да", "jah", "yes") : t3("нет", "ei", "no")}.`),
          }),
        );
      }
      return { items };
    },
  },

  primeFact: {
    topic: "g6div",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O("Разложение на простые множители", "Algtegurideks lahutamine", "Prime factorisation"),
    gen(R, lvl, cnt) {
      const items = [];
      const PR = lvl === "n" ? [2, 2, 3, 3, 5, 7] : [2, 3, 5, 7, 11, 13];
      for (let i = 0; i < cnt; i++) {
        const k = lvl === "n" ? R.int(3, 4) : R.int(4, 5);
        const ps = [];
        for (let j = 0; j < k; j++) ps.push(R.pick(PR));
        ps.sort((a, b) => a - b);
        const n = ps.reduce((a, b) => a * b, 1);
        const hide = lvl === "n" ? R.int(0, k - 1) : k - 1;
        const shown = ps.map((p, j) => (j === hide ? "□" : p)).join(" · ");
        const chain = [];
        let x = n;
        ps.forEach(p => {
          chain.push(`${x} : ${p} = ${x / p}`);
          x /= p;
        });
        items.push(
          numAns(ps[hide], {
            q: t3(
              `${n} = ${shown}. Найди □.`,
              `${n} = ${shown}. Leia □.`,
              `${n} = ${shown}. Find □.`,
            ),
            pre: "□ =",
            exp:
              P(
                t3(
                  "Делим на простые числа по очереди:",
                  "Jagame järjest algarvudega:",
                  "Divide by primes one after another:",
                ),
              ) +
              stepList(chain) +
              P(`${n} = ${factStr(n)}`),
          }),
        );
      }
      return { items };
    },
  },

  gcdLcm: {
    topic: "g6div",
    pts: 2,
    cnt: { n: 2, a: 4 },
    title: O("НОД и НОК", "SÜT ja VÜK", "GCD and LCM"),
    gen(R, lvl, cnt) {
      const items = [];
      let a, b;
      for (let i = 0; i < cnt; i++) {
        if (i % 2 === 0) {
          const g = R.int(2, lvl === "n" ? 9 : 18);
          let m1, m2;
          do {
            m1 = R.int(2, lvl === "n" ? 7 : 12);
            m2 = R.int(2, lvl === "n" ? 9 : 15);
          } while (gcd(m1, m2) !== 1 || m1 === m2);
          a = g * m1;
          b = g * m2;
        }
        const G2 = gcd(a, b),
          Lc = (a * b) / G2;
        const fac = P(`${a} = ${factStr(a)}, ${b} = ${factStr(b)}`);
        if (i % 2 === 0)
          items.push(
            numAns(G2, {
              q: t3(`НОД(${a}; ${b})`, `SÜT(${a}; ${b})`, `GCD(${a}, ${b})`),
              exp:
                fac +
                P(
                  t3(
                    `НОД — произведение общих простых множителей: ${G2}.`,
                    `SÜT on ühiste algtegurite korrutis: ${G2}.`,
                    `GCD is the product of the common prime factors: ${G2}.`,
                  ),
                ),
            }),
          );
        else
          items.push(
            numAns(Lc, {
              q: t3(`НОК(${a}; ${b})`, `VÜK(${a}; ${b})`, `LCM(${a}, ${b})`),
              exp:
                fac +
                P(
                  t3(
                    `НОК = ${a} · ${b} : НОД = ${a * b} : ${G2} = ${Lc}.`,
                    `VÜK = ${a} · ${b} : SÜT = ${a * b} : ${G2} = ${Lc}.`,
                    `LCM = ${a} · ${b} ÷ GCD = ${a * b} ÷ ${G2} = ${Lc}.`,
                  ),
                ),
            }),
          );
      }
      return { items };
    },
  },

  gcdWord: {
    topic: "g6div",
    pts: 3,
    cnt: { n: 1, a: 2 },
    title: O("Реши задачу", "Lahenda ülesanne", "Solve the problem"),
    gen(R, lvl, cnt) {
      const items = [];
      const kinds = R.shuffle(["gcd", "lcm"]);
      for (let i = 0; i < cnt; i++) {
        if (kinds[i % 2] === "gcd") {
          const g = R.int(4, lvl === "n" ? 9 : 14);
          let m1, m2;
          do {
            m1 = R.int(3, 9);
            m2 = R.int(2, 8);
          } while (gcd(m1, m2) !== 1 || m1 === m2);
          const a = g * m1,
            b = g * m2;
          items.push(
            numAns(g, {
              q: t3(
                `Из ${a} красных и ${b} белых роз составили одинаковые букеты, использовав все цветы. Какое наибольшее число букетов могло получиться?`,
                `${a} punasest ja ${b} valgest roosist tehti ühesugused kimbud, kasutades kõik lilled. Kui palju kimpe sai kõige rohkem olla?`,
                `${a} red and ${b} white roses were made into identical bouquets using all the flowers. What is the greatest possible number of bouquets?`,
              ),
              exp: P(
                t3(
                  `Число букетов делит и ${a}, и ${b}; наибольшее такое число — НОД(${a}; ${b}) = ${g}. В каждом букете ${m1} красных и ${m2} белых.`,
                  `Kimpude arv jagab nii arvu ${a} kui ka ${b}; suurim selline arv on SÜT(${a}; ${b}) = ${g}. Igas kimbus on ${m1} punast ja ${m2} valget.`,
                  `The number of bouquets divides both ${a} and ${b}; the greatest is GCD(${a}, ${b}) = ${g}. Each has ${m1} red and ${m2} white.`,
                ),
              ),
            }),
          );
        } else {
          let p1, p2;
          do {
            p1 = R.pick([6, 8, 9, 10, 12, 15]);
            p2 = R.pick([8, 10, 12, 14, 15, 18, 20]);
          } while (p1 === p2);
          const Lc = (p1 * p2) / gcd(p1, p2);
          items.push(
            numAns(Lc, {
              unit: t3("мин", "min", "min"),
              q: t3(
                `Два автобуса отправляются с остановки в 8:00. Первый ходит каждые ${p1} мин, второй — каждые ${p2} мин. Через сколько минут они снова отправятся одновременно?`,
                `Kaks bussi väljuvad peatusest kell 8.00. Esimene sõidab iga ${p1} min järel, teine iga ${p2} min järel. Mitme minuti pärast väljuvad nad jälle korraga?`,
                `Two buses leave a stop at 8:00. One runs every ${p1} min, the other every ${p2} min. After how many minutes do they leave together again?`,
              ),
              exp: P(
                t3(
                  `Нужно наименьшее число, которое делится и на ${p1}, и на ${p2}: НОК(${p1}; ${p2}) = ${Lc}.`,
                  `Vaja on vähimat arvu, mis jagub nii ${p1}-ga kui ka ${p2}-ga: VÜK(${p1}; ${p2}) = ${Lc}.`,
                  `We need the least number divisible by both ${p1} and ${p2}: LCM(${p1}, ${p2}) = ${Lc}.`,
                ),
              ),
            }),
          );
        }
      }
      return { items };
    },
  },
};
