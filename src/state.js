// Изменяемое состояние приложения. Всё, что меняется во время работы, живёт здесь, а не в отдельных переменных по файлам.
import { todayStr } from "./lib/format.js";
import { LS } from "./lib/storage.js";

// st — настройки и текущая работа (часть сохраняется в localStorage как math7.prefs)
export const st = Object.assign(
  {
    lang: "ru",
    level: "n",
    type: "theme",
    date: todayStr(),
    timer: "off",
    limit: 45,
    theme: "system",
    name: "",
    view: "main",
    test: null,
    meta: null,
    answers: {},
    checked: false,
    open: {},
    confirming: false,
    elapsed: 0,
    blockTime: {},
    running: false,
    timeUp: false,
    history: [],
    seen: [],
    train: null,
    grade: 7,
    year: "2026/27",
    grades: [7],
    weekOpen: true,
    menuOpen: false,
    langOpen: false,
    progGrade: null,
    progPick: null,
    laps: [],
    lapStart: 0,
    rv: null,
    faqOpen: null,
    limitTouched: false,
    program: "school",
  },
  LS.get("math7.prefs") || {},
);

// вход и аккаунт
export const session = {
  user: null,
  profile: null,
  authState: "loading",
  sync: "ok",
  authMsg: "",
  authErr: false,
  deleted: null,
  bye: null,
  // приглашение по ссылке (?invite=…) и подтверждение удаления (?delete=…) из писем
  pendInv: LS.get("math7.invite"),
  invInfo: null,
  delTok: null,
};

// семья: родители ученика, ученики родителя, приглашения, просьбы о помощи
export const family = {
  parents: [],
  kids: [],
  kid: null,
  kidHist: [],
  kidParents: [],
  kidHelp: [],
  myInvites: [],
  myHelp: [],
  linkMsg: "",
  linkErr: false,
};

// интерфейс: открытое окно и блок заданий в фокусе
export const ui = { modal: null, activeBlock: null };
