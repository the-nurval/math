// 8 класс, тема «Определения и доказательства, параллельные прямые»: шаблоны заданий.
import { MINUS, O, P, ansHtml, choiceAns, gcd, numAns, q, t3, tr } from "../../../core/index.js";
import { deg } from "../helpers.js";
import { G_, T_, sk } from "../sketches.js";
import { STMT } from "./g8proof-statements.js";

const TF = () => [
  ["t", t3("Верно", "Õige", "True")],
  ["f", t3("Неверно", "Vale", "False")],
];

const pick = (R, arr, n) => R.shuffle(arr).slice(0, n);

// две параллельные прямые и секущая
function svgPar(l1, l2) {
  return sk(
    120,
    G_(
      `<line x1="10" y1="35" x2="210" y2="35"/><line x1="10" y1="85" x2="210" y2="85"/><line x1="60" y1="115" x2="160" y2="5"/>`,
    ) +
      T_(214, 38, "a", "end") +
      T_(214, 80, "b", "end") +
      T_(152, 20, "c") +
      T_(138, 30, l1) +
      T_(74, 100, l2),
  );
}

export default {
  parAng: {
    topic: "g8proof",
    pts: 2,
    cnt: { n: 3, a: 3 },
    title: O(
      "Параллельные прямые и секущая",
      "Paralleelsed sirged ja lõikaja",
      "Parallel lines and a transversal",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const ks =
        lvl === "n" ? R.shuffle(["corr", "alt", "co"]) : R.shuffle(["codiff", "coratio", "altsum"]);
      const pic = svgPar("", "");
      const head = t3(
        "Прямые a и b параллельны, c — секущая.",
        "Sirged a ja b on paralleelsed, c on lõikaja.",
        "Lines a and b are parallel; c is a transversal.",
      );
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % 3];
        let a;
        do {
          a = R.int(31, 149);
        } while (a === 90);
        if (k === "corr" || k === "alt") {
          const nm =
            k === "corr"
              ? t3("соответственный", "kaasnurk", "corresponding")
              : t3("накрест лежащий", "põiknurk", "alternate");
          items.push(
            numAns(a, {
              unit: "°",
              q:
                (i === 0 ? pic : "") +
                head +
                " " +
                t3(
                  `Один из углов ${a}°. Найди угол, ${nm} с ним.`,
                  `Üks nurk on ${a}°. Leia selle ${nm}.`,
                  `One angle is ${a}°. Find the angle ${nm} to it.`,
                ),
              exp: P(
                t3(
                  `При параллельных прямых ${k === "corr" ? "соответственные" : "накрест лежащие"} углы равны: ${a}°.`,
                  `Paralleelsete sirgete korral on ${k === "corr" ? "kaasnurgad" : "põiknurgad"} võrdsed: ${a}°.`,
                  `With parallel lines ${k === "corr" ? "corresponding" : "alternate"} angles are equal: ${a}°.`,
                ),
              ),
            }),
          );
        } else if (k === "co") {
          items.push(
            numAns(180 - a, {
              unit: "°",
              q:
                (i === 0 ? pic : "") +
                head +
                " " +
                t3(
                  `Один из углов ${a}°. Найди угол, односторонний с ним.`,
                  `Üks nurk on ${a}°. Leia selle lisanurk.`,
                  `One angle is ${a}°. Find the co-interior angle.`,
                ),
              exp: P(
                t3(
                  "Сумма односторонних углов 180°:",
                  "Lisanurkade summa on 180°:",
                  "Co-interior angles add up to 180°:",
                ) + ` 180° ${MINUS} ${a}° = ${180 - a}°`,
              ),
            }),
          );
        } else if (k === "codiff") {
          const d = R.int(10, 100);
          const v = q(180 + d).div(2);
          items.push(
            numAns(v, {
              unit: "°",
              q:
                (i === 0 ? pic : "") +
                head +
                " " +
                t3(
                  `Один из односторонних углов на ${d}° больше другого. Найди больший угол.`,
                  `Üks lisanurk on teisest ${d}° suurem. Leia suurem nurk.`,
                  `One co-interior angle is ${d}° larger than the other. Find the larger.`,
                ),
              exp: P(
                `x + (x + ${d}°) = 180°; x = ${deg(q(180 - d).div(2))}; x + ${d}° = ${deg(v)}`,
              ),
            }),
          );
        } else if (k === "coratio") {
          let m, n;
          do {
            m = R.int(1, 7);
            n = R.int(2, 11);
          } while (m >= n || gcd(m, n) > 1);
          const v = q(180 * n).div(m + n);
          items.push(
            numAns(v, {
              unit: "°",
              q:
                (i === 0 ? pic : "") +
                head +
                " " +
                t3(
                  `Односторонние углы относятся как ${m} : ${n}. Найди больший угол.`,
                  `Lisanurgad suhtuvad nagu ${m} : ${n}. Leia suurem nurk.`,
                  `Co-interior angles are in the ratio ${m} : ${n}. Find the larger.`,
                ),
              exp: P(
                `${m}x + ${n}x = 180°; x = ${ansHtml(q(180).div(m + n))}°; ${n}x = ${ansHtml(v)}°`,
              ),
            }),
          );
        } else {
          const s = 2 * R.int(20, 170);
          items.push(
            numAns(q(s).div(2), {
              unit: "°",
              q:
                (i === 0 ? pic : "") +
                head +
                " " +
                t3(
                  `Сумма двух накрест лежащих углов ${s}°. Найди один из них.`,
                  `Kahe põiknurga summa on ${s}°. Leia üks neist.`,
                  `Two alternate angles add up to ${s}°. Find one of them.`,
                ),
              exp: P(
                t3(
                  "Накрест лежащие углы равны:",
                  "Põiknurgad on võrdsed:",
                  "Alternate angles are equal:",
                ) + ` ${s}° : 2 = ${s / 2}°`,
              ),
            }),
          );
        }
      }
      return { items };
    },
  },

  defTrue: {
    topic: "g8proof",
    pts: 1,
    cnt: { n: 2, a: 3 },
    title: O("Верно ли утверждение?", "Kas väide on õige?", "Is the statement true?"),
    gen(R, lvl, cnt) {
      return {
        items: pick(R, STMT, cnt).map(([s, v, e]) =>
          choiceAns(v, TF(), { q: tr(s), exp: P(tr(e)) }),
        ),
      };
    },
  },
};
