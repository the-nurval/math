export default {
  g6r5: {
    t: "Decimals (Grade 5)",
    main: [
      "Add and subtract with the decimal points lined up.",
      "Multiply as whole numbers, then count the decimal places of both factors together.",
      "To divide by a decimal, move the point the same number of places right in both numbers.",
    ],
    ex: { q: "2.4 ÷ 0.06", s: ["Move the point 2 places: 240 ÷ 6.", "240 ÷ 6 = 40."], a: "40" },
    alt: "Check by multiplying: 40 · 0.06 = 2.4.",
    err: "0.2 · 0.3 = 0.6 is wrong: there must be two decimal places, 0.2 · 0.3 = 0.06.",
  },

  g6div: {
    t: "Divisibility, GCD and LCM",
    main: [
      "Tests: by 2 — even last digit; by 5 — 0 or 5; by 10 — 0; by 4 — the last two digits form a multiple of 4; by 25 — 00, 25, 50, 75; by 3 and 9 — the digit sum is divisible by 3 or 9.",
      "A prime has exactly two divisors: 1 and itself. Every composite number splits into prime factors.",
      "GCD is the product of the common prime factors; LCM = a · b ÷ GCD(a, b).",
    ],
    ex: {
      q: "GCD and LCM of 36 and 48",
      s: ["36 = 2² · 3², 48 = 2⁴ · 3.", "GCD = 2² · 3 = 12.", "LCM = 36 · 48 ÷ 12 = 144."],
      a: "GCD 12, LCM 144",
    },
    alt: "Euclid's algorithm: 48 − 36 = 12, and 36 is divisible by 12, so GCD = 12.",
    err: "1 is not prime: it has only one divisor.",
  },

  g6frac: {
    t: "Equivalent fractions, comparing",
    main: [
      "Multiplying or dividing top and bottom by the same non-zero number doesn't change a fraction.",
      "Simplify straight away by the GCD of top and bottom.",
      "To compare fractions, bring them to a common denominator and compare the tops.",
    ],
    ex: {
      q: "Compare 5/8 and 7/12",
      s: ["Common denominator 24: 15/24 and 14/24.", "15 > 14."],
      a: "5/8 > 7/12",
    },
    alt: "Cross-multiply: 5 · 12 = 60 and 7 · 8 = 56, 60 > 56, so 5/8 > 7/12.",
    err: "Thinking 3/7 > 3/5 because 7 > 5. With equal tops, the smaller bottom gives the bigger fraction.",
  },

  g6fadd: {
    t: "Adding and subtracting fractions",
    main: [
      "Bring fractions to the least common denominator — the LCM of the denominators.",
      "Add or subtract the tops, keep the bottom.",
      "For mixed numbers handle whole and fractional parts separately; borrow 1 if the fraction part is too small.",
    ],
    ex: {
      q: "3 1/4 − 1 5/6",
      s: [
        "Common denominator 12: 3 3/12 − 1 10/12.",
        "3/12 is less than 10/12, so borrow: 2 15/12 − 1 10/12.",
        "= 1 5/12.",
      ],
      a: "1 5/12",
    },
    alt: "With improper fractions: 13/4 − 11/6 = 39/12 − 22/12 = 17/12 = 1 5/12.",
    err: "Adding the bottoms: 1/4 + 1/6 ≠ 2/10.",
  },

  g6fmul: {
    t: "Multiplying and dividing fractions",
    main: [
      "Multiply tops together and bottoms together; turn mixed numbers into improper fractions first.",
      "Dividing by a fraction means multiplying by its reciprocal.",
      "Fraction of a number: multiply. Number from its fraction: divide.",
    ],
    ex: { q: "2 1/4 ÷ 1 1/8", s: ["9/4 ÷ 9/8 = 9/4 · 8/9.", "Simplify: 8/4 = 2."], a: "2" },
    alt: "Cancel diagonally before multiplying so the numbers stay small.",
    err: "Flipping the first fraction instead of the second when dividing.",
  },

  g6fdec: {
    t: "Fractions and decimals",
    main: [
      "A fraction is a finite decimal if, after simplifying, its denominator has only factors 2 and 5.",
      "Otherwise the decimal recurs: 1/3 = 0.(3), 5/11 = 0.(45).",
      "If an expression mixes both kinds and one won't become a finite decimal, work with fractions.",
    ],
    ex: {
      q: "3/8 as a decimal",
      s: ["8 = 2³, expand to 1000: 3/8 = 375/1000.", "= 0.375."],
      a: "0.375",
    },
    alt: "Long division works too: 3 ÷ 8 = 0.375.",
    err: "Treating 0.3 as exactly 1/3: 0.3 is 3/10, while 1/3 = 0.(3).",
  },

  g6ratio: {
    t: "Ratios, proportions, scale",
    main: [
      "The ratio a : b tells how many times a is b, or what part of b a is.",
      "In a proportion a : b = c : d the product of the extremes equals the product of the means: a · d = b · c.",
      "Scale 1 : 50 000 means 1 cm on the map is 50 000 cm = 500 m on the ground.",
    ],
    ex: { q: "x : 6 = 10 : 4", s: ["x · 4 = 6 · 10.", "x = 60 ÷ 4 = 15."], a: "15" },
    alt: "10 is 2.5 times 4, so x is 2.5 times 6: 15.",
    err: "Forgetting to convert cm to km with a scale: 1 km = 100 000 cm.",
  },

  g6propr: {
    t: "Direct and inverse proportion",
    main: [
      "Direct: when one quantity grows some number of times, the other grows the same number of times (price and cost).",
      "Inverse: when one grows, the other shrinks by the same factor; their product is constant (speed and time).",
      "Decide which kind it is first, then set up the proportion.",
    ],
    ex: {
      q: "6 workers finish a job in 12 days. How many days for 9 workers?",
      s: ["More workers — fewer days: inverse proportion.", "6 · 12 = 72 worker-days, 72 ÷ 9 = 8."],
      a: "8 days",
    },
    alt: "Via one worker: 1 worker needs 6 · 12 = 72 days, 9 workers need 72 ÷ 9 = 8 days.",
    err: "Solving it as direct: 12 · 9 ÷ 6 = 18 days — more workers can't take longer.",
  },

  g6pct: {
    t: "Percentages, pie charts",
    main: [
      "1% is a hundredth: p% of a = a · p ÷ 100.",
      "A number from its percentage: part ÷ p · 100.",
      "In a pie chart the whole circle is 100% or 360°; 1% is 3.6°.",
    ],
    ex: {
      q: "What percentage of 240 is 18?",
      s: ["18 ÷ 240 = 0.075.", "0.075 · 100% = 7.5%."],
      a: "7.5%",
    },
    alt: "With a proportion: 240 is 100%, 18 is x%, x = 18 · 100 ÷ 240 = 7.5.",
    err: "Dividing the wrong way round: 240 ÷ 18 is not a percentage.",
  },

  g6circ: {
    t: "Circles",
    main: [
      "The diameter is twice the radius: d = 2r.",
      "Circumference C = 2πr = πd, π ≈ 3.14.",
      "Area S = πr²; a sector with angle α is α/360 of the circle.",
    ],
    ex: {
      q: "Area of a circle with radius 5 cm",
      s: ["S = 3.14 · 5².", "S = 3.14 · 25 = 78.5 cm²."],
      a: "78.5 cm²",
    },
    alt: "Using the diameter: d = 10 cm, S = π · d² ÷ 4 = 3.14 · 100 ÷ 4 = 78.5 cm².",
    err: "Using the diameter instead of the radius: π · 10² is 4 times too big.",
  },

  g6ratn: {
    t: "Rational numbers: number line, absolute value, comparing",
    main: [
      "Opposite numbers differ only in sign and sit symmetrically about zero.",
      "The absolute value |a| is the distance from zero to a.",
      "Further right means larger; of two negatives, the one with the smaller absolute value is larger.",
    ],
    ex: {
      q: "Compare −7.2 and −7.15",
      s: ["|−7.2| = 7.2, |−7.15| = 7.15.", "7.2 > 7.15, so −7.2 is further left."],
      a: "−7.2 < −7.15",
    },
    alt: "Think of a thermometer: −7.2° is colder than −7.15°.",
    err: "−8 > −3 “because 8 is bigger than 3” is wrong: −8 < −3.",
  },

  g6rops: {
    t: "Operations with rational numbers",
    main: [
      "Same signs — add absolute values and keep the sign; different signs — subtract the smaller absolute value from the larger, sign of the larger.",
      "a − b = a + (−b).",
      "× and ÷: same signs give plus, different give minus. An even number of minuses gives plus.",
    ],
    ex: {
      q: "(−6) · (−4) − 15 ÷ (−3)",
      s: ["(−6) · (−4) = 24.", "15 ÷ (−3) = −5.", "24 − (−5) = 29."],
      a: "29",
    },
    alt: "Handle the sign separately: solve without minuses first, then decide the sign.",
    err: "24 − (−5) = 19 is wrong: subtracting a negative is adding, 24 + 5 = 29.",
  },

  g6eq: {
    t: "Equations: brackets, like terms",
    main: [
      "When expanding, multiply the number in front by every term; a minus in front flips all signs inside.",
      "Combine like terms (same letter): 3x − 5x = −2x.",
      "Move x terms to one side and numbers to the other, changing sign as you move.",
    ],
    ex: {
      q: "3(x − 2) = x + 8",
      s: ["3x − 6 = x + 8.", "3x − x = 8 + 6, 2x = 14.", "x = 7."],
      a: "x = 7",
    },
    alt: "Check: 3 · (7 − 2) = 15 and 7 + 8 = 15 — correct.",
    err: "−(x − 4) = −x − 4 is wrong: the minus flips both signs, −(x − 4) = −x + 4.",
  },

  g6coord: {
    t: "Coordinate plane and graphs",
    main: [
      "Point A(x; y): first the x-coordinate (across), then the y-coordinate (up).",
      "If two points share y, the segment is parallel to the x-axis and its length is the difference of the x's.",
      "On a motion graph a flat part is a stop and the steepness is the speed: v = s ÷ t.",
    ],
    ex: {
      q: "Length of A(−3; 2), B(5; 2)",
      s: ["Same y — the segment is horizontal.", "5 − (−3) = 8."],
      a: "8",
    },
    alt: "Count squares along x: −3 to 0 is 3, 0 to 5 is 5, total 8.",
    err: "Swapping the order: (2; −3) and (−3; 2) are different points.",
  },

  g6sym: {
    t: "Line and point symmetry",
    main: [
      "Reflection in the x-axis: (a; b) → (a; −b); in the y-axis: (a; b) → (−a; b).",
      "In the origin: (a; b) → (−a; −b).",
      "In a point M: M is the midpoint between the point and its image.",
    ],
    ex: {
      q: "A(3; −5) reflected in M(1; 2)",
      s: ["x = 2 · 1 − 3 = −1.", "y = 2 · 2 − (−5) = 9."],
      a: "(−1; 9)",
    },
    alt: "Walk from A to M and take the same step again: 3 to 1 is −2, again −2 gives −1; −5 to 2 is +7, again +7 gives 9.",
    err: "Changing the sign of x when reflecting in the x-axis — it is y that changes.",
  },

  g6tri: {
    t: "Triangles: angles, types, congruence",
    main: [
      "The angles of a triangle add up to 180°; adjacent angles add up to 180°, vertical angles are equal.",
      "By angles: acute, right, obtuse; an isosceles triangle has equal base angles.",
      "Congruence: two sides and the angle between, a side and two angles on it, three sides. Each side is shorter than the sum of the other two.",
    ],
    ex: {
      q: "Angles in the ratio 2 : 3 : 4. Find the largest",
      s: ["2x + 3x + 4x = 180°, x = 20°.", "4 · 20° = 80°."],
      a: "80°",
    },
    alt: "An exterior angle equals the sum of the two non-adjacent interior angles — often you needn't find the third.",
    err: "Sides 2, 3 and 6 cm can't form a triangle: 6 > 2 + 3.",
  },

  g6area: {
    t: "Triangle area, cubes and cuboids",
    main: [
      "Triangle area S = a · h ÷ 2, where h is the height to side a.",
      "Volume of a cuboid V = a · b · c, of a cube V = a³.",
      "Surface area of a cuboid S = 2(ab + ac + bc), of a cube S = 6a².",
    ],
    ex: {
      q: "A triangle has area 24 cm² and base 8 cm. Find the height",
      s: ["h = 2S ÷ a.", "h = 48 ÷ 8 = 6 cm."],
      a: "6 cm",
    },
    alt: "Complete the triangle to a rectangle with the same height: its area is twice as big.",
    err: "Using a slanted side instead of the height: the height is perpendicular to the base.",
  },
};
