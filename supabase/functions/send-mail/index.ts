// Отправляет письма из таблицы outbox через SMTP (SpaceMail, info@nurval.ee).
// Кого и о чём уведомить, решает база (функции invite_*, ask_help), а не браузер.
// Секреты задаются в Supabase → Edge Functions → Secrets:
//   SMTP_HOST=mail.spacemail.com  SMTP_PORT=465  SMTP_USER=info@nurval.ee  SMTP_PASS=…
//   MAIL_FROM_NAME=Math Check  SITE_URL=https://math-nurval.vercel.app
import nodemailer from "npm:nodemailer@6.9.16";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TAG = "[Math Check]";
type P = { from_name?: string; from_email?: string; title?: string };
type M = { subject: string; title: string; body: string; cta: string; note?: string };

// ---- TEMPLATE START ----
function msg(kind: string, lang: string, p: P, to: string): M {
  const who = (p.from_name || "").trim() || p.from_email || "";
  const em = p.from_email ? ` (${p.from_email})` : "";
  const L: Record<string, Record<string, M>> = {
    ru: {
      invite_child: { subject: "Тебя пригласили в Math Check", title: "Тебя пригласили в Math Check", body: `${who}${em} приглашает тебя решать контрольные по математике и следить за своими результатами.`, cta: "Открыть Math Check", note: `Входи с этой почтой — ${to}, тогда приглашение сработает само.` },
      parent_wants_child: { subject: "Родитель хочет видеть твои результаты", title: `${who} хочет видеть твои результаты`, body: `Зайди в Math Check и подтверди, что это твой родитель${em}.`, cta: "Подтвердить" },
      invite_parent_by_child: { subject: "Ваш ребёнок приглашает вас в Math Check", title: `${who} приглашает вас в Math Check`, body: "Ваш ребёнок решает контрольные по математике и хочет, чтобы вы видели его результаты и могли помочь с трудными заданиями.", cta: "Открыть Math Check", note: `Войдите с этой почтой — ${to}, и вы сразу будете подключены.` },
      invite_parent_by_parent: { subject: "Вас пригласили вторым родителем", title: "Вас пригласили вторым родителем", body: `${who}${em} приглашает вас следить за успехами ученика в Math Check.`, cta: "Открыть Math Check", note: `Войдите с этой почтой — ${to}, и вы сразу будете подключены.` },
      child_added_you: { subject: "Ваш ребёнок подключил вас", title: `${who} подключил(а) вас к своему профилю`, body: "Теперь вы видите результаты работ и просьбы о помощи.", cta: "Открыть Math Check" },
      parent_added_you: { subject: "Вас подключили к ученику", title: "Вас подключили вторым родителем", body: `${who}${em} подключил(а) вас к ученику. Теперь вы видите его результаты и просьбы о помощи.`, cta: "Открыть Math Check" },
      help: { subject: `${who} просит помочь с заданием`, title: `${who} просит помочь`, body: `Задание: ${p.title}. Задание и ответ ученика — в разделе «Просьбы о помощи».`, cta: "Открыть задание" },
      _foot: { subject: "", title: "", body: "Письмо отправлено автоматически из Math Check. Если вы его не ждали, просто удалите его.", cta: "" },
    },
    et: {
      invite_child: { subject: "Sind kutsuti Math Checki", title: "Sind kutsuti Math Checki", body: `${who}${em} kutsub sind lahendama matemaatika kontrolltöid ja jälgima oma tulemusi.`, cta: "Ava Math Check", note: `Logi sisse selle e-postiga — ${to}, siis kutse toimib ise.` },
      parent_wants_child: { subject: "Vanem soovib näha sinu tulemusi", title: `${who} soovib näha sinu tulemusi`, body: `Ava Math Check ja kinnita, et see on sinu vanem${em}.`, cta: "Kinnita" },
      invite_parent_by_child: { subject: "Teie laps kutsub teid Math Checki", title: `${who} kutsub teid Math Checki`, body: "Teie laps lahendab matemaatika kontrolltöid ja soovib, et näeksite tema tulemusi ning saaksite aidata keeruliste ülesannetega.", cta: "Ava Math Check", note: `Logige sisse selle e-postiga — ${to}, ja teid ühendatakse kohe.` },
      invite_parent_by_parent: { subject: "Teid kutsuti teiseks vanemaks", title: "Teid kutsuti teiseks vanemaks", body: `${who}${em} kutsub teid jälgima õpilase edusamme Math Checkis.`, cta: "Ava Math Check", note: `Logige sisse selle e-postiga — ${to}, ja teid ühendatakse kohe.` },
      child_added_you: { subject: "Teie laps ühendas teid", title: `${who} ühendas teid oma profiiliga`, body: "Nüüd näete tööde tulemusi ja abipalveid.", cta: "Ava Math Check" },
      parent_added_you: { subject: "Teid ühendati õpilasega", title: "Teid ühendati teise vanemana", body: `${who}${em} ühendas teid õpilasega. Nüüd näete tema tulemusi ja abipalveid.`, cta: "Ava Math Check" },
      help: { subject: `${who} palub abi ülesandega`, title: `${who} palub abi`, body: `Ülesanne: ${p.title}. Ülesanne ja õpilase vastus on jaotises «Abipalved».`, cta: "Ava ülesanne" },
      _foot: { subject: "", title: "", body: "Kiri saadeti automaatselt Math Checkist. Kui te seda ei oodanud, kustutage see.", cta: "" },
    },
    en: {
      invite_child: { subject: "You're invited to Math Check", title: "You're invited to Math Check", body: `${who}${em} invites you to take math tests and track your results.`, cta: "Open Math Check", note: `Sign in with this email — ${to} — and the invitation works by itself.` },
      parent_wants_child: { subject: "A parent wants to see your results", title: `${who} wants to see your results`, body: `Open Math Check and confirm this is your parent${em}.`, cta: "Confirm" },
      invite_parent_by_child: { subject: "Your child invites you to Math Check", title: `${who} invites you to Math Check`, body: "Your child takes math tests and wants you to see their results and help with tricky tasks.", cta: "Open Math Check", note: `Sign in with this email — ${to} — and you'll be connected right away.` },
      invite_parent_by_parent: { subject: "You were invited as a second parent", title: "You were invited as a second parent", body: `${who}${em} invites you to follow a student's progress in Math Check.`, cta: "Open Math Check", note: `Sign in with this email — ${to} — and you'll be connected right away.` },
      child_added_you: { subject: "Your child connected you", title: `${who} connected you to their profile`, body: "You can now see test results and help requests.", cta: "Open Math Check" },
      parent_added_you: { subject: "You were connected to a student", title: "You were connected as a second parent", body: `${who}${em} connected you to a student. You can now see their results and help requests.`, cta: "Open Math Check" },
      help: { subject: `${who} asks for help with a task`, title: `${who} asks for help`, body: `Task: ${p.title}. The task and the student's answer are under “Help requests”.`, cta: "Open the task" },
      _foot: { subject: "", title: "", body: "This email was sent automatically by Math Check. If you weren't expecting it, just delete it.", cta: "" },
    },
  };
  const set = L[lang] || L.ru;
  const m = set[kind] || L.ru[kind];
  return { ...m, subject: `${TAG} ${m.subject}`, note: m.note, foot: set._foot.body } as M & { foot: string };
}

