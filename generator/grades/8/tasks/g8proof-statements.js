// Утверждения для задания «Верно ли утверждение» (defTrue): текст и верно/неверно.
import { O } from "../../../core/index.js";

export const STMT = [
  [
    O(
      "Если два угла вертикальные, то они равны.",
      "Kui kaks nurka on tippnurgad, siis nad on võrdsed.",
      "If two angles are vertical angles, they are equal.",
    ),
    "t",
    O(
      "Это теорема о вертикальных углах.",
      "See on tippnurkade teoreem.",
      "This is the vertical angles theorem.",
    ),
  ],
  [
    O(
      "Если два угла равны, то они вертикальные.",
      "Kui kaks nurka on võrdsed, siis nad on tippnurgad.",
      "If two angles are equal, they are vertical angles.",
    ),
    "f",
    O(
      "Обратное утверждение неверно: равные углы могут быть, например, углами при основании равнобедренного треугольника.",
      "Pöördlause on vale: võrdsed võivad olla näiteks võrdhaarse kolmnurga alusnurgad.",
      "The converse is false: equal angles can be, for example, the base angles of an isosceles triangle.",
    ),
  ],
  [
    O(
      "Если при пересечении двух прямых секущей соответственные углы равны, то прямые параллельны.",
      "Kui kahe sirge lõikamisel kolmandaga on kaasnurgad võrdsed, siis sirged on paralleelsed.",
      "If corresponding angles are equal, the lines are parallel.",
    ),
    "t",
    O(
      "Это признак параллельности прямых.",
      "See on sirgete paralleelsuse tunnus.",
      "This is a test for parallel lines.",
    ),
  ],
  [
    O(
      "Если сумма односторонних углов равна 180°, то прямые параллельны.",
      "Kui lisanurkade summa on 180°, siis sirged on paralleelsed.",
      "If co-interior angles add up to 180°, the lines are parallel.",
    ),
    "t",
    O(
      "Это признак параллельности прямых.",
      "See on sirgete paralleelsuse tunnus.",
      "This is a test for parallel lines.",
    ),
  ],
  [
    O(
      "Через точку вне прямой можно провести две разные прямые, параллельные данной.",
      "Punkti kaudu, mis ei asu sirgel, saab tõmmata kaks erinevat antud sirgega paralleelset sirget.",
      "Through a point not on a line you can draw two different lines parallel to it.",
    ),
    "f",
    O(
      "По аксиоме параллельных такая прямая только одна.",
      "Paralleelsuse aksioomi järgi on selline sirge ainult üks.",
      "By the parallel axiom there is only one such line.",
    ),
  ],
  [
    O(
      "Если две прямые параллельны третьей, то они параллельны между собой.",
      "Kui kaks sirget on paralleelsed kolmandaga, siis on nad omavahel paralleelsed.",
      "Two lines parallel to a third line are parallel to each other.",
    ),
    "t",
    O(
      "Это следствие аксиомы параллельных.",
      "See on paralleelsuse aksioomi järeldus.",
      "This follows from the parallel axiom.",
    ),
  ],
  [
    O(
      "Если у треугольника два угла равны, то он равносторонний.",
      "Kui kolmnurga kaks nurka on võrdsed, siis on ta võrdkülgne.",
      "If two angles of a triangle are equal, it is equilateral.",
    ),
    "f",
    O(
      "Он равнобедренный, но не обязательно равносторонний: например, углы 50°, 50°, 80°.",
      "Ta on võrdhaarne, kuid mitte tingimata võrdkülgne: näiteks nurgad 50°, 50°, 80°.",
      "It is isosceles but not necessarily equilateral: e.g. 50°, 50°, 80°.",
    ),
  ],
  [
    O(
      "Если прямая перпендикулярна одной из двух параллельных прямых, то она перпендикулярна и другой.",
      "Kui sirge on risti ühega kahest paralleelsest sirgest, siis on ta risti ka teisega.",
      "A line perpendicular to one of two parallel lines is perpendicular to the other.",
    ),
    "t",
    O(
      "Соответственные углы равны, значит второй угол тоже 90°.",
      "Kaasnurgad on võrdsed, seega ka teine nurk on 90°.",
      "Corresponding angles are equal, so the other angle is 90° too.",
    ),
  ],
  [
    O(
      "Смежные углы всегда равны.",
      "Kõrvunurgad on alati võrdsed.",
      "Adjacent angles on a line are always equal.",
    ),
    "f",
    O(
      "Их сумма 180°; равны они, только если оба прямые.",
      "Nende summa on 180°; võrdsed on nad ainult siis, kui mõlemad on täisnurgad.",
      "They add up to 180°; they are equal only if both are right angles.",
    ),
  ],
  [
    O(
      "Утверждение, обратное верной теореме, всегда верно.",
      "Õige teoreemi pöördlause on alati õige.",
      "The converse of a true theorem is always true.",
    ),
    "f",
    O(
      "Например, обратное к теореме о вертикальных углах неверно.",
      "Näiteks tippnurkade teoreemi pöördlause on vale.",
      "For example, the converse of the vertical angles theorem is false.",
    ),
  ],
  [
    O(
      "Внешний угол треугольника больше любого внутреннего угла этого треугольника.",
      "Kolmnurga välisnurk on suurem kolmnurga igast sisenurgast.",
      "An exterior angle of a triangle is greater than every interior angle.",
    ),
    "f",
    O(
      "Он больше только двух внутренних углов, не смежных с ним. Смежный с ним внутренний угол может быть тупым и больше его.",
      "Ta on suurem ainult kahest temaga mitte kõrvuti asuvast sisenurgast. Kõrvuti asuv sisenurk võib olla nürinurk ja temast suurem.",
      "It is greater only than the two non-adjacent interior angles; the adjacent one may be obtuse and larger.",
    ),
  ],
  [
    O(
      "В любом треугольнике хотя бы два угла острые.",
      "Igas kolmnurgas on vähemalt kaks teravnurka.",
      "Every triangle has at least two acute angles.",
    ),
    "t",
    O(
      "Если бы два угла были не острыми, их сумма была бы не меньше 180°.",
      "Kui kaks nurka ei oleks teravnurgad, oleks nende summa vähemalt 180°.",
      "If two angles were not acute, they would add up to at least 180°.",
    ),
  ],
];
