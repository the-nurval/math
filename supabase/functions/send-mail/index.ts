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
type T = { subject: string; text: string };

function tpl(kind: string, lang: string, p: P, url: string): T {
  const who = (p.from_name || "").trim() || p.from_email || "";
  const L: Record<string, Record<string, T>> = {
    ru: {
      invite_child: { subject: "Приглашение на сайт контрольных по математике", text: `${who} (${p.from_email}) приглашает тебя решать контрольные по математике и следить за результатами.\n\nЗайди на сайт с этой почтой: ${url}` },
      parent_wants_child: { subject: "Родитель хочет видеть твои результаты", text: `${who} (${p.from_email}) хочет видеть твои результаты по математике.\n\nЗайди на сайт и подтверди, что это твой родитель: ${url}` },
      invite_parent_by_child: { subject: "Ваш ребёнок приглашает вас", text: `${who} приглашает вас следить за успехами в математике и помогать с заданиями.\n\nВойдите на сайт с этой почтой: ${url}` },
      invite_parent_by_parent: { subject: "Вас пригласили вторым родителем", text: `${who} (${p.from_email}) приглашает вас следить за успехами ученика в математике.\n\nВойдите на сайт с этой почтой: ${url}` },
      child_added_you: { subject: "Ваш ребёнок подключил вас", text: `${who} подключил(а) вас к своему профилю. Теперь вы видите его результаты.\n\n${url}` },
      parent_added_you: { subject: "Вас подключили к ученику", text: `${who} (${p.from_email}) подключил(а) вас вторым родителем.\n\n${url}` },
      help: { subject: "Просьба о помощи", text: `${who} просит помочь с заданием: ${p.title}.\n\nОткройте сайт, раздел ученика → «Просьбы о помощи»: ${url}` },
    },
    et: {
      invite_child: { subject: "Kutse matemaatika kontrolltööde saidile", text: `${who} (${p.from_email}) kutsub sind lahendama matemaatika kontrolltöid ja jälgima tulemusi.\n\nLogi sisse selle e-postiga: ${url}` },
      parent_wants_child: { subject: "Vanem soovib näha sinu tulemusi", text: `${who} (${p.from_email}) soovib näha sinu matemaatika tulemusi.\n\nMine saidile ja kinnita, et see on sinu vanem: ${url}` },
      invite_parent_by_child: { subject: "Teie laps kutsub teid", text: `${who} kutsub teid jälgima edusamme matemaatikas ja aitama ülesannetega.\n\nLogige sisse selle e-postiga: ${url}` },
      invite_parent_by_parent: { subject: "Teid kutsuti teiseks vanemaks", text: `${who} (${p.from_email}) kutsub teid jälgima õpilase edusamme matemaatikas.\n\nLogige sisse selle e-postiga: ${url}` },
      child_added_you: { subject: "Teie laps ühendas teid", text: `${who} ühendas teid oma profiiliga. Nüüd näete tema tulemusi.\n\n${url}` },
      parent_added_you: { subject: "Teid ühendati õpilasega", text: `${who} (${p.from_email}) ühendas teid teise vanemana.\n\n${url}` },
      help: { subject: "Abipalve", text: `${who} palub abi ülesandega: ${p.title}.\n\nAvage sait, õpilase leht → «Abipalved»: ${url}` },
    },
    en: {
      invite_child: { subject: "Invitation to the math tests site", text: `${who} (${p.from_email}) invites you to take math tests and track your results.\n\nSign in with this email: ${url}` },
      parent_wants_child: { subject: "A parent wants to see your results", text: `${who} (${p.from_email}) wants to see your math results.\n\nOpen the site and confirm this is your parent: ${url}` },
      invite_parent_by_child: { subject: "Your child invites you", text: `${who} invites you to follow their math progress and help with tasks.\n\nSign in with this email: ${url}` },
      invite_parent_by_parent: { subject: "You were invited as a second parent", text: `${who} (${p.from_email}) invites you to follow a student's math progress.\n\nSign in with this email: ${url}` },
      child_added_you: { subject: "Your child connected you", text: `${who} connected you to their profile. You can now see their results.\n\n${url}` },
      parent_added_you: { subject: "You were connected to a student", text: `${who} (${p.from_email}) connected you as a second parent.\n\n${url}` },
      help: { subject: "Help request", text: `${who} asks for help with: ${p.title}.\n\nOpen the site, the student's page → “Help requests”: ${url}` },
    },
  };
  const t = (L[lang] || L.ru)[kind] || L.ru[kind];
  return { subject: `${TAG} ${t.subject}`, text: t.text };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const html = (text: string) =>
  `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#1f2430">${esc(text).replace(/(https?:\/\/\S+)/g, '<a href="$1">$1</a>').replace(/\n/g, "<br>")}</div>`;

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
    const t = tpl(r.kind, r.lang, r.payload || {}, url);
    try {
      await transport.sendMail({ from: { name: env("MAIL_FROM_NAME", "Math Check"), address: user }, to: r.to_email, subject: t.subject, text: t.text, html: html(t.text), headers: { "X-App": "math-check" } });
      await db.from("outbox").update({ sent_at: new Date().toISOString(), error: null }).eq("id", r.id);
      sent++;
    } catch (e) {
      await db.from("outbox").update({ error: String(e).slice(0, 500) }).eq("id", r.id);
    }
  }
  transport.close();
  return new Response(JSON.stringify({ sent }), { headers: cors });
});
