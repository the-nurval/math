(function(){
const G=window.GEN;
const LV={n:"Easy",a:"Medium",o:"Hard"};
const UI={
 ru:{lap:"Круг",laps:"Круги",start:"Старт",stop:"Стоп",reset:"Сбросить",hint:"Ответ можно писать так: <code>-3,5</code> или <code>-3.5</code>, дробь <code>-7/4</code>, смешанное число <code>2 1/3</code>. Если ответ — бесконечная дробь, пиши обыкновенной дробью или округли до сотых. Несколько ответов — через «;».",title:"Математика, 7 класс",prog:"Программа",settings:"Настройки",profile:"Профиль",
  date:"Дата",timer:"Таймер",type:"Тип работы",level:"Уровень",
  ty:{theme:"Тематическая",period:"Итоговая за период",train:"Тренировка"},tm:{off:"Выкл.",watch:"Секундомер",limit:"Лимит"},min:"мин",
  create:"Новая работа",week:"Учебная неделя",of:"из",period:"период",brk:"каникулы",before:"учебный год ещё не начался",after:"учебный год закончен",now:"Сейчас",
  noTest:"Нажмите «Новая работа», чтобы получить контрольную.",howto:"Как записывать ответ",
  maxpts:"максимум",pts:"б.",ptsEach:n=>`по ${n} ${n===1?"баллу":"балла"}`,ptsOne:n=>`${n} ${n===1?"балл":n<5?"балла":"баллов"}`,
  filled:(a,b)=>`Заполнено ${a} из ${b}`,check:"Завершить и проверить",back:"Вернуться",anyway:"Всё равно проверить",
  emptyWarn:(a,b)=>`Заполнено ${a} из ${b}. Пустые ответы засчитаются как неверные.`,
  checked:(a,b)=>`Проверено: ${a} из ${b} баллов`,allExp:"Все объяснения",
  correctPts:n=>`Верно, ${n} б.`,right:"Правильно",noAns:"Нет ответа. Правильно",why:"Почему?",hide:"Скрыть",
  alt:"Другой способ",yourProof:"Запиши доказательство (проверяется по образцу)",model:"Образец решения",selfQ:"Сравни со своим и оцени:",
  self:["Не доказал","Частично","Полностью"],task:"Задание",time:"время",timeUp:"Время вышло — работа проверена автоматически.",
  secWork:"Работа",secLook:"Внешний вид",secHelp:"Помощь",theme:"Тема",th:{system:"Как в системе",light:"Светлая",dark:"Тёмная"},
  levelsWhat:"Что значат уровни",faq:"Вопросы и ответы",
  progTitle:"Программа 7 класса",stDone:"пройдено",stNow:"идёт",stNext:"впереди",wk:"нед.",
  name:"Имя ученика",nameParent:"Имя родителя",namePh:"Как зовут ученика",grade:"7 класс",year:"учебный год",
  kWorks:"работ",kAvg:"средний результат",kStreak:"дней подряд",kTime:"в среднем на работу",
  act:"Активность за 12 недель",less:"меньше",more:"больше",trend:"Результаты по работам, %",trendNone:"График появится после двух проверенных работ.",
  topics:"Темы",weak:"слабая",trainBtn:"Потренировать слабые темы",timeT:"Время",
  tPerTask:"на одно задание",tLimit:"лимита используется",tNone:"Включите таймер в работе, чтобы видеть время.",
  hist:"История работ",histNone:"Пока нет проверенных работ.",oly:"Олимпиадные задачи",olySolved:(a,b)=>`решено ${a} из ${b}`,
  saved:"Результаты видны только вам.",notSaved:"Постоянное хранение здесь недоступно: история хранится, пока страница открыта.",
  review:"Работа от",cmp:"По сравнению с прошлым месяцем",proofs:"Доказательства",
  faqItems:[
   ["Что значат уровни Easy, Medium, Hard",`<div class="lvl"><b>Easy</b><span>Школьный уровень: задания как в обычной контрольной, в конце одно задание со звёздочкой.</span><b>Medium</b><span>Числа и выражения сложнее, больше дробей, задачи с модулем и параметром. Два задания со звёздочкой и одно доказательство.</span><b>Hard</b><span>Олимпиадные задачи на логику и нестандартный взгляд на уже пройденные темы, плюс доказательство. 60 минут.</span></div><p>Уровень меняется в настройках.</p>`],
   ["Какие темы попадают в работу","<p>Только те, что пройдены к выбранной дате. Теги «Сейчас» показывают текущие темы. Чтобы получить работу на другой момент учебного года, поменяйте дату.</p>"],
   ["Как записывать ответ","<p>Десятичная дробь: <code>-3,5</code> или <code>-3.5</code>. Обыкновенная: <code>-7/4</code>. Смешанное число: <code>2 1/3</code>.</p><p>Если ответ — бесконечная дробь, пишите обыкновенной дробью или округлите до сотых. Несколько ответов — через «;».</p>"],
   ["Чем тематическая работа отличается от итоговой","<p>Тематическая — по текущим темам с небольшим повторением, около 20 заданий на 45 минут. Итоговая — по всем темам учебного периода, около 30 заданий на 90 минут.</p>"],
   ["Как работает таймер","<p>Секундомер считает время на работу и на каждое задание. Лимит ограничивает время: когда оно кончается, работа проверяется сама. Время по заданиям видно после проверки.</p>"],
   ["Что такое задания со звёздочкой и доказательства","<p>Задания со звёздочкой — нестандартные задачи по пройденным темам. Доказательство проверяется по образцу: после проверки сравните своё решение с образцом и оцените себя.</p>"],
   ["Где хранятся результаты","<p>В профиле. Там история работ, графики и слабые темы. Результаты видны только вам.</p>"]]},
 et:{lap:"Ring",laps:"Ringid",start:"Start",stop:"Stopp",reset:"Lähtesta",hint:"Vastuse võib kirjutada nii: <code>-3,5</code> või <code>-3.5</code>, murd <code>-7/4</code>, segaarv <code>2 1/3</code>. Lõpmatu kümnendmurru korral kirjuta harilik murd või ümarda sajandikeni. Mitu vastust eralda «;».",title:"Matemaatika, 7. klass",prog:"Õppekava",settings:"Seaded",profile:"Profiil",
  date:"Kuupäev",timer:"Taimer",type:"Töö tüüp",level:"Tase",
  ty:{theme:"Teemakontroll",period:"Perioodi kokkuvõte",train:"Treening"},tm:{off:"Väljas",watch:"Stopper",limit:"Piirang"},min:"min",
  create:"Uus töö",week:"Õppenädal",of:"/",period:"periood",brk:"vaheaeg",before:"õppeaasta pole veel alanud",after:"õppeaasta on lõppenud",now:"Praegu",
  noTest:"Vajuta «Uus töö», et saada kontrolltöö.",howto:"Kuidas vastust kirjutada",
  maxpts:"maksimum",pts:"p",ptsEach:n=>`${n} ${n===1?"punkt":"punkti"} igaüks`,ptsOne:n=>`${n} ${n===1?"punkt":"punkti"}`,
  filled:(a,b)=>`Täidetud ${a}/${b}`,check:"Lõpeta ja kontrolli",back:"Tagasi",anyway:"Kontrolli ikkagi",
  emptyWarn:(a,b)=>`Täidetud ${a}/${b}. Tühjad vastused loetakse valeks.`,
  checked:(a,b)=>`Kontrollitud: ${a}/${b} punkti`,allExp:"Kõik selgitused",
  correctPts:n=>`Õige, ${n} p`,right:"Õige vastus",noAns:"Vastus puudub. Õige",why:"Miks?",hide:"Peida",
  alt:"Teine võimalus",yourProof:"Kirjuta tõestus (kontrollitakse näidise järgi)",model:"Näidislahendus",selfQ:"Võrdle enda omaga ja hinda:",
  self:["Ei tõestanud","Osaliselt","Täielikult"],task:"Ülesanne",time:"aeg",timeUp:"Aeg sai läbi — töö kontrolliti automaatselt.",
  secWork:"Töö",secLook:"Välimus",secHelp:"Abi",theme:"Teema",th:{system:"Nagu süsteemis",light:"Hele",dark:"Tume"},
  levelsWhat:"Mida tasemed tähendavad",faq:"Küsimused ja vastused",
  progTitle:"7. klassi õppekava",stDone:"läbitud",stNow:"käsil",stNext:"ees",wk:"näd",
  name:"Õpilase nimi",nameParent:"Lapsevanema nimi",namePh:"Õpilase nimi",grade:"7. klass",year:"õppeaasta",
  kWorks:"tööd",kAvg:"keskmine tulemus",kStreak:"päeva järjest",kTime:"keskmiselt töö kohta",
  act:"Aktiivsus 12 nädala jooksul",less:"vähem",more:"rohkem",trend:"Tulemused töö kaupa, %",trendNone:"Graafik ilmub pärast kahte kontrollitud tööd.",
  topics:"Teemad",weak:"nõrk",trainBtn:"Harjuta nõrku teemasid",timeT:"Aeg",
  tPerTask:"ühe ülesande kohta",tLimit:"ajapiirangust kulub",tNone:"Lülita töös taimer sisse, et aega näha.",
  hist:"Tööde ajalugu",histNone:"Kontrollitud töid veel pole.",oly:"Olümpiaadiülesanded",olySolved:(a,b)=>`lahendatud ${a}/${b}`,
  saved:"Tulemused on nähtavad ainult sulle.",notSaved:"Püsiv salvestus pole siin saadaval: ajalugu säilib, kuni leht on avatud.",
  review:"Töö",cmp:"Võrreldes eelmise kuuga",proofs:"Tõestused",
  faqItems:[
   ["Mida tähendavad tasemed Easy, Medium, Hard",`<div class="lvl"><b>Easy</b><span>Kooli tase: ülesanded nagu tavalises kontrolltöös, lõpus üks tärnülesanne.</span><b>Medium</b><span>Arvud ja avaldised on keerulisemad, rohkem murde, absoluutväärtuse ja parameetriga ülesanded. Kaks tärnülesannet ja üks tõestus.</span><b>Hard</b><span>Olümpiaadiülesanded loogikale ja ebatavalisele mõtlemisele läbitud teemadel, lisaks tõestus. 60 minutit.</span></div><p>Taset saab muuta seadetes.</p>`],
   ["Millised teemad tulevad töösse","<p>Ainult need, mis on valitud kuupäevaks läbitud. Sildid «Praegu» näitavad käimasolevaid teemasid. Teise ajahetke töö saamiseks muuda kuupäeva.</p>"],
   ["Kuidas vastust kirjutada","<p>Kümnendmurd: <code>-3,5</code> või <code>-3.5</code>. Harilik murd: <code>-7/4</code>. Segaarv: <code>2 1/3</code>.</p><p>Lõpmatu kümnendmurru korral kirjuta harilik murd või ümarda sajandikeni. Mitu vastust eralda «;».</p>"],
   ["Mille poolest erinevad teemakontroll ja perioodi kokkuvõte","<p>Teemakontroll on käimasolevatel teemadel väikese kordamisega, umbes 20 ülesannet 45 minutiga. Perioodi kokkuvõte hõlmab kõiki perioodi teemasid, umbes 30 ülesannet 90 minutiga.</p>"],
   ["Kuidas taimer töötab","<p>Stopper loeb kogu töö ja iga ülesande aega. Piirang seab ajalimiidi: kui aeg saab läbi, kontrollitakse töö automaatselt. Ülesannete aeg on näha pärast kontrolli.</p>"],
   ["Mis on tärnülesanded ja tõestused","<p>Tärnülesanded on ebatavalised ülesanded läbitud teemadel. Tõestust kontrollitakse näidise järgi: pärast kontrolli võrdle oma lahendust näidisega ja hinda ennast.</p>"],
   ["Kus tulemusi hoitakse","<p>Profiilis. Seal on tööde ajalugu, graafikud ja nõrgad teemad. Tulemused on nähtavad ainult sulle.</p>"]]},
 en:{lap:"Lap",laps:"Laps",start:"Start",stop:"Stop",reset:"Reset",hint:"Write answers like <code>-3.5</code>, a fraction <code>-7/4</code> or a mixed number <code>2 1/3</code>. For repeating decimals use a fraction or round to hundredths. Separate several answers with «;».",title:"Maths, Grade 7",prog:"Curriculum",settings:"Settings",profile:"Profile",
  date:"Date",timer:"Timer",type:"Test type",level:"Level",
  ty:{theme:"Topic test",period:"End of term",train:"Practice"},tm:{off:"Off",watch:"Stopwatch",limit:"Limit"},min:"min",
  create:"New test",week:"School week",of:"of",period:"term",brk:"holiday",before:"the school year has not started",after:"the school year is over",now:"Now",
  noTest:"Press «New test» to get a test.",howto:"How to write answers",
  maxpts:"max",pts:"pts",ptsEach:n=>`${n} ${n===1?"point":"points"} each`,ptsOne:n=>`${n} ${n===1?"point":"points"}`,
  filled:(a,b)=>`Answered ${a} of ${b}`,check:"Finish and check",back:"Go back",anyway:"Check anyway",
  emptyWarn:(a,b)=>`Answered ${a} of ${b}. Blank answers count as wrong.`,
  checked:(a,b)=>`Checked: ${a} of ${b} points`,allExp:"All explanations",
  correctPts:n=>`Correct, ${n} pts`,right:"Correct answer",noAns:"No answer. Correct",why:"Why?",hide:"Hide",
  alt:"Another way",yourProof:"Write your proof (checked against a model)",model:"Model solution",selfQ:"Compare with yours and rate it:",
  self:["Not proved","Partly","Fully"],task:"Task",time:"time",timeUp:"Time is up — the test was checked automatically.",
  secWork:"Test",secLook:"Appearance",secHelp:"Help",theme:"Theme",th:{system:"System",light:"Light",dark:"Dark"},
  levelsWhat:"What the levels mean",faq:"Questions and answers",
  progTitle:"Grade 7 curriculum",stDone:"done",stNow:"in progress",stNext:"ahead",wk:"wk",
  name:"Student's name",nameParent:"Parent's name",namePh:"Student's name",grade:"Grade 7",year:"school year",
  kWorks:"tests",kAvg:"average score",kStreak:"days in a row",kTime:"average per test",
  act:"Activity over 12 weeks",less:"less",more:"more",trend:"Score per test, %",trendNone:"The chart appears after two checked tests.",
  topics:"Topics",weak:"weak",trainBtn:"Practise weak topics",timeT:"Time",
  tPerTask:"per task",tLimit:"of the limit used",tNone:"Turn on the timer to see time stats.",
  hist:"Test history",histNone:"No checked tests yet.",oly:"Olympiad problems",olySolved:(a,b)=>`${a} of ${b} solved`,
  saved:"Only you can see your results.",notSaved:"Permanent storage isn't available here: history is kept while the page is open.",
  review:"Test of",cmp:"Compared with last month",proofs:"Proofs",
  faqItems:[
   ["What do Easy, Medium and Hard mean",`<div class="lvl"><b>Easy</b><span>School level: tasks like a regular test, with one challenge at the end.</span><b>Medium</b><span>Harder numbers and expressions, more fractions, absolute value and parameters. Two challenges and one proof.</span><b>Hard</b><span>Olympiad problems on logic and fresh angles on topics already taught, plus a proof. 60 minutes.</span></div><p>Change the level in settings.</p>`],
   ["Which topics go into a test","<p>Only those taught by the chosen date. The «Now» tags show the current topics. Change the date to get a test for another point in the school year.</p>"],
   ["How to write answers","<p>Decimal: <code>-3.5</code>. Fraction: <code>-7/4</code>. Mixed number: <code>2 1/3</code>.</p><p>For repeating decimals use a fraction or round to hundredths. Separate several answers with «;».</p>"],
   ["Topic test vs end of term","<p>A topic test covers the current topics with a little review: about 20 tasks in 45 minutes. An end-of-term test covers all topics of the term: about 30 tasks in 90 minutes.</p>"],
   ["How the timer works","<p>The stopwatch measures time for the whole test and for each task. The limit caps the time: when it runs out, the test is checked automatically. Time per task shows after checking.</p>"],
   ["What are challenges and proofs","<p>Challenges are unusual problems on topics already taught. A proof is checked against a model: after checking, compare your solution with the model and rate yourself.</p>"],
   ["Where results are kept","<p>In your profile: test history, charts and weak topics. Only you can see them.</p>"]]}
};

const UI2={
 ru:{signTitle:"Вход",signLead:"Войдите, чтобы прогресс сохранялся и был виден на любом устройстве.",google:"Войти через Google",or:"или",email:"Электронная почта",sendLink:"Получить ссылку для входа",
  linkSent:e=>`Ссылка для входа отправлена на ${e}. Откройте письмо и перейдите по ссылке.`,authErr:"Не получилось: ",
  roleTitle:"Кто вы?",roleLead:"Выбирается один раз. Ученик решает работы, родитель смотрит прогресс ученика.",student:"Я ученик",parent:"Я родитель",
  studentHint:"Решать контрольные и следить за своим прогрессом",parentHint:"Подключить ученика и смотреть его результаты",yourName:"Имя",
  parentsSec:"Родители",codeFor:"Код для родителя",copy:"Скопировать",copied:"Скопировано",accept:"Разрешить",decline:"Отклонить",remove:"Отключить",
  noParents:"Пока никто не подключён.",active:"подключён",pending:"просит доступ к прогрессу",logout:"Выйти",
  synced:"Прогресс сохранён на сервере.",offline:"Нет связи с сервером. Результаты сохранены на этом устройстве и отправятся, когда связь появится.",
  kidsTitle:"Ученики",kidsNone:"Пока нет подключённых учеников.",linkCode:"Подключить по коду",codePh:"Код из профиля ученика",linkBtn:"Подключить",
  linkEmail:"Подключить по почте ученика",emailPh:"Почта ученика",reqBtn:"Отправить запрос",reqSent:"Запрос отправлен. Ученик подтвердит его в своём профиле.",
  notFound:"Ученик не найден. Проверьте код или почту: ученик должен один раз войти на сайт.",linkedOk:n=>`Подключён ученик: ${n||"без имени"}`,waiting:"ждёт подтверждения",
  me:"Мой профиль",noName:"Без имени",loading:"Загрузка…",account:"Аккаунт"},
 et:{signTitle:"Sisselogimine",signLead:"Logi sisse, et edusamme salvestataks ja need oleksid näha igas seadmes.",google:"Logi sisse Google'iga",or:"või",email:"E-post",sendLink:"Saada sisselogimise link",
  linkSent:e=>`Sisselogimise link saadeti aadressile ${e}. Ava kiri ja vajuta lingile.`,authErr:"Ei õnnestunud: ",
  roleTitle:"Kes sa oled?",roleLead:"Valitakse üks kord. Õpilane lahendab töid, lapsevanem vaatab õpilase edusamme.",student:"Olen õpilane",parent:"Olen lapsevanem",
  studentHint:"Lahenda kontrolltöid ja jälgi oma edusamme",parentHint:"Ühenda õpilane ja vaata tema tulemusi",yourName:"Nimi",
  parentsSec:"Vanemad",codeFor:"Kood lapsevanemale",copy:"Kopeeri",copied:"Kopeeritud",accept:"Luba",decline:"Keeldu",remove:"Eemalda",
  noParents:"Keegi pole veel ühendatud.",active:"ühendatud",pending:"palub ligipääsu edusammudele",logout:"Logi välja",
  synced:"Edusammud on serveris salvestatud.",offline:"Ühendus serveriga puudub. Tulemused on selles seadmes salvestatud ja saadetakse, kui ühendus taastub.",
  kidsTitle:"Õpilased",kidsNone:"Ühendatud õpilasi veel pole.",linkCode:"Ühenda koodiga",codePh:"Kood õpilase profiilist",linkBtn:"Ühenda",
  linkEmail:"Ühenda õpilase e-postiga",emailPh:"Õpilase e-post",reqBtn:"Saada taotlus",reqSent:"Taotlus saadetud. Õpilane kinnitab selle oma profiilis.",
  notFound:"Õpilast ei leitud. Kontrolli koodi või e-posti: õpilane peab korra saidile sisse logima.",linkedOk:n=>`Õpilane ühendatud: ${n||"nimeta"}`,waiting:"ootab kinnitust",
  me:"Minu profiil",noName:"Nimeta",loading:"Laadimine…",account:"Konto"},
 en:{signTitle:"Sign in",signLead:"Sign in so your progress is saved and visible on any device.",google:"Sign in with Google",or:"or",email:"Email",sendLink:"Send me a sign-in link",
  linkSent:e=>`A sign-in link was sent to ${e}. Open the email and follow the link.`,authErr:"That didn't work: ",
  roleTitle:"Who are you?",roleLead:"Chosen once. A student takes tests; a parent follows the student's progress.",student:"I'm a student",parent:"I'm a parent",
  studentHint:"Take tests and track your progress",parentHint:"Connect a student and see their results",yourName:"Name",
  parentsSec:"Parents",codeFor:"Code for a parent",copy:"Copy",copied:"Copied",accept:"Allow",decline:"Decline",remove:"Disconnect",
  noParents:"Nobody is connected yet.",active:"connected",pending:"asks to see your progress",logout:"Sign out",
  synced:"Progress is saved on the server.",offline:"No connection to the server. Results are saved on this device and will be sent when you're back online.",
  kidsTitle:"Students",kidsNone:"No students connected yet.",linkCode:"Connect with a code",codePh:"Code from the student's profile",linkBtn:"Connect",
  linkEmail:"Connect by the student's email",emailPh:"Student's email",reqBtn:"Send request",reqSent:"Request sent. The student will confirm it in their profile.",
  notFound:"Student not found. Check the code or email: the student must sign in to the site once.",linkedOk:n=>`Student connected: ${n||"no name"}`,waiting:"waiting for confirmation",
  me:"My profile",noName:"No name",loading:"Loading…",account:"Account"}
};
Object.keys(UI).forEach(l=>Object.assign(UI[l],UI2[l]));

const UI3={
 ru:{family:"Семья",main:"главный родитель",second:"второй родитель",inviteParent:"Пригласить родителя",inviteChild:"Пригласить ученика",inviteSecond:"Пригласить второго родителя",
  emailPh:"Почта",invite:"Пригласить",invited:"приглашение отправлено",cancelInv:"Отменить",waiting:"ждёт подтверждения ученика",
  okInvited:e=>`Приглашение отправлено на ${e}.`,okRequested:"Запрос отправлен. Ученик подтвердит его, когда зайдёт на сайт.",okLinked:"Подключено.",
  eNotStudent:"Эта почта принадлежит аккаунту родителя.",eNotParentAcc:"Эта почта принадлежит аккаунту ученика.",eBadEmail:"Проверьте почту.",eNotMain:"Приглашать может только главный родитель.",
  leave:"Отключиться",removeP:"Отключить",online:"в сети",seenToday:t=>`был(а) сегодня в ${t}`,seenYday:t=>`был(а) вчера в ${t}`,seenDays:n=>`был(а) ${n} дн. назад`,seenDate:d=>`был(а) ${d}`,
  askTitle:"Это твой родитель?",askText:(n,e)=>`${n||"Кто-то"} (${e}) хочет видеть твои результаты.`,yes:"Да",no:"Нет",
  helpBtn:"Попросить помощи",helpSent:"Просьба отправлена",helpSec:"Просьбы о помощи",helpNone:"Просьб нет.",helpOpen:"Открыть",helpDone:"Разобрали",helpDoneMark:"разобрали",
  accountSec:"Аккаунт",accountRow:"Аккаунт и роль",roleNow:r=>`Роль: ${r==="student"?"ученик":"родитель"}`,roleS:"ученик",roleP:"родитель",
  changeRole:"Сменить роль",changeOnce:"Роль можно сменить только один раз.",roleChangedAlready:"Роль уже меняли, второй раз нельзя.",deleteAcc:"Удалить аккаунт",
  roleAsk:r=>`Вы собираетесь поменять роль на «${r}»?`,
  roleWarn:r=>`Поменять роль на «${r}» можно только один раз: вернуть обратно на этом аккаунте будет нельзя. Все настройки будут удалены, а также ${r==="родитель"?"все работы, история и достижения":"все подключённые ученики"}.`,
  phraseRole:"сменить роль",phraseDel:"удалить аккаунт",typePhrase:p=>`Чтобы подтвердить, введите: ${p}`,
  delWarn:"Аккаунт будет удалён вместе со всеми работами, историей и связями. Восстановить его нельзя. Потом можно войти заново, как новый пользователь.",
  cancel:"Отмена",doChange:"Сменить роль",doDelete:"Удалить"},
 et:{family:"Pere",main:"peamine vanem",second:"teine vanem",inviteParent:"Kutsu vanem",inviteChild:"Kutsu õpilane",inviteSecond:"Kutsu teine vanem",
  emailPh:"E-post",invite:"Kutsu",invited:"kutse saadetud",cancelInv:"Tühista",waiting:"ootab õpilase kinnitust",
  okInvited:e=>`Kutse saadeti aadressile ${e}.`,okRequested:"Taotlus saadetud. Õpilane kinnitab selle, kui saidile tuleb.",okLinked:"Ühendatud.",
  eNotStudent:"See e-post kuulub lapsevanema kontole.",eNotParentAcc:"See e-post kuulub õpilase kontole.",eBadEmail:"Kontrolli e-posti.",eNotMain:"Kutsuda saab ainult peamine vanem.",
  leave:"Lahku",removeP:"Eemalda",online:"võrgus",seenToday:t=>`oli täna ${t}`,seenYday:t=>`oli eile ${t}`,seenDays:n=>`oli ${n} p tagasi`,seenDate:d=>`oli ${d}`,
  askTitle:"Kas see on sinu vanem?",askText:(n,e)=>`${n||"Keegi"} (${e}) soovib näha sinu tulemusi.`,yes:"Jah",no:"Ei",
  helpBtn:"Palu abi",helpSent:"Palve saadetud",helpSec:"Abipalved",helpNone:"Palveid pole.",helpOpen:"Ava",helpDone:"Arutatud",helpDoneMark:"arutatud",
  accountSec:"Konto",accountRow:"Konto ja roll",roleNow:r=>`Roll: ${r==="student"?"õpilane":"lapsevanem"}`,roleS:"õpilane",roleP:"lapsevanem",
  changeRole:"Muuda rolli",changeOnce:"Rolli saab muuta ainult üks kord.",roleChangedAlready:"Rolli on juba muudetud, teist korda ei saa.",deleteAcc:"Kustuta konto",
  roleAsk:r=>`Kas soovid muuta rolli: «${r}»?`,
  roleWarn:r=>`Rolli «${r}» saab muuta ainult üks kord: tagasi sellel kontol muuta ei saa. Kõik seaded kustutatakse, samuti ${r==="lapsevanem"?"kõik tööd, ajalugu ja saavutused":"kõik ühendatud õpilased"}.`,
  phraseRole:"muuda rolli",phraseDel:"kustuta konto",typePhrase:p=>`Kinnitamiseks kirjuta: ${p}`,
  delWarn:"Konto kustutatakse koos kõigi tööde, ajaloo ja ühendustega. Taastada ei saa. Hiljem saab uuesti sisse logida uue kasutajana.",
  cancel:"Loobu",doChange:"Muuda rolli",doDelete:"Kustuta"},
 en:{family:"Family",main:"main parent",second:"second parent",inviteParent:"Invite a parent",inviteChild:"Invite a student",inviteSecond:"Invite a second parent",
  emailPh:"Email",invite:"Invite",invited:"invitation sent",cancelInv:"Cancel",waiting:"waiting for the student to confirm",
  okInvited:e=>`Invitation sent to ${e}.`,okRequested:"Request sent. The student will confirm it on their next visit.",okLinked:"Connected.",
  eNotStudent:"This email belongs to a parent account.",eNotParentAcc:"This email belongs to a student account.",eBadEmail:"Check the email.",eNotMain:"Only the main parent can invite.",
  leave:"Leave",removeP:"Disconnect",online:"online",seenToday:t=>`seen today at ${t}`,seenYday:t=>`seen yesterday at ${t}`,seenDays:n=>`seen ${n} days ago`,seenDate:d=>`seen ${d}`,
  askTitle:"Is this your parent?",askText:(n,e)=>`${n||"Someone"} (${e}) wants to see your results.`,yes:"Yes",no:"No",
  helpBtn:"Ask for help",helpSent:"Request sent",helpSec:"Help requests",helpNone:"No requests.",helpOpen:"Open",helpDone:"Done",helpDoneMark:"done",
  accountSec:"Account",accountRow:"Account and role",roleNow:r=>`Role: ${r==="student"?"student":"parent"}`,roleS:"student",roleP:"parent",
  changeRole:"Change role",changeOnce:"The role can be changed only once.",roleChangedAlready:"The role was already changed; it can't be changed again.",deleteAcc:"Delete account",
  roleAsk:r=>`Change your role to “${r}”?`,
  roleWarn:r=>`You can change the role to “${r}” only once: there is no way back on this account. All settings will be deleted, as well as ${r==="parent"?"all tests, history and achievements":"all connected students"}.`,
  phraseRole:"change role",phraseDel:"delete account",typePhrase:p=>`To confirm, type: ${p}`,
  delWarn:"The account will be deleted with all tests, history and connections. It can't be restored. You can sign in again later as a new user.",
  cancel:"Cancel",doChange:"Change role",doDelete:"Delete"}
};
Object.keys(UI).forEach(l=>Object.assign(UI[l],UI3[l]));

const UI4={
 ru:{subj:"Математика",gradeOne:n=>`Математика, ${n} класс`,gradeN:n=>`${n} класс`,mine:"мой",gradesPick:"Какие классы тренировать",
  yearLbl:"Учебный год",gradeLbl:"Класс",weekHide:"Скрыть темы",weekShow:n=>`Темы недели · ${n}`,
  progGrade:"Класс",progMine:"Программа подобрана по классу из профиля. Можно выбрать другой класс и отметить темы, по которым хочется заниматься.",
  progOther:n=>`Выбран не свой класс: работы будут по темам ${n} класса.`,progTopics:"Темы для занятий",noTopicsGrade:"Темы этого класса пока не добавлены.",
  pickedN:n=>`Выбрано тем: ${n}`,trainPicked:"Работа по выбранным темам",
  heatExplain:"Каждый квадрат — один день, столбец — неделя (сверху вниз с понедельника по воскресенье), последний столбец — эта неделя. Чем ярче цвет, тем больше работ решено в этот день.",
  resetNew:"Сбросить",newN:n=>`новых: ${n}`},
 et:{subj:"Matemaatika",gradeOne:n=>`Matemaatika, ${n}. klass`,gradeN:n=>`${n}. klass`,mine:"minu",gradesPick:"Milliseid klasse harjutada",
  yearLbl:"Õppeaasta",gradeLbl:"Klass",weekHide:"Peida teemad",weekShow:n=>`Nädala teemad · ${n}`,
  progGrade:"Klass",progMine:"Õppekava on valitud profiilis märgitud klassi järgi. Võid valida teise klassi ja märkida teemad, mida harjutada.",
  progOther:n=>`Valitud on teine klass: tööd tulevad ${n}. klassi teemadest.`,progTopics:"Harjutatavad teemad",noTopicsGrade:"Selle klassi teemasid veel pole.",
  pickedN:n=>`Valitud teemasid: ${n}`,trainPicked:"Töö valitud teemadest",
  heatExplain:"Iga ruut on üks päev, veerg on nädal (ülevalt alla esmaspäevast pühapäevani), viimane veerg on see nädal. Mida eredam värv, seda rohkem töid sel päeval lahendati.",
  resetNew:"Lähtesta",newN:n=>`uusi: ${n}`},
 en:{subj:"Maths",gradeOne:n=>`Maths, Grade ${n}`,gradeN:n=>`Grade ${n}`,mine:"mine",gradesPick:"Grades to practise",
  yearLbl:"School year",gradeLbl:"Grade",weekHide:"Hide topics",weekShow:n=>`Topics this week · ${n}`,
  progGrade:"Grade",progMine:"The curriculum follows the grade in your profile. You can pick another grade and tick the topics you want to practise.",
  progOther:n=>`Not your grade: tests will use Grade ${n} topics.`,progTopics:"Topics to practise",noTopicsGrade:"Topics for this grade aren't added yet.",
  pickedN:n=>`Topics selected: ${n}`,trainPicked:"Test on selected topics",
  heatExplain:"Each square is one day, each column a week (Monday to Sunday, top to bottom); the last column is this week. The brighter the colour, the more tests were done that day.",
  resetNew:"Reset",newN:n=>`new: ${n}`}
};
Object.keys(UI).forEach(l=>Object.assign(UI[l],UI4[l]));
const LETTERS={ru:"абвгдежзиклм",et:"abcdefghijkl",en:"abcdefghijkl"};
const ICON_BACK=`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>`;
const ICON_PLAY=`<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M8 5.5v13l10-6.5z"/></svg>`;
const ICON_PAUSE=`<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>`;
const ICON_LAP=`<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 21V4M6 4h11l-2.5 4L17 12H6"/></svg>`;
const ICON_RESET=`<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/></svg>`;
const ICON_CHEV=`<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>`;

function todayStr(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function parseDate(s){const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d)}
function fmtTime(sec){sec=Math.max(0,Math.round(sec));const m=Math.floor(sec/60),s=sec%60;return m+":"+String(s).padStart(2,"0")}
function loc(){return st.lang==="en"?"en-GB":st.lang}
function fmtD(d){return d.toLocaleDateString(loc())}
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");

const CFG=window.MATH_CONFIG||{};
const sb=(window.supabase&&CFG.url)?window.supabase.createClient(CFG.url,CFG.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}):null;
const LS={get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
let st=Object.assign({lang:"ru",level:"n",type:"theme",date:todayStr(),timer:"off",limit:45,theme:"system",name:"",view:"main",
  test:null,meta:null,answers:{},checked:false,open:{},confirming:false,elapsed:0,blockTime:{},running:false,timeUp:false,
  history:[],seen:[],train:null,grade:7,year:"2026/27",grades:[7],weekOpen:true,menuOpen:false,progGrade:null,progPick:null,laps:[],lapStart:0,rv:null,faqOpen:null,limitTouched:false},LS.get("math7.prefs")||{});
let U=UI[st.lang];let activeBlock=null;
let USER=null,PROFILE=null,authState="loading",sync="ok",authMsg="",authErr=false,linkMsg="",linkErr=false;
let parents=[],kids=[],kid=null,kidHist=[],kidParents=[],kidHelp=[],myInvites=[],modal=null,helpSent={};

function savePrefs(){LS.set("math7.prefs",{lang:st.lang,theme:st.theme})}
const WORK_KEYS=["lastCid","meta","answers","checked","open","elapsed","blockTime","timeUp","laps","lapStart","timer","limit","type","date","limitTouched","confirming"];
let workT=null;
function saveWork(){if(!USER||!PROFILE||PROFILE.role!=="student")return;clearTimeout(workT);workT=setTimeout(()=>{const o={};WORK_KEYS.forEach(k=>o[k]=st[k]);LS.set("math7.work."+USER.id,o)},300)}
function restoreWork(){const o=LS.get("math7.work."+USER.id);if(o&&o.meta){Object.assign(st,o);st.test=buildFrom(st.meta);st.running=!st.checked&&st.timer==="limit"}}

async function initAuth(){
  if(!sb){authState="out";authErr=true;authMsg="Supabase config missing";renderAll();return}
  sb.auth.onAuthStateChange((ev,session)=>{setTimeout(()=>onSession(session),0)});
  const {data}=await sb.auth.getSession();
  onSession(data.session);
}
let sessUid;
async function onSession(session){
  const u=session?session.user:null;const uid=u?u.id:null;
  if(uid===sessUid)return;sessUid=uid;USER=u;
  if(!u){authState="out";PROFILE=null;st.history=[];st.test=null;st.meta=null;renderAll();return}
  authState="loading";renderAll();
  const meta=u.user_metadata||{};
  const {data,error}=await sb.rpc("bootstrap",{p_name:meta.full_name||meta.name||""});
  if(error){const cached=LS.get("math7.profile."+u.id);if(cached){sync="offline";applyProfile(cached);return}authState="out";authErr=true;authMsg=U.authErr+error.message;renderAll();return}
  if(!data||!data.id){authState="role";renderAll();return}
  applyProfile(data);
}
function applyProfile(p){
  PROFILE=p;authState="in";LS.set("math7.profile."+p.id,p);
  const s=p.settings||{};st.name=p.name||"";["level","theme","lang","grade","year","grades"].forEach(k=>{if(s[k]!=null)st[k]=s[k]});st.seen=p.seen_oly||[];
  U=UI[st.lang];applyTheme();savePrefs();
  if(p.role==="student"){st.view="main";restoreWork();loadHistory();loadParents()}
  else{st.view="kids";loadKids()}
  loadInvites();
  renderAll();
}
async function createProfile(role){
  const nameEl=document.getElementById("f-rname");
  const meta=USER.user_metadata||{};
  const name=((nameEl&&nameEl.value)||meta.full_name||meta.name||"").trim();
  const {data,error}=await sb.rpc("create_profile",{p_role:role,p_name:name,p_settings:{level:st.level,theme:st.theme,lang:st.lang}});
  if(error){authErr=true;authMsg=U.authErr+error.message;renderMain();return}
  applyProfile(data);
}
let profT=null;
function saveProfile(){
  savePrefs();if(!PROFILE||!sb)return;
  clearTimeout(profT);
  profT=setTimeout(async()=>{
    const upd={name:st.name,settings:{level:st.level,theme:st.theme,lang:st.lang,grade:st.grade,year:st.year,grades:st.grades},seen_oly:st.seen.slice(-200)};
    Object.assign(PROFILE,upd);LS.set("math7.profile."+PROFILE.id,PROFILE);
    await sb.from("profiles").update(upd).eq("id",PROFILE.id);
  },600);
}
function qKey(){return "math7.queue."+USER.id}
async function loadHistory(){
  const q=LS.get(qKey())||[];
  const {data,error}=await sb.from("results").select("data").eq("student_id",USER.id).order("ts",{ascending:false}).limit(1000);
  if(error){sync="offline";st.history=LS.get("math7.hist."+USER.id)||[]}
  else{st.history=data.map(r=>r.data);LS.set("math7.hist."+USER.id,st.history.slice(0,300))}
  const ids=new Set(st.history.map(r=>r.cid));q.forEach(r=>{if(!ids.has(r.cid))st.history.unshift(r)});
  flushQueue();refreshIf();
}
async function saveResult(r){
  r.cid=Date.now().toString(36)+Math.random().toString(36).slice(2,8);st.lastCid=r.cid;
  st.seen=Array.from(new Set(st.seen.concat(r.oly||[]))).slice(-200);
  st.history=[r].concat(st.history);
  const q=LS.get(qKey())||[];q.push(r);LS.set(qKey(),q);
  saveProfile();await flushQueue();
}
let flushing=false;
async function flushQueue(){
  if(!USER||!sb||flushing)return;flushing=true;
  let q=LS.get(qKey())||[];
  while(q.length){
    const r=q[0];
    const {error}=await sb.from("results").upsert({student_id:USER.id,client_id:r.cid,ts:new Date(r.ts).toISOString(),data:r},{onConflict:"student_id,client_id",ignoreDuplicates:true});
    if(error){sync="offline";break}
    q.shift();LS.set(qKey(),q);
  }
  if(!q.length){sync="ok";LS.set("math7.hist."+USER.id,st.history.slice(0,300))}
  flushing=false;refreshIf();
}
window.addEventListener("online",flushQueue);
async function loadParents(){if(!sb)return;const {data}=await sb.rpc("my_parents");parents=data||[];
  const pend=parents.find(p=>p.status==="pending");if(pend&&!modal){modal={type:"ask",p:pend};renderModal()}refreshIf()}
async function loadKids(){if(!sb)return;const {data}=await sb.rpc("my_students");kids=data||[];if(kid){const k=kids.find(x=>x.student_id===kid.student_id);if(k)kid=k}refreshIf()}
async function loadInvites(){if(!sb||!USER)return;const {data}=await sb.from("invites").select("id,email,role,student_id,kind,invited_by").order("created_at");myInvites=data||[];refreshIf()}
async function loadKidExtra(id){
  const [a,b]=await Promise.all([sb.rpc("student_parents",{p_student:id}),sb.from("help").select("*").eq("student_id",id).order("created_at",{ascending:false}).limit(100)]);
  kidParents=a.data||[];kidHelp=b.data||[];refreshIf();
}
async function openKid(id){
  kid=kids.find(k=>k.student_id===id);if(!kid)return;kidParents=[];kidHelp=[];
  const {data}=await sb.from("results").select("data").eq("student_id",id).order("ts",{ascending:false}).limit(1000);
  kidHist=(data||[]).map(r=>r.data);
  const pr=await sb.from("profiles").select("settings").eq("id",id).maybeSingle();kid.level=pr.data&&pr.data.settings&&pr.data.settings.level;
  st.view="kid";renderMain();window.scrollTo({top:0});loadKidExtra(id);
}
function refreshIf(){if(["profile","kids","kid","account","me"].includes(st.view)&&!document.activeElement.matches("input.txt"))renderMain()}
function sendMail(){if(!sb)return;const names=[...new Set(["send-mail",CFG.mailFn].filter(Boolean))];
  (async()=>{for(const n of names){try{const {error}=await sb.functions.invoke(n,{body:{}});if(!error)return}catch(e){}}})()}
function touch(){if(sb&&PROFILE&&document.visibilityState==="visible")sb.rpc("touch").then(()=>{},()=>{})}
setInterval(()=>{touch();if(PROFILE){if(PROFILE.role==="student")loadParents();else{loadKids();if(kid&&st.view==="kid")loadKidExtra(kid.student_id)}}},5*60*1000);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")touch()});
function errText(m){m=String(m||"");if(/not_student/.test(m))return U.eNotStudent;if(/not_parent_account/.test(m))return U.eNotParentAcc;if(/bad_email/.test(m))return U.eBadEmail;if(/not_main/.test(m))return U.eNotMain;return U.authErr+m}
function seenTxt(ts){if(!ts)return "";const d=new Date(ts),now=new Date();const diff=(now-d)/1000;if(diff<180)return U.online;
  const t=d.toLocaleTimeString(loc(),{hour:"2-digit",minute:"2-digit"});const day=x=>{const y=new Date(x);y.setHours(0,0,0,0);return y.getTime()};
  const dd=Math.round((day(now)-day(d))/864e5);if(dd===0)return U.seenToday(t);if(dd===1)return U.seenYday(t);if(dd<7)return U.seenDays(dd);return U.seenDate(fmtD(d))}

function applyTheme(){const r=document.documentElement;if(st.theme==="system")r.removeAttribute("data-theme");else r.setAttribute("data-theme",st.theme)}

/* ---------- работа ---------- */
function buildFrom(meta,lang){G.setLang(lang||st.lang);return G.buildTest({date:parseDate(meta.date),level:meta.level,type:meta.type==="train"?"theme":meta.type,lang:lang||st.lang,seed:meta.seed,seenOly:meta.seen||[],only:meta.only||undefined})}
function newTest(){
  const seed=(Math.random()*4294967295)>>>0;
  const only=st.train;st.train=null;
  st.meta={seed,level:st.level,type:only?"train":st.type,date:st.date,seen:st.seen.slice(),only:only||null};
  st.test=buildFrom(st.meta);st.answers={};st.checked=false;st.open={};st.confirming=false;st.elapsed=0;st.blockTime={};st.timeUp=false;st.laps=[];st.lapStart=0;
  if(st.timer==="limit"&&!st.limitTouched)st.limit=st.test.minutes;
  st.running=st.timer!=="off";st.view="main";enter("test");
  renderAll();window.scrollTo({top:0});
}
function totals(test,answers){
  let got=0,max=0,filled=0,count=0;const per=[],topics={},olyOk=[];
  if(!test)return {got,max,filled,count,per,topics,olyOk};
  test.blocks.forEach((b,bi)=>{let g=0,m=0;b.items.forEach((it,ii)=>{const k=bi+"-"+ii,v=answers[k];m+=b.pts;count++;
    if(G.isFilled(it,v)||it.ans.type==="self"&&String(answers[k+"t"]||"").trim())filled++;
    const s=G.score(it,v,b.pts);g+=s;topics[b.topic]=topics[b.topic]||[0,0];topics[b.topic][0]+=s;topics[b.topic][1]+=b.pts;
    if(it.olyId&&s===b.pts)olyOk.push(it.olyId)});got+=g;max+=m;per.push({g,m})});
  return {got,max,filled,count,per,topics,olyOk};
}
function finish(){
  if(st.laps.length&&st.elapsed>st.lapStart){st.laps.push(st.elapsed-st.lapStart);st.lapStart=st.elapsed}
  st.checked=true;st.confirming=false;st.running=false;
  const T=totals(st.test,st.answers);
  saveResult({ts:Date.now(),asOf:st.meta.date,level:st.meta.level,type:st.meta.type,lang:st.lang,score:T.got,max:T.max,items:T.count,
    timeSec:st.timer!=="off"?st.elapsed:0,limitSec:st.timer==="limit"?st.limit*60:0,topics:T.topics,oly:st.test.olyIds,olyOk:T.olyOk,
    meta:{seed:st.meta.seed,date:st.meta.date,level:st.meta.level,type:st.meta.type,seen:st.meta.seen,only:st.meta.only||null},answers:st.answers,blockTime:st.blockTime,laps:st.laps.slice()});
  enter("score");renderAll();window.scrollTo({top:0,behavior:"smooth"});
}

/* ---------- общие куски ---------- */
function seg(name,vals,cur,labels,cls){return `<div class="seg${cls?" "+cls:""}" role="group" data-seg="${name}"><span class="thumb" aria-hidden="true"></span>${vals.map(v=>`<button type="button" data-set="${name}" data-v="${v}" aria-pressed="${cur===v}">${labels[v]}</button>`).join("")}</div>`}
function posInfo(){
  const pos=G.schoolPos(parseDate(st.date));let txt;
  if(pos.before)txt=U.before;else if(pos.after&&pos.weeks>=35)txt=U.after;
  else txt=`${U.week} ${Math.min(35,pos.weeks+(pos.inBreak?0:1))} ${U.of} 35 · ${G.PERIODS[pos.period].name} ${U.period}${pos.inBreak?" · "+U.brk:""}`;
  return {pos,txt,cur:G.currentTopics(pos).map(t=>G.tr(t.name)),curIds:G.currentTopics(pos).map(t=>t.id)};
}
const TCOL={rat:'coral',dist:'teal',pow:'yellow',std:'lilac',pct:'sky',eq:'green',word:'coral',func:'teal',poly:'yellow',prism:'lilac',stat:'sky',r6:'green',oly:'lilac',proof:'sky'};
function tc(id){return 't-'+(TCOL[id]||'sky')}

const GRADES=[5,6,7,8,9],HAS_TOPICS=[7];
function gradesTitle(){
  const p=GRADES.filter(n=>st.grades.includes(n));
  if(!p.length)return U.subj;
  if(p.length===1)return U.gradeOne(p[0]);
  const runs=[];p.forEach(n=>{const r=runs[runs.length-1];if(r&&n===r[1]+1)r[1]=n;else runs.push([n,n])});
  const parts=[];runs.forEach(r=>{if(r[1]-r[0]>=2)parts.push(r[0]+"–"+r[1]);else for(let k=r[0];k<=r[1];k++)parts.push(String(k))});
  return U.subj+" "+parts.join(", ");
}
const ICON_DOWN=`<svg class="chev-d" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;
const ICON_EXIT=`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l4-4-4-4M14 12H4"/></svg>`;
function progTopicsFor(g){return HAS_TOPICS.includes(g)?G.TOPICS.filter(t=>t.id!=="r6"):[]}
function progDefaultPick(g){const P=posInfo();const ts=progTopicsFor(g);const own=g===Number(st.grade);
  const o={};ts.forEach(t=>{o[t.id]=own?t.start<P.pos.weeks||G.currentTopics(P.pos).some(c=>c.id===t.id):true});return o}
function selectHtml(id,vals,cur,label){return `<label class="fld"><span>${label}</span><span class="selwrap"><select class="txt sel" id="${id}">${vals.map(v=>`<option value="${v}"${String(v)===String(cur)?" selected":""}>${v}</option>`).join("")}</select>${ICON_DOWN}</span></label>`}
function seenKey(){return "math7.seen."+(USER&&USER.id)+"."+(kid&&kid.student_id)}
function kidSeen(){return LS.get(seenKey())||{works:0,help:0}}
function tagsHtml(){const P=posInfo();return `<span class="chip">${esc(P.txt)}</span>${P.cur.map((n,i)=>`<span class="chip now ${tc(P.curIds[i])}">${U.now}: ${esc(n)}</span>`).join("")}`}
function topicName(id){const t=G.TOPICS.find(x=>x.id===id);if(t)return G.tr(t.name);if(id==="oly")return U.oly;if(id==="proof")return U.proofs;return id}
function subhead(title,backTo){return `<div class="subhead"><button class="back" type="button" data-go="${backTo}" aria-label="${esc(U.back)}">${ICON_BACK}</button><h2>${esc(title)}</h2></div>`}


/* ---------- движение (токены — в index.html, правила — «Токены движения») ---------- */
const reduced=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const segPos={};
function placeThumbs(){
  document.querySelectorAll(".seg").forEach(sg=>{
    const th=sg.querySelector(".thumb"),on=sg.querySelector('button[aria-pressed="true"]');if(!th)return;
    if(!on){th.style.opacity="0";return}
    const key=sg.dataset.seg+"|"+(sg.closest("[id]")||{}).id;const x=on.offsetLeft,w=on.offsetWidth;
    const prev=segPos[key];segPos[key]=x;
    th.style.width=w+"px";th.style.opacity="1";
    if(prev!=null&&prev!==x&&!reduced()){th.style.transition="none";th.style.transform=`translateX(${prev}px)`;th.getBoundingClientRect();th.style.transition="";}
    th.style.transform=`translateX(${x}px)`;
  });
}
let enterNext=null;
function enter(kind){enterNext=kind}
function runEnter(){
  const k=enterNext;enterNext=null;if(!k||reduced())return;
  const m=document.getElementById("main");
  if(k==="screen"){m.classList.remove("in-screen");m.getBoundingClientRect();m.classList.add("in-screen")}
  if(k==="test"){const els=[...m.querySelectorAll(".sheet .sheet-head,.sheet .hint,.sheet .task")].slice(0,8);
    els.forEach((el,i)=>{el.style.setProperty("--d",(i*50)+"ms");el.classList.add("in-up")})}
  if(k==="profile"){m.querySelectorAll(".trow .meter i").forEach((el,i)=>{el.style.setProperty("--d",(i*50)+"ms");el.classList.add("in-fill")})}
  if(k==="score"){const b=m.querySelector(".score .big");if(!b)return;const [g,mx]=b.textContent.split("/").map(s=>parseFloat(s));if(!(g>0))return;
    const t0=performance.now(),D=420;const step=t=>{const p=Math.min(1,(t-t0)/D),e=1-Math.pow(1-p,3);b.textContent=`${Math.round(g*e)} / ${mx}`;if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}
}
/* ---------- лист с заданиями ---------- */
function inputFor(it,k,ctx){
  const v=ctx.answers[k],dis=ctx.checked?"disabled":"";const a=it.ans;
  if(a.type==="choice")return `<div class="opts">${it.opts.map(([key,l])=>`<button class="opt" type="button" data-k="${k}" data-opt="${key}" aria-pressed="${v===key}" ${dis}>${l}</button>`).join("")}</div>`;
  if(a.type==="std"){const vv=Array.isArray(v)?v:["",""];return `<span class="ansline"><input class="ans small" id="in-${k}-0" data-k="${k}" data-i="0" value="${esc(vv[0])}" aria-label="a" autocomplete="off" ${dis}> <span class="eq">· 10^</span> <input class="ans small" id="in-${k}-1" data-k="${k}" data-i="1" value="${esc(vv[1])}" aria-label="n" autocomplete="off" ${dis}></span>`}
  if(a.type==="self")return `<textarea class="proof" id="in-${k}" data-k="${k}" placeholder="${esc(U.yourProof)}" ${dis}>${esc(ctx.answers[k+"t"]||"")}</textarea>`;
  return `<span class="ansline">${it.pre?`<span class="eq">${it.pre}</span>`:""}<input class="${a.type==="set"?"ans wide":"ans"}" id="in-${k}" data-k="${k}" value="${esc(v)}" autocomplete="off" ${dis}>${it.unit?`<span class="eq">${it.unit}</span>`:""}</span>`;
}
function sheetHtml(ctx){
  const t=ctx.test,T=totals(t,ctx.answers),m=ctx.meta;
  const topics=(m.only&&m.only.length?m.only:t.cur).map(topicName).join(" · ");
  const timed=ctx.timeSec>0;
  let h=`<section class="sheet"><div class="sheet-head"><div><h2>${esc(topics)}</h2><p class="sub">${U.ty[m.type]} · ${LV[m.level]} · ${fmtD(parseDate(m.date))} · ${U.maxpts} ${T.max} ${U.pts}</p></div>`;
  h+=`<p class="hint">${U.hint}</p>`;
  if(ctx.checked){
    const pct=T.max?Math.round(T.got/T.max*100):0;
    h+=`<div class="score" aria-live="polite"><span class="big">${T.got} / ${T.max}</span><div class="meter"><i style="width:${pct}%"></i></div>${ctx.timeUp?`<span class="note">${U.timeUp}</span>`:""}
      <ul>${T.per.map((p,i)=>`<li>${U.task} ${i+1}${t.blocks[i].star?"*":""}: <b>${p.g}/${p.m}</b>${timed&&ctx.blockTime[i]?` · ${fmtTime(ctx.blockTime[i])}`:""}</li>`).join("")}${timed?`<li>${U.time}: <b>${fmtTime(ctx.timeSec)}</b></li>`:""}</ul>${ctx.laps&&ctx.laps.length?`<ul><li>${U.laps}:</li>${ctx.laps.map((s,i)=>`<li>${i+1} — <b>${fmtTime(s)}</b></li>`).join("")}</ul>`:""}</div>`;
  }
  t.blocks.forEach((b,bi)=>{
    const p=T.per[bi];
    h+=`<div class="task" data-block="${bi}"><div class="task-h"><h3>${bi+1}${b.star?'<span class="star">*</span>':""}. ${esc(b.title)}</h3><span class="pts">${b.items.length>1?U.ptsEach(b.pts):U.ptsOne(b.pts)}</span>${ctx.checked&&timed&&ctx.blockTime[bi]?`<span class="tm">${fmtTime(ctx.blockTime[bi])}</span>`:""}${ctx.checked?`<span class="got">${p.g}/${p.m}</span>`:""}</div>`;
    if(b.intro)h+=`<div class="intro">${b.intro}</div>`;
    h+=`<div class="items">`;
    b.items.forEach((it,ii)=>{
      const k=bi+"-"+ii,v=ctx.answers[k];const sc=G.score(it,v,b.pts),filled=G.isFilled(it,v),self=it.ans.type==="self";
      let cls="item";if(ctx.checked){if(self)cls+=v==="2"?" ok":v==="1"?" part":v==="0"?" bad":"";else cls+=sc===b.pts?" ok":" bad"}
      const lbl=b.items.length>1?`<span class="lbl">${LETTERS[st.lang][ii]})</span>`:"";
      const plainQ=it.q.replace(/<[^>]+>/g,"");const isText=/<svg/.test(it.q)||(/[a-zA-Zа-яА-ЯõäöüÕÄÖÜ]{3,}/.test(plainQ)&&plainQ.length>28);
      const mark=ctx.checked&&!self?`<span class="mark">${sc===b.pts?"✓":"✗"}</span>`:"";
      let row=`<div class="row">${lbl}<span class="expr${isText?" text":""}">${it.q}${!isText&&!it.pre&&it.ans.type==="num"?' <span class="eq">=</span>':""}</span>${self?"":inputFor(it,k,ctx)}${mark}</div>`;
      if(self)row+=inputFor(it,k,ctx);
      let res="";
      if(ctx.checked){
        const open=!!ctx.open[k];
        if(self)res=`<div class="exp"><p><b>${U.model}:</b></p>${it.exp}</div><div class="selfgrade"><span>${U.selfQ}</span>${U.self.map((l,i)=>`<button class="opt" type="button" data-k="${k}" data-self="${i}" aria-pressed="${v===String(i)}" ${ctx.readonly?"disabled":""}>${l}</button>`).join("")}</div>`;
        else res=`<div class="res">${sc===b.pts?`<span class="right">${U.correctPts(b.pts)}</span>`:`<span class="right">${filled?U.right:U.noAns}: <b>${it.show}</b></span>`}<button class="why" type="button" data-why="${k}" aria-expanded="${open}">${open?U.hide:U.why}</button></div>${open?`<div class="exp">${it.exp}${it.alt?`<div class="alt"><b>${U.alt}.</b> ${it.alt}</div>`:""}</div>`:""}`;
      }
      if(ctx.checked&&ctx.helpCid){const hk=ctx.helpCid+"|"+k;const ttl=`${U.task} ${bi+1}${b.items.length>1?" "+LETTERS[st.lang][ii]+")":""} · ${b.title}`.replace(/<[^>]+>/g,"");
        res+=`<div class="helprow">${helpSent[hk]?`<span class="sub">${U.helpSent}</span>`:`<button class="btn ghost sm" type="button" data-act="help" data-cid="${ctx.helpCid}" data-hk="${k}" data-title="${esc(ttl)}">${U.helpBtn}</button>`}</div>`}
      h+=`<div class="${cls}${ctx.focus===k?" focus":""}" id="it-${k}">${row}${res}</div>`;
    });
    h+=`</div></div>`;
  });
  return h+`</section>`;
}

/* ---------- экраны ---------- */
function weekHtml(){const P=posInfo();const n=P.cur.length;
  return `<section class="week" id="week"><div class="week-h"><span class="week-t">${esc(P.txt)}</span>${n?`<button class="pill-btn" type="button" data-act="weektoggle" aria-expanded="${st.weekOpen}">${st.weekOpen?U.weekHide:U.weekShow(n)}${ICON_DOWN}</button>`:""}</div>
  ${st.weekOpen&&n?`<div class="tags" id="tags">${P.cur.map((nm,i)=>`<span class="chip now ${tc(P.curIds[i])}" style="--d:${i*50}ms">${U.now}: ${esc(nm)}</span>`).join("")}</div>`:""}</section>`}
function viewMain(){
  let h=`<section class="head">
    <div class="ctrls">
      <label class="ctrl"><span>${U.date}</span><input type="date" id="f-date" value="${st.date}"></label>
      <div class="ctrl"><span>${U.timer}</span><div class="tline">${seg("timer",["off","watch","limit"],st.timer,U.tm)}<input class="num" type="number" id="f-limit" min="5" max="240" step="5" value="${st.limit}" aria-label="${U.min}" ${st.timer==="limit"?"":"disabled"}><span class="unit${st.timer==="limit"?"":" off"}">${U.min}</span></div></div>
      <div class="ctrl full"><span>${U.type}</span><div class="tline">${seg("type",["theme","period"],st.type,U.ty)}</div></div>
    </div>
    <div class="row2"><button class="btn" type="button" data-act="new">${U.create}</button></div>
  </section>${weekHtml()}`;
  if(!st.test)h+=`<p class="empty">${U.noTest}</p>`;
  else h+=sheetHtml({helpCid:st.checked&&parents.some(p=>p.status==="active")?st.lastCid:null,test:st.test,meta:st.meta,answers:st.answers,checked:st.checked,open:st.open,blockTime:st.blockTime,timeSec:st.timer!=="off"?st.elapsed:0,timeUp:st.timeUp,laps:st.laps});
  return h;
}
function viewSettings(){
  return `<div class="screen">${subhead(U.settings,"main")}
    <div class="sec">${U.secWork}</div>
    <div class="group"><div class="srow"><span class="k">${U.level}</span>${seg("level",["n","a","o"],st.level,LV,"sm")}</div>
      <button class="srow link" type="button" data-go="faq" data-faq="0"><span>${U.levelsWhat}</span>${ICON_CHEV}</button></div>
    <div class="sec">${U.secLook}</div>
    <div class="group"><div class="srow"><span class="k">${U.theme}</span>${seg("theme",["system","light","dark"],st.theme,U.th,"sm")}</div></div>
    <div class="sec">${U.secHelp}</div>
    <div class="group"><button class="srow link" type="button" data-go="faq"><span>${U.faq}</span>${ICON_CHEV}</button></div>
    <div class="sec">${U.accountSec}</div>
    <div class="group"><button class="srow link" type="button" data-go="account"><span>${U.accountRow}</span>${ICON_CHEV}</button></div>
  </div>`;
}
function viewFaq(){
  return `<div class="screen">${subhead(U.faq,st.faqBack||"settings")}<div class="group faq" style="margin-top:14px">${U.faqItems.map(([q,a],i)=>`<details ${st.faqOpen===i?"open":""}><summary>${esc(q)}</summary><div class="a">${a}</div></details>`).join("")}</div></div>`;
}
function viewProg(){
  const g=st.progGrade||Number(st.grade)||7;const P=posInfo();const cur=new Set(G.currentTopics(P.pos).map(t=>t.id));
  if(!st.progPick||st.progPick.g!==g)st.progPick={g,pick:progDefaultPick(g)};
  const ts=progTopicsFor(g);const per=w=>G.PERIODS.find(p=>w>=p.w0&&w<p.w0+p.weeks);
  const own=g===Number(st.grade);
  let h=`<div class="screen">${subhead(U.prog,st.progBack||"main")}
  <div class="group" style="margin-top:12px"><div class="srow"><span class="k">${U.progGrade}</span>${seg("progGrade",GRADES.map(String),String(g),Object.fromEntries(GRADES.map(n=>[String(n),n===Number(st.grade)?`${n} · ${U.mine}`:String(n)])),"sm")}</div>
  <div class="srow"><span class="sub">${own?U.progMine:U.progOther(g)}</span></div></div>`;
  if(!ts.length)return h+`<div class="group" style="margin-top:16px"><div class="srow"><span class="sub">${U.noTopicsGrade}</span></div></div></div>`;
  h+=`<div class="sec sec-row"><span>${U.progTopics}</span><span class="sub">${esc(P.txt)}</span></div><div class="group"><ul class="prog">${ts.map(t=>{
    const done=t.start<P.pos.weeks,now=own&&cur.has(t.id),p=per(t.start);const on=!!st.progPick.pick[t.id];
    return `<li class="${tc(t.id)}"><label class="pick"><input type="checkbox" data-pick="${t.id}"${on?" checked":""}><span class="wk">${t.start+1} ${U.wk}${p?" · "+p.name:""}</span><span>${esc(G.tr(t.name))}</span></label><span class="st ${now?"now":own&&done?"done":""}">${now?U.stNow:own&&done?U.stDone:U.stNext}</span></li>`}).join("")}</ul></div></div>`;
  return h;
}

/* ---------- профиль ---------- */
function dayKey(d){return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
function heatSvg(hist){
  const counts={};hist.forEach(r=>{const k=dayKey(new Date(r.ts));counts[k]=(counts[k]||0)+1});
  const today=new Date();today.setHours(0,0,0,0);
  const dow=(today.getDay()+6)%7;
  const start=new Date(today);start.setDate(today.getDate()-dow-7*11);
  const cell=18,gap=4,left=26,top=16,W=left+12*(cell+gap),H=top+7*(cell+gap);
  let s=`<svg class="heat" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(U.act)}">`;
  const dn=st.lang==="en"?["Mon","","Wed","","Fri","",""]:st.lang==="et"?["E","","K","","R","",""]:["Пн","","Ср","","Пт","",""];
  dn.forEach((t,i)=>{if(t)s+=`<text x="0" y="${top+i*(cell+gap)+13}">${t}</text>`});
  for(let w=0;w<12;w++){
    for(let d=0;d<7;d++){const day=new Date(start);day.setDate(start.getDate()+w*7+d);if(day>today)continue;
      const c=counts[dayKey(day)]||0;const fill=c===0?"var(--h0)":c===1?"var(--h1)":c===2?"var(--h2)":"var(--h3)";
      s+=`<rect x="${left+w*(cell+gap)}" y="${top+d*(cell+gap)}" width="${cell}" height="${cell}" rx="3" fill="${fill}"><title>${fmtD(day)}: ${c}</title></rect>`}
    const first=new Date(start);first.setDate(start.getDate()+w*7);
    if(first.getDate()<=7)s+=`<text x="${left+w*(cell+gap)}" y="9">${first.toLocaleDateString(loc(),{month:"short"})}</text>`}
  return s+`</svg><div class="legend"><span>${U.less}</span><i style="background:var(--h0)"></i><i style="background:var(--h1)"></i><i style="background:var(--h2)"></i><i style="background:var(--h3)"></i><span>${U.more}</span></div><p class="sub heat-x">${U.heatExplain}</p>`;
}
function trendSvg(hist){
  const pts=hist.slice(0,30).reverse();
  if(pts.length<2)return `<p class="sub" style="margin:0">${U.trendNone}</p>`;
  const W=560,H=180,l=34,r=10,t=10,b=24;const iw=W-l-r,ih=H-t-b;
  const x=i=>l+i*iw/(pts.length-1),y=p=>t+ih*(1-p/100);
  let s=`<svg class="trend" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(U.trend)}">`;
  [0,50,100].forEach(v=>{s+=`<line x1="${l}" x2="${W-r}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="1"/><text x="${l-6}" y="${y(v)+3}" text-anchor="end">${v}</text>`});
  const P=pts.map((p,i)=>[x(i),y(p.max?p.score/p.max*100:0)]);
  s+=`<polyline points="${P.map(p=>p.join(",")).join(" ")}" fill="none" stroke="var(--pen)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
  pts.forEach((p,i)=>{const pc=p.max?Math.round(p.score/p.max*100):0;s+=`<circle cx="${P[i][0]}" cy="${P[i][1]}" r="5" fill="var(--pen)" stroke="var(--panel)" stroke-width="2"><title>${fmtD(new Date(p.ts))} · ${U.ty[p.type]||""} · ${LV[p.level]||""} · ${p.score}/${p.max} (${pc}%)</title></circle>`});
  s+=`<text x="${l}" y="${H-6}">${fmtD(new Date(pts[0].ts))}</text><text x="${W-r}" y="${H-6}" text-anchor="end">${fmtD(new Date(pts[pts.length-1].ts))}</text>`;
  return s+`</svg>`;
}
function sortedHist(){return st.history.slice().sort((a,b)=>b.ts-a.ts)}
function viewProfile(o){o=o||{};const ro=!!o.readonly;
  const hist=o.hist||sortedHist();const n=hist.length;
  const avg=n?Math.round(hist.reduce((s,r)=>s+(r.max?r.score/r.max:0),0)/n*100):0;
  const days=new Set(hist.map(r=>dayKey(new Date(r.ts))));let streak=0;const d=new Date();d.setHours(0,0,0,0);
  if(!days.has(dayKey(d)))d.setDate(d.getDate()-1);
  while(days.has(dayKey(d))){streak++;d.setDate(d.getDate()-1)}
  const timed=hist.filter(r=>r.timeSec>0);
  const avgTime=timed.length?timed.reduce((s,r)=>s+r.timeSec,0)/timed.length:0;
  const perTask=timed.length?timed.reduce((s,r)=>s+r.timeSec,0)/Math.max(1,timed.reduce((s,r)=>s+(r.items||0),0)):0;
  const lim=hist.filter(r=>r.limitSec>0);const limShare=lim.length?Math.round(lim.reduce((s,r)=>s+r.timeSec/r.limitSec,0)/lim.length*100):null;
  const now=Date.now(),MONTH=30*864e5;const agg={},recent={},older={};
  hist.forEach(r=>Object.entries(r.topics||{}).forEach(([tp,v])=>{const g=v[0],m=v[1];if(!m)return;[agg,r.ts>now-MONTH?recent:older].forEach(o=>{o[tp]=o[tp]||[0,0];o[tp][0]+=g;o[tp][1]+=m})}));
  const rows=Object.keys(agg).filter(id=>id!=="oly"&&id!=="proof").map(id=>{const p=Math.round(agg[id][0]/agg[id][1]*100);let arr="flat",sym="–";
    if(recent[id]&&older[id]){const a=recent[id][0]/recent[id][1],b2=older[id][0]/older[id][1];if(a-b2>0.05){arr="up";sym="▲"}else if(b2-a>0.05){arr="down";sym="▼"}}
    return {id,p,arr,sym}}).sort((a,b)=>a.p-b.p);
  const weak=rows.filter(r=>r.p<70).map(r=>r.id);
  const olyDone=new Set();hist.forEach(r=>(r.olyOk||[]).forEach(i=>olyDone.add(i)));
  const y0=(()=>{const t=new Date();const y=t.getMonth()>=8?t.getFullYear():t.getFullYear()-1;return `${y}/${String(y+1).slice(2)}`})();
  const nm=ro?(o.name||""):st.name;const initial=(nm||"").trim().charAt(0).toUpperCase()||"?";
  let h=`<div class="screen">${subhead(o.title||U.profile,o.back||"main")}
   <div class="group" style="margin-top:12px">
    <div class="pcard"><div class="ava" id="ava">${esc(initial)}</div>
      ${ro?`<div><b style="font-size:1.1rem">${esc(nm||U.noName)}</b><br><span class="sub">${U.title}${o.level&&LV[o.level]?" · "+LV[o.level]:""} · ${U.year} ${y0}</span></div><div class="out"><button class="btn ghost" type="button" data-go="prog">${U.prog}</button></div>`
      :`<div class="pfields"><label class="fld"><span>${U.name}</span><input class="txt" id="f-name" value="${esc(st.name)}" placeholder="${esc(U.namePh)}" autocomplete="off"></label>
        <div class="pfrow">${selectHtml("f-year",["2026/27","2027/28"],st.year,U.yearLbl)}${selectHtml("f-grade",GRADES,st.grade,U.gradeLbl)}</div></div>
        <div class="out out-col"><span class="sub" title="${esc((USER&&USER.email)||"")}">${esc((USER&&USER.email)||"")}</span><button class="btn exit" type="button" data-act="logout">${ICON_EXIT}<span>${U.logout}</span></button></div>`}</div>
    <div class="kpis"><div class="kpi"><b>${n}</b><span>${U.kWorks}</span></div><div class="kpi"><b>${n?avg+"%":"—"}</b><span>${U.kAvg}</span></div><div class="kpi"><b>${streak}</b><span>${U.kStreak}</span></div><div class="kpi"><b>${avgTime?fmtTime(avgTime):"—"}</b><span>${U.kTime}</span></div></div>
   </div>
   ${ro?"":`<p class="sub below">${sync==="ok"?U.synced:U.offline}</p>`}
   <div class="sec">${U.act}</div><div class="group"><div class="chartbox">${heatSvg(hist)}</div></div>
   <div class="sec">${U.trend}</div><div class="group"><div class="chartbox">${trendSvg(hist)}</div></div>`;
  if(rows.length){
    h+=`<div class="sec">${U.topics}</div><div class="group">${rows.map(r=>`<div class="trow ${tc(r.id)}${r.p<70?" weak":""}"><span>${esc(topicName(r.id))}${r.p<70?`<span class="tag-weak">${U.weak}</span>`:""}</span><div class="meter"><i style="width:${r.p}%"></i></div><span class="pc">${r.p}%</span><span class="arrow ${r.arr}" title="${esc(U.cmp)}">${r.sym}</span></div>`).join("")}
      ${weak.length&&!ro?`<div class="srow trainrow" style="border-top:1px solid var(--line)"><span class="sub" style="margin:0">${esc(weak.map(topicName).join(", "))}</span><button class="btn sm" type="button" data-act="train" data-only="${weak.join(",")}">${U.trainBtn}</button></div>`:""}</div>`;
  }
  h+=`<div class="sec">${U.timeT}</div><div class="group">${timed.length?`<div class="srow"><span class="k">${U.kTime}</span><b>${fmtTime(avgTime)}</b></div><div class="srow"><span class="k">${U.tPerTask}</span><b>${fmtTime(perTask)}</b></div>${limShare!=null?`<div class="srow"><span class="k">${U.tLimit}</span><b>${limShare}%</b></div>`:""}`:`<div class="srow"><span class="sub" style="margin:0">${U.tNone}</span></div>`}</div>
   <div class="sec">${U.oly}</div><div class="group"><div class="srow"><span class="k">${U.oly}</span><b>${U.olySolved(olyDone.size,G.OLY.length)}</b></div></div>
   ${secBadge(U.hist,ro?o.newWorks:0,"works")}<div class="group">${n?hist.map((r,i)=>`<button class="hrow" type="button" data-review="${i}" data-src="${ro?"kid":"me"}"><span><span>${fmtD(new Date(r.ts))} · ${esc(U.ty[r.type]||"")} · ${LV[r.level]||""}</span><br><span class="m">${esc(Object.keys(r.topics||{}).filter(x=>x!=="oly"&&x!=="proof").map(topicName).join(", "))}</span></span><span class="s">${r.score}/${r.max}</span>${r.meta?ICON_CHEV:"<span></span>"}</button>`).join(""):`<div class="srow"><span class="sub" style="margin:0">${U.histNone}</span></div>`}</div>
  ${o.extra||""}</div>`;
  return h;
}
function viewReview(){
  const fromKid=st.rv&&st.rv.src==="kid";
  const r=(fromKid?kidHist.slice().sort((a,b)=>b.ts-a.ts):sortedHist())[st.rv?st.rv.i:-1];
  if(!r||!r.meta){st.view=fromKid?"kid":"profile";return fromKid?viewKid():viewProfile(studentProfileOpts())}
  const test=buildFrom(r.meta);
  return `<div class="screen">${subhead(`${U.review} ${fmtD(new Date(r.ts))}`,fromKid?"kid":"profile")}${sheetHtml({helpCid:!fromKid&&r.cid&&parents.some(p=>p.status==="active")?r.cid:null,focus:st.rv.focus,test,meta:r.meta,answers:r.answers||{},checked:true,open:st.rv.open||{},blockTime:r.blockTime||{},timeSec:r.timeSec||0,laps:r.laps||[],readonly:true})}</div>`;
}

const ICON_G=`<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"/><path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2z"/><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10C7.2 7.7 9.4 6 12 6z"/></svg>`;
function viewAuth(){
  return `<div class="screen"><div class="group authcard">
    <h2>${U.signTitle}</h2><p class="sub">${U.signLead}</p>
    <button class="btn ghost wide" type="button" data-act="google">${ICON_G}<span>${U.google}</span></button>
    <div class="or">${U.or}</div>
    <label class="ctrl"><span>${U.email}</span><input class="txt" type="email" id="f-email" autocomplete="email" inputmode="email"></label>
    <button class="btn wide" type="button" data-act="magic">${U.sendLink}</button>
    ${authMsg?`<p class="msg${authErr?" err":""}" role="status">${esc(authMsg)}</p>`:""}
  </div></div>`;
}
function viewRole(){
  const meta=(USER&&USER.user_metadata)||{};
  return `<div class="screen"><div class="authcard group">
    <h2>${U.roleTitle}</h2><p class="sub">${U.roleLead}</p>
    <label class="ctrl"><span>${U.yourName}</span><input class="txt" id="f-rname" value="${esc(meta.full_name||meta.name||"")}" autocomplete="name"></label>
    <div class="group roles"><button class="srow link" type="button" data-act="role" data-role="student"><span><b>${U.student}</b><br><span class="sub">${U.studentHint}</span></span>${ICON_CHEV}</button>
    <button class="srow link" type="button" data-act="role" data-role="parent"><span><b>${U.parent}</b><br><span class="sub">${U.parentHint}</span></span>${ICON_CHEV}</button></div>
    ${authMsg?`<p class="msg${authErr?" err":""}">${esc(authMsg)}</p>`:""}
  </div></div>`;
}
function viewAccount(){
  const isS=PROFILE.role==="student";const other=isS?U.roleP:U.roleS;
  return `<div class="screen">${subhead(U.accountSec,"settings")}
    <div class="group" style="margin-top:12px"><div class="srow"><span><span class="k">${esc((USER&&USER.email)||"")}</span><br><span class="sub">${U.roleNow(PROFILE.role)}</span></span><button class="btn ghost" type="button" data-act="logout">${U.logout}</button></div></div>
    <div class="sec">${U.changeRole}</div>
    <div class="group"><div class="srow"><span class="sub">${PROFILE.role_changed?U.roleChangedAlready:U.changeOnce}</span>${PROFILE.role_changed?"":`<button class="btn ghost" type="button" data-act="role1">${U.changeRole}: ${esc(other)}</button>`}</div></div>
    <div class="sec">${U.deleteAcc}</div>
    <div class="group"><div class="srow"><span class="sub">${U.delWarn}</span><button class="btn ghost danger" type="button" data-act="del1">${U.deleteAcc}</button></div></div>
  </div>`;
}
function personRow(p,right){return `<div class="srow"><span><b>${esc(p.name||U.noName)}</b> <span class="sub">${esc(p.email||"")}</span><br><span class="sub">${[p.kind?U[p.kind]:"",seenTxt(p.last_seen)].filter(Boolean).join(" · ")}</span></span>${right||"<span></span>"}</div>`}
function inviteRows(list){return list.map(i=>`<div class="srow"><span><span class="k">${esc(i.email)}</span><br><span class="sub">${U.invited}</span></span>${i.invited_by===USER.id?`<button class="btn ghost" type="button" data-act="uninvite" data-id="${i.id}">${U.cancelInv}</button>`:"<span></span>"}</div>`).join("")}
function inviteForm(act,label,extra){return `<div class="srow"><input class="txt" type="email" id="f-inv-${act}" placeholder="${esc(U.emailPh)}" autocomplete="off"><button class="btn" type="button" data-act="${act}"${extra||""}>${U.invite}</button></div>`}
function msgHtml(){return linkMsg?`<p class="msg${linkErr?" err":""}" role="status">${esc(linkMsg)}</p>`:""}
function familyHtml(){
  const act=parents.filter(p=>p.status==="active");const inv=myInvites.filter(i=>i.role==="parent");
  let h=`<div class="sec">${U.family}</div><div class="group">`;
  if(!act.length&&!inv.length)h+=`<div class="srow"><span class="sub">${U.noParents}</span></div>`;
  h+=act.map(p=>personRow(p)).join("")+inviteRows(inv);
  h+=`</div><div class="sec">${U.inviteParent}</div><div class="group">${inviteForm("invparent")}</div>${msgHtml()}`;
  return h;
}
function studentProfileOpts(){return {extra:familyHtml()}}
function viewKids(){
  let h=`<div class="screen"><div class="subhead"><h2>${U.kidsTitle}</h2></div><div class="group">`;
  const inv=myInvites.filter(i=>i.role==="student");
  if(!kids.length&&!inv.length)h+=`<div class="srow"><span class="sub">${U.kidsNone}</span></div>`;
  kids.forEach(k=>{h+=k.status==="active"?`<button class="srow link" type="button" data-kid="${k.student_id}"><span><b>${esc(k.name||U.noName)}</b>${k.help_open?` <span class="badge">${k.help_open}</span>`:""}<br><span class="sub">${[esc(k.email||""),seenTxt(k.last_seen)].filter(Boolean).join(" · ")}</span></span>${ICON_CHEV}</button>`
    :`<div class="srow"><span><b>${esc(k.name||U.noName)}</b><br><span class="sub">${esc(k.email||"")} · ${U.waiting}</span></span><button class="btn ghost" type="button" data-act="unlink" data-pid="${USER.id}" data-sid="${k.student_id}">${U.cancelInv}</button></div>`});
  h+=inviteRows(inv)+`</div><div class="sec">${U.inviteChild}</div><div class="group">${inviteForm("invchild")}</div>${msgHtml()}</div>`;
  return h;
}
function kidExtra(){
  const amMain=kid.kind==="main";const sid=kid.student_id;
  const seen=kidSeen();const newHelp=kidHelp.filter(x=>!x.done&&new Date(x.created_at).getTime()>seen.help).length;
  let h=`${secBadge(U.helpSec,newHelp,"help")}<div class="group">`;
  if(!kidHelp.length)h+=`<div class="srow"><span class="sub">${U.helpNone}</span></div>`;
  kidHelp.forEach(x=>{h+=`<div class="srow"><span>${x.done?"":"<b>"}${esc(x.title)}${x.done?"":"</b>"}<br><span class="sub">${fmtD(new Date(x.created_at))}${x.done?" · "+U.helpDoneMark:""}</span></span><span class="tline"><button class="btn ghost" type="button" data-act="helpopen" data-cid="${esc(x.result_cid)}" data-hk="${esc(x.item_key)}">${U.helpOpen}</button>${x.done?"":`<button class="btn ghost" type="button" data-act="helpdone" data-id="${x.id}">${U.helpDone}</button>`}</span></div>`});
  h+=`</div><div class="sec">${U.family}</div><div class="group">`;
  h+=kidParents.map(p=>personRow(p,p.parent_id===USER.id?`<button class="btn ghost" type="button" data-act="unlink" data-pid="${p.parent_id}" data-sid="${sid}">${U.leave}</button>`:amMain&&p.kind==="second"?`<button class="btn ghost" type="button" data-act="unlink" data-pid="${p.parent_id}" data-sid="${sid}">${U.removeP}</button>`:"")).join("");
  h+=inviteRows(myInvites.filter(i=>i.role==="parent"&&i.student_id===sid))+`</div>`;
  if(amMain)h+=`<div class="sec">${U.inviteSecond}</div><div class="group">${inviteForm("invsecond",""," data-sid=\""+sid+"\"")}</div>`;
  return h+msgHtml();
}
function secBadge(title,n,key){return `<div class="sec sec-row"><span class="sec-t">${title}${n?` <span class="badge" aria-label="${esc(U.newN(n))}">${n}</span>`:""}</span>${n?`<button class="link-btn" type="button" data-act="seenreset" data-k="${key}">${U.resetNew}</button>`:""}</div>`}
function viewKid(){
  if(!kid)return viewKids();
  const seen=kidSeen();return viewProfile({hist:kidHist.slice().sort((a,b)=>b.ts-a.ts),newWorks:kidHist.filter(r=>r.ts>seen.works).length,readonly:true,level:kid.level,name:kid.name,back:"kids",title:kid.name||U.noName,extra:kidExtra()});
}
function viewMe(){
  return `<div class="screen">${subhead(U.me,"kids")}<div class="group" style="margin-top:12px"><div class="srow"><label style="display:grid;gap:4px"><span class="sub">${U.nameParent}</span><input class="txt" id="f-name" value="${esc(st.name)}" autocomplete="off"></label></div>
    <div class="srow"><span class="k">${esc((USER&&USER.email)||"")}</span><button class="btn ghost" type="button" data-act="logout">${U.logout}</button></div></div></div>`;
}
/* ---------- окна ---------- */
function renderModal(){
  let el=document.getElementById("modal");
  if(!modal){if(el){if(reduced())el.remove();else{el.classList.remove("in");el.classList.add("out");setTimeout(()=>el.remove(),200)}}document.body.classList.remove("modal-open");return}
  if(el&&el.classList.contains("out")){el.remove();el=null}
  if(!el){el=document.createElement("div");el.id="modal";el.className="overlay";document.body.appendChild(el)}
  document.body.classList.add("modal-open");
  const other=PROFILE&&PROFILE.role==="student"?U.roleP:U.roleS;let h="";
  if(modal.type==="ask")h=`<h2>${U.askTitle}</h2><p>${esc(U.askText(modal.p.name,modal.p.email))}</p><div class="mbtns"><button class="btn ghost" type="button" data-act="askno">${U.no}</button><button class="btn" type="button" data-act="askyes">${U.yes}</button></div>`;
  if(modal.type==="role1")h=`<h2>${U.changeRole}</h2><p>${esc(U.roleAsk(other))}</p><div class="mbtns"><button class="btn ghost" type="button" data-act="mclose">${U.no}</button><button class="btn" type="button" data-act="role2">${U.yes}</button></div>`;
  if(modal.type==="role2"||modal.type==="del"){const ph=modal.type==="del"?U.phraseDel:U.phraseRole;
    h=`<h2>${modal.type==="del"?U.deleteAcc:U.changeRole}</h2><p>${esc(modal.type==="del"?U.delWarn:U.roleWarn(other))}</p>
      <label class="ctrl"><span>${esc(U.typePhrase(ph))}</span><input class="txt" id="f-phrase" autocomplete="off" autocapitalize="off" spellcheck="false" data-phrase="${esc(ph)}"></label>
      ${modal.err?`<p class="msg err">${esc(modal.err)}</p>`:""}
      <div class="mbtns"><button class="btn ghost" type="button" data-act="mclose">${U.cancel}</button><button class="btn danger" type="button" id="m-go" data-act="${modal.type==="del"?"delgo":"rolego"}" disabled>${modal.type==="del"?U.doDelete:U.doChange}</button></div>`}
  const fresh=!el.firstChild;el.innerHTML=`<div class="dialog" role="dialog" aria-modal="true">${h}</div>`;if(fresh&&!reduced()){el.classList.remove("in");el.getBoundingClientRect();el.classList.add("in")}
  const f=document.getElementById("f-phrase");if(f){f.focus();f.addEventListener("paste",e=>e.preventDefault());f.addEventListener("drop",e=>e.preventDefault())}
}
function renderMain(){
  G.setLang(st.lang);
  const v=st.view;const m=document.getElementById("main");
  if(authState==="loading"){m.innerHTML=`<p class="empty">${U.loading}</p>`;return}
  if(authState==="out"){m.innerHTML=viewAuth();return}
  if(authState==="role"){m.innerHTML=viewRole();return}
  const isP=PROFILE&&PROFILE.role==="parent";
  m.innerHTML=v==="settings"?viewSettings():v==="account"?viewAccount():v==="faq"?viewFaq():v==="prog"?viewProg():v==="review"?viewReview()
    :isP?(v==="kid"?viewKid():v==="me"?viewMe():viewKids())
    :v==="profile"?viewProfile(studentProfileOpts()):viewMain();
  document.getElementById("navprog").setAttribute("aria-current",st.view==="prog"?"page":"false");
  document.getElementById("ib-set").setAttribute("aria-current",st.view==="settings"||st.view==="faq"||st.view==="account"?"page":"false");
  document.getElementById("ib-prof").setAttribute("aria-current",st.view==="profile"||st.view==="review"||st.view==="me"?"page":"false");
  placeThumbs();runEnter();
}
function renderNav(){
  document.getElementById("ttl").innerHTML=`<span>${esc(gradesTitle())}</span>${ICON_DOWN}`;document.getElementById("ttl").setAttribute("aria-expanded",String(st.menuOpen));
  const gm=document.getElementById("gmenu");gm.hidden=!st.menuOpen;
  if(st.menuOpen)gm.innerHTML=`<p class="gm-t">${U.gradesPick}</p>${GRADES.map(n=>`<div class="gm-row${st.grades.includes(n)?" on":""}"><label><input type="checkbox" data-grade="${n}"${st.grades.includes(n)?" checked":""}>${U.gradeN(n)}${n===Number(st.grade)?` · ${U.mine}`:""}</label><button class="link-btn" type="button" data-go="prog" data-pg="${n}">${U.prog}</button></div>`).join("")}`;
  document.getElementById("ib-set").setAttribute("aria-label",U.settings);document.getElementById("ib-prof").setAttribute("aria-label",U.profile);
  document.getElementById("langsw").innerHTML=seg("lang",["ru","et","en"],st.lang,{ru:"RU",et:"ET",en:"EN"},"sm");requestAnimationFrame(placeThumbs);
  const inApp=authState==="in";["ib-set","ib-prof"].forEach(id=>{document.getElementById(id).hidden=!inApp});
  const isS=inApp&&PROFILE&&PROFILE.role==="student";["gwrap","navsep"].forEach(id=>{document.getElementById(id).hidden=!isS});document.getElementById("navprog").hidden=true;
}
function renderBar(){
  const bar=document.getElementById("bar");
  saveWork();
  if(authState==="in"&&PROFILE.role==="student"&&st.view==="prog"&&st.progPick&&progTopicsFor(st.progPick.g).length){
    const n=Object.values(st.progPick.pick).filter(Boolean).length;bar.hidden=false;
    document.getElementById("progress").innerHTML=`<span>${U.pickedN(n)}</span>`;
    document.getElementById("btns").innerHTML=`<button class="btn" type="button" data-act="trainpick"${n?"":" disabled"}>${U.trainPicked}</button>`;return}
  if(authState!=="in"||PROFILE.role!=="student"||st.view!=="main"||!st.test){bar.hidden=true;return}
  bar.hidden=false;
  const pr=document.getElementById("progress"),b=document.getElementById("btns");const T=totals(st.test,st.answers);
  const clock=st.timer==="off"?"":st.timer==="limit"?`<span class="clock${(st.limit*60-st.elapsed)<300?" low":""}" id="clock">${fmtTime(st.limit*60-st.elapsed)}</span>`:`<span class="clock${st.running?"":" paused"}" id="clock">${fmtTime(st.elapsed)}</span>`;
  let ctl="";
  if(st.timer!=="off"&&!st.checked){
    const ib=(act,icon,label)=>`<button class="tbtn" type="button" data-act="${act}" aria-label="${esc(label)}" title="${esc(label)}">${icon}</button>`;
    if(st.timer==="watch")ctl+=st.running?ib("pause",ICON_PAUSE,U.stop):ib("play",ICON_PLAY,U.start);
    if(st.timer==="watch"&&!st.running&&st.elapsed>0)ctl+=ib("reset",ICON_RESET,U.reset);
    else ctl+=`<button class="tbtn" type="button" data-act="lap" aria-label="${esc(U.lap)}" title="${esc(U.lap)}" ${st.running?"":"disabled"}>${ICON_LAP}</button>`;
    ctl=`<span class="tctl">${ctl}</span>`;
  }
  const lapInfo=st.timer!=="off"&&st.laps.length?`<span class="lapinfo" id="lapinfo">${U.lap} ${st.laps.length+1} · ${fmtTime(st.elapsed-st.lapStart)}</span>`:"";
  const clockBox=clock+ctl+(st.checked?"":lapInfo);
  if(st.checked){pr.innerHTML=`${clockBox}<span>${U.checked(T.got,T.max)}</span>`;b.innerHTML=`<button class="btn ghost" type="button" data-act="openall">${U.allExp}</button><button class="btn" type="button" data-act="new">${U.create}</button>`}
  else if(st.confirming){pr.innerHTML=`${clockBox}<span class="confirm">${U.emptyWarn(T.filled,T.count)}</span>`;b.innerHTML=`<button class="btn ghost" type="button" data-act="cancel">${U.back}</button><button class="btn" type="button" data-act="finish">${U.anyway}</button>`}
  else {pr.innerHTML=`${clockBox}<span>${U.filled(T.filled,T.count)}</span>`;b.innerHTML=`<button class="btn" type="button" data-act="check">${U.check}</button>`}
}
function renderAll(){U=UI[st.lang];document.documentElement.lang=st.lang;renderNav();renderMain();renderBar()}

/* ---------- таймер ---------- */
setInterval(()=>{
  if(!st.test||st.checked||!st.running||st.timer==="off"||st.view!=="main")return;
  if(document.visibilityState==="hidden")return;
  st.elapsed+=1;if(activeBlock!=null)st.blockTime[activeBlock]=(st.blockTime[activeBlock]||0)+1;
  const c=document.getElementById("clock");
  if(st.timer==="limit"){const left=st.limit*60-st.elapsed;if(c){c.textContent=fmtTime(left);c.classList.toggle("low",left<300)}if(left<=0){st.timeUp=true;finish()}}
  else if(c)c.textContent=fmtTime(st.elapsed);
  if(st.elapsed%5===0)saveWork();
  const li=document.getElementById("lapinfo");if(li)li.textContent=`${U.lap} ${st.laps.length+1} · ${fmtTime(st.elapsed-st.lapStart)}`;
},1000);

/* ---------- события ---------- */
document.addEventListener("click",e=>{
  if(st.menuOpen&&!e.target.closest("#gwrap")){st.menuOpen=false;renderNav()}
  const go=e.target.closest("[data-go]");
  if(go){let to=go.dataset.go;const isP=PROFILE&&PROFILE.role==="parent";
    if(isP&&to==="main")to="kids";if(isP&&to==="profile")to="me";
    if(authState!=="in"){if(to==="main"){renderMain()}return}
    if(to==="prog"){st.progBack=st.view==="kid"?"kid":st.view==="prog"?st.progBack:"main";st.progGrade=go.dataset.pg?Number(go.dataset.pg):null;st.progPick=null;if(st.menuOpen){st.menuOpen=false;renderNav()}}
    if(to==="faq"){st.faqBack=st.view==="main"?"main":"settings";st.faqOpen=go.dataset.faq!=null?Number(go.dataset.faq):null}
    st.view=to;enter(to==="profile"?"profile":"screen");renderMain();renderBar();window.scrollTo({top:0});return}
  const s=e.target.closest("[data-set]");
  if(s){const k=s.dataset.set,v=s.dataset.v;if(st[k]===v)return;st[k]=v;
    if(k==="lang"){U=UI[v];if(st.meta)st.test=buildFrom(st.meta,v);saveProfile();savePrefs();renderAll();return}
    if(k==="theme"){applyTheme();saveProfile()}
    if(k==="level")saveProfile();
    if(k==="progGrade"){st.progGrade=Number(v);st.progPick=null;st[k]=v;renderMain();renderBar();return}
    if(k==="timer"&&st.test&&!st.checked)st.running=v!=="off";
    if(k==="type"&&!st.limitTouched)st.limit=v==="period"?90:45;
    renderMain();renderBar();return}
  const a=e.target.closest("[data-act]");
  if(a){const act=a.dataset.act;
    if(act==="new"){newTest();return}
    if(act==="gmenu"){st.menuOpen=!st.menuOpen;renderNav();return}
    if(act==="weektoggle"){st.weekOpen=!st.weekOpen;const w=document.getElementById("week");if(w)w.outerHTML=weekHtml();return}
    if(act==="trainpick"){const ids=Object.keys(st.progPick.pick).filter(k=>st.progPick.pick[k]);if(!ids.length)return;st.train=ids;st.view="main";newTest();return}
    if(act==="seenreset"){const s=kidSeen();s[a.dataset.k]=Date.now();LS.set(seenKey(),s);renderMain();return}
    if(act==="google"){sb.auth.signInWithOAuth({provider:"google",options:{redirectTo:location.origin+location.pathname}}).then(({error})=>{if(error){authErr=true;authMsg=U.authErr+error.message;renderMain()}});return}
    if(act==="magic"){const em=(document.getElementById("f-email").value||"").trim();if(!em)return;a.disabled=true;
      sb.auth.signInWithOtp({email:em,options:{emailRedirectTo:location.origin+location.pathname}}).then(({error})=>{authErr=!!error;authMsg=error?U.authErr+error.message:U.linkSent(em);renderMain()});return}
    if(act==="role"){createProfile(a.dataset.role);return}
    if(act==="logout"){modal=null;renderModal();sb.auth.signOut().then(()=>{st.test=null;st.meta=null;st.view="main";authMsg="";renderAll()});return}
    if(act==="mclose"){modal=null;renderModal();return}
    if(act==="askyes"||act==="askno"){const p=modal.p;modal=null;renderModal();sb.rpc("answer_parent",{p_parent:p.parent_id,p_yes:act==="askyes"}).then(loadParents);return}
    if(act==="role1"){modal={type:"role1"};renderModal();return}
    if(act==="role2"){modal={type:"role2"};renderModal();return}
    if(act==="del1"){modal={type:"del"};renderModal();return}
    if(act==="rolego"){a.disabled=true;sb.rpc("change_role").then(({data,error})=>{if(error){modal.err=errText(error.message);renderModal();return}
      modal=null;renderModal();LS.del("math7.work."+USER.id);LS.del("math7.hist."+USER.id);LS.del(qKey());st.test=null;st.meta=null;st.history=[];parents=[];kids=[];kid=null;myInvites=[];applyProfile(data)});return}
    if(act==="delgo"){a.disabled=true;sb.rpc("delete_account").then(({error})=>{if(error){modal.err=errText(error.message);renderModal();return}
      const id=USER.id;["work","hist","queue","profile"].forEach(k=>LS.del("math7."+k+"."+id));modal=null;renderModal();sb.auth.signOut().then(()=>{st.test=null;st.meta=null;st.view="main";renderAll()})});return}
    if(act==="invparent"||act==="invchild"||act==="invsecond"){const inp=document.getElementById("f-inv-"+act);const em=(inp&&inp.value||"").trim();if(!em)return;a.disabled=true;
      const call=act==="invchild"?sb.rpc("invite_child",{p_email:em}):sb.rpc("invite_parent",{p_email:em,p_student:act==="invsecond"?a.dataset.sid:null});
      call.then(({data,error})=>{linkErr=!!error;linkMsg=error?errText(error.message):data==="invited"?U.okInvited(em):data==="requested"?U.okRequested:U.okLinked;
        if(!error)sendMail();loadInvites();if(PROFILE.role==="student")loadParents();else{loadKids();if(kid)loadKidExtra(kid.student_id)}renderMain()});return}
    if(act==="uninvite"){sb.rpc("cancel_invite",{p_id:a.dataset.id}).then(loadInvites);return}
    if(act==="unlink"){sb.rpc("unlink",{p_parent:a.dataset.pid,p_student:a.dataset.sid}).then(()=>{if(a.dataset.pid===USER.id&&kid&&kid.student_id===a.dataset.sid){kid=null;st.view="kids"}loadKids();if(kid)loadKidExtra(kid.student_id);renderMain()});return}
    if(act==="help"){a.disabled=true;const hk=a.dataset.cid+"|"+a.dataset.hk;sb.rpc("ask_help",{p_cid:a.dataset.cid,p_key:a.dataset.hk,p_title:a.dataset.title}).then(({error})=>{if(!error){helpSent[hk]=true;sendMail()}else a.disabled=false;renderMain()});return}
    if(act==="helpopen"){const list=kidHist.slice().sort((x,y)=>y.ts-x.ts);const i=list.findIndex(r=>r.cid===a.dataset.cid);if(i<0)return;
      const k=a.dataset.hk;st.rv={i,src:"kid",open:{[k]:true},focus:k};st.view="review";renderMain();renderBar();
      setTimeout(()=>{const el=document.getElementById("it-"+k);if(el)el.scrollIntoView({block:"center"})},50);return}
    if(act==="helpdone"){sb.from("help").update({done:true}).eq("id",a.dataset.id).then(()=>{loadKids();loadKidExtra(kid.student_id)});return}
    if(act==="train"){st.train=a.dataset.only.split(",");newTest();return}
    if(act==="check"){const T=totals(st.test,st.answers);if(T.filled<T.count){st.confirming=true;renderBar();return}finish();return}
    if(act==="finish"){finish();return}
    if(act==="pause"){st.running=false;renderBar();return}
    if(act==="play"){st.running=true;renderBar();return}
    if(act==="reset"){st.elapsed=0;st.laps=[];st.lapStart=0;st.blockTime={};renderBar();return}
    if(act==="lap"){if(st.elapsed>st.lapStart){st.laps.push(st.elapsed-st.lapStart);st.lapStart=st.elapsed}renderBar();return}
    if(act==="cancel"){st.confirming=false;renderBar();return}
    if(act==="openall"){st.test.blocks.forEach((b,bi)=>b.items.forEach((it,ii)=>st.open[bi+"-"+ii]=true));renderMain();return}
  }
  if(modal&&e.target.id==="modal"&&modal.type!=="ask"){modal=null;renderModal();return}
  const kd=e.target.closest("[data-kid]");if(kd){openKid(kd.dataset.kid);return}
  const rv=e.target.closest("[data-review]");if(rv){st.rv={i:Number(rv.dataset.review),src:rv.dataset.src,open:{}};st.view="review";renderMain();renderBar();window.scrollTo({top:0});return}
  if(st.view==="review"){const w=e.target.closest("[data-why]");if(w){st.rv.open[w.dataset.why]=!st.rv.open[w.dataset.why];renderMain()}return}
  const o=e.target.closest("[data-opt]");if(o&&!st.checked){st.answers[o.dataset.k]=o.dataset.opt;activeBlock=Number(o.dataset.k.split("-")[0]);st.confirming=false;renderMain();renderBar();return}
  const sg=e.target.closest("[data-self]");if(sg){st.answers[sg.dataset.k]=sg.dataset.self;renderMain();renderBar();return}
  const w=e.target.closest("[data-why]");if(w){st.open[w.dataset.why]=!st.open[w.dataset.why];renderMain();return}
});
document.addEventListener("input",e=>{
  const i=e.target.closest("[data-k]");
  if(i&&st.view==="main"&&(i.tagName==="INPUT"||i.tagName==="TEXTAREA")){
    const k=i.dataset.k;
    if(i.tagName==="TEXTAREA"){st.answers[k+"t"]=i.value;renderBar();return}
    if(i.dataset.i!=null){const arr=Array.isArray(st.answers[k])?st.answers[k].slice():["",""];arr[+i.dataset.i]=i.value;st.answers[k]=arr}
    else st.answers[k]=i.value;
    st.confirming=false;renderBar();return}
  if(e.target.id==="f-date"&&e.target.value){st.date=e.target.value;const w=document.getElementById("week");if(w)w.outerHTML=weekHtml();return}
  if(e.target.id==="f-limit"){const v=Number(e.target.value);if(v>0){st.limit=v;st.limitTouched=true}return}
  if(e.target.id==="f-phrase"){const ok=e.target.value.trim().toLowerCase()===e.target.dataset.phrase;const b=document.getElementById("m-go");if(b)b.disabled=!ok;return}
  if(e.target.id==="f-name"){st.name=e.target.value;const av=document.getElementById("ava");if(av)av.textContent=(st.name||"").trim().charAt(0).toUpperCase()||"?";saveProfile()}
});
document.addEventListener("change",e=>{
  const t=e.target;
  if(t.dataset.grade){const n=Number(t.dataset.grade);st.grades=t.checked?Array.from(new Set(st.grades.concat(n))).sort((a,b)=>a-b):st.grades.filter(x=>x!==n);saveProfile();renderNav();return}
  if(t.dataset.pick&&st.progPick){st.progPick.pick[t.dataset.pick]=t.checked;renderBar();return}
  if(t.id==="f-year"){st.year=t.value;saveProfile();return}
  if(t.id==="f-grade"){st.grade=Number(t.value);saveProfile();return}
});
document.addEventListener("focusin",e=>{const b=e.target.closest("[data-block]");if(b&&st.view==="main")activeBlock=Number(b.dataset.block)});

applyTheme();renderAll();initAuth();
function navShadow(){const n=document.querySelector(".nav");if(n)n.classList.toggle("scrolled",window.scrollY>4)}
window.addEventListener("scroll",navShadow,{passive:true});navShadow();

window.addEventListener("resize",()=>placeThumbs());

})();
