export default {
  r6: {
    t: "Murrud, ringjoon, kolmnurk (6. klass)",
    main: [
      "Murde liidame ja lahutame pärast ühisele nimetajale viimist.",
      "Murdude korrutamisel korrutame lugejad ja nimetajad; murruga jagamine on pöördarvuga korrutamine.",
      "Ringjoone pikkus C = 2πr, ringi pindala S = πr², π ≈ 3,14.",
      "Kolmnurga nurkade summa on 180°.",
    ],
    ex: {
      q: "2/3 + 3/4",
      s: ["Ühine nimetaja on 12: 8/12 + 9/12.", "8/12 + 9/12 = 17/12 = 1 5/12."],
      a: "1 5/12",
    },
    alt: "Jagamine: 3/4 : 2/5 = 3/4 · 5/2 = 15/8 = 1 7/8.",
    err: "1/2 + 1/3 = 2/5 on vale: lugejaid ja nimetajaid ei liideta. Õige: 3/6 + 2/6 = 5/6.",
  },

  rat: {
    t: "Tehted ratsionaalarvudega",
    main: [
      "Märgid on samad — liidame absoluutväärtused ja paneme ühise märgi.",
      "Märgid on erinevad — suuremast absoluutväärtusest lahutame väiksema, märgi võtame suurema absoluutväärtusega arvult.",
      "Lahutamine on vastandarvu liitmine: a − b = a + (−b).",
      "Korrutamine ja jagamine: samad märgid — pluss, erinevad — miinus.",
    ],
    ex: {
      q: "−7,4 + 2,9",
      s: [
        "Märgid on erinevad: 7,4 − 2,9 = 4,5.",
        "Suurem absoluutväärtus on arvul −7,4, seega vastus on negatiivne.",
      ],
      a: "−4,5",
    },
    alt: "Kujuta ette arvtelge: punktist −7,4 liigume 2,9 sammu paremale ja jõuame punkti −4,5.",
    err: "−5 − (−3) = −8 on vale. Miinus ja miinus annavad plussi: −5 + 3 = −2.",
  },

  dist: {
    t: "Absoluutväärtus ja kaugus arvteljel",
    main: [
      "|a| on arvu a kaugus nullist, seega absoluutväärtus ei ole kunagi negatiivne.",
      "Punktide a ja b vaheline kaugus on |a − b|.",
      "|x| = 5 tähendab x = 5 või x = −5; võrrandil |x| = −2 lahendeid pole.",
    ],
    ex: {
      q: "Arvude −3,5 ja 2 vaheline kaugus",
      s: ["|−3,5 − 2| = |−5,5|.", "|−5,5| = 5,5."],
      a: "5,5",
    },
    alt: "Loe arvteljelt: −3,5-st nullini on 3,5, nullist 2-ni on 2, kokku 5,5.",
    err: "|−7| = −7 on vale: absoluutväärtus on kaugus, |−7| = 7.",
  },

  pow: {
    t: "Astmed ja nende omadused",
    main: [
      "aⁿ on n võrdse teguri a korrutis.",
      "aᵐ · aⁿ = aᵐ⁺ⁿ, aᵐ : aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ.",
      "Negatiivse arvu paarisaste on positiivne, paaritu aste negatiivne.",
    ],
    ex: {
      q: "2³ · 2⁴ : 2⁵",
      s: ["Alused on võrdsed: astendajad liidame ja lahutame: 3 + 4 − 5 = 2.", "2² = 4."],
      a: "4",
    },
    alt: "Arvuta otse: 8 · 16 : 32 = 128 : 32 = 4.",
    err: "−3² = 9 on vale: aste kehtib ainult arvule 3, seega −3² = −9, aga (−3)² = 9.",
  },

  std: {
    t: "Null- ja negatiivne astendaja, standardkuju",
    main: [
      "a⁰ = 1 (kui a ≠ 0).",
      "a⁻ⁿ = 1/aⁿ, näiteks 2⁻³ = 1/8.",
      "Arvu standardkuju: a · 10ⁿ, kus 1 ≤ a < 10.",
    ],
    ex: {
      q: "Kirjuta 0,00052 standardkujul",
      s: [
        "Nihutame koma paremale, kuni saame arvu 1 ja 10 vahel: 5,2.",
        "Nihutasime 4 kohta paremale, seega astendaja on −4.",
      ],
      a: "5,2 · 10⁻⁴",
    },
    alt: "Kontroll: 10⁻⁴ = 0,0001 ja 5,2 · 0,0001 = 0,00052.",
    err: "52 · 10⁻⁵ ei ole standardkuju: tegur 52 on suurem kui 10. Ja 2⁻³ ≠ −8: 2⁻³ = 1/8.",
  },

  pct: {
    t: "Protsent, promill, protsendipunkt",
    main: [
      "1% on arvu sajandik, 1‰ on tuhandik.",
      "p% arvust a: a · p/100. Arv tema osa järgi: osa : (p/100).",
      "Protsendipunkt on protsentide vahe: oli 20%, sai 25% — kasv 5 protsendipunkti, kuid 25%.",
    ],
    ex: {
      q: "Hind on 80 €, allahindlus 15%. Uus hind?",
      s: ["Allahindlus: 80 · 0,15 = 12 €.", "Uus hind: 80 − 12 = 68 €."],
      a: "68 €",
    },
    alt: "Kohe: pärast allahindlust jääb 85%, 80 · 0,85 = 68 €.",
    err: "Hinda tõsteti 10% ja siis langetati 10% — see ei jõudnud tagasi: 100 · 1,1 · 0,9 = 99.",
  },

  eq: {
    t: "Lineaarvõrrand ja võrre",
    main: [
      "Võrrandi mõlemale poolele võib liita või lahutada sama arvu ning mõlemaid pooli korrutada või jagada sama nullist erineva arvuga.",
      "Liidetava viime teisele poolele vastupidise märgiga.",
      "Võrre a/b = c/d on samaväärne võrdusega a · d = b · c.",
    ],
    ex: {
      q: "3x − 7 = 11",
      s: [
        "Viime −7 teisele poolele: 3x = 11 + 7 = 18.",
        "Jagame 3-ga: x = 6.",
        "Kontroll: 3 · 6 − 7 = 11.",
      ],
      a: "x = 6",
    },
    alt: "Võrre x/4 = 9/6: x = 4 · 9 : 6 = 6.",
    err: "Võrrandist 3x = 18 saada x = 18 − 3 on vale: tegurist vabaneme jagamisega, x = 18 : 3.",
  },

  word: {
    t: "Tekstülesanded võrrandiga",
    main: [
      "Tähista tundmatu tähega ja avalda teised suurused selle kaudu.",
      "Leia tingimusest, mis on võrdne, ja koosta võrrand.",
      "Lahenda ja kontrolli vastust ülesande tingimuse, mitte ainult võrrandi järgi.",
    ],
    ex: {
      q: "Annal on 4 raamatut rohkem kui Markil, kokku 18 raamatut. Mitu on kummalgi?",
      s: [
        "Markil on x raamatut, Annal x + 4.",
        "x + x + 4 = 18, 2x = 14, x = 7.",
        "Annal on 7 + 4 = 11.",
      ],
      a: "7 ja 11",
    },
    alt: "Võrrandita: võtame liigsed 4 raamatut ära, 18 − 4 = 14, jagame pooleks — 7; Annal 7 + 4 = 11.",
    err: "Leida x ja unustada vastata ülesande küsimusele: kui küsiti Anna kohta, on vastus 11, mitte 7.",
  },

  func: {
    t: "Võrdeline sõltuvus ja lineaarfunktsioon",
    main: [
      "Võrdeline sõltuvus y = kx: graafik on sirge, mis läbib koordinaatide alguspunkti.",
      "Pöördvõrdeline sõltuvus y = k/x: x · y = k.",
      "Lineaarfunktsioon y = kx + b: k on tõus, b on graafiku ja y-telje lõikepunkt.",
    ],
    ex: {
      q: "y = 2x − 3. Leia y, kui x = 4",
      s: ["y = 2 · 4 − 3.", "y = 8 − 3 = 5, punkt (4; 5) asub graafikul."],
      a: "y = 5",
    },
    alt: "Tõus kahe punkti järgi: k = (y₂ − y₁) : (x₂ − x₁).",
    err: "k ja b segamini ajamine: funktsioonis y = 3 − 2x on tõus k = −2 ja b = 3.",
  },

  poly: {
    t: "Hulknurgad, rööpkülik, romb",
    main: [
      "n-nurga nurkade summa on (n − 2) · 180°.",
      "Rööpküliku vastasküljed ja vastasnurgad on võrdsed, lähisnurkade summa on 180°.",
      "Rööpküliku pindala S = a · h, rombi pindala S = d₁ · d₂ : 2.",
    ],
    ex: {
      q: "Kuusnurga nurkade summa ja korrapärase kuusnurga nurk",
      s: [
        "(6 − 2) · 180° = 720°.",
        "Korrapärasel kuusnurgal on kõik nurgad võrdsed: 720° : 6 = 120°.",
      ],
      a: "720°, 120°",
    },
    alt: "Ühest tipust lõikavad diagonaalid kuusnurga 4 kolmnurgaks: 4 · 180° = 720°.",
    err: "Rööpküliku pindala a · b on vale: külg korrutatakse kõrgusega, mitte naaberküljega.",
  },

  prism: {
    t: "Püstprisma",
    main: [
      "Ruumala V = S põhi · h.",
      "Külgpindala = põhja ümbermõõt · h.",
      "Täispindala = külgpindala + 2 · S põhi.",
    ],
    ex: {
      q: "Risttahukas 3 × 4 × 5 cm",
      s: ["V = 3 · 4 · 5 = 60 cm³.", "S = 2 · (3 · 4 + 3 · 5 + 4 · 5) = 2 · 47 = 94 cm²."],
      a: "60 cm³, 94 cm²",
    },
    alt: "Kolmnurkne prisma, mille põhi on pool ristkülikut, on pool risttahukat: selle ruumala on kaks korda väiksem.",
    err: "Täispindalas unustatakse üks põhi või aetakse segamini cm² ja cm³.",
  },

  stat: {
    t: "Statistika ja tõenäosus",
    main: [
      "Aritmeetiline keskmine = väärtuste summa : nende arv.",
      "Mediaan on järjestatud rea keskmine liige, mood on kõige sagedasem väärtus.",
      "Tõenäosus = soodsate võimaluste arv : kõigi võimaluste arv, 0-st 1-ni.",
    ],
    ex: {
      q: "Rida 3, 7, 7, 8, 10",
      s: [
        "Keskmine: 35 : 5 = 7.",
        "Rida on juba järjestatud, keskel on 7, kõige sagedamini esineb 7.",
      ],
      a: "keskmine 7, mediaan 7, mood 7",
    },
    alt: "Täringuga paarisarvu viskamise tõenäosus: 3 võimalust 6-st = 1/2 = 50%.",
    err: "Mediaani otsimine ilma rida järjestamata.",
  },
};
