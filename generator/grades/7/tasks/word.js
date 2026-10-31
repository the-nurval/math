// 7 класс, тема «Текстовые задачи на уравнения»: шаблоны заданий.
import { MINUS, P, Q, ansHtml, curLang, numAns, qh, tr } from "../../../core/index.js";

/* --- 16. Текстовые задачи на уравнение --- */
const NAMES = {
  ru: ["Аня", "Марк", "Лиза", "Артём", "Кира"],
  et: ["Anna", "Mark", "Liisa", "Kristjan", "Kertu"],
  en: ["Anna", "Mark", "Lisa", "Tom", "Kate"],
};

export default {
  wordEq: {
    topic: "word",
    pts: 4,
    cnt: { n: 2, a: 2 },
    title: {
      ru: "Реши задачу с помощью уравнения",
      et: "Lahenda ülesanne võrrandi abil",
      en: "Solve with an equation",
    },
    gen(R, lvl, cnt) {
      const items = [];
      const sc = R.shuffle(["sum", "shop", "rect", "meet", "age"]);
      for (let i = 0; i < cnt; i++) {
        const s = sc[i % sc.length];
        if (s === "sum") {
          const k = new Q(R.int(15, 95), 10),
            x = new Q(R.int(50, 300), 10);
          const S = x.add(x).add(k);
          items.push(
            numAns(x, {
              q: tr({
                ru: `Сумма двух чисел равна ${qh(S)}, одно из них больше другого на ${qh(k)}. Найди меньшее число.`,
                et: `Kahe arvu summa on ${qh(S)}, üks neist on teisest ${qh(k)} võrra suurem. Leia väiksem arv.`,
                en: `Two numbers add up to ${qh(S)}; one is ${qh(k)} more than the other. Find the smaller number.`,
              }),
              exp: P(`x + (x + ${qh(k)}) = ${qh(S)} → 2x = ${qh(S.sub(k))} → x = ${qh(x)}`),
            }),
          );
        } else if (s === "shop") {
          const n1 = R.int(3, 6),
            n2 = R.int(2, 5),
            d = new Q(R.int(15, 90), 100),
            x = new Q(R.int(120, 450), 100);
          const T = x.mul(n1).add(x.sub(d).mul(n2));
          items.push(
            numAns(x, {
              unit: "€",
              q: tr({
                ru: `${n1} тетрадей и ${n2} ручки стоят вместе ${qh(T)} €. Ручка дешевле тетради на ${qh(d)} €. Сколько стоит тетрадь?`,
                et: `${n1} vihikut ja ${n2} pliiatsit maksavad kokku ${qh(T)} €. Pliiats on vihikust ${qh(d)} € odavam. Kui palju maksab vihik?`,
                en: `${n1} notebooks and ${n2} pens cost ${qh(T)} € in total. A pen is ${qh(d)} € cheaper than a notebook. How much is a notebook?`,
              }),
              exp: P(
                `${n1}x + ${n2}(x ${MINUS} ${qh(d)}) = ${qh(T)} → ${n1 + n2}x = ${qh(T.add(d.mul(n2)))} → x = ${qh(x)} €`,
              ),
            }),
          );
        } else if (s === "rect") {
          const w = new Q(R.int(25, 150), 10),
            k = new Q(R.int(10, 80), 10);
          const Pp = w.mul(2).add(w.add(k).mul(2));
          items.push(
            numAns(w, {
              unit: tr({ ru: "см", et: "cm", en: "cm" }),
              q: tr({
                ru: `Периметр прямоугольника ${qh(Pp)} см, длина на ${qh(k)} см больше ширины. Найди ширину.`,
                et: `Ristküliku ümbermõõt on ${qh(Pp)} cm, pikkus on laiusest ${qh(k)} cm suurem. Leia laius.`,
                en: `A rectangle's perimeter is ${qh(Pp)} cm and its length is ${qh(k)} cm more than its width. Find the width.`,
              }),
              exp: P(
                `2(x + x + ${qh(k)}) = ${qh(Pp)} → 2x + ${qh(k)} = ${qh(Pp.div(2))} → x = ${qh(w)}`,
              ),
            }),
          );
        } else if (s === "meet") {
          const v1 = R.int(8, 18),
            v2 = R.int(10, 22),
            t = new Q(R.pick([5, 6, 7, 8, 9, 12, 15, 18]), 4);
          const D = t.mul(v1 + v2);
          const nm = R.shuffle(NAMES[curLang()] || NAMES.ru);
          items.push(
            numAns(t, {
              unit: tr({ ru: "ч", et: "h", en: "h" }),
              q: tr({
                ru: `${nm[0]} и ${nm[1]} выехали на велосипедах навстречу друг другу из двух посёлков, расстояние между которыми ${qh(D)} км. Скорость первого ${v1} км/ч, второго ${v2} км/ч. Через сколько часов они встретятся?`,
                et: `${nm[0]} ja ${nm[1]} sõitsid jalgratastega teineteisele vastu kahest külast, mille vahe on ${qh(D)} km. Esimese kiirus on ${v1} km/h, teise ${v2} km/h. Mitme tunni pärast nad kohtuvad?`,
                en: `${nm[0]} and ${nm[1]} cycle towards each other from two villages ${qh(D)} km apart. Their speeds are ${v1} km/h and ${v2} km/h. After how many hours do they meet?`,
              }),
              exp: P(`(${v1} + ${v2}) · t = ${qh(D)} → t = ${qh(D)} : ${v1 + v2} = ${ansHtml(t)}`),
            }),
          );
        } else {
          const son = R.int(6, 14),
            m = R.pick([3, 4, 5]);
          const fa = son * m;
          const y = R.int(2, 10);
          const ratio = new Q(fa + y, son + y);
          // вариант: сумма возрастов через y лет
          const S = fa + son + 2 * y;
          items.push(
            numAns(new Q(son), {
              q: tr({
                ru: `Отец в ${m} раза старше сына. Через ${y} лет им вместе будет ${S} лет. Сколько лет сыну сейчас?`,
                et: `Isa on pojast ${m} korda vanem. ${y} aasta pärast on neil kokku ${S} aastat. Kui vana on poeg praegu?`,
                en: `A father is ${m} times as old as his son. In ${y} years their ages will add up to ${S}. How old is the son now?`,
              }),
              exp: P(`(${m}x + ${y}) + (x + ${y}) = ${S} → ${m + 1}x = ${S - 2 * y} → x = ${son}`),
            }),
          );
        }
      }
      return { items };
    },
  },
};
