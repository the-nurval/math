// Клиент Supabase, отправка писем, понятный текст ошибок сервера.
import { U } from "../i18n/index.js";

const CFG = window.MATH_CONFIG || {};

export const sb =
  window.supabase && CFG.url
    ? window.supabase.createClient(CFG.url, CFG.key, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      })
    : null;

export function sendMail() {
  if (!sb) return;
  const names = [...new Set(["send-mail", CFG.mailFn].filter(Boolean))];
  (async () => {
    for (const n of names) {
      try {
        const { error } = await sb.functions.invoke(n, { body: {} });
        if (!error) return;
      } catch (e) {}
    }
  })();
}

export function errText(m) {
  m = String(m || "");
  if (/not_student/.test(m)) return U.eNotStudent;
  if (/not_parent_account/.test(m)) return U.eNotParentAcc;
  if (/bad_email/.test(m)) return U.eBadEmail;
  if (/not_main/.test(m)) return U.eNotMain;
  return U.authErr + m;
}
