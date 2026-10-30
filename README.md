# Математика, 7 класс

Статический сайт: генератор контрольных с профилем ученика и доступом для родителей.

- `index.html`: разметка и стили
- `core.js`: общая часть генератора (числа, проверка ответов, календарь, сборка работы)
- `grades/g7.js`: задания 7 класса; новые классы — `grades/gN.js` с `GEN.register(N, …)`
- `app.js`: интерфейс, вход, семья, сохранение
- `config.js`: адрес и публичный ключ Supabase
- `supabase/schema.sql`: таблицы, правила доступа, функции
- `supabase/functions/send-mail/index.ts`: отправка писем через SMTP

## Настройка Supabase

1. SQL Editor → вставить `supabase/schema.sql` → Run. Повторный запуск безопасен.
2. Edge Functions → Deploy a new function → Via Editor → имя `send-mail` → вставить `index.ts` → Deploy.
3. Edge Functions → Secrets: `SMTP_HOST=mail.spacemail.com`, `SMTP_PORT=465`, `SMTP_USER=info@nurval.ee`,
   `SMTP_PASS`, `MAIL_FROM_NAME=Math Check`, `SITE_URL=https://math-nurval.vercel.app`.
4. Authentication → Emails → SMTP Settings: тот же ящик, чтобы письма для входа шли с nurval.ee без лимита.

Все письма приложения начинаются с метки `[Math Check]` в теме.
