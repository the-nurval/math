// 8 класс, тема «Косвенные измерения, планы участков»: шаблоны заданий.
import { FR, O, P, ansHtml, numAns, q, qh, t3 } from "../../../core/index.js";
import { m_ } from "../helpers.js";

export default {
  /* --- Косвенные измерения, планы участков --- */
  indMeas: {
    topic: "g8ind",
    pts: 2,
    cnt: { n: 2, a: 3 },
    title: O("Косвенные измерения", "Kaudne mõõtmine", "Indirect measurement"),
    gen(R, lvl, cnt) {
      const items = [];
      const ks = lvl === "n" ? ["shadow", "plan"] : ["mirror", "planHa", "river"];
      for (let i = 0; i < cnt; i++) {
        const k = ks[i % ks.length];
        if (k === "shadow") {
          const h1 = q(R.int(10, 20)).div(10),
            s1 = q(R.int(8, 30)).div(10),
            s2 = q(R.int(40, 180)).div(10);
          const v = h1.mul(s2).div(s1);
          items.push(
            numAns(v, {
              unit: m_(),
              q: t3(
                `Шест высотой ${qh(h1)} м отбрасывает тень ${qh(s1)} м, а дерево в то же время — тень ${qh(s2)} м. Найди высоту дерева.`,
                `${qh(h1)} m kõrgune post heidab ${qh(s1)} m pikkuse varju, puu samal ajal ${qh(s2)} m pikkuse varju. Leia puu kõrgus.`,
                `A ${qh(h1)} m pole casts a ${qh(s1)} m shadow while a tree casts a ${qh(s2)} m shadow. Find the height of the tree.`,
              ),
              exp: P(
                t3(
                  "Треугольники подобны:",
                  "Kolmnurgad on sarnased:",
                  "The triangles are similar:",
                ) + ` ${FR("h", qh(s2))} = ${FR(qh(h1), qh(s1))}; h = ${ansHtml(v)}`,
              ),
            }),
          );
        } else if (k === "plan") {
          const N = R.pick([200, 500, 1000]),
            a = q(R.int(25, 90)).div(10),
            b = q(R.int(20, 70)).div(10);
          const A = a.mul(N).div(100),
            B = b.mul(N).div(100);
          const S = A.mul(B);
          items.push(
            numAns(S, {
              unit: t3("м²", "m²", "m²"),
              q: t3(
                `На плане в масштабе 1 : ${N} участок — прямоугольник ${qh(a)} см × ${qh(b)} см. Найди площадь участка.`,
                `Mõõtkavas 1 : ${N} plaanil on maatükk ristkülik ${qh(a)} cm × ${qh(b)} cm. Leia maatüki pindala.`,
                `On a plan at scale 1 : ${N} a plot is a ${qh(a)} cm × ${qh(b)} cm rectangle. Find its area.`,
              ),
              exp: P(
                t3(
                  `1 см на плане — ${N / 100} м на местности:`,
                  `1 cm plaanil on looduses ${N / 100} m:`,
                  `1 cm on the plan is ${N / 100} m on the ground:`,
                ) + ` ${qh(A)} m × ${qh(B)} m = ${qh(S)} m²`,
              ),
            }),
          );
        } else if (k === "mirror") {
          const e = q(R.int(150, 185)).div(100),
            d1 = q(R.int(10, 30)).div(10),
            d2 = q(R.int(60, 250)).div(10);
          const v = e.mul(d2).div(d1);
          items.push(
            numAns(v, {
              unit: m_(),
              q: t3(
                `Зеркало лежит на земле в ${qh(d2)} м от дерева. Человек отошёл от зеркала на ${qh(d1)} м и увидел в нём верхушку дерева. Его глаза на высоте ${qh(e)} м. Найди высоту дерева.`,
                `Peegel on maas puust ${qh(d2)} m kaugusel. Inimene läks peeglist ${qh(d1)} m kaugusele ja nägi peeglis puu latva. Tema silmad on ${qh(e)} m kõrgusel. Leia puu kõrgus.`,
                `A mirror lies on the ground ${qh(d2)} m from a tree. A person stands ${qh(d1)} m from the mirror and sees the treetop in it; their eyes are ${qh(e)} m high. Find the height of the tree.`,
              ),
              exp: P(
                t3(
                  "Угол падения равен углу отражения, треугольники подобны:",
                  "Langemisnurk võrdub peegeldumisnurgaga, kolmnurgad on sarnased:",
                  "The angles of incidence and reflection are equal, so the triangles are similar:",
                ) + ` h = ${qh(e)} · ${FR(qh(d2), qh(d1))} = ${ansHtml(v)}`,
              ),
            }),
          );
        } else if (k === "planHa") {
          const N = R.pick([2000, 5000, 2500]),
            a = q(R.int(20, 60)).div(10),
            b = q(R.int(30, 80)).div(10),
            h = q(R.int(15, 50)).div(10);
          const f = q(N).div(100);
          const S = a.add(b).div(2).mul(h).mul(f).mul(f).div(10000);
          items.push(
            numAns(S, {
              unit: "ha",
              q: t3(
                `На плане в масштабе 1 : ${N} участок — трапеция с основаниями ${qh(a)} см и ${qh(b)} см и высотой ${qh(h)} см. Найди площадь участка в гектарах.`,
                `Mõõtkavas 1 : ${N} plaanil on maatükk trapets alustega ${qh(a)} cm ja ${qh(b)} cm ning kõrgusega ${qh(h)} cm. Leia maatüki pindala hektarites.`,
                `On a plan at scale 1 : ${N} a plot is a trapezium with bases ${qh(a)} cm and ${qh(b)} cm and height ${qh(h)} cm. Find its area in hectares.`,
              ),
              exp:
                P(
                  t3(
                    `1 см на плане — ${qh(f)} м. Площадь на плане ${qh(a.add(b).div(2).mul(h))} см², на местности в ${qh(f.mul(f))} раз больше (в м²).`,
                    `1 cm plaanil on ${qh(f)} m. Pindala plaanil on ${qh(a.add(b).div(2).mul(h))} cm², looduses ${qh(f.mul(f))} korda suurem (m²).`,
                    `1 cm is ${qh(f)} m. The plan area is ${qh(a.add(b).div(2).mul(h))} cm²; on the ground it is ${qh(f.mul(f))} times larger (in m²).`,
                  ),
                ) + P(`${qh(S.mul(10000))} m² = ${qh(S)} ha`),
            }),
          );
        } else {
          const ab = q(R.int(30, 90)).div(10),
            cd = q(R.int(80, 250)).div(10),
            bc = q(R.int(40, 120)).div(10);
          const v = bc.mul(cd).div(ab);
          items.push(
            numAns(v, {
              unit: m_(),
              q: t3(
                `Чтобы найти ширину реки x, на берегу отложили отрезки так, что получились подобные треугольники: малый с катетами ${qh(ab)} м и ${qh(bc)} м и большой с катетами ${qh(cd)} м и x, сходственные стороны — ${qh(ab)} м и ${qh(cd)} м. Найди x.`,
                `Jõe laiuse x leidmiseks märgiti kaldale lõigud nii, et tekkisid sarnased kolmnurgad: väike kaatetitega ${qh(ab)} m ja ${qh(bc)} m ning suur kaatetitega ${qh(cd)} m ja x; vastavad küljed on ${qh(ab)} m ja ${qh(cd)} m. Leia x.`,
                `To find the river width x, similar triangles were marked out on the bank: a small one with legs ${qh(ab)} m and ${qh(bc)} m, and a large one with legs ${qh(cd)} m and x, where ${qh(ab)} m corresponds to ${qh(cd)} m. Find x.`,
              ),
              exp: P(`${FR("x", qh(bc))} = ${FR(qh(cd), qh(ab))}; x = ${ansHtml(v)}`),
            }),
          );
        }
      }
      return { items };
    },
  },
};
