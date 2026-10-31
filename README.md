# Math Check

Статический сайт: генератор контрольных с профилем ученика и доступом для родителей.

Сборки нет: браузер загружает файлы как ES-модули напрямую.

```
index.html            разметка; подключает css/*.css и src/main.js
config.js             адрес и публичный ключ Supabase
css/                  стили по разделам (порядок подключения важен: поздние файлы уточняют ранние)
src/                  интерфейс
  main.js             запуск
  state.js            всё изменяемое состояние: st (настройки и работа), session, family, ui
  i18n/<язык>/        тексты интерфейса ru/et/en по разделам; i18n/index.js — U и useLang
  actions/            что делают кнопки: data-act (work, timer, account, family), data-go, data-set
  screens/            разметка экранов: главная, настройки, программа, профиль, вход, семья
  ui/                 общие части: переключатели, иконки, окна, конспект, панель, анимация, отрисовка
  services/           Supabase: вход, результаты, семья; локальные настройки
  work/               сборка работы и выбор класса/программы
  events.js           слушатели событий страницы → actions
generator/            генератор работ, без DOM (работает и в node)
  index.js            GEN: register, grade(n, программа), summaries
  core/               числа, дроби, выражения, календарь, проверка ответов, сборка работы
  grades/N/           класс N: topics, tasks/<тема>.js, olympiad, proofs, summaries/<язык>.js
supabase/             schema.sql (таблицы, доступ, функции) и функция писем send-mail
tests/                проверки (см. ниже)
```

## Проверки

```bash
npm install                              # один раз: prettier и playwright-core
npx playwright-core install chromium     # один раз, браузер для test:ui
npm test                                 # генератор: ответы засчитываются, тексты, снимок выдачи
npm run test:ui                          # браузер: экраны без ошибок, скриншоты в tests/screens/
npm run snapshot                         # обновить снимок, если выдача изменена намеренно
npm run format                           # единый стиль кода (Prettier, строка до 100 символов)
```

## Настройка Supabase

1. SQL Editor → вставить `supabase/schema.sql` → Run. Повторный запуск безопасен.
2. Edge Functions → Deploy a new function → Via Editor → имя `send-mail` → вставить `index.ts` → Deploy.
3. Edge Functions → Secrets: `SMTP_HOST=mail.spacemail.com`, `SMTP_PORT=465`, `SMTP_USER=info@nurval.ee`,
   `SMTP_PASS`, `MAIL_FROM_NAME=Math Check`, `SITE_URL=https://math-nurval.vercel.app`.
4. Authentication → Emails → SMTP Settings: тот же ящик, чтобы письма для входа шли с nurval.ee без лимита.

Все письма приложения начинаются с метки `[Math Check]` в теме.
