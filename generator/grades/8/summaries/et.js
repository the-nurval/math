export default {
  g8rev: {
    t: "7. klassi kordamine",
    main: [
      "Sama alusega astmed: korrutamisel astendajad liidame, jagamisel lahutame, astme astendamisel korrutame. a⁰ = 1, a⁻ⁿ = 1/aⁿ.",
      "Lineaarvõrrand: avame sulud, viime x-iga liikmed ühele poole ja arvud teisele poole, jagame x-i kordajaga.",
      "Lineaarfunktsioon y = kx + b: k on tõus, b on graafiku ja y-telje lõikepunkt. Kahe punkti kaudu: k = (y₂ − y₁) : (x₂ − x₁).",
    ],
    ex: { q: "2(x − 3) − 1 = −x + 5", s: ["2x − 6 − 1 = −x + 5", "3x = 12", "x = 4"], a: "4" },
    alt: "Kontroll: 2(4 − 3) − 1 = 1 ja −4 + 5 = 1.",
    err: "2³ · 2⁴ = 2¹² on vale: astendajad liidetakse, 2³ · 2⁴ = 2⁷.",
  },

  g8poly: {
    t: "Üksliikmed ja hulkliikmed",
    main: [
      "Normaalkujul üksliige: arvuline tegur (kordaja) on ees, iga täht esineb üks kord oma astendajaga: −6a³b².",
      "Üksliikme aste on kõigi tähtede astendajate summa. Hulkliikme aste on tema liikmete suurim aste.",
      "Hulkliikmete liitmine ja lahutamine: avame sulud (miinus sulgude ees muudab märgid) ja koondame sarnased liikmed.",
      "Korrutamine: üksliige korrutatakse hulkliikme iga liikmega; hulkliige hulkliikmega — esimese iga liige teise iga liikmega.",
    ],
    ex: {
      q: "(2x − 3)(x + 4)",
      s: ["2x · x + 2x · 4 − 3 · x − 3 · 4", "2x² + 8x − 3x − 12", "2x² + 5x − 12"],
      a: "2x² + 5x − 12",
    },
    alt: "Kontroll x = 1 korral: (2 − 3)(1 + 4) = −5 ja 2 + 5 − 12 = −5.",
    err: "−(x² − 3x) = −x² − 3x on vale: muudame iga liikme märki, −x² + 3x.",
  },

  g8fsu: {
    t: "Korrutamise abivalemid",
    main: [
      "(a + b)² = a² + 2ab + b²; (a − b)² = a² − 2ab + b².",
      "(a − b)(a + b) = a² − b².",
      "Lisaks: (a + b)³ = a³ + 3a²b + 3ab² + b³; a³ − b³ = (a − b)(a² + ab + b²); a³ + b³ = (a + b)(a² − ab + b²).",
      "Valemid kehtivad mõlemas suunas ja aitavad peast arvutada: 99² = (100 − 1)² = 9801.",
    ],
    ex: {
      q: "(3x − 2y)²",
      s: ["a = 3x, b = 2y", "(3x)² − 2 · 3x · 2y + (2y)²", "9x² − 12xy + 4y²"],
      a: "9x² − 12xy + 4y²",
    },
    alt: "51 · 49 = (50 + 1)(50 − 1) = 2500 − 1 = 2499.",
    err: "(a + b)² = a² + b² on vale: puudub kahekordne korrutis 2ab.",
  },

  g8fact: {
    t: "Tegurdamine",
    main: [
      "Ühise teguri sulgude ette toomine: 6a²b − 9ab = 3ab(2a − 3).",
      "Rühmitamine: ax + ay + bx + by = a(x + y) + b(x + y) = (x + y)(a + b).",
      "Valemid: a² − b² = (a − b)(a + b), a² ± 2ab + b² = (a ± b)².",
      "Võrrand «korrutis = 0»: iga tegur võrdsustatakse nulliga.",
    ],
    ex: {
      q: "x³ − 9x = 0",
      s: ["x(x² − 9) = 0", "x(x − 3)(x + 3) = 0", "x = 0, x = 3, x = −3"],
      a: "−3; 0; 3",
    },
    alt: "57² − 43² = (57 − 43)(57 + 43) = 14 · 100 = 1400.",
    err: "x² = 5x → x = 5 — kaotsi läks lahend x = 0. x-iga ei tohi jagada, õige on x(x − 5) = 0.",
  },

  g8lin2: {
    t: "Kahe tundmatuga võrrand",
    main: [
      "Võrrandi ax + by = c lahend on arvupaar (x; y), mis muudab selle tõeseks võrduseks. Selliseid paare on lõpmata palju.",
      "Võrrandi ax + by = c graafik (kui a ja b ei ole mõlemad nullid) on sirge. Avaldame y x-i kaudu ja joonestame kahe punkti järgi.",
      "Süsteemi graafiline lahendamine: joonestame mõlemad sirged; lahend on lõikepunkti koordinaadid. Paralleelsed sirged — lahendid puuduvad, ühtivad — lõpmata palju.",
    ],
    ex: {
      q: "Kas punkt (2; −1) asub graafikul 3x + 2y = 4?",
      s: ["3 · 2 + 2 · (−1) = 6 − 2 = 4", "4 = 4 — õige"],
      a: "jah",
    },
    alt: "Võib avaldada y = 2 − 1,5x ja asendada x = 2: y = −1.",
    err: "Punkt (−1; 2) punkti (2; −1) asemel: esimene koordinaat on alati x.",
  },

  g8sys: {
    t: "Võrrandisüsteemid",
    main: [
      "Asendusvõte: avaldame ühest võrrandist ühe tundmatu ja asendame teise võrrandisse.",
      "Liitmisvõte: korrutame võrrandeid selliste arvudega, et ühe tundmatu kordajad oleksid vastandarvud, ja liidame.",
      "Leitud väärtuse asendame ükskõik millisesse võrrandisse ja leiame teise tundmatu. Vastus on paar (x; y).",
    ],
    ex: {
      q: "2x + 3y = 7, 4x − 3y = 5",
      s: ["Liidame: 6x = 12, x = 2", "2 · 2 + 3y = 7, y = 1"],
      a: "(2; 1)",
    },
    alt: "Asendusvõttega: teisest 4x = 5 + 3y jne — vastus on sama.",
    err: "Leiti x ja unustati y: süsteemi lahend on arvupaar.",
  },

  g8sysw: {
    t: "Tekstülesanded võrrandisüsteemiga",
    main: [
      "Tähistame kaks tundmatut suurust tähtedega x ja y ning kirjutame, mida kumbki tähendab.",
      "Iga tingimus annab ühe võrrandi. Vaja on kahte sõltumatut tingimust.",
      "Liikumine jõel: pärivoolu kiirus v + u, vastuvoolu v − u. Segud: aine mass = lahuse mass · protsent : 100.",
      "Kontrollime vastust ülesande tingimuse järgi, mitte ainult võrrandites.",
    ],
    ex: {
      q: "Vihik ja pastakas maksavad 2,10 €, 3 vihikut ja 2 pastakat 5,30 €.",
      s: [
        "x + y = 2,1; 3x + 2y = 5,3",
        "Esimesest y = 2,1 − x; 3x + 4,2 − 2x = 5,3",
        "x = 1,1; y = 1",
      ],
      a: "vihik 1,10 €, pastakas 1,00 €",
    },
    alt: "Liitmisvõte: korrutame esimese −2-ga ja liidame: x = 1,1.",
    err: "Paadi kiirus vastuvoolu kirjutati u − v, õige on v − u.",
  },

  g8afr: {
    t: "Algebralised murrud",
    main: [
      "Murd on määratud, kui nimetaja ei ole null. Need muutuja väärtused jäetakse välja.",
      "Taandada saab ainult ühiseid tegureid: tegurdame lugeja ja nimetaja.",
      "Liitmine ja lahutamine — ühise nimetaja kaudu; korrutamine — lugeja lugejaga, nimetaja nimetajaga; jagamine — pöördmurruga korrutamine.",
    ],
    ex: {
      q: "(x² − 9)/(x² + 3x)",
      s: ["(x − 3)(x + 3) / (x(x + 3))", "(x − 3)/x, x ≠ 0, x ≠ −3"],
      a: "(x − 3)/x",
    },
    alt: "Kontroll x = 1 korral: (1 − 9)/(1 + 3) = −2 ja (1 − 3)/1 = −2.",
    err: "(x + 3)/(x + 5) = 3/5 on vale: liidetavaid taandada ei saa, ainult tegureid.",
  },

  g8sqrt: {
    t: "Ruutjuured",
    main: [
      "√a on mittenegatiivne arv, mille ruut on a (a ≥ 0). √(a²) = |a|.",
      "√(ab) = √a · √b, √(a/b) = √a / √b (a ≥ 0, b > 0).",
      "Teguri juure alt välja toomine: √72 = √(36 · 2) = 6√2. Sarnaseid juuri liidetakse nagu sarnaseid liikmeid.",
      "Võrdlemine: viime teguri juure alla, 3√5 = √45.",
    ],
    ex: { q: "√50 + √18 − √8", s: ["5√2 + 3√2 − 2√2", "6√2"], a: "6√2" },
    alt: "Ligikaudu: √2 ≈ 1,41, 6√2 ≈ 8,49.",
    err: "√(9 + 16) = 3 + 4 on vale: √25 = 5. Summa juur ei võrdu juurte summaga.",
  },

  g8proof: {
    t: "Tõestused, paralleelsed sirged",
    main: [
      "Definitsioon selgitab mõiste tähendust, teoreem on väide, mida tõestatakse. Teoreemis «kui …, siis …» on eeldus ja väide; pöördteoreem vahetab need ega ole alati õige.",
      "Lõikaja moodustab kahe sirgega nurgad: kaasnurgad, põiknurgad, lisanurgad.",
      "Sirged on paralleelsed, kui kaasnurgad või põiknurgad on võrdsed või lisanurkade summa on 180°. Ja vastupidi: paralleelsete sirgete korral need võrdused kehtivad.",
      "Punkti kaudu, mis ei asu sirgel, saab tõmmata ainult ühe antud sirgega paralleelse sirge (aksioom).",
    ],
    ex: {
      q: "a ∥ b, üks lisanurk on 68°. Leia teine.",
      s: ["Lisanurkade summa on 180°", "180° − 68° = 112°"],
      a: "112°",
    },
    alt: "Tippnurga ja kaasnurga kaudu saame sama vastuse.",
    err: "Lisanurgad loetakse võrdseks: võrdsed on kaasnurgad ja põiknurgad, lisanurkade summa on 180°.",
  },

  g8tri: {
    t: "Kesklõik, mediaanid, kõrgused, nurgapoolitajad",
    main: [
      "Kesklõik ühendab kahe külje keskpunktid, on paralleelne kolmanda küljega ja võrdub poolega sellest.",
      "Mediaanid lõikuvad ühes punktis, mis jaotab need suhtes 2 : 1 tipust lugedes. Hüpotenuusile tõmmatud mediaan on pool hüpotenuusist.",
      "Kõrgus on küljega (või selle pikendusega) risti. Nurgapoolitaja poolitab nurga.",
      "Nurgapoolitajad lõikuvad siseringjoone keskpunktis, küljekeskristsirged ümberringjoone keskpunktis.",
    ],
    ex: {
      q: "Mediaan AM = 12 cm, O on mediaanide lõikepunkt. Leia AO.",
      s: ["AO : OM = 2 : 1", "AO = 12 · 2/3 = 8"],
      a: "8 cm",
    },
    alt: "OM = 12 : 3 = 4 cm, AO = 12 − 4 = 8 cm.",
    err: "Arvatakse, et mediaan poolitab nurga: seda teeb nurgapoolitaja, mediaan poolitab külje.",
  },

  g8pyth: {
    t: "Pythagorase teoreem",
    main: [
      "Täisnurkses kolmnurgas on hüpotenuusi ruut võrdne kaatetite ruutude summaga: c² = a² + b².",
      "Kaatet: b = √(c² − a²). Hüpotenuus on pikim külg.",
      "Pöördteoreem: kui c² = a² + b², on kolmnurk täisnurkne (täisnurk on c vastas).",
      "Punktide vaheline kaugus: AB = √((x₂ − x₁)² + (y₂ − y₁)²).",
    ],
    ex: {
      q: "Kaatetid on 6 cm ja 8 cm. Leia hüpotenuus.",
      s: ["c² = 36 + 64 = 100", "c = 10"],
      a: "10 cm",
    },
    alt: "See on kolmik 3, 4, 5 kahekordselt.",
    err: "c = a + b on vale: liidetakse ruudud, mitte küljed.",
  },

  g8quad: {
    t: "Rööpkülik ja trapets",
    main: [
      "Rööpkülik: vastasküljed on paralleelsed ja võrdsed, vastasnurgad võrdsed, naabernurkade summa 180°, diagonaalid poolitavad teineteist.",
      "Rööpküliku tunnused: kaks külge on paralleelsed ja võrdsed; või vastasküljed on paarikaupa võrdsed; või diagonaalid poolitavad teineteist.",
      "Trapets: kaks külge (alused) on paralleelsed. Kesklõik on alustega paralleelne ja võrdub nende poolsummaga.",
      "Võrdhaarse trapetsi alusnurgad on võrdsed ja diagonaalid on võrdsed.",
    ],
    ex: {
      q: "Trapetsi alused on 7 cm ja 13 cm. Leia kesklõik.",
      s: ["(7 + 13) : 2", "10"],
      a: "10 cm",
    },
    alt: "Kui kesklõik on 10 ja üks alus 7, on teine 2 · 10 − 7 = 13.",
    err: "Arvatakse, et igal trapetsil on alusnurgad võrdsed: ainult võrdhaarsel.",
  },

  g8area: {
    t: "Hulknurkade pindalad",
    main: [
      "Rööpkülik: S = ah. Kolmnurk: S = ah/2. Täisnurkne kolmnurk: S = ab/2 (a, b on kaatetid).",
      "Trapets: S = (a + b)/2 · h. Romb: S = d₁d₂/2.",
      "Kõrguse leiame sageli Pythagorase teoreemiga või 30° nurga vastas oleva kaateti kaudu (see on pool hüpotenuusist).",
      "Kui pindala on teada, leiame tundmatu külje või kõrguse valemist.",
    ],
    ex: {
      q: "Võrdhaarne trapets: alused 10 ja 26 cm, haar 17 cm.",
      s: ["(26 − 10) : 2 = 8", "h = √(17² − 8²) = 15", "S = (10 + 26) : 2 · 15 = 270"],
      a: "270 cm²",
    },
    alt: "Võib jaotada ristkülikuks 10 × 15 ja kaheks kolmnurgaks 8 · 15 : 2.",
    err: "Rööpküliku külgedega a ja b pindala S = ab on vale: külg korrutatakse kõrgusega.",
  },

  g8qeq: {
    t: "Ruutvõrrandid, Viète'i teoreem",
    main: [
      "ax² + bx + c = 0, a ≠ 0. Diskriminant D = b² − 4ac.",
      "D > 0 — kaks lahendit x = (−b ± √D)/(2a); D = 0 — üks lahend −b/(2a); D < 0 — lahendid puuduvad.",
      "Mittetäielikud: ax² + bx = 0 → x(ax + b) = 0; ax² + c = 0 → x² = −c/a.",
      "Viète'i teoreem võrrandi x² + px + q = 0 korral: x₁ + x₂ = −p, x₁x₂ = q.",
    ],
    ex: {
      q: "2x² − 3x − 2 = 0",
      s: ["D = 9 + 16 = 25", "x = (3 ± 5)/4", "x₁ = 2, x₂ = −0,5"],
      a: "−0,5; 2",
    },
    alt: "Kontroll Viète'i teoreemiga: 2 + (−0,5) = 1,5 = 3/2, 2 · (−0,5) = −1 = −2/2.",
    err: "x₁ + x₂ = p on vale: lahendite summa on −p.",
  },

  g8circ: {
    t: "Ringjoon: puutuja, kesk- ja piirdenurk",
    main: [
      "Puutuja on risti puutepunkti tõmmatud raadiusega. Ühest punktist tõmmatud puutujalõigud on võrdsed.",
      "Kesknurk võrdub kaarega, millele ta toetub. Piirdenurk on pool kaarest (pool kesknurgast).",
      "Diameetrile toetuv piirdenurk on täisnurk. Samale kaarele toetuvad piirdenurgad on võrdsed.",
      "Ringjoone ümber joonestatud nelinurga vastaskülgede summad on võrdsed.",
    ],
    ex: {
      q: "Kesknurk AOB = 130°. Leia samale kaarele toetuv piirdenurk ACB.",
      s: ["Piirdenurk = kesknurk : 2", "130° : 2 = 65°"],
      a: "65°",
    },
    alt: "Kaar AB = 130°, piirdenurk on pool kaarest.",
    err: "Piirdenurk loetakse kesknurgaga võrdseks: ta on poole väiksem.",
  },

  g8reg: {
    t: "Korrapärased hulknurgad",
    main: [
      "Korrapärase hulknurga kõik küljed ja kõik nurgad on võrdsed.",
      "Kumera n-nurga sisenurkade summa on 180° · (n − 2); korrapärase sisenurk 180° · (n − 2)/n.",
      "Välisnurkade summa on 360°, korrapärase välisnurk 360°/n. Diagonaalide arv n(n − 3)/2.",
      "Korrapärase kuusnurga külg võrdub ümberringjoone raadiusega; ruudul a = R√2, korrapärasel kolmnurgal R = a/√3.",
    ],
    ex: {
      q: "Korrapärase hulknurga sisenurk on 150°. Mitu külge?",
      s: ["Välisnurk 180° − 150° = 30°", "360° : 30° = 12"],
      a: "12",
    },
    alt: "Võrrand 180(n − 2)/n = 150 annab n = 12.",
    err: "360° jagatakse sisenurgaga, kuigi tuleb jagada välisnurgaga.",
  },

  g8sim: {
    t: "Kolmnurkade sarnasus",
    main: [
      "Sarnastes kolmnurkades on nurgad võrdsed ja vastavad küljed võrdelised; k on sarnasustegur.",
      "Tunnused: kahe nurga järgi; kahe külje ja nendevahelise nurga järgi; kolme külje järgi.",
      "Ümbermõõdud suhtuvad nagu k, pindalad nagu k².",
      "Küljega paralleelne sirge lõikab ära sarnase kolmnurga. Hüpotenuusile tõmmatud kõrgus: h² = pq, kaatet² = hüpotenuus · kaateti projektsioon.",
    ],
    ex: {
      q: "DE ∥ AC, BD = 4, DA = 2, AC = 9. Leia DE.",
      s: ["△DBE ∼ △ABC, k = BD : BA = 4 : 6", "DE = 9 · 4/6 = 6"],
      a: "6",
    },
    alt: "Võib koostada võrde DE/9 = 4/6.",
    err: "k = BD : DA = 4 : 2 on vale: BD-d võrreldakse kogu küljega BA.",
  },

  g8ind: {
    t: "Kaudne mõõtmine, maatüki plaan",
    main: [
      "Eseme kõrguse leiame varju järgi: kolmnurgad «post — vari» ja «puu — vari» on sarnased, h = h₁ · s₂ / s₁.",
      "Peegli meetod ja tähiste meetod põhinevad samuti kolmnurkade sarnasusel.",
      "Mõõtkava 1 : N: 1 cm plaanil on looduses N cm. Pindala looduses on N² korda suurem.",
      "1 a = 100 m², 1 ha = 10 000 m².",
    ],
    ex: {
      q: "Mõõtkava 1 : 500, maatükk plaanil 6 cm × 4 cm. Pindala?",
      s: ["1 cm — 5 m", "30 m × 20 m = 600 m²"],
      a: "600 m² = 6 a",
    },
    alt: "24 cm² · 500² = 6 000 000 cm² = 600 m².",
    err: "Pindala korrutatakse N-ga, kuigi tuleb korrutada N²-ga.",
  },
};
