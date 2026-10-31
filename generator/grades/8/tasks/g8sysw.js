// 8 класс, тема «Задачи на системы уравнений»: шаблоны заданий.
import { MINUS, O, P, ansHtml, cm, curLang, numAns, q, qh, t3 } from "../../../core/index.js";
import { sysH } from "../helpers.js";

/* --- Задачи на системы --- */
function eur(v) {
  const s = q(v).v().toFixed(2);
  return (curLang() === "en" ? s : s.replace(".", ",")) + " €";
}

export default {
  // деньги — всегда с центами
  sysWordA: {
    topic: "g8sysw",
    pts: 3,
    cnt: { n: 2, a: 2 },
    title: O(
      "Реши задачу с помощью системы уравнений",
      "Lahenda ülesanne võrrandisüsteemiga",
      "Solve with a system of equations",
    ),
    gen(R, lvl, cnt) {
      const k = R.pick(["tick", "buy"]);
      if (k === "tick") {
        const pa = q(R.pick([7.5, 8.4, 6.8, 9.2, 12])),
          pc = q(R.pick([3.5, 4.2, 4.6, 5])),
          A = R.int(6, 25),
          C = R.int(8, 30);
        const S = pa.mul(A).add(pc.mul(C));
        const intro = t3(
          `Взрослый билет в музей стоит ${eur(pa)}, детский — ${eur(pc)}. Купили ${A + C} билетов и заплатили ${eur(S)}.`,
          `Muuseumi täiskasvanu pilet maksab ${eur(pa)}, lastepilet ${eur(pc)}. Osteti ${A + C} piletit ja maksti ${eur(S)}.`,
          `An adult museum ticket costs ${eur(pa)}, a child ticket ${eur(pc)}. ${A + C} tickets were bought for ${eur(S)}.`,
        );
        const ex =
          P(sysH(`x + y = ${A + C}`, `${qh(pa)}x + ${qh(pc)}y = ${qh(S)}`)) +
          P(
            t3(
              `x — взрослые, y — детские. Из первого y = ${A + C} − x, подставляем: ${qh(pa.sub(pc))}x = ${qh(S.sub(pc.mul(A + C)))}, x = ${A}, y = ${C}.`,
              `x — täiskasvanute, y — lastepiletid. y = ${A + C} − x, asendame: ${qh(pa.sub(pc))}x = ${qh(S.sub(pc.mul(A + C)))}, x = ${A}, y = ${C}.`,
              `x adults, y children. y = ${A + C} − x, so ${qh(pa.sub(pc))}x = ${qh(S.sub(pc.mul(A + C)))}, x = ${A}, y = ${C}.`,
            ),
          );
        return {
          intro,
          items: [
            numAns(A, {
              q: t3(
                "Сколько взрослых билетов?",
                "Mitu täiskasvanu piletit?",
                "How many adult tickets?",
              ),
              exp: ex,
            }),
            numAns(C, {
              q: t3("Сколько детских билетов?", "Mitu lastepiletit?", "How many child tickets?"),
              exp: ex,
            }),
          ],
        };
      }
      const x = q(R.pick([1.35, 2.4, 0.85, 1.6, 3.2])),
        y = q(R.pick([0.45, 0.9, 1.15, 0.6])),
        a1 = R.int(2, 4),
        b1 = R.int(2, 4);
      let a2, b2;
      do {
        a2 = R.int(2, 4);
        b2 = R.int(5, 7);
      } while (a1 * b2 === a2 * b1);
      const s1 = x.mul(a1).add(y.mul(b1)),
        s2 = x.mul(a2).add(y.mul(b2));
      const intro = t3(
        `${a1} тетради и ${b1} ручки стоят ${eur(s1)}, а ${a2} тетради и ${b2} ручек — ${eur(s2)}.`,
        `${a1} vihikut ja ${b1} pastakat maksavad ${eur(s1)}, ${a2} vihikut ja ${b2} pastakat ${eur(s2)}.`,
        `${a1} notebooks and ${b1} pens cost ${eur(s1)}; ${a2} notebooks and ${b2} pens cost ${eur(s2)}.`,
      );
      const ex =
        P(sysH(`${a1}x + ${b1}y = ${qh(s1)}`, `${a2}x + ${b2}y = ${qh(s2)}`)) +
        P(
          t3(
            `x — цена тетради, y — цена ручки. x = ${qh(x)}, y = ${qh(y)}.`,
            `x — vihiku hind, y — pastaka hind. x = ${qh(x)}, y = ${qh(y)}.`,
            `x is the notebook price, y the pen price. x = ${qh(x)}, y = ${qh(y)}.`,
          ),
        );
      return {
        intro,
        items: [
          numAns(x, { q: t3("Цена тетради", "Vihiku hind", "Notebook price"), unit: "€", exp: ex }),
          numAns(y, { q: t3("Цена ручки", "Pastaka hind", "Pen price"), unit: "€", exp: ex }),
        ],
      };
    },
  },

  sysWordB: {
    topic: "g8sysw",
    pts: 3,
    cnt: { n: 2, a: 2 },
    title: O(
      "Реши задачу с помощью системы уравнений",
      "Lahenda ülesanne võrrandisüsteemiga",
      "Solve with a system of equations",
    ),
    gen(R, lvl, cnt) {
      const k = lvl === "n" ? R.pick(["boat", "rect"]) : R.pick(["boat", "mix"]);
      const kmh = t3("км/ч", "km/h", "km/h"),
        km = t3("км", "km", "km"),
        kg = t3("кг", "kg", "kg");
      if (k === "boat") {
        const v = q(R.int(12, 24)),
          u = q(R.pick([1.5, 2, 2.5, 3, 3.5])),
          t1 = q(R.pick([2, 3, 1.5])),
          t2 = q(R.pick([2, 2.5, 3, 4]));
        const d1 = v.add(u).mul(t1),
          d2 = v.sub(u).mul(t2);
        const intro = t3(
          `Лодка за ${qh(t1)} ч по течению проплыла ${qh(d1)} км, а за ${qh(t2)} ч против течения — ${qh(d2)} км.`,
          `Paat sõitis ${qh(t1)} tunniga pärivoolu ${qh(d1)} km ja ${qh(t2)} tunniga vastuvoolu ${qh(d2)} km.`,
          `A boat went ${qh(d1)} km downstream in ${qh(t1)} h and ${qh(d2)} km upstream in ${qh(t2)} h.`,
        );
        const ex =
          P(sysH(`(x + y) · ${qh(t1)} = ${qh(d1)}`, `(x ${MINUS} y) · ${qh(t2)} = ${qh(d2)}`)) +
          P(`x + y = ${qh(v.add(u))}; x ${MINUS} y = ${qh(v.sub(u))}; x = ${qh(v)}, y = ${qh(u)}`);
        return {
          intro,
          items: [
            numAns(v, {
              q: t3(
                "Собственная скорость лодки",
                "Paadi omakiirus",
                "Speed of the boat in still water",
              ),
              unit: kmh,
              exp: ex,
            }),
            numAns(u, {
              q: t3("Скорость течения", "Voolukiirus", "Speed of the current"),
              unit: kmh,
              exp: ex,
            }),
          ],
        };
      }
      if (k === "rect") {
        const w = R.int(4, 20),
          d = R.int(3, 15),
          l = w + d;
        const intro = t3(
          `Периметр прямоугольника ${2 * (l + w)} см, одна сторона на ${d} см длиннее другой.`,
          `Ristküliku ümbermõõt on ${2 * (l + w)} cm, üks külg on teisest ${d} cm pikem.`,
          `A rectangle has perimeter ${2 * (l + w)} cm; one side is ${d} cm longer than the other.`,
        );
        const ex =
          P(sysH(`2(x + y) = ${2 * (l + w)}`, `x ${MINUS} y = ${d}`)) +
          P(`x + y = ${l + w}; 2x = ${l + w + d}; x = ${l}, y = ${w}`);
        return {
          intro,
          items: [
            numAns(l, {
              q: t3("Длинная сторона", "Pikem külg", "Longer side"),
              unit: cm(),
              exp: ex,
            }),
            numAns(w, {
              q: t3("Короткая сторона", "Lühem külg", "Shorter side"),
              unit: cm(),
              exp: ex,
            }),
          ],
        };
      }
      const p1 = R.pick([10, 15, 20]),
        p2 = R.pick([40, 45, 60]),
        pm = R.int(p1 + 5, p2 - 5);
      const M = R.pick([10, 12, 15, 20, 25]);
      const x = q(M * (p2 - pm)).div(p2 - p1),
        y = q(M).sub(x);
      const intro = t3(
        `Смешали ${p1}-процентный и ${p2}-процентный растворы соли и получили ${M} кг ${pm}-процентного раствора.`,
        `Segati ${p1}-protsendilist ja ${p2}-protsendilist soolalahust ning saadi ${M} kg ${pm}-protsendilist lahust.`,
        `A ${p1}% and a ${p2}% salt solution were mixed to get ${M} kg of a ${pm}% solution.`,
      );
      const ex =
        P(
          sysH(
            `x + y = ${M}`,
            `${qh(q(p1).div(100))}x + ${qh(q(p2).div(100))}y = ${qh(q(pm * M).div(100))}`,
          ),
        ) + P(`x = ${ansHtml(x)}, y = ${ansHtml(y)}`);
      return {
        intro,
        items: [
          numAns(x, {
            q: t3(
              `Масса ${p1}-процентного раствора`,
              `${p1}-protsendilise lahuse mass`,
              `Mass of the ${p1}% solution`,
            ),
            unit: kg,
            exp: ex,
          }),
          numAns(y, {
            q: t3(
              `Масса ${p2}-процентного раствора`,
              `${p2}-protsendilise lahuse mass`,
              `Mass of the ${p2}% solution`,
            ),
            unit: kg,
            exp: ex,
          }),
        ],
      };
    },
  },
};