const esc = (s: string) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Таблицы и встроенные стили: так письмо одинаково выглядит в Gmail, Outlook и на телефоне.
// Стиль сайта: светлый фон, белая карточка 28 без рамки, кнопка-таблетка, шрифт Manrope (где почта его грузит).
// Выравнивание по DESIGN.md: логотип — по краю карточки; текст в карточке и подпись под ней — на одной линии (+24 px).
function render(m: M & { foot: string }, url: string): { html: string; text: string } {
  const font = "Manrope,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
  const logo = `${url.replace(/\/$/, "")}/brand/email-logo.png`;
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&display=swap" rel="stylesheet"><title>${esc(m.subject)}</title></head>
<body style="margin:0;padding:0;background:#eef3f8;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(m.body)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef3f8;"><tr><td align="center" style="padding:40px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
    <tr><td style="padding:0 0 24px;"><a href="${esc(url)}" style="text-decoration:none;"><img src="${esc(logo)}" width="180" height="26" alt="Math Check" style="display:block;border:0;width:180px;height:auto;"></a></td></tr>
    <tr><td style="background:#ffffff;border-radius:28px;padding:32px 24px;box-shadow:0 12px 32px rgba(19,32,59,.06);">
      <h1 style="margin:0 0 12px;font-family:${font};font-size:26px;line-height:1.25;font-weight:800;letter-spacing:-.02em;color:#13203b;">${esc(m.title)}</h1>
      <p style="margin:0 0 28px;font-family:${font};font-size:16px;line-height:1.6;font-weight:500;color:#4a5a72;">${esc(m.body)}</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-radius:24px;background:#13203b;">
        <a href="${esc(url)}" style="display:inline-block;padding:15px 28px;font-family:${font};font-size:16px;font-weight:700;line-height:18px;color:#ffffff;text-decoration:none;border-radius:24px;">${esc(m.cta)}</a>
      </td></tr></table>
      ${m.note ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;"><tr><td style="background:#f3f7fb;border-radius:16px;padding:14px 16px;font-family:${font};font-size:14px;line-height:1.5;font-weight:500;color:#6b7a90;">${esc(m.note)}</td></tr></table>` : ""}
    </td></tr>
    <tr><td style="padding:16px 24px 0;font-family:${font};font-size:12px;line-height:1.6;color:#8a97a8;">${esc(m.foot)}<br><a href="${esc(url)}" style="color:#8a97a8;">${esc(url.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</a></td></tr>
  </table>
</td></tr></table></body></html>`;
  const text = `${m.title}\n\n${m.body}\n\n${m.cta}: ${url}${m.note ? `\n\n${m.note}` : ""}\n\n—\n${m.foot}`;
  return { html, text };
}
// ---- TEMPLATE END ----

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const env = (k: string, d = "") => Deno.env.get(k) ?? d;
  const user = env("SMTP_USER"), pass = env("SMTP_PASS");
  if (!user || !pass) return new Response(JSON.stringify({ error: "smtp_not_configured" }), { status: 200, headers: cors });
  const db = createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"));
  const { data: rows } = await db.from("outbox").select("*").is("sent_at", null).is("error", null).order("created_at").limit(20);
  if (!rows?.length) return new Response(JSON.stringify({ sent: 0 }), { headers: cors });
  const transport = nodemailer.createTransport({
    host: env("SMTP_HOST", "mail.spacemail.com"), port: Number(env("SMTP_PORT", "465")), secure: true,
    auth: { user, pass },
  });
  const url = env("SITE_URL", "https://math-nurval.vercel.app");
  let sent = 0;
  for (const r of rows) {
    // Забираем письмо себе: если функцию вызвали два раза одновременно, письмо уйдёт один раз.
    const { data: claimed } = await db.from("outbox").update({ error: "sending" }).eq("id", r.id).is("sent_at", null).is("error", null).select("id");
    if (!claimed?.length) continue;
    const m = msg(r.kind, r.lang, r.payload || {}, r.to_email);
    const out = render(m as M & { foot: string }, url);
    try {
      await transport.sendMail({ from: { name: env("MAIL_FROM_NAME", "Math Check"), address: user }, to: r.to_email, subject: m.subject, text: out.text, html: out.html, headers: { "X-App": "math-check" } });
      await db.from("outbox").update({ sent_at: new Date().toISOString(), error: null }).eq("id", r.id);
      sent++;
    } catch (e) {
      await db.from("outbox").update({ error: String(e).slice(0, 500) }).eq("id", r.id);
    }
  }
  transport.close();
  return new Response(JSON.stringify({ sent }), { headers: cors });
});
