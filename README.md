# Математика, 7 класс

Статический сайт: генератор контрольных (5–9 классы, сейчас 7-й) с профилем ученика и доступом для родителя.

- `index.html`: разметка и стили
- `gen7.js`: генератор заданий
- `app.js`: интерфейс, вход и сохранение
- `config.js`: адрес и публичный ключ Supabase
- `supabase/schema.sql`: таблицы и правила доступа

## Настройка

1. Supabase → SQL Editor → вставить `supabase/schema.sql` → Run.
2. Vercel → Add New → Project → репозиторий → Deploy (сборка не нужна).
3. Адрес сайта на Vercel добавить:
   - Google Cloud → Clients → Authorized JavaScript origins;
   - Supabase → Authentication → URL Configuration → Site URL и Redirect URLs.
