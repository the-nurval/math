// Публичные параметры Supabase. Publishable key можно держать во фронтенде:
// данные защищены правилами доступа (RLS) в supabase/schema.sql.
window.MATH_CONFIG = {
  url: "https://pyqrdxbomhbpkeplembh.supabase.co",
  key: "sb_publishable_KG-_MVbW46nw4IpRds-GZQ_iJSea0vp",
  // адрес (slug) функции отправки писем в Supabase → Edge Functions
  mailFn: "bright-processor" // запасной адрес; сначала сайт вызывает send-mail
};
