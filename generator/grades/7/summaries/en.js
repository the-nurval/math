export default {
  r6: {
    t: "Fractions, circles, triangles (Grade 6)",
    main: [
      "Add and subtract fractions after bringing them to a common denominator.",
      "To multiply fractions, multiply numerators and denominators; dividing by a fraction means multiplying by its reciprocal.",
      "Circumference C = 2πr, area of a circle S = πr², π ≈ 3.14.",
      "The angles of a triangle add up to 180°.",
    ],
    ex: {
      q: "2/3 + 3/4",
      s: ["Common denominator 12: 8/12 + 9/12.", "8/12 + 9/12 = 17/12 = 1 5/12."],
      a: "1 5/12",
    },
    alt: "Division: 3/4 ÷ 2/5 = 3/4 · 5/2 = 15/8 = 1 7/8.",
    err: "1/2 + 1/3 = 2/5 is wrong: you don't add numerators and denominators. Correct: 3/6 + 2/6 = 5/6.",
  },

  rat: {
    t: "Operations with rational numbers",
    main: [
      "Same signs — add the absolute values and keep the common sign.",
      "Different signs — subtract the smaller absolute value from the larger and take the sign of the number with the larger absolute value.",
      "Subtraction is adding the opposite: a − b = a + (−b).",
      "Multiplying and dividing: same signs give plus, different signs give minus.",
    ],
    ex: {
      q: "−7.4 + 2.9",
      s: [
        "Different signs: 7.4 − 2.9 = 4.5.",
        "−7.4 has the larger absolute value, so the answer is negative.",
      ],
      a: "−4.5",
    },
    alt: "Picture the number line: from −7.4 take 2.9 steps to the right and you land on −4.5.",
    err: "−5 − (−3) = −8 is wrong. Minus a minus is plus: −5 + 3 = −2.",
  },

  dist: {
    t: "Absolute value and distance on the number line",
    main: [
      "|a| is the distance from 0 to a, so it is never negative.",
      "The distance between points a and b is |a − b|.",
      "|x| = 5 means x = 5 or x = −5; |x| = −2 has no solutions.",
    ],
    ex: {
      q: "Distance between −3.5 and 2",
      s: ["|−3.5 − 2| = |−5.5|.", "|−5.5| = 5.5."],
      a: "5.5",
    },
    alt: "Count along the line: from −3.5 to 0 is 3.5, from 0 to 2 is 2, together 5.5.",
    err: "|−7| = −7 is wrong: absolute value is a distance, |−7| = 7.",
  },

  pow: {
    t: "Powers and their rules",
    main: [
      "aⁿ is the product of n equal factors a.",
      "aᵐ · aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ.",
      "A negative number to an even power is positive, to an odd power negative.",
    ],
    ex: {
      q: "2³ · 2⁴ ÷ 2⁵",
      s: ["Same base: add and subtract the exponents: 3 + 4 − 5 = 2.", "2² = 4."],
      a: "4",
    },
    alt: "Calculate directly: 8 · 16 ÷ 32 = 128 ÷ 32 = 4.",
    err: "−3² = 9 is wrong: the power applies only to 3, so −3² = −9, while (−3)² = 9.",
  },

  std: {
    t: "Zero and negative exponents, standard form",
    main: [
      "a⁰ = 1 (for a ≠ 0).",
      "a⁻ⁿ = 1/aⁿ, for example 2⁻³ = 1/8.",
      "Standard form: a · 10ⁿ, where 1 ≤ a < 10.",
    ],
    ex: {
      q: "Write 0.00052 in standard form",
      s: [
        "Move the decimal point right until you get a number from 1 to 10: 5.2.",
        "It moved 4 places right, so the exponent is −4.",
      ],
      a: "5.2 · 10⁻⁴",
    },
    alt: "Check: 10⁻⁴ = 0.0001, and 5.2 · 0.0001 = 0.00052.",
    err: "52 · 10⁻⁵ is not standard form: 52 is greater than 10. And 2⁻³ ≠ −8: 2⁻³ = 1/8.",
  },

  pct: {
    t: "Percent, per mille, percentage points",
    main: [
      "1% is a hundredth of a number, 1‰ a thousandth.",
      "p% of a: a · p/100. A number from its part: part ÷ (p/100).",
      "A percentage point is a difference of percentages: from 20% to 25% is up 5 percentage points, but by 25%.",
    ],
    ex: {
      q: "Price 80 €, 15% off. New price?",
      s: ["Discount: 80 · 0.15 = 12 €.", "New price: 80 − 12 = 68 €."],
      a: "68 €",
    },
    alt: "Directly: after the discount 85% remains, 80 · 0.85 = 68 €.",
    err: "Raise a price by 10%, then cut it by 10% — it doesn't come back: 100 · 1.1 · 0.9 = 99.",
  },

  eq: {
    t: "Linear equations and proportions",
    main: [
      "You may add or subtract the same number on both sides, and multiply or divide both sides by the same non-zero number.",
      "Move a term to the other side with the opposite sign.",
      "The proportion a/b = c/d is the same as a · d = b · c.",
    ],
    ex: {
      q: "3x − 7 = 11",
      s: ["Move −7 across: 3x = 11 + 7 = 18.", "Divide by 3: x = 6.", "Check: 3 · 6 − 7 = 11."],
      a: "x = 6",
    },
    alt: "Proportion x/4 = 9/6: x = 4 · 9 ÷ 6 = 6.",
    err: "Getting x = 18 − 3 from 3x = 18 is wrong: remove a factor by dividing, x = 18 ÷ 3.",
  },

  word: {
    t: "Word problems with equations",
    main: [
      "Name the unknown with a letter and express the other quantities through it.",
      "Find what is equal in the problem and write the equation.",
      "Solve and check the answer against the problem, not just the equation.",
    ],
    ex: {
      q: "Anna has 4 more books than Mark; together they have 18. How many does each have?",
      s: [
        "Mark has x books, Anna has x + 4.",
        "x + x + 4 = 18, 2x = 14, x = 7.",
        "Anna has 7 + 4 = 11.",
      ],
      a: "7 and 11",
    },
    alt: "Without an equation: take away the extra 4 books, 18 − 4 = 14, split equally — 7 each; Anna has 7 + 4 = 11.",
    err: "Finding x and forgetting the actual question: if it asked about Anna, the answer is 11, not 7.",
  },

  func: {
    t: "Proportionality and linear functions",
    main: [
      "Direct proportion y = kx: the graph is a line through the origin.",
      "Inverse proportion y = k/x: x · y = k.",
      "Linear function y = kx + b: k is the slope, b is where the graph crosses the y-axis.",
    ],
    ex: {
      q: "y = 2x − 3. Find y when x = 4",
      s: ["y = 2 · 4 − 3.", "y = 8 − 3 = 5, so the point (4; 5) is on the graph."],
      a: "y = 5",
    },
    alt: "Slope from two points: k = (y₂ − y₁) ÷ (x₂ − x₁).",
    err: "Mixing up k and b: in y = 3 − 2x the slope is k = −2 and b = 3.",
  },

  poly: {
    t: "Polygons, parallelograms, rhombi",
    main: [
      "The angles of an n-gon add up to (n − 2) · 180°.",
      "In a parallelogram opposite sides and angles are equal; neighbouring angles add up to 180°.",
      "Area of a parallelogram S = a · h, of a rhombus S = d₁ · d₂ ÷ 2.",
    ],
    ex: {
      q: "Angle sum of a hexagon and the angle of a regular hexagon",
      s: ["(6 − 2) · 180° = 720°.", "All angles of a regular hexagon are equal: 720° ÷ 6 = 120°."],
      a: "720°, 120°",
    },
    alt: "Diagonals from one vertex cut a hexagon into 4 triangles: 4 · 180° = 720°.",
    err: "Parallelogram area a · b is wrong: multiply a side by the height, not by the neighbouring side.",
  },

  prism: {
    t: "Right prisms",
    main: [
      "Volume V = base area · h.",
      "Lateral surface area = base perimeter · h.",
      "Total surface area = lateral + 2 · base area.",
    ],
    ex: {
      q: "Cuboid 3 × 4 × 5 cm",
      s: ["V = 3 · 4 · 5 = 60 cm³.", "S = 2 · (3 · 4 + 3 · 5 + 4 · 5) = 2 · 47 = 94 cm²."],
      a: "60 cm³, 94 cm²",
    },
    alt: "A triangular prism whose base is half a rectangle is half a cuboid: its volume is half as big.",
    err: "Forgetting one base in the total surface area, or mixing up cm² and cm³.",
  },

  stat: {
    t: "Statistics and probability",
    main: [
      "Mean = sum of the values ÷ how many there are.",
      "The median is the middle of the ordered list, the mode is the most frequent value.",
      "Probability = favourable outcomes ÷ all outcomes, from 0 to 1.",
    ],
    ex: {
      q: "Data 3, 7, 7, 8, 10",
      s: [
        "Mean: 35 ÷ 5 = 7.",
        "The list is already ordered, the middle is 7, the most frequent value is 7.",
      ],
      a: "mean 7, median 7, mode 7",
    },
    alt: "Probability of rolling an even number on a die: 3 outcomes out of 6 = 1/2 = 50%.",
    err: "Looking for the median without ordering the list first.",
  },
};
