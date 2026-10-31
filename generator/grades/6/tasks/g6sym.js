// 6 класс, тема «Осевая и центральная симметрия»: шаблоны заданий.
import { MINUS, O, P, numAns, t3 } from "../../../core/index.js";

export default {
  /* ===== Симметрия ===== */
  symPt: {
    topic: "g6sym",
    pts: 1,
    cnt: { n: 4, a: 4 },
    title: O("Симметричные точки", "Sümmeetrilised punktid", "Symmetric points"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = R.shuffle(lvl === "n" ? ["Ox", "Oy", "O"] : ["O", "M", "x=c"]);
      for (let i = 0; i < cnt; i += 2) {
        const k = ks[(i / 2) % ks.length];
        const a = R.nz(-9, 9),
          b = R.nz(-9, 9);
        let X, Y, what, how;
        if (k === "Ox") {
          X = a;
          Y = -b;
          what = t3("относительно оси x", "x-telje suhtes", "in the x-axis");
          how = t3(
            "Абсцисса не меняется, ордината меняет знак.",
            "Abstsiss ei muutu, ordinaat muudab märki.",
            "x stays, y changes sign.",
          );
        } else if (k === "Oy") {
          X = -a;
          Y = b;
          what = t3("относительно оси y", "y-telje suhtes", "in the y-axis");
          how = t3(
            "Ордината не меняется, абсцисса меняет знак.",
            "Ordinaat ei muutu, abstsiss muudab märki.",
            "y stays, x changes sign.",
          );
        } else if (k === "O") {
          X = -a;
          Y = -b;
          what = t3(
            "относительно начала координат",
            "koordinaatide alguspunkti suhtes",
            "in the origin",
          );
          how = t3(
            "Обе координаты меняют знак.",
            "Mõlemad koordinaadid muudavad märki.",
            "Both coordinates change sign.",
          );
        } else if (k === "M") {
          const m = R.nz(-5, 5),
            n = R.nz(-5, 5);
          X = 2 * m - a;
          Y = 2 * n - b;
          what = t3(
            `относительно точки M(${m}; ${n})`,
            `punkti M(${m}; ${n}) suhtes`,
            `in the point M(${m}; ${n})`,
          );
          how = t3(
            `M — середина отрезка между точками: x = 2 · ${m} ${MINUS} (${a}) = ${X}, y = 2 · ${n} ${MINUS} (${b}) = ${Y}.`,
            `M on punktide vahelise lõigu keskpunkt: x = 2 · ${m} ${MINUS} (${a}) = ${X}, y = 2 · ${n} ${MINUS} (${b}) = ${Y}.`,
            `M is the midpoint: x = 2 · ${m} ${MINUS} (${a}) = ${X}, y = 2 · ${n} ${MINUS} (${b}) = ${Y}.`,
          );
        } else {
          const c = R.nz(-4, 4);
          X = 2 * c - a;
          Y = b;
          what = t3(
            `относительно прямой x = ${c}`,
            `sirge x = ${c} suhtes`,
            `in the line x = ${c}`,
          );
          how = t3(
            `Расстояние до прямой сохраняется: x = 2 · ${c} ${MINUS} (${a}) = ${X}, y не меняется.`,
            `Kaugus sirgest säilib: x = 2 · ${c} ${MINUS} (${a}) = ${X}, y ei muutu.`,
            `Distance to the line is kept: x = 2 · ${c} ${MINUS} (${a}) = ${X}, y stays.`,
          );
        }
        items.push(
          numAns(X, {
            q: t3(
              `Точку A(${a}; ${b}) отразили ${what}. Абсцисса новой точки`,
              `Punkt A(${a}; ${b}) peegeldati ${what}. Uue punkti abstsiss`,
              `A(${a}; ${b}) is reflected ${what}. The x-coordinate of the image`,
            ),
            pre: "x =",
            exp: P(how),
          }),
        );
        items.push(
          numAns(Y, {
            q: t3("Ордината новой точки", "Uue punkti ordinaat", "The y-coordinate of the image"),
            pre: "y =",
            exp: P(how),
          }),
        );
      }
      return { items: items.slice(0, cnt) };
    },
  },
};
