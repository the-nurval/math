export default {
  g8rev: {
    t: "Grade 7 review",
    main: [
      "Powers with the same base: add exponents when multiplying, subtract when dividing, multiply for a power of a power. a⁰ = 1, a⁻ⁿ = 1/aⁿ.",
      "Linear equation: expand brackets, move x-terms to one side and numbers to the other, divide by the coefficient of x.",
      "Linear function y = kx + b: k is the slope, b is where the graph crosses the y-axis. Through two points: k = (y₂ − y₁) ÷ (x₂ − x₁).",
    ],
    ex: { q: "2(x − 3) − 1 = −x + 5", s: ["2x − 6 − 1 = −x + 5", "3x = 12", "x = 4"], a: "4" },
    alt: "Check: 2(4 − 3) − 1 = 1 and −4 + 5 = 1.",
    err: "2³ · 2⁴ = 2¹² is wrong: add the exponents, 2³ · 2⁴ = 2⁷.",
  },

  g8poly: {
    t: "Monomials and polynomials",
    main: [
      "A monomial in standard form: the number (coefficient) first, each letter once with its exponent: −6a³b².",
      "The degree of a monomial is the sum of all exponents. The degree of a polynomial is the highest degree of its terms.",
      "Adding and subtracting: remove brackets (a minus in front changes every sign) and collect like terms.",
      "Multiplying: a monomial times each term; a polynomial times a polynomial — every term of the first times every term of the second.",
    ],
    ex: {
      q: "(2x − 3)(x + 4)",
      s: ["2x · x + 2x · 4 − 3 · x − 3 · 4", "2x² + 8x − 3x − 12", "2x² + 5x − 12"],
      a: "2x² + 5x − 12",
    },
    alt: "Check with x = 1: (2 − 3)(1 + 4) = −5 and 2 + 5 − 12 = −5.",
    err: "−(x² − 3x) = −x² − 3x is wrong: change every sign, −x² + 3x.",
  },

  g8fsu: {
    t: "Special products",
    main: [
      "(a + b)² = a² + 2ab + b²; (a − b)² = a² − 2ab + b².",
      "(a − b)(a + b) = a² − b².",
      "Further: (a + b)³ = a³ + 3a²b + 3ab² + b³; a³ − b³ = (a − b)(a² + ab + b²); a³ + b³ = (a + b)(a² − ab + b²).",
      "The formulas work both ways and help with mental arithmetic: 99² = (100 − 1)² = 9801.",
    ],
    ex: {
      q: "(3x − 2y)²",
      s: ["a = 3x, b = 2y", "(3x)² − 2 · 3x · 2y + (2y)²", "9x² − 12xy + 4y²"],
      a: "9x² − 12xy + 4y²",
    },
    alt: "51 · 49 = (50 + 1)(50 − 1) = 2500 − 1 = 2499.",
    err: "(a + b)² = a² + b² is wrong: the middle term 2ab is missing.",
  },

  g8fact: {
    t: "Factorising",
    main: [
      "Take out a common factor: 6a²b − 9ab = 3ab(2a − 3).",
      "Grouping: ax + ay + bx + by = a(x + y) + b(x + y) = (x + y)(a + b).",
      "Formulas: a² − b² = (a − b)(a + b), a² ± 2ab + b² = (a ± b)².",
      "For «product = 0», set each factor equal to zero.",
    ],
    ex: {
      q: "x³ − 9x = 0",
      s: ["x(x² − 9) = 0", "x(x − 3)(x + 3) = 0", "x = 0, x = 3, x = −3"],
      a: "−3; 0; 3",
    },
    alt: "57² − 43² = (57 − 43)(57 + 43) = 14 · 100 = 1400.",
    err: "x² = 5x → x = 5 loses the root x = 0. Do not divide by x; write x(x − 5) = 0.",
  },

  g8lin2: {
    t: "Equations in two unknowns",
    main: [
      "A solution of ax + by = c is a pair (x; y) that makes it true. There are infinitely many such pairs.",
      "The graph of ax + by = c (a and b not both zero) is a straight line. Write y in terms of x and plot two points.",
      "Solving a system graphically: draw both lines; the solution is the intersection point. Parallel lines give no solution, identical lines infinitely many.",
    ],
    ex: {
      q: "Does (2; −1) lie on 3x + 2y = 4?",
      s: ["3 · 2 + 2 · (−1) = 6 − 2 = 4", "4 = 4, true"],
      a: "yes",
    },
    alt: "You can also write y = 2 − 1.5x and put x = 2: y = −1.",
    err: "Using (−1; 2) instead of (2; −1): the first coordinate is always x.",
  },

  g8sys: {
    t: "Systems of equations",
    main: [
      "Substitution: write one unknown from one equation and substitute it into the other.",
      "Elimination: multiply the equations so the coefficients of one unknown become opposite, then add.",
      "Put the value found into either equation to get the other unknown. The answer is a pair (x; y).",
    ],
    ex: {
      q: "2x + 3y = 7, 4x − 3y = 5",
      s: ["Add: 6x = 12, x = 2", "2 · 2 + 3y = 7, y = 1"],
      a: "(2; 1)",
    },
    alt: "By substitution: 4x = 5 + 3y from the second, and so on — same answer.",
    err: "Finding x and forgetting y: the solution is a pair of numbers.",
  },

  g8sysw: {
    t: "Word problems with systems",
    main: [
      "Call the two unknowns x and y and write down what each means.",
      "Each condition gives one equation. You need two independent conditions.",
      "River problems: downstream speed v + u, upstream v − u. Mixtures: mass of substance = mass of solution · percent ÷ 100.",
      "Check the answer against the story, not only the equations.",
    ],
    ex: {
      q: "A notebook and a pen cost €2.10; 3 notebooks and 2 pens cost €5.30.",
      s: [
        "x + y = 2.1; 3x + 2y = 5.3",
        "From the first y = 2.1 − x; 3x + 4.2 − 2x = 5.3",
        "x = 1.1; y = 1",
      ],
      a: "notebook €1.10, pen €1.00",
    },
    alt: "Elimination: multiply the first by −2 and add: x = 1.1.",
    err: "Writing the upstream speed as u − v instead of v − u.",
  },

  g8afr: {
    t: "Algebraic fractions",
    main: [
      "A fraction is defined when the denominator is not zero; those values are excluded.",
      "Cancel only common factors: factorise the numerator and denominator first.",
      "Add and subtract with a common denominator; multiply tops and bottoms; divide by multiplying by the reciprocal.",
    ],
    ex: {
      q: "(x² − 9)/(x² + 3x)",
      s: ["(x − 3)(x + 3) / (x(x + 3))", "(x − 3)/x, x ≠ 0, x ≠ −3"],
      a: "(x − 3)/x",
    },
    alt: "Check with x = 1: (1 − 9)/(1 + 3) = −2 and (1 − 3)/1 = −2.",
    err: "(x + 3)/(x + 5) = 3/5 is wrong: you cannot cancel terms, only factors.",
  },

  g8sqrt: {
    t: "Square roots",
    main: [
      "√a is the non-negative number whose square is a (a ≥ 0). √(a²) = |a|.",
      "√(ab) = √a · √b, √(a/b) = √a / √b (a ≥ 0, b > 0).",
      "Taking out a factor: √72 = √(36 · 2) = 6√2. Like roots are added like like terms.",
      "Comparing: move the factor under the root, 3√5 = √45.",
    ],
    ex: { q: "√50 + √18 − √8", s: ["5√2 + 3√2 − 2√2", "6√2"], a: "6√2" },
    alt: "Approximately: √2 ≈ 1.41, 6√2 ≈ 8.49.",
    err: "√(9 + 16) = 3 + 4 is wrong: √25 = 5. The root of a sum is not the sum of roots.",
  },

  g8proof: {
    t: "Proofs and parallel lines",
    main: [
      "A definition explains a concept; a theorem is a statement that is proved. In «if …, then …» there is a hypothesis and a conclusion; the converse swaps them and is not always true.",
      "A transversal makes corresponding, alternate and co-interior angles with two lines.",
      "Lines are parallel if corresponding or alternate angles are equal, or co-interior angles add up to 180°. Conversely, parallel lines give these equalities.",
      "Through a point not on a line there is exactly one parallel line (axiom).",
    ],
    ex: {
      q: "a ∥ b and one co-interior angle is 68°. Find the other.",
      s: ["Co-interior angles add up to 180°", "180° − 68° = 112°"],
      a: "112°",
    },
    alt: "Going through vertical and corresponding angles gives the same answer.",
    err: "Treating co-interior angles as equal: corresponding and alternate angles are equal, co-interior ones add up to 180°.",
  },

  g8tri: {
    t: "Midsegments, medians, altitudes, bisectors",
    main: [
      "A midsegment joins the midpoints of two sides, is parallel to the third side and half as long.",
      "Medians meet at one point that divides each 2 : 1 from the vertex. The median to the hypotenuse is half the hypotenuse.",
      "An altitude is perpendicular to a side (or its extension). An angle bisector halves the angle.",
      "Bisectors meet at the incentre; perpendicular bisectors of the sides meet at the circumcentre.",
    ],
    ex: {
      q: "Median AM = 12 cm; O is where the medians meet. Find AO.",
      s: ["AO : OM = 2 : 1", "AO = 12 · 2/3 = 8"],
      a: "8 cm",
    },
    alt: "OM = 12 ÷ 3 = 4 cm, AO = 12 − 4 = 8 cm.",
    err: "Thinking a median halves the angle: the bisector does that; a median halves the opposite side.",
  },

  g8pyth: {
    t: "Pythagoras' theorem",
    main: [
      "In a right triangle the square of the hypotenuse equals the sum of the squares of the legs: c² = a² + b².",
      "A leg: b = √(c² − a²). The hypotenuse is the longest side.",
      "Converse: if c² = a² + b², the triangle is right-angled (the right angle is opposite c).",
      "Distance between points: AB = √((x₂ − x₁)² + (y₂ − y₁)²).",
    ],
    ex: {
      q: "The legs are 6 cm and 8 cm. Find the hypotenuse.",
      s: ["c² = 36 + 64 = 100", "c = 10"],
      a: "10 cm",
    },
    alt: "It is the 3, 4, 5 triple doubled.",
    err: "c = a + b is wrong: add the squares, not the sides.",
  },

  g8quad: {
    t: "Parallelograms and trapezia",
    main: [
      "Parallelogram: opposite sides are parallel and equal, opposite angles equal, neighbouring angles add up to 180°, the diagonals bisect each other.",
      "Tests: one pair of sides parallel and equal; or both pairs of opposite sides equal; or the diagonals bisect each other.",
      "Trapezium: two sides (the bases) are parallel. The midsegment is parallel to the bases and equals half their sum.",
      "In an isosceles trapezium the base angles are equal and the diagonals are equal.",
    ],
    ex: {
      q: "The bases are 7 cm and 13 cm. Find the midsegment.",
      s: ["(7 + 13) ÷ 2", "10"],
      a: "10 cm",
    },
    alt: "If the midsegment is 10 and one base is 7, the other is 2 · 10 − 7 = 13.",
    err: "Assuming every trapezium has equal base angles: only an isosceles one does.",
  },

  g8area: {
    t: "Areas of polygons",
    main: [
      "Parallelogram: S = ah. Triangle: S = ah/2. Right triangle: S = ab/2 (a, b are the legs).",
      "Trapezium: S = (a + b)/2 · h. Rhombus: S = d₁d₂/2.",
      "The height often comes from Pythagoras or from the leg opposite 30° (half the hypotenuse).",
      "Given the area, find a missing side or height from the formula.",
    ],
    ex: {
      q: "Isosceles trapezium: bases 10 and 26 cm, legs 17 cm.",
      s: ["(26 − 10) ÷ 2 = 8", "h = √(17² − 8²) = 15", "S = (10 + 26) ÷ 2 · 15 = 270"],
      a: "270 cm²",
    },
    alt: "Cut it into a 10 × 15 rectangle and two triangles of 8 · 15 ÷ 2.",
    err: "S = ab for a parallelogram with sides a and b is wrong: multiply a side by the height.",
  },

  g8qeq: {
    t: "Quadratic equations, Vieta's formulas",
    main: [
      "ax² + bx + c = 0, a ≠ 0. Discriminant D = b² − 4ac.",
      "D > 0: two roots x = (−b ± √D)/(2a); D = 0: one root −b/(2a); D < 0: no roots.",
      "Incomplete: ax² + bx = 0 → x(ax + b) = 0; ax² + c = 0 → x² = −c/a.",
      "Vieta for x² + px + q = 0: x₁ + x₂ = −p, x₁x₂ = q.",
    ],
    ex: {
      q: "2x² − 3x − 2 = 0",
      s: ["D = 9 + 16 = 25", "x = (3 ± 5)/4", "x₁ = 2, x₂ = −0.5"],
      a: "−0.5; 2",
    },
    alt: "Check with Vieta: 2 + (−0.5) = 1.5 = 3/2, 2 · (−0.5) = −1 = −2/2.",
    err: "x₁ + x₂ = p is wrong: the sum of the roots is −p.",
  },

  g8circ: {
    t: "Circles: tangents, central and inscribed angles",
    main: [
      "A tangent is perpendicular to the radius at the point of contact. Tangent segments from one point are equal.",
      "A central angle equals its arc. An inscribed angle is half its arc (half the central angle).",
      "An inscribed angle on a diameter is a right angle. Inscribed angles on the same arc are equal.",
      "In a quadrilateral with an inscribed circle, opposite sides have equal sums.",
    ],
    ex: {
      q: "Central angle AOB = 130°. Find inscribed angle ACB on the same arc.",
      s: ["Inscribed = central ÷ 2", "130° ÷ 2 = 65°"],
      a: "65°",
    },
    alt: "Arc AB = 130°, the inscribed angle is half the arc.",
    err: "Taking the inscribed angle equal to the central one: it is half as big.",
  },

  g8reg: {
    t: "Regular polygons",
    main: [
      "A regular polygon has all sides and all angles equal.",
      "The interior angles of a convex n-gon add up to 180° · (n − 2); each interior angle of a regular one is 180° · (n − 2)/n.",
      "Exterior angles add up to 360°, so each is 360°/n. Number of diagonals: n(n − 3)/2.",
      "A regular hexagon's side equals its circumradius; for a square a = R√2, for an equilateral triangle R = a/√3.",
    ],
    ex: {
      q: "An interior angle is 150°. How many sides?",
      s: ["Exterior angle 180° − 150° = 30°", "360° ÷ 30° = 12"],
      a: "12",
    },
    alt: "Solving 180(n − 2)/n = 150 also gives n = 12.",
    err: "Dividing 360° by the interior angle instead of the exterior one.",
  },

  g8sim: {
    t: "Similar triangles",
    main: [
      "Similar triangles have equal angles and proportional corresponding sides; k is the scale factor.",
      "Tests: two angles; two sides and the included angle; three sides.",
      "Perimeters are in the ratio k, areas in the ratio k².",
      "A line parallel to a side cuts off a similar triangle. Altitude to the hypotenuse: h² = pq; leg² = hypotenuse · its projection.",
    ],
    ex: {
      q: "DE ∥ AC, BD = 4, DA = 2, AC = 9. Find DE.",
      s: ["△DBE ∼ △ABC, k = BD ÷ BA = 4 ÷ 6", "DE = 9 · 4/6 = 6"],
      a: "6",
    },
    alt: "Or set up DE/9 = 4/6.",
    err: "Using k = BD ÷ DA = 4 ÷ 2 is wrong: compare BD with the whole side BA.",
  },

  g8ind: {
    t: "Indirect measurement, site plans",
    main: [
      "Find a height from shadows: the «pole — shadow» and «tree — shadow» triangles are similar, h = h₁ · s₂ / s₁.",
      "The mirror method and the sighting-stick method also use similar triangles.",
      "Scale 1 : N: 1 cm on the plan is N cm on the ground. Areas are N² times larger.",
      "1 are = 100 m², 1 ha = 10 000 m².",
    ],
    ex: {
      q: "Scale 1 : 500, the plot on the plan is 6 cm × 4 cm. Area?",
      s: ["1 cm is 5 m", "30 m × 20 m = 600 m²"],
      a: "600 m² = 6 ares",
    },
    alt: "24 cm² · 500² = 6 000 000 cm² = 600 m².",
    err: "Multiplying the area by N instead of N².",
  },
};
