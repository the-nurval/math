// 6 класс, тема «Прямая и обратная пропорциональность»: шаблоны заданий.
import { O, P, Q, numAns, qh, rDec, t3 } from "../../../core/index.js";

export default {
  dirInv: {
    topic: "g6propr",
    pts: 3,
    cnt: { n: 2, a: 2 },
    title: O(
      "Прямая и обратная пропорциональность",
      "Võrdeline ja pöördvõrdeline sõltuvus",
      "Direct and inverse proportion",
    ),
    gen(R, lvl, cnt) {
      const items = [];
      const kinds = R.shuffle(["dir", "inv"]);
      for (let i = 0; i < cnt; i++) {
        if (kinds[i % 2] === "dir") {
          const n1 = R.int(3, 8),
            price = rDec(R, 1, 4).abs(),
            n2 = R.int(2, 15);
          const c1 = price.mul(n1),
            c2 = price.mul(n2);
          items.push(
            numAns(c2, {
              unit: "€",
              q: t3(
                `${n1} тетрадей стоят ${qh(c1)} €. Сколько стоят ${n2} таких тетрадей?`,
                `${n1} vihikut maksavad ${qh(c1)} €. Kui palju maksavad ${n2} sellist vihikut?`,
                `${n1} notebooks cost ${qh(c1)} €. How much do ${n2} of them cost?`,
              ),
              exp:
                P(
                  t3(
                    "Величины прямо пропорциональны: во сколько раз больше тетрадей, во столько раз больше стоимость.",
                    "Suurused on võrdelised: mitu korda rohkem vihikuid, mitu korda suurem hind.",
                    "Directly proportional: more notebooks, proportionally higher cost.",
                  ),
                ) + P(`${qh(c1)} : ${n1} · ${n2} = ${qh(c2)} €`),
            }),
          );
        } else {
          const w =
            lvl === "n"
              ? R.pick([
                  [6, 12, 9],
                  [4, 15, 6],
                  [8, 9, 12],
                  [5, 12, 6],
                ])
              : R.pick([
                  [60, 4, 80],
                  [45, 6, 54],
                  [72, 5, 90],
                  [50, 9, 75],
                ]);
          const ans = new Q(w[0] * w[1], w[2]);
          const qq =
            lvl === "n"
              ? t3(
                  `${w[0]} рабочих выполняют работу за ${w[1]} дней. За сколько дней выполнят эту работу ${w[2]} рабочих?`,
                  `${w[0]} töölist teevad töö ${w[1]} päevaga. Mitme päevaga teevad selle ${w[2]} töölist?`,
                  `${w[0]} workers do a job in ${w[1]} days. How many days will ${w[2]} workers need?`,
                )
              : t3(
                  `Со скоростью ${w[0]} км/ч путь проехали за ${w[1]} ч. За сколько часов проедут этот путь со скоростью ${w[2]} км/ч?`,
                  `Kiirusega ${w[0]} km/h läbiti tee ${w[1]} tunniga. Mitme tunniga läbitakse see kiirusega ${w[2]} km/h?`,
                  `At ${w[0]} km/h the trip took ${w[1]} h. How long at ${w[2]} km/h?`,
                );
          items.push(
            numAns(ans, {
              q: qq,
              exp:
                P(
                  t3(
                    "Величины обратно пропорциональны: их произведение постоянно.",
                    "Suurused on pöördvõrdelised: nende korrutis on jääv.",
                    "Inversely proportional: the product stays the same.",
                  ),
                ) + P(`${w[0]} · ${w[1]} : ${w[2]} = ${qh(ans)}`),
            }),
          );
        }
      }
      return { items };
    },
  },
};
