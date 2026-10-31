export default {
  delWarn:
    "Konto kustub koos kõigi tööde, ajaloo ja ühendustega. 30 päeva saab selle taastada, siis kustub kõik jäädavalt.",
  invLead: (w, isP, sn) =>
    isP
      ? sn
        ? `Näete õpilase ${sn} edusamme ja saate aidata keeruliste ülesannetega.`
        : "Teie laps lahendab matemaatika kontrolltöid ja soovib, et näeksite tema tulemusi ning saaksite aidata keeruliste ülesannetega."
      : `Lahenda matemaatika kontrolltöid ning ${w} näeb sinu edusamme ja saab aidata keeruliste ülesannetega.`,
  invTitle: (w, isP) => (isP ? `${w} kutsub teid Math Checki` : `${w} kutsub sind Math Checki`),
  invEmail: "E-post, kuhu kutse tuli",
  invOther: isP =>
    isP
      ? "Võite sisse logida ka teise e-postiga — siis küsib sait, kas ühendada teid selle e-postiga õpilasega."
      : "Võid sisse logida ka teise e-postiga — siis küsib sait, kas ühendada vanem selle kontoga.",
  otherTitleS: "Kas ühendada vanem selle kontoga?",
  otherTitleP: "Kas ühenduda õpilasega selle e-postiga?",
  otherText: (a, b, isP) =>
    `Kutse tuli aadressile ${a}, aga ${isP ? "logisite sisse" : "logisid sisse"} aadressiga ${b}. See on korras — võib jätkata selle e-postiga.`,
  otherWillS: "näeb sinu töid ja abipalveid",
  otherWillP: "näete töid ja abipalveid",
  notNow: "Mitte praegu",
  yesConnect: "Jah, ühenda",
  signOutAs: e => `Logi välja ja sisse aadressiga ${e}`,
  roleMismatch: isP =>
    isP
      ? "See kutse on lapsevanemale, aga see konto on õpilase oma. Kutse vastuvõtmiseks logige sisse teise e-postiga."
      : "See kutse on õpilasele, aga see konto on lapsevanema oma. Kutse vastuvõtmiseks logige sisse teise e-postiga.",
  invGoneTitle: "Kutse pole saadaval",
  invGone: "See kutse on juba kasutatud või tühistatud.",
  ok: "Selge",
  step: (a, b) => `Samm ${a}/${b}`,
  del1Q: "Kas soovite konto kustutada?",
  del1Kid: n => `Kas kustutada õpilase ${n} konto?`,
  yesNext: "Jah, jätka",
  delWhat: "Mis kustub",
  dWorks: n => `kõik tööd ja ajalugu — ${n} tööd`,
  dProgress: "edusammud teemades ja olümpiaadiülesannetes",
  dLater: "nimekiri «Vaata hiljem»",
  dParents: l => `ühendus vanematega: ${l}`,
  dKids: l => `ühendus õpilastega: ${l}`,
  dInvites: "saadetud kutsed",
  d30: "30 päeva saab konto taastada, siis kustub kõik jäädavalt.",
  confirm: "Kinnita",
  del3T: "Kinnitage kustutamine kirjas",
  del3Text: e =>
    `Saatsime kirja aadressile ${e}. Konto kustub alles pärast kirjas oleva nupu vajutamist. Link kehtib 24 tundi.`,
  del3Kid: "Kui mõtlesite ümber, ärge vajutage kirjas olevat nuppu.",
  kidAccSec: "Õpilase konto",
  kidDelWarn:
    "Kustuta õpilase konto koos tööde ja ajalooga. 30 päeva saab õpilane selle taastada, anname talle kirjaga teada.",
  byeT: isP => (isP ? "Meil hakkab teist puudus" : "Meil hakkab sinust puudus"),
  byeText: (e, isP) =>
    isP
      ? `Konto ${e} on kustutatud.`
      : `Konto ${e} on kustutatud. Saatsime e-postile kirja sinu Math Checki tulemustega.`,
  byeUntil: (d, isP) =>
    isP
      ? `<b>Tagasi saab tulla kuni ${d}.</b> Logige lihtsalt sama e-postiga sisse — kõik taastub. Pärast seda kustub kõik jäädavalt.`
      : `<b>Tagasi saab tulla kuni ${d}.</b> Logi lihtsalt sama e-postiga sisse — kõik tööd ja edusammud taastuvad. Pärast seda kustub kõik jäädavalt.`,
  byeKidT: n => `Õpilase ${n} konto on kustutatud`,
  byeKidText: "Saatsime teile kirja õpilase tulemustega.",
  byeKidUntil: (n, d) => `${n} saab konto taastada kuni ${d} — andsime sellest kirjaga teada.`,
  toHome: "Avalehele",
  toKids: "Õpilaste juurde",
  linkExpired:
    "Link on aegunud või juba kasutatud. Kui konto on vaja ikka kustutada, taotlege kustutamist uuesti.",
  restT: "Tere tulemast tagasi!",
  restText: (a, b, isP) =>
    `See konto kustutati ${a}. Selle saab taastada kuni ${b} — koos ${isP ? "kõigi ühendatud õpilastega" : "kõigi tööde ja edusammudega. Vanemad ühendatakse uuesti"}.`,
  restore: "Taasta konto",
  unlinkBtn: "Eemalda ühendus",
  unlinkT: "Eemaldada ühendus vanemaga?",
  unlinkText: (n, e) =>
    `${n} (${e}) ei näe enam sinu töid ja abipalveid. Anname talle sellest kirjaga teada. Uuesti saab ühendada igal ajal kutsega.`,
};
