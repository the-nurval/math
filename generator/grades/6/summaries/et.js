export default {
  g6r5: {
    t: "Kümnendmurrud (5. klass)",
    main: [
      "Liidame ja lahutame, kirjutades arvud koma koma alla.",
      "Korrutame nagu täisarve ja eraldame nii mitu kohta, kui palju on mõlemas teguris kokku.",
      "Kümnendmurruga jagamisel nihutame jagatavas ja jagajas koma sama arvu kohtade võrra paremale.",
    ],
    ex: { q: "2,4 : 0,06", s: ["Nihutame koma 2 kohta: 240 : 6.", "240 : 6 = 40."], a: "40" },
    alt: "Kontroll korrutamisega: 40 · 0,06 = 2,4.",
    err: "0,2 · 0,3 = 0,6 on vale: pärast koma peab olema kaks kohta, 0,2 · 0,3 = 0,06.",
  },

  g6div: {
    t: "Jaguvus, SÜT ja VÜK",
    main: [
      "Tunnused: 2-ga — viimane number on paaris; 5-ga — 0 või 5; 10-ga — 0; 4-ga — kahest viimasest numbrist moodustatud arv jagub 4-ga; 25-ga — 00, 25, 50, 75; 3-ga ja 9-ga — ristsumma jagub 3-ga või 9-ga.",
      "Algarvul on täpselt kaks jagajat: 1 ja arv ise. Iga kordarvu saab lahutada algteguriteks.",
      "SÜT on ühiste algtegurite korrutis, VÜK = a · b : SÜT(a; b).",
    ],
    ex: {
      q: "Arvude 36 ja 48 SÜT ja VÜK",
      s: ["36 = 2² · 3², 48 = 2⁴ · 3.", "SÜT = 2² · 3 = 12.", "VÜK = 36 · 48 : 12 = 144."],
      a: "SÜT 12, VÜK 144",
    },
    alt: "Eukleidese algoritm: 48 − 36 = 12, 36 jagub 12-ga — seega SÜT = 12.",
    err: "1 ei ole algarv: sellel on ainult üks jagaja.",
  },

  g6frac: {
    t: "Murru põhiomadus, võrdlemine",
    main: [
      "Lugejat ja nimetajat võib korrutada või jagada sama nullist erineva arvuga — murd ei muutu.",
      "Taandada on mugav kohe lugeja ja nimetaja SÜT-ga.",
      "Murdude võrdlemiseks viime need ühisele nimetajale ja võrdleme lugejaid.",
    ],
    ex: {
      q: "Võrdle 5/8 ja 7/12",
      s: ["Ühine nimetaja 24: 15/24 ja 14/24.", "15 > 14."],
      a: "5/8 > 7/12",
    },
    alt: "Ristkorrutamine: 5 · 12 = 60 ja 7 · 8 = 56, 60 > 56, seega 5/8 > 7/12.",
    err: "Arvata, et 3/7 > 3/5, sest 7 > 5. Võrdsete lugejate korral on suurem murd, mille nimetaja on väiksem.",
  },

  g6fadd: {
    t: "Murdude liitmine ja lahutamine",
    main: [
      "Erinevate nimetajatega murrud viime vähimale ühisele nimetajale — see on nimetajate VÜK.",
      "Liidame või lahutame lugejad, nimetaja jääb samaks.",
      "Segaarvudel arvutame täis- ja murdosa eraldi; kui murdosast jääb puudu, laename ühe.",
    ],
    ex: {
      q: "3 1/4 − 1 5/6",
      s: [
        "Ühine nimetaja 12: 3 3/12 − 1 10/12.",
        "3/12 on väiksem kui 10/12, laename ühe: 2 15/12 − 1 10/12.",
        "= 1 5/12.",
      ],
      a: "1 5/12",
    },
    alt: "Liigmurdude abil: 13/4 − 11/6 = 39/12 − 22/12 = 17/12 = 1 5/12.",
    err: "Nimetajate liitmine: 1/4 + 1/6 ≠ 2/10.",
  },

  g6fmul: {
    t: "Murdude korrutamine ja jagamine",
    main: [
      "Korrutamine: lugeja lugejaga, nimetaja nimetajaga; segaarvud teeme enne liigmurdudeks.",
      "Murruga jagamine on pöördarvuga korrutamine.",
      "Murd arvust: korrutame arvu murruga. Arv tema murru järgi: jagame murruga.",
    ],
    ex: { q: "2 1/4 : 1 1/8", s: ["9/4 : 9/8 = 9/4 · 8/9.", "Taandame: 8/4 = 2."], a: "2" },
    alt: "Taanda enne korrutamist risti: nii jäävad arvud väikesteks.",
    err: "Jagamisel pööratakse ümber esimene murd teise asemel.",
  },

  g6fdec: {
    t: "Harilikud ja kümnendmurrud",
    main: [
      "Murd on lõplik kümnendmurd, kui taandatud murru nimetajas on ainult tegurid 2 ja 5.",
      "Muidu saame perioodilise murru: 1/3 = 0,(3), 5/11 = 0,(45).",
      "Kui avaldises on mõlemat liiki murde ja mõnda ei saa lõplikuks kümnendmurruks teha, arvutame harilike murdudega.",
    ],
    ex: {
      q: "3/8 kümnendmurruna",
      s: ["8 = 2³, laiendame 1000-ni: 3/8 = 375/1000.", "= 0,375."],
      a: "0,375",
    },
    alt: "Võib jagada nurga all: 3 : 8 = 0,375.",
    err: "Ümardada 1/3 arvuks 0,3 ja pidada seda täpseks: 0,3 on 3/10, aga 1/3 = 0,(3).",
  },

  g6ratio: {
    t: "Suhe, võrre, mõõtkava",
    main: [
      "Suhe a : b näitab, mitu korda on a suurem kui b või millise osa moodustab a arvust b.",
      "Võrdes a : b = c : d on välisliikmete korrutis võrdne keskliikmete korrutisega: a · d = b · c.",
      "Mõõtkava 1 : 50 000 tähendab: 1 cm kaardil on 50 000 cm = 500 m looduses.",
    ],
    ex: { q: "x : 6 = 10 : 4", s: ["x · 4 = 6 · 10.", "x = 60 : 4 = 15."], a: "15" },
    alt: "10 on 4-st 2,5 korda suurem, seega ka x on 6-st 2,5 korda suurem: 15.",
    err: "Mõõtkava teisendamisel unustatakse sentimeetrid kilomeetriteks teisendada: 1 km = 100 000 cm.",
  },

  g6propr: {
    t: "Võrdeline ja pöördvõrdeline sõltuvus",
    main: [
      "Võrdeline: mitu korda suureneb üks suurus, sama mitu korda suureneb teine (hind ja maksumus).",
      "Pöördvõrdeline: mitu korda suureneb üks, sama mitu korda väheneb teine; nende korrutis on jääv (kiirus ja aeg).",
      "Kõigepealt tee kindlaks sõltuvuse liik, seejärel koosta võrre.",
    ],
    ex: {
      q: "6 töölist teevad töö 12 päevaga. Mitme päevaga teevad selle 9 töölist?",
      s: [
        "Töölisi on rohkem — päevi vähem: pöördvõrdeline sõltuvus.",
        "6 · 12 = 72 «inimpäeva», 72 : 9 = 8.",
      ],
      a: "8 päeva",
    },
    alt: "Ühe kaudu: 1 tööline teeks töö 6 · 12 = 72 päevaga, 9 töölist 72 : 9 = 8 päevaga.",
    err: "Pöördvõrdelise ülesande lahendamine võrdelisena: 12 · 9 : 6 = 18 päeva — rohkem töölisi ei saa töötada kauem.",
  },

  g6pct: {
    t: "Protsent, sektordiagramm",
    main: [
      "1% on sajandik: p% arvust a = a · p : 100.",
      "Arv tema protsendi järgi: osa : p · 100.",
      "Sektordiagrammil on kogu ring 100% ehk 360°; 1% ringist on 3,6°.",
    ],
    ex: {
      q: "Mitu protsenti moodustab 18 arvust 240?",
      s: ["18 : 240 = 0,075.", "0,075 · 100% = 7,5%."],
      a: "7,5%",
    },
    alt: "Võrde abil: 240 — 100%, 18 — x%, x = 18 · 100 : 240 = 7,5.",
    err: "Jagamine vales suunas: 240 : 18 ei ole protsent.",
  },

  g6circ: {
    t: "Ringjoon ja ring",
    main: [
      "Diameeter on raadiusest kaks korda suurem: d = 2r.",
      "Ringjoone pikkus C = 2πr = πd, π ≈ 3,14.",
      "Ringi pindala S = πr²; kesknurgaga α sektor on α/360 ringist.",
    ],
    ex: {
      q: "Ringi pindala, kui raadius on 5 cm",
      s: ["S = 3,14 · 5².", "S = 3,14 · 25 = 78,5 cm²."],
      a: "78,5 cm²",
    },
    alt: "Diameetri kaudu: d = 10 cm, S = π · d² : 4 = 3,14 · 100 : 4 = 78,5 cm².",
    err: "Raadiuse asemel pannakse diameeter: S = π · 10² on 4 korda suurem õigest.",
  },

  g6ratn: {
    t: "Ratsionaalarvud: arvtelg, absoluutväärtus, võrdlemine",
    main: [
      "Vastandarvud erinevad ainult märgi poolest ja asuvad arvteljel nulli suhtes sümmeetriliselt.",
      "Absoluutväärtus |a| on kaugus nullist arvuni a.",
      "Arvteljel paremal on suurem; kahest negatiivsest on suurem see, mille absoluutväärtus on väiksem.",
    ],
    ex: {
      q: "Võrdle −7,2 ja −7,15",
      s: ["|−7,2| = 7,2, |−7,15| = 7,15.", "7,2 > 7,15, seega −7,2 asub vasakul."],
      a: "−7,2 < −7,15",
    },
    alt: "Kujuta ette termomeetrit: −7,2° on külmem kui −7,15°.",
    err: "−8 > −3, «sest 8 on suurem kui 3», on vale: −8 < −3.",
  },

  g6rops: {
    t: "Tehted ratsionaalarvudega",
    main: [
      "Samad märgid — liidame absoluutväärtused ja jätame märgi; erinevad — suuremast absoluutväärtusest lahutame väiksema, märk on suurema absoluutväärtusega arvu oma.",
      "a − b = a + (−b).",
      "Korrutamine ja jagamine: samad märgid — pluss, erinevad — miinus. Paarisarv miinuseid annab plussi.",
    ],
    ex: {
      q: "(−6) · (−4) − 15 : (−3)",
      s: ["(−6) · (−4) = 24.", "15 : (−3) = −5.", "24 − (−5) = 29."],
      a: "29",
    },
    alt: "Arvuta märk eraldi absoluutväärtusest: lahenda «ilma miinusteta», siis määra märk.",
    err: "24 − (−5) = 19 on vale: negatiivse arvu lahutamine on liitmine, 24 + 5 = 29.",
  },

  g6eq: {
    t: "Võrrandid: sulud, sarnased liikmed",
    main: [
      "Sulgude avamisel korrutame sulu ees oleva arvu iga liidetavaga; miinus sulu ees muudab märgid sulus.",
      "Sarnased liikmed (sama tähega) liidame: 3x − 5x = −2x.",
      "x-iga liikmed viime ühele poole, arvud teisele, muutes viimisel märki.",
    ],
    ex: {
      q: "3(x − 2) = x + 8",
      s: ["3x − 6 = x + 8.", "3x − x = 8 + 6, 2x = 14.", "x = 7."],
      a: "x = 7",
    },
    alt: "Kontroll: 3 · (7 − 2) = 15 ja 7 + 8 = 15 — õige.",
    err: "−(x − 4) = −x − 4 on vale: miinus muudab mõlema liikme märki, −(x − 4) = −x + 4.",
  },

  g6coord: {
    t: "Koordinaattasand ja graafikud",
    main: [
      "Punkt A(x; y): esmalt abstsiss (horisontaalselt), siis ordinaat (vertikaalselt).",
      "Kui punktide ordinaadid on võrdsed, on lõik x-teljega paralleelne ja selle pikkus on abstsisside vahe.",
      "Liikumise graafikul on horisontaalne lõik peatus, kalle näitab kiirust: v = s : t.",
    ],
    ex: {
      q: "Lõigu A(−3; 2), B(5; 2) pikkus",
      s: ["Ordinaadid on võrdsed — lõik on horisontaalne.", "5 − (−3) = 8."],
      a: "8",
    },
    alt: "Loe ruute mööda x-telge: −3-st nullini 3, nullist 5-ni 5, kokku 8.",
    err: "Koordinaatide järjekorra segamine: punktid (2; −3) ja (−3; 2) on erinevad.",
  },

  g6sym: {
    t: "Telg- ja tsentraalsümmeetria",
    main: [
      "Sümmeetria x-telje suhtes: (a; b) → (a; −b); y-telje suhtes: (a; b) → (−a; b).",
      "Koordinaatide alguspunkti suhtes: (a; b) → (−a; −b).",
      "Punkti M suhtes: M on punkti ja tema kujutise vahelise lõigu keskpunkt.",
    ],
    ex: {
      q: "A(3; −5) punkti M(1; 2) suhtes",
      s: ["x = 2 · 1 − 3 = −1.", "y = 2 · 2 − (−5) = 9."],
      a: "(−1; 9)",
    },
    alt: "Liigu A-st M-i ja tee veel sama suur samm: 3-st 1-ni on −2, veel −2 annab −1; −5-st 2-ni on +7, veel +7 annab 9.",
    err: "x-telje suhtes peegeldamisel muudetakse abstsissi märki — tegelikult muutub ordinaat.",
  },

  g6tri: {
    t: "Kolmnurgad: nurgad, liigid, võrdsus",
    main: [
      "Kolmnurga nurkade summa on 180°; kõrvunurkade summa on 180°, tippnurgad on võrdsed.",
      "Nurkade järgi on kolmnurgad teravnurksed, täisnurksed ja nürinurksed; võrdhaarse kolmnurga alusnurgad on võrdsed.",
      "Võrdsuse tunnused: kaks külge ja nendevaheline nurk, külg ja kaks lähisnurka, kolm külge. Iga külg on väiksem kahe ülejäänu summast.",
    ],
    ex: {
      q: "Kolmnurga nurgad suhtuvad nagu 2 : 3 : 4. Leia suurim",
      s: ["2x + 3x + 4x = 180°, x = 20°.", "4 · 20° = 80°."],
      a: "80°",
    },
    alt: "Välisnurk võrdub kahe temaga mitte kõrvuti asuva sisenurga summaga — nii ei pea sageli kolmandat nurka otsima.",
    err: "Küljed 2, 3 ja 6 cm — sellist kolmnurka pole: 6 > 2 + 3.",
  },

  g6area: {
    t: "Kolmnurga pindala, kuup ja risttahukas",
    main: [
      "Kolmnurga pindala S = a · h : 2, kus h on küljele a tõmmatud kõrgus.",
      "Risttahuka ruumala V = a · b · c, kuubi V = a³.",
      "Risttahuka täispindala S = 2(ab + ac + bc), kuubi S = 6a².",
    ],
    ex: {
      q: "Kolmnurga pindala on 24 cm², alus 8 cm. Leia kõrgus",
      s: ["h = 2S : a.", "h = 48 : 8 = 6 cm."],
      a: "6 cm",
    },
    alt: "Täienda kolmnurk sama kõrgusega ristkülikuks: selle pindala on kaks korda suurem.",
    err: "Kõrguse asemel võetakse külgkülg: kõrgus on alusega risti.",
  },
};
